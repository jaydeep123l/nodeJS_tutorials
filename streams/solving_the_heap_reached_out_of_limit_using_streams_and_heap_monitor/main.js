const fs = require('fs');

// (aysnc () => {
let writing_to_file_using_streams = async () => {
    const writeStream = fs.createWriteStream(`output.csv`);
    for (let index = 0; index < 100000000; index++) {
        let Heap_is_not_fully_filled = writeStream.write(`${index}   \n`)
        if (!Heap_is_not_fully_filled) {
            await new Promise((resolve) => {
                writeStream.once('drain', resolve)
            })
        }

    }
    writeStream.end()
}

writing_to_file_using_streams()
// })();