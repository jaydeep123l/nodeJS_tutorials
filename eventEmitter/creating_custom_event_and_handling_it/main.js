const EventEmitter = require(`events`)

const event = new EventEmitter();

event.on(`event_1`,()=>{
    console.log(`event_1 is being hitted and it's being handled by the specific handler...`)
})

event.emit(`event_1`)