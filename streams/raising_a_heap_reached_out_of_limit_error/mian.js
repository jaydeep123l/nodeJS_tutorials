const fs = require(`fs`)

let data = []
for (let index = 0; index < 1000000000 ; index++) {
    data.push(index) 

}

fs.writeFile('output.csv',data, (err) => {
    if (err) {
        throw err
    }
    console.log(`The data to the file has been appended and saved..`)
})