var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./api');

//return the express object
var app = express();

//environment variables
var port = process.env.PORT || 3000;

console.log(process.env);
console.log('process.env.MAIL_HOST', process.env.MAIL_HOST);
console.log('process.env.MAIL_PORT', process.env.MAIL_PORT);
console.log('process.env.MAIL_USER', process.env.MAIL_USER);
console.log('process.env.MAIL_PASSWORD', process.env.MAIL_PASSWORD);

//get the URL encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//tell it the folder to serve
app.use(express.static('dist'));

//define our body parsers
app.use(jsonParser); // for parsing application/json
app.use(urlencodedParser); // for parsing application/x-www-form-urlencoded

//connecting middleware
//app.use('/assets', express.static(__dirname + '/public'));

//my own middleware
/*app.get('/api/testing', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);

	next();
});*/

//handle HTTP requests, for GET calls
/*app.get('/db/form/:name/:status', function(req, res) {
	var resource = {db: 'forms', form: req.params.name, status: req.params.status };
	console.log("got this", resource);*/

	//TODO: TAKE THIS OUT LATER
	/*res.status(200).send({
				reports_due: [
					{
						employee:"Kevin Luna",
						name:"Bixby Park - Tuesday"
					}
				],
				reports_past_due: [
					{
						dueDate:"06/28/16",
						employee:"Kevin Luna",
						name:"Bixby Park - Tuesday"
					}
				]
			});*/

	/*api.collectResources(resource).then(function(response) {
		console.log('sending response back');
		res.status(200).send(response);
	}).catch(function(error) {
		res.status(406).send('Not Acceptable:'. error);
	});

});

app.get('/assets/:name', function(req, res) {

	console.log('got this');
	var options = {
		root: __dirname + '/dist/assets',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var filename = req.params.name;

	console.log('getting this', filename, 'from', options);

	res.sendFile(filename, options, function(err) {
		if(err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent:', filename);
		}
	});
	//send back html
	//res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');

});

/*app.post('/:path/:file', function(req, res) {
	var path = req.params.path;
	var filename = req.params.file;
	console.log(path, filename);
	res.send({'testing':'test', "path":path, "filename":filename});
});*/
app.get('/api/getData/:location/:date', function(req, res) {
	console.log('Request Url: ' + req.url, req.params);
	
	var options = {
		root: __dirname + '/receiptObjects',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var filename = path.join(req.params.location + "_" + req.params.date + '.json');
	
	console.log('filename', filename);
	
	res.sendFile(filename, options, function(err) {
		if(err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent:', filename);
		}
	});

});

/*app.get('/api/guessMarket', function(req, res) {
	
	var gps = null;
	
	//if a gps was passsed, get it
	if(typeof req.params !== 'undefined') gps = req.params.gps;
	
	//if this get is called supply the most likely data
	var guess = api.supplyGuess(gps);
	
	//send back
	res.send(guess);
})*/

app.post('/api/submitForm/marketReceipt', function(req, res) {
	//notify the user
	console.log('got this', req.body);

	//process the data
	api.receiveForm('marketReceipt', req.body)
	.then(function(response) {
		console.log('got this response:', response);
		res.send('Success: ' + response);
	}).catch(function(err) {
		console.log('got this error:', err);
		res.send('Error: ' + err);
	});
	
})

//open the port for local development
app.listen(port,function() {
	console.log('Express server is up and running on port ' + port);
})