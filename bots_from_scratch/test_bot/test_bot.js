var restify = require('restify');
var builder = require('botbuilder');
var config = require('./config/config.json')
var http = require('http')
var server = restify.createServer();
var axios = require(`axios`)

server.listen(process.env.port || process.env.PORT || 3001, function () {
    console.log('listening to %s', server.url);
});


var connector = new builder.ChatConnector({
    appId: config.MICROSOFT_APP_ID,
    appPassword: config.MICROSOFT_APP_PASSWORD
});

var inMemoryStorage = new builder.MemoryBotStorage();

var bot = new builder.UniversalBot(connector, (session) => {
    console.log('::input:: %s', session.message.text);
    session.beginDialog('/userCheck');
}).set('storage', inMemoryStorage);

let middleWareWhenBotCalled = (req,res,next) => {
    console.log(`/api/messages bot called...`)
    next()
} 


server.post('/api/messages', middleWareWhenBotCalled, connector.listen());

// bot.dialog('/', function (session, args) {
//     session.send("Hi");
//     console.log(session.message.text);
// });


bot.dialog('/userCheck', function (session, args) {
    if (!session.userData.greeting) {
        session.send("Hello. What is your name?");
        session.userData.greeting = true;
    } else if (!session.userData.name) {
        getName(session);
    } else if (!session.userData.email) {
        getEmail(session);
    } else if (!session.userData.password) {
        getPassword(session);
    } else {
        // session.userData = null;
        session.userData = {};
    }
    session.endDialog();
});


function getName(session) {
    let name = session.message.text;
    session.userData.name = name;
    session.send("Hello, " + name + ". What is your Email ID?");
}

function getEmail(session) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = session.message.text;
    if (re.test(email)) {
        session.userData.email = email;
        session.send("Thank you, " + session.userData.name + ". Please set a new password.");
    } else {
        session.send("Please type a valid email address. For example: test@hotmail.com");
    }
}

function getPassword(session) {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    password = session.message.text;
    if (re.test(password)) {
        session.userData.password = password;
        var data = session.userData;
        sendData(data, function (msg) {
            session.send(msg.message);
            // session.userData = null;
            session.userData = {};
            console.log(`session object is as ::--`)
            console.log(session.userData)
        });
    } else {
        session.send("Password must contain at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character. For example: Mybot@123");
    }
}


function sendData(data, cb) {
    console.log(data)
    axios.post('http://127.0.0.1:3001/saveUserData', {
        firstName: data.name,
        email: data.email,
        password: data.password
    }).then((result) => {
        console.log(result.data)
        cb(result.data)
    }).catch((error) => {
        console.error(error)
    })
}


server.post('/saveUserData', (req, res, next) => {
    console.log(`in /saveUserData post request.....`)
    // console.log(req.body)
    // return new Promise((resolve,reject) => {
        res.send({status:200,message:`user_data_pushed`})
    // })
    
})