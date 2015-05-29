var NUTELLA = require('nutella_lib');

// Get configuration parameters and init nutella
var cliArgs = NUTELLA.parseArgs();
var componentId = NUTELLA.parseComponentId();
var nutella = NUTELLA.init(cliArgs.broker, cliArgs.app_id, cliArgs.run_id, componentId);
// Optionally you can set the resource Id
nutella.setResourceId(cliArgs.app_id+'-'+componentId+'-'+cliArgs.run_id);


console.log("Hi, I'm a basic node bot and your code should go here!");



// Some examples to give you ideas...
// You can do things such as:
var dyes = nutella.persist.getJsonObjectStore('dyes');
var drillings = nutella.persist.getJsonObjectStore('drillings');


// 1. Subscribing to a channel
nutella.net.subscribe('insert_dye', function(message, from) {
    // Your code to handle messages received on this channel goes here
    // var payload = message.payload;
    try {
        var msg = JSON.parse(message);
        var dye = {};
        dye.colour = msg.colour;
        dye.date = new Date();
        dyes[msg.location] = dye;
        // Object.keys(msg).forEach(function (key) {
        //     dyes[key] = msg[key];
        // });
        // console.log ("saving dye");
        // console.log (dyes);
        dyes.save();
    } catch (e) {
        console.error("Message was not JSON: "+e);
    }
});


nutella.net.subscribe('drill', function(message, from) {
    if (from.resource_id) {
        try {
            var msg = JSON.parse(message);
            msg.date = new Date();
            drillings[from.resource_id] = msg;
            drillings.save();
        } catch (e) {
            console.error("Message was not JSON: "+e);
        }
    } else {
        console.error("No resource_id found in from, discarding message: "+message);
    }
});

// 2. Publish a message to a channel
// nutella.net.publish('demo_channel', 'demo_message');
// nutella.net.publish("insert_dye", "Hi Colin, this is a bot calling");


// 2a. The cool thing is that the message can be any object
// nutella.net.publish('demo_channel', {a: 'proper', key: 'value'});


// 3. Make asynchronous requests on a certain channel
// nutella.net.request( 'demo_channel', 'my_request', function(response){
//     // Your code to handle the response to this request goes here
// });


// 4. Handle requests from other components
// nutella.net.handle_requests( 'demo_channel', function(message, from) {
//     // Your code to handle each request here
//     // Anything this function returns (String, Integer, Object...) is going to be sent as the response
//     var response = 'a simple string'
//     // response = 12345
//     // response = {}
//     // response = {my:'json'}
//     return response;
// });

