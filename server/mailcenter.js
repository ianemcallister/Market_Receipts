'use static'

var nodemailer = require('nodemailer');
//var mailconfig = require('./mailconfig');
var environment = process.env.NODE_ENV;

var mailCenter = {
	sendEmail:sendEmail
}

function sendEmail(sendTo, sendFrom, subject, body, attch) {
	
	if(typeof process.env.NODE_ENV == 'undefined') { //undefined means development
		var AH_NUTS_SECRETS = require('./env.js');
		var MAIL_HOST = AH_NUTS_SECRETS.MAIL_HOST;
		var MAIL_PORT = AH_NUTS_SECRETS.MAIL_PORT;
		var MAIL_USER = AH_NUTS_SECRETS.MAIL_USER;
		var MAIL_PASSWORD = AH_NUTS_SECRETS.MAIL_PASSWORD;
		//var FIREBASE_DB = AH_NUTS_SECRETS.FIREBASE_DB;
	} else {							//this is production, pull from the env
		var MAIL_HOST = process.env.AH_NUTS_MAIL_HOST;
		var MAIL_PORT = process.env.AH_NUTS_MAIL_PORT;
		var MAIL_USER = process.env.AH_NUTS_MAIL_USER;
		var MAIL_PASSWORD = process.env.AH_NUTS_MAIL_PASSWORD;
	}

	console.log('environment', environment);
	console.log('process.env.MAIL_HOST', process.env.MAIL_HOST);
	console.log('process.env.MAIL_PORT', process.env.MAIL_PORT);
	console.log('process.env.MAIL_USER', process.env.MAIL_USER);
	console.log('process.env.MAIL_PASSWORD', process.env.MAIL_PASSWORD);

	
	//define the email settings
	var smtpConfig = {
		host: MAIL_HOST,
		port: MAIL_PORT,
		secure: true, // use SSL
		auth: {
			user: MAIL_USER,
			pass: MAIL_PASSWORD			
		}
	};

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpConfig);

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: sendFrom, // sender address
		to: 'ian@ah-nuts.com', // list of receivers
		subject: subject, // Subject line
		text: body//.plainText, // plaintext body
		//html: body.htmlText // html body
	};

	console.log(mailOptions, smtpConfig);

	if(typeof attch !== 'undefined') {
		mailOptions['attachments'] = [
			{
				filename: attch.name,
				content: attch.binary
			}
		]
	}

	//when mailing, return a response
	return new Promise(function(resolve, reject) {
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				reject(error);
			}
			resolve('Message sent: ' + info/*.response*/);
		});
	});

}

module.exports = mailCenter;