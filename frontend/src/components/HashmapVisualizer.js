    import React, { useState } from 'react';
    import LinkedList from '../dataStructures/LinkedList';

    const HashmapArrow = ({ arrowSrc, coordinates }) => {
        console.log('coordinates: ', coordinates);
        coordinates.map((coordinate, index) => console.log(coordinate.x));


        return (
            <div style={{ position: 'relative' }}>
            {coordinates.map((coordinate, index) => (
                <img
                key={index} // Use index as a key for each image
                src={arrowSrc}
                alt="hashmap connection arrow"
                style={{
                    position: 'absolute',
                    top: coordinate.y + 'px', // Adjust based on your coordinate format
                    left: coordinate.x + 'px', // Adjust based on your coordinate format
                    width: '30px', // Optional: Set image width
                    height: '45px', // Optional: Set image height
                }}
                />
            ))}                      

            </div>
        );
    };


    const HashNumber = ({ arrowSrc, coordinates, inputNums }) => {
        console.log('coordinates: ', coordinates);
        console.log('inputNums: ', inputNums);
    
    
        return (
            <div style={{ position: 'relative' }}>
            {coordinates.map((coordinate, index) => (
                <img
                key={index} // Use index as a key for each image
                src={arrowSrc}
                alt=""
                style={{
                    position: 'absolute',
                    top: coordinate.y +45+ 'px', // Adjust based on your coordinate format
                    left: coordinate.x -7+ 'px', // Adjust based on your coordinate format
                    width: '50px', // Optional: Set image width
                    height: '50px', // Optional: Set image height
                }}
                />
            ))}
    
            {coordinates.map((coordinate, index) => (
                <span style={{
                    position: 'absolute',
                    top: coordinate.y +55+ 'px', // Use maximum y-coordinate for positioning
                left: coordinate.x + 7+'px', // Use x-coordinate from first element}}>Hi!</span>
                  }}
                  >
                {inputNums[index]}</span>
    
            ))}
    
                      
    
            </div>
        );
        };
      
    
    const HashmapVisualizer = () => {
        const [LL1, setLL1] = useState(new LinkedList());
        const [LL2, setLL2] = useState(new LinkedList());
        const [LL3, setLL3] = useState(new LinkedList());
        const [LL4, setLL4] = useState(new LinkedList());
        const [LL5, setLL5] = useState(new LinkedList());
        const [LL6, setLL6] = useState(new LinkedList());
        const [LL7, setLL7] = useState(new LinkedList());
        const [LL8, setLL8] = useState(new LinkedList());
        const [LL9, setLL9] = useState(new LinkedList());
        const [LL10, setLL10] = useState(new LinkedList());

    const [inputValue, setInputValue] = useState('');
    const [inputSize, setSizeValue] = useState('');
    const [columns, setColumns] = useState(10);
   
    const [connectionCoordinates, setConnectionCoordinates] = useState([]);
    const [inputNums, setInputNums] = useState([])

    const generateTable = (numColumns) => {
        const headers = [];
        for (let i = 1; i <= numColumns; i++) {
        headers.push(` ${i - 1}`);
        }
        return headers;
    };

    const tableHeaders = generateTable(columns);

    const handleGenerateTable = () => {
        const size = parseInt(inputSize, 10);
        if (!isNaN(size) && size > 0) {
        setColumns(size);
        }
    };

    function addConnection(connectionCoordinates, x, y) {
        console.log(connectionCoordinates);
        return [...connectionCoordinates, { x, y }]; // Spread operator for immutability
    }

    const handleAddNumber = () => {
        const num = parseInt(inputValue, 10);

        var len=0;

        if (num % 10 === 0) {
            LL1.push_back(num);
            len=LL1.length();
            console.log(LL1);
          } else if (num % 10 === 1) {
            LL2.push_back(num);
            len=LL2.length();

            console.log(LL2);

          } else if (num % 10 === 2) {
            LL3.push_back(num);
            len=LL3.length();

            console.log(LL3);

          } else if (num % 10 === 3) {
            LL4.push_back(num);
            len=LL4.length();

            console.log(LL4);

          } else if (num % 10 === 4) {
            LL5.push_back(num);
            len=LL5.length();

            console.log(LL5);

          } else if (num % 10 === 5) {
            LL6.push_back(num);
            len=LL6.length();

            console.log(LL6);

          } else if (num % 10 === 6) {
            LL7.push_back(num);
            len=LL7.length();

            console.log(LL7);

          } else if (num % 10 === 7) {
            LL8.push_back(num);
            len=LL8.length();

            console.log(LL8);

          } else if (num % 10 === 8) {
            LL9.push_back(num);
            len=LL9.length();         
            
            console.log(LL9);

          } else if (num % 10 === 9) {
            LL10.push_back(num);
            len=LL10.length();

            console.log(LL10);

          } else {
            console.error(`Invalid number: ${num}. Remainder after division by 10 should be between 0 and 9.`);
          }



          // Calculate coordinates based on your logic (replace with your logic)
          console.log('the length of the list is: '+len);
        const x = 405+70*(num%10); // Example: x based on the number
        const y = -135+95*len;// Example: y based on the number

        setConnectionCoordinates(addConnection(connectionCoordinates, x, y));
        setInputNums([...inputNums, num]);







      



        setInputValue('');
    };

    return (
        <>
        <h2>Controls</h2>
        <div>
            <label>Add number: </label>
            <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddNumber}>Add Number</button>

            {/* Table */}
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '40px 0' }}>
            <thead>
                <tr>
                {tableHeaders.map((header, index) => (
                    <th key={index} style={{ border: '1px solid black', padding: '30px' }}>
                    {header}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody></tbody>
            </table>

            {/* Display arrows for all connections */}
            {connectionCoordinates.map((coordinates, index) => (
            <HashmapArrow
                key={index} // Use index as a key for each arrow
                arrowSrc={require('.././pics/red-arrow-down-icon-png-30.png')}
                coordinates={connectionCoordinates}
            />
            ))}
        {console.log('coordinates for circle: '+connectionCoordinates)}
        {connectionCoordinates.map((coordinates, index) => (
            <HashNumber
                key={index} // Use index as a key for each arrow
                arrowSrc={require('.././pics/postItNOTE.png')}
                coordinates={connectionCoordinates}
                inputNums={inputNums}
            />
            ))}

        




        </div>
        </>
    );
    };

    export default HashmapVisualizer;
