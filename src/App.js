import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import fs from 'fs';
import CsvComparator from './utils/CsvComparator.js';
import FileManager from './utils/FileManager.js';

//const fs = require('fs');

function App() {
    // let originalInput;
    // let mod1Input;
    // let mod2Input;

    const originalInput = useRef(null);
    const mod1Input = useRef(null);
    const mod2Input = useRef(null);
    
    const originalInputDo = () => {
        originalInput = document.getElementById("originalInput").files[0]
    };
    const mod1InputDo = () => {
        mod1Input = document.getElementById("originalInput").files[0]
    };
    const mod2InputDo = () => {
        mod2Input = document.getElementById("originalInput").files[0]
    };
    const mainProcessDo = () => {
        // originalInputDo()
        // mod1InputDo()
        // mod2InputDo()

        CsvComparator(originalInput.current.files[0], mod1Input.current.files[0], mod2Input.current.files[0])
    };

    return (
        <div className="App">
            {/* <input id="originalInput" type="file">
            </input>
            <input id="mod1Input" type="file">
            </input>
            <input id="mod2Input" type="file">
            </input> */}
            
            <input ref={originalInput} id="originalInput" type="file">
            </input>
            <input ref={mod1Input} id="mod1Input" type="file">
            </input>
            <input ref={mod2Input} id="mod2Input" type="file">
            </input>
            <button onClick={mainProcessDo}>Focus no input</button>
        </div>
    );

}
    // ********** OLD **********
    // const originalInput = useRef(null);
    // const mod1Input = useRef(null);
    // const mod2Input = useRef(null);
    //   const comparator = CsvComparator;
    //   const onButtonClick = () => {
    //     CsvComparator(originalInput.current, mod1Input.current, mod2Input.current)
    //   };
    // const originalInputFile = htmlInput.files
    // return (
    //     <div className="App">
    //         <input ref={originalInput} id="originalInput" type="file">
    //         </input>
    //         <input ref={mod1Input} id="mod1Input" type="file">
    //         </input>
    //         <input ref={mod2Input} id="mod2Input" type="file">
    //         </input>
    //         <button onClick={onButtonClick}>Focus no input</button>
    //     </div>
    // );

export default App;
