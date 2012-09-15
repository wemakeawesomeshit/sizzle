
/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./config');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);




var consequences = [];


app.post("/call", function(req, res) {
	var twiml = "<Response><Say>";

	for (var i = 0, len = consequences[i]; i < len; i++) {
		twiml += consequences[i]+". ";
	}

	twiml += "</Say></Response>";
	res.send(twiml);
});

app.get("/view", function (req, res) {
	res.send(consequences);
});

app.get("/summary", function(req, res) {
	var last = false;
	if (consequences.length)
		last = consequences[ consequences.length - 1];

	res.send(last);
});


app.post("/sms", function(req, res) {
	consequences.push(req.body.Body);
	console.log("Consequence: "+req.body.Body);
 	res.send("<Response><Sms>Thanks for your entry :) If you call me back, you can hear the whole of the story so far.</Sms></Response>");
});




app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
