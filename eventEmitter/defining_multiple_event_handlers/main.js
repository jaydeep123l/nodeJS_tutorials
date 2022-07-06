const EventEmitter = require(`events`)

const event = new EventEmitter();

event.on(`event_1`,()=>{
    console.log(`event_1 is being handled by handler_1...`)
})

event.on(`event_1`,()=>{
    console.log(`event_1 is being handled by handler_2...`)
})

event.on(`event_1`,()=>{
    console.log(`event_1 is being handled by handler_3...`)
})

event.on(`event_1`,()=>{
    console.log(`event_1 is being handled by handler_4...`)
})

event.emit(`event_1`)