const EventEmitter = require(`events`)

const event = new EventEmitter();

event.on(`page_response`,(status_code , message)=>{

    console.log(`the page_response is returned as with status code = ${status_code} and message as ${message}`)
})


event.emit(`page_response`, 200, 'ok')