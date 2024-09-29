import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    lvl: { type: Number, required: true },
    review: { type: String } // New field added, not required
});

export const User = mongoose.model('User', userSchema);