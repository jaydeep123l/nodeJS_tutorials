const express = require('express')
const fs = require('fs')
const app = express()
let PORT = 9000

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/video_stream', (req,res)=> {
    let range = req.headers.range
    console.log(range)
    if (!range) {
        res.status(400).send(`Header requires range..`)
    }

    const videoPath = './video_stream.mp4'
    const videoSize = fs.statSync('./video_stream.mp4').size;

    const chunk_size = 10 ** 8;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunk_size, videoSize - 1)

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges" : "bytes",
        "Content-Length": `${contentLength/1000} kb`,
        "Content-Type" : "video/mp4"
    }

    console.log(`videoPath ==> ${videoPath},videoSize ==> ${videoSize/1000 } kb,  chunk_size ==> ${chunk_size/1000} kb,  start ==> ${start/1000} kb,   end ==> ${end/1000} kb,   contentLength ==> ${contentLength/1000} kb `)
    console.log(`\n headers ==> `)
    console.log(headers)

    res.writeHead(206,headers)
    const videoStream =fs.createReadStream(videoPath,{start, end});
    videoStream.pipe(res);

})

app.listen(PORT, () => {
    console.log(`server running, on the port ${PORT}`)
})