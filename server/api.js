'use static'

var mailCenter = require('./mailcenter.js');

var api = {
	receiveForm:receiveForm
}

function receiveForm(type, data) {
	console.log('receiving form');
	
	var	mailBody = JSON.stringify(data, null, 4);

	return new Promise(function(resolve, reject) {

		
		mailCenter.sendEmail('"Ian McAllister" <ian@ah-nuts.com>', 'employee@ah-nuts.com', 'Market Receipt', mailBody/*, attachements*/)
		.then(function(response) {
			//if mail sent & filed to db correctly send affirmative
			resolve(response);
		}).catch(function(err) {
			//if mail not sent and/or db not written to send error
			reject(err);
		})
		
	});
}

module.exports = api;