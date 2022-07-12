// const fs = require('fs');

const CsvComparator = (originalFile, newModFile1, newModFile2) => {
    // const originalFileContent = fs.readFileSync(originalFile, 'utf-8')
    // const newModFile1Content = fs.readFileSync(newModFile1, 'utf-8')
    // const newModFile2Content = fs.readFileSync(newModFile2, 'utf-8')
    const originalFileContent = originalFile
    const newModFile1Content = newModFile1
    const newModFile2Content = newModFile2
    
    const originalFileHead = originalFileContent.split(/\r?\n/)[0]

    const diffLines = []

    const outputFileContent = []

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
    }
    for (let line of newModFile1Lines) {
        newModFile1Hashmap = {...newModFile1Hashmap, [line.split(';')[0]] : line}
    }
    for (let line of newModFile2Lines) {
        newModFile2Hashmap = {...newModFile2Hashmap, [line.split(';')[0]] : line}
    }

    // Object.keys(newModFile2Hashmap).forEach(key => 
    //     newModFile1Hashmap[key] == null && 
    //         outputFileContent.push(newModFile2Hashmap[key] + '\n')
    // )

    let idFile2 = 1999999999
    let lineFile2 = []
    let itFile2 = 0

    for (let key of Object.keys(newModFile2Hashmap)) {
        if (newModFile1Hashmap[key] == null) {
            lineFile2.push(
                {
                    id: key,
                    content: newModFile2Hashmap[key]
                }
            )
        }
    }
    if (lineFile2.length > 0)
        idFile2 = lineFile2[itFile2].id

    outputFileContent.push(originalFileHead + '\n')

    for (let id of Object.keys(newModFile1Hashmap)) {

        while (id > idFile2) {
            outputFileContent.push(lineFile2[itFile2].content + '\n')
            itFile2++
            idFile2 = lineFile2.length > itFile2 ? lineFile2[itFile2].id : 1999999999
        }

        const foundValue = newModFile2Hashmap[id]

        //case 1: same id and same line in both mod files
        //case 3: id in file1 not found in file2
        if (foundValue === newModFile1Hashmap[id] || foundValue == null) {
            outputFileContent.push(newModFile1Hashmap[id] + '\n')
            continue
        }

        //case 2: same id and conflicted line
        //case 2a: line from file1 is equal to original file,
        //  then concat line from file2
        if (originalFileHashmap[id] === newModFile1Hashmap[id]) {
            outputFileContent.push(foundValue + '\n')
            continue
        }
        //case 2b: line from file2 is equal to original file,
        //  then concat line from file1
        if (originalFileHashmap[id] === foundValue) {
            outputFileContent.push(newModFile1Hashmap[id] + '\n')
            continue
        }
        //case 2c: both lines are different from original file,
        //  then send for diff check on front

        diffLines.push(
            {
                file: 0,
                id: id,
                content: newModFile1Hashmap[id]
            }
        )
        diffLines.push(
            {
                file: 1,
                id: id,
                content: newModFile2Hashmap[id]
            }
        )

        //code

    }

    while (itFile2 < lineFile2.length) {
        outputFileContent.push(lineFile2[itFile2].content)
        itFile2++
    }

    // outputFileContent.push(
    //     newModFile2Hashmap.filter(
    //         (value, key) => newModFile1Hashmap[key] == null
    //     ).map(
    //         value => value + '\n'
    //     )
    // )
    
};

export default CsvComparator;