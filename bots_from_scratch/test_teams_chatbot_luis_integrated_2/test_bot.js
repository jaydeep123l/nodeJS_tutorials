var restify = require('restify');
var builder = require('botbuilder');
var config = require('./config/config.json')
var http = require('http')
var server = restify.createServer();
var axios = require(`axios`)

server.listen(process.env.port || process.env.PORT || 3000, function () {
    console.log('listening to %s', server.url);
});


var connector = new builder.ChatConnector({
    appId: config.MICROSOFT_APP_ID,
    appPassword: config.MICROSOFT_APP_PASSWORD
});

var inMemoryStorage = new builder.MemoryBotStorage();


console.log(`======================================`)

const LuisModelUrl = config.UPDATE_LUIS_URL;
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })



var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);

bot.dialog('/', intents);

let middleWareWhenBotCalled = (req, res, next) => {
    console.log(`/api/messages bot called...`)
    next()
}


server.post('/api/messages', middleWareWhenBotCalled, connector.listen());

// bot.dialog('/', function (session, args) {
//     session.send("Hi");
//     console.log(session.message.text);
// });

bot.dialog('/test', (session, args) => {
    session.send('hello, this is virtual bot... \n how may i assist you..');
    // session.beginDialog('/introSection')
});

// bot.dialog('/', intents);

bot.dialog('/introSection', [
    function (session, args, next) {

        session.sendTyping();
        if (session.userData && session.userData.profile && session.userData.profile.intro) {
            session.send("Hello i am chiku , A Virtual HR of Habilelabs Pvt Ltd !! ");
        }

        session.dialogData.credential = {};

        if (!session.dialogData.credential.userId) {
            builder.Prompts.text(session, "Please enter your habilelabs ID");
        } else {
            next();
        }
    },
    function (session, results, next) {

        session.sendTyping();
        if (results.response) {
            session.dialogData.credential.userId = results.response;
        }
        if (!session.dialogData.credential.password) {
            builder.Prompts.text(session, "Please enter your 4 digit pin");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.credential.password = results.response;
            session.sendTyping();
            app.doLogin(session.dialogData.credential, session);
        }
    }
]);


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

// intents.matches('greetings', (session) => {

//     session.beginDialog('/introSection')
// })

intents.matches('greetings', (session) => {
    session.beginDialog('/greetings')
});

bot.dialog('/greetings', [function (session) {
    session.send(`in greeting intents..`)
    console.log(`in greetings dialog,,`)
    session.endDialog()
    // next()
}])

intents.matches('job_search', [
    function (session, args, next) {
        console.log('in job_search intents...');
        session.send(`in job search intents..`)
        next()
    },
    function (session, results) {
        console.log(`next method called from job_search, intent...`)
        session.endDialog()
    }
    
]);

intents.matches('reserve_hotel', [
    function (session, args, next) {
        console.log('in hotel_reservation intents...');
        session.send(`in hotel reservation intents..`)
        next()
    },
    function (session, results) {
        console.log(`next method called from hotel_reservation, intent...`)
        session.endDialog()
    }
]);

intents.matches('rent_car', [
    function (session, args, next) {
        console.log('in rent_car intents...');
        session.send(`in rent_car intents`)
        next()
        
    },
    function (session, results) {
        console.log(`next method called from rent_car, intent...`)
        session.endDialog()
    }
]);


intents.onDefault((session) => {
    session.send("Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.", session.message.text)
})

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
    res.send({ status: 200, message: `user_data_pushed` })
    // })

})