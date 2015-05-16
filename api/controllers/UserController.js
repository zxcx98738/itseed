/**
 * VideoController
 *
 * @描述 : 註冊
            
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

module.exports = {    
	
    //會員註冊
    newUser: function(req, res){
        
        var md5 = require('MD5');

        var newuser = {
            account: req.body.account,
            pwd: md5(req.body.pwd),
            userName: req.body.userName,
            //性別暫用txt接
            gender: req.body.gender,
            //少大頭貼
            photo:'1234.jpg',
            email: req.body.email,
            reference: req.body.reference,
            school: req.body.school,
            grade: req.body.grade,
            phone: req.body.phone,
            cellphone: req.body.cellphone,
            th:13,
            type:'U'
        };

        User.create({},function (err,newuser) {

            expect(err.Errors.email).to.exist;
            //expect(err.Errors.email[0].message).to.equal(User.validationMessages.email.email);
            expect(err.Errors.email[0].message).to.equal(User.validationMessages.email.required);
            res.end(JSON.stringify(err.Errors));
            
          //if(err) {
          //  res.end(JSON.stringify(err));
          //}

        });
    },
};
