import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import fs from 'fs';
import CsvComparator from './utils/CsvComparator.js';
// import FileManager from './utils/FileManager.js';

//const fs = require('fs');

function App() {
    // const htmlInput = new HTMLInputElement()

    const originalInput = useRef(null);
    const mod1Input = useRef(null);
    const mod2Input = useRef(null);
    //   const comparator = CsvComparator;
    //   const onButtonClick = () => {
    //     CsvComparator(originalInput.current, mod1Input.current, mod2Input.current)
    //   };
    // const originalInputFile = htmlInput.files
    
    const onButtonClick = () => {
        CsvComparator(originalInput.current, mod1Input.current, mod2Input.current)
    };
    return (
        <div className="App">
            <input ref={originalInput} type="file">
            </input>
            <input ref={mod1Input} type="file">
            </input>
            <input ref={mod2Input} type="file">
            </input>
            <button onClick={onButtonClick}>Focus no input</button>
        </div>
    );
}

export default App;
