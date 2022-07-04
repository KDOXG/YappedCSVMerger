const fs = require('fs');

const CsvComparator = (originalFile, newModFile1, newModFile2) => {
    const originalFileContent = fs.readFileSync(originalFile, 'utf-8')
    const newModFile1Content = fs.readFileSync(newModFile1, 'utf-8')
    const newModFile2Content = fs.readFileSync(newModFile2, 'utf-8')
    debugger
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
    
    let originalFileHashmap = {}
    let newModFile1Hashmap = {}
    let newModFile2Hashmap = {}

    for (let line of originalFileLines) {
        originalFileHashmap = {...originalFileHashmap, [line.split(';')[0]] : line}
        //originalFileHashmap.push({[line.split(';')[0]] : line})
    }
    for (let line of newModFile1Lines) {
        newModFile1Hashmap = {...newModFile1Hashmap, [line.split(';')[0]] : line}
        //newModFile1Hashmap.push({[line.split(';')[0]] : line})
    }
    for (let line of newModFile2Lines) {
        newModFile2Hashmap = {...newModFile2Hashmap, [line.split(';')[0]] : line}
        //newModFile2Hashmap.push({[line.split(';')[0]] : line})
    }

    let outputFileContent = ""
    outputFileContent.concat(originalFileHead,'\n')

    for (let line of Object.keys(newModFile1Hashmap)) {

        const foundValue = newModFile2Hashmap[line]

        //case 1: same id and same line in both mod files
        //case 3: id in file1 not found in file2
        if (foundValue === newModFile1Hashmap[line] || foundValue == null) {
            outputFileContent = outputFileContent.concat(newModFile1Hashmap[line],'\n')
            continue
        }

        //case 2: same id and conflicted line
        //case 2a: line from file1 is equal to original file,
        //  then concat line from file2
        if (originalFileHashmap[line] === newModFile1Hashmap[line]) {
            outputFileContent = outputFileContent.concat(foundValue,'\n')
            continue
        }
        //case 2b: line from file2 is equal to original file,
        //  then concat line from file1
        else if (originalFileHashmap[line] === foundValue) {
            outputFileContent = outputFileContent.concat(newModFile1Hashmap[line],'\n')
            continue
        }
        //case 2c: both lines are different from original file,
        //  then send for diff check on front
        else {

            //code
        }

    }

    Object.keys(newModFile2Hashmap).forEach(
        key => newModFile1Hashmap[key] == null && 
            (outputFileContent = outputFileContent.concat(newModFile2Hashmap[key], '\n'))
    )

    // outputFileContent.concat(
    //     newModFile2Hashmap.filter(
    //         (value, key) => newModFile1Hashmap[key] == null
    //     ).map(
    //         value => value + '\n'
    //     )
    // )
    
};
let original = "C:\\FOR_WORK\\JS\\YappedCSVMerger\\py\\EquipParamWeapon.csv";
let file1 = "C:\\FOR_WORK\\JS\\YappedCSVMerger\\py\\mymod.csv";
let file2 = "C:/FOR_WORK/JS/YappedCSVMerger/py/new.csv";
CsvComparator(original, file1, file2);