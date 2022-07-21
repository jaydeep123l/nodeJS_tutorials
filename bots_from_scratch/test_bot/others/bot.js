"use strict";

module.exports.setup = function (app) {

    var builder = require('botbuilder');

    var teams = require('botbuilder - teams');

    var config = require('config');

    var request = require('request');

    if (!config.has('bot.appId')) {

        process.env.NODE_CONFIG_DIR = '../config';

        delete require.cache[require.resolve('config')];

        config = require('config');

    }

    var connector = new teams.TeamsChatConnector({

        appId: config.get('bot.appId'),

        appPassword: config.get('bot.appPassword')

    });

    var inMemoryBotStorage = new builder.MemoryBotStorage();

    // Define a simple bot with the above connector that echoes what it received

    var bot = new builder.UniversalBot(connector, function (session) {

        // Message might contain @mentions which we would like to strip off in the response

        var text1 = teams.TeamsMessage.getTextWithoutMentions(session.message);

        session.send('You said: % s', text1);

    }).set('storage', inMemoryBotStorage);


    
    // Setup an endpoint on the router for the bot to listen.
    // NOTE: This endpoint cannot be changed and must be api/messages

    app.post('/api/messages', connector.listen());

    // Export the connector for any downstream integration — e.g. registering a messaging extension

    module.exports.connector = connector;

};

