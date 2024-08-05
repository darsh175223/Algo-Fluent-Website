from flask import Flask, jsonify
import tkinter as tk
from tkinter import Canvas, Button, Label, StringVar, Entry
import numpy as np
import tensorflow as tf
from PIL import ImageGrab, ImageOps
import os

# Define a function to create a new model
def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(10, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

# Load or create the model
model_path = 'mnist_model.h5'

if os.path.exists(model_path):
    model = tf.keras.models.load_model(model_path)
else:
    model = create_model()

app = Flask(__name__)

@app.route('/open-window', methods=['POST'])
def open_tkinter():
    # Launch the Tkinter GUI
    launch_tkinter()
    return jsonify({"status": "Tkinter GUI opened"})

def launch_tkinter():
    def clear_canvas():
        canvas.delete("all")

    def predict_digit():
        x = root.winfo_rootx() + canvas.winfo_x()
        y = root.winfo_rooty() + canvas.winfo_y()
        x1 = x + canvas.winfo_width()
        y1 = y + canvas.winfo_height()
        img = ImageGrab.grab().crop((x, y, x1, y1)).convert('L')
        
        img = img.resize((28, 28))
        img = ImageOps.invert(img)
        img_array = np.array(img)
        img_array = img_array / 255.0  # Normalize
        img_array = img_array.reshape(1, 28, 28, 1)  # Reshape for model input

        prediction = model.predict(img_array)
        predicted_digit = np.argmax(prediction)
        confidence = np.max(prediction) * 100

        result_var.set(f"Predicted: {predicted_digit} (Confidence: {confidence:.2f}%)")

    def submit_digit():
        actual_digit = int(actual_digit_entry.get())
        if actual_digit < 0 or actual_digit > 9:
            result_var.set("Actual digit must be between 0 and 9.")
            return
        
        x = root.winfo_rootx() + canvas.winfo_x()
        y = root.winfo_rooty() + canvas.winfo_y()
        x1 = x + canvas.winfo_width()
        y1 = y + canvas.winfo_height()
        img = ImageGrab.grab().crop((x, y, x1, y1)).convert('L')
        
        img = img.resize((28, 28))
        img = ImageOps.invert(img)
        img_array = np.array(img)
        img_array = img_array / 255.0  # Normalize
        img_array = img_array.reshape(1, 28, 28, 1)  # Reshape for model input
        
        # One-hot encode the label
        y_one_hot = np.zeros((1, 10))
        y_one_hot[0, actual_digit] = 1
        
        # Append the new data to the existing dataset
        global x_train, y_train
        x_train = np.append(x_train, img_array, axis=0)
        y_train = np.append(y_train, y_one_hot, axis=0)
        
        # Save the updated dataset
        np.save('x_train.npy', x_train)
        np.save('y_train.npy', y_train)
        
        # Recreate and retrain the model
        global model
        model = create_model()
        model.fit(x_train, y_train, epochs=1, verbose=0)
        model.save(model_path)
        
        result_var.set("Model retrained with the new data.")

    root = tk.Tk()
    root.title("Digit Recognizer")

    canvas = Canvas(root, width=280, height=280, bg='white')
    canvas.pack()

    def paint(event):
        x1, y1 = (event.x - 1), (event.y - 1)
        x2, y2 = (event.x + 1), (event.y + 1)
        canvas.create_oval(x1, y1, x2, y2, fill="black", width=5)

    canvas.bind("<B1-Motion>", paint)

    clear_button = Button(root, text="Clear", command=clear_canvas)
    clear_button.pack(side=tk.LEFT)

    predict_button = Button(root, text="Predict", command=predict_digit)
    predict_button.pack(side=tk.RIGHT)

    actual_digit_label = Label(root, text="Actual Digit:")
    actual_digit_label.pack()

    actual_digit_entry = Entry(root)
    actual_digit_entry.pack()

    submit_button = Button(root, text="Submit", command=submit_digit)
    submit_button.pack()

    result_var = StringVar()
    result_label = Label(root, textvariable=result_var)
    result_label.pack()

    root.mainloop()

if __name__ == '__main__':
    # Load existing training data or create empty arrays if not available
    if os.path.exists('x_train.npy') and os.path.exists('y_train.npy'):
        x_train = np.load('x_train.npy')
        y_train = np.load('y_train.npy')
    else:
        x_train = np.empty((0, 28, 28, 1))
        y_train = np.empty((0, 10))  # Update to (0, 10) for one-hot encoding

    app.run(port=5000)
