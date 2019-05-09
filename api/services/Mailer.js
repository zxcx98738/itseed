var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itseed17th@gmail.com',
    pass: 'weareitseed17'
  },
});
module.exports.sendWelcomeMail = function(mail) {
	transporter.sendMail(mail, function(error, info){
		if(error) {
				return console.log(error);
		}
		console.log('mail sent:', info.response);
	});
}


