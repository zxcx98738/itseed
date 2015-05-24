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
                req.session.userid = user.id;
                req.session.pwd = req.body.pwd;
                res.redirect("/profile");
            }
        });
    },
    //檢查信箱是否已存在
    checkEmail: function (req, res) {
        User.findOne({
            email: req.body.email
        })
        .exec(function(err, user) {
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                //註冊
                if(req.body.pwd == undefined){
                    if(user == undefined){
                        res.end("true");
                    }
                    else
                        res.end("false");
                }
                //登入
                else{
                    if(user == undefined){
                        res.end("false");
                    }
                    else
                        res.end("true");
                }
            }
        });
    },
    //檢查密碼是否正確
    checkPwd: function (req, res) {
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
                    res.end("false");
                }
                else{
                    if(md5(req.body.pwd) != user.pwd){
                        res.end("false");
                    }
                    else
                        res.end("true");
                }
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
                req.session.pwd = req.body.pwd;
                res.redirect("/profile");
            }
        });
    },
    //登出
    logout: function (req, res) {
        delete(req.session.userid);
        delete(req.session.pwd);
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
