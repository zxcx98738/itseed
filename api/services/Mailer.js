var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'b10402113@gmail.com',
    pass: 'tbfrkewinkpstfyl',
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


