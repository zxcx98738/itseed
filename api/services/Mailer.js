module.exports.sendWelcomeMail = function(obj) {
	 sails.hooks.email.send(
	  "testEmail",
	  {
	    recipientName: "Joe",
	    senderName: "Sue",
	    mailmd5: obj.mailmd5,
	    email: obj.email
	  },
	  {
	    to: obj.email, 
	    // "woji4zs@gmail.com",
	    subject: "第十六屆資訊種子註冊報名驗證信" 
	  },
	  function(err) {console.log(err|| "mailed to : ", obj.email );}
	)
}