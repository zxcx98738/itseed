/**
 * UserController
 *
 * @描述 : 註冊
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

module.exports = {    
    //註冊
    create: function(req, res){
        var md5 = require('MD5');

        var newuser = {
            email: req.body.email,
            pwd: md5(req.body.pwd),
            th: 13,
        };

        User.create(newuser)
        .exec(function(err, user) {
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                res.redirect("/profile");
            }
        });
    },
    //登入
    login: function (req, res) {
        var md5 = require('MD5');

        User.findOne({
            email: req.body.email
        })
        .exec(function(err, user) {
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                if(user == undefined){
                    return res.end("使用者不存在");
                }

                if(md5(req.body.pwd) != user.pwd){
                    return res.end("密碼錯誤");
                }

                req.session.userid = user.id;
                res.redirect("/profile");
            }
        });
    },
    //登出
    logout: function (req, res) {
        delete(req.session.userid);
        res.redirect("/");
    },
    //我的帳戶
    profile: function (req, res) {
        if(req.session.userid){
            User.findOne({
                id: req.session.userid
            })
            .exec(function(err, user) {
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    return res.view("frontend/pages/userProfile", {
                        user: user
                    });
                }
            });
        }
        else{
            return res.forbidden();
        }  
    },
};
