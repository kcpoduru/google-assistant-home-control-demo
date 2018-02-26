// Boilerplate setup
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
var net = require('net');

var client = new net.Socket();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

// Create an instance of ApiAiAssistant
app.post('/', function (request, response) {
  console.log("entered");
  const assistant = new ApiAiAssistant(
    {request: request, response: response});

//console.log(request)

// Create functions to handle requests here
function numberIntent (assistant) {
  let number = assistant.getArgument('number');
  console.log(number);
  client.connect(28000, '192.168.1.16', function() {
	console.log('Connected');
	client.write('start ' + number);
  client.destroy();
});
  assistant.tell('starting user '+ number  );
}
let actionMap = new Map();
actionMap.set('xxxxxxx', numberIntent);
assistant.handleRequest(actionMap);
})

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
