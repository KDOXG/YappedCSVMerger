import logo from './logo.svg';
import './App.css';
import {useRef, useState} from 'react';
import fs from 'fs';
//import CsvComparator from './utils/CsvComparator.js';

//const fs = require('fs');

const CsvComparator = (originalFile, newModFile1, newModFile2) => {
    const originalFileContent = fs.readFileSync(originalFile.name, {encoding:'utf8', flag:'r'})
    const newModFile1Content = fs.readFileSync(newModFile1.name, {encoding:'utf8', flag:'r'})
    const newModFile2Content = fs.readFileSync(newModFile2.name, {encoding:'utf8', flag:'r'})

    const originalFileHead = originalFileContent.split(/\r?\n/)[0]

    const diffLines = []

    const originalFileLines = originalFileContent.split(/\r?\n/).slice(1)
    const newModFile1Lines = newModFile1Content.split(/\r?\n/).slice(1)
    const newModFile2Lines = newModFile2Content.split(/\r?\n/).slice(1)
    
    // const originalFileIndexes = []
    // const newModFile1Indexes = []
    // const newModFile2Indexes = []

    // originalFileLines.forEach(line => 
    //     originalFileIndexes.add(line.split(';')[0])
    // )
    // newModFile1Lines.forEach(line => 
    //     newModFile1Indexes.add(line.split(';')[0])
    // )
    // newModFile2Lines.forEach(line => 
    //     newModFile2Indexes.add(line.split(';')[0])
    // )
    
    const originalFileHashmap = []
    const newModFile1Hashmap = []
    const newModFile2Hashmap = []

    for (let line of originalFileLines) {
        originalFileHashmap.add({[line.split(';')[0]] : line})
    }
    for (let line of newModFile1Lines) {
        newModFile1Hashmap.add({[line.split(';')[0]] : line})
    }
    for (let line of newModFile2Lines) {
        newModFile2Hashmap.add({[line.split(';')[0]] : line})
    }

    const outputFileContent = ""
    outputFileContent.concat(originalFileHead,'\n')

    for (let line of newModFile1Hashmap) {

        const foundValue = newModFile2Hashmap[line.key].value

        //case 1: same id and same line in both mod files
        //case 3: id in file1 not found in file2
        if (foundValue === line.value || foundValue == null) {
            outputFileContent.concat(line.value,'\n')
            continue
        }

        //case 2: same id and conflicted line
        //case 2a: line from file1 is equal to original file,
        //  then concat line from file2
        if (originalFileHashmap[line.key].value === foundValue) {
            outputFileContent.concat(line.value,'\n')
            continue
        }
        //case 2b: line from file2 is equal to original file,
        //  then concat line from file1
        else if (originalFileHashmap[line.key].value === line.value) {
            outputFileContent.concat(foundValue,'\n')
            continue
        }
        //case 2c: both lines are different from original file,
        //  then send for diff check on front
        else {

            //code
        }

    }

    newModFile2Hashmap.forEach(
        (value, key) => newModFile1Hashmap[key].value == null ?? outputFileContent.concat(value, '\n')
    )

};

function App() {
  const originalInput = useRef(null);
  const mod1Input = useRef(null);
  const mod2Input = useRef(null);
//   const comparator = CsvComparator;
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
