/**
 * UserController
 *
 * @描述 : 註冊
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

var md5 = require("MD5")
var fs = require("fs"); 

module.exports = {    
    //註冊
    create: function(req, res){
        var newuser = {
            email: req.body.email,
            pwd: md5(req.body.pwd),
            th: 13,
        };

        //新增使用者
        User.create(newuser)
        .exec(function(err, user) {
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                //新增DISC
                UserDISC.create({user: user.id})
                .exec(function(err, disc) {
                    if(err){
                        res.end(JSON.stringify(err));
                    }
                    else{
                        //新增報名資料
                        UserFiles.create({user: user.id})
                        .exec(function(err, files) {
                            if(err){
                                res.end(JSON.stringify(err));
                            }
                            else{
                                //完成
                                req.session.userid = user.id;
                                req.session.email = req.body.email;
                                req.session.pwd = req.body.pwd;
                                res.redirect("/profile");
                            }
                        });     
                    }
                });
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
                //註冊 or 修改信箱
                if(req.body.pwd == undefined){
                    if(user == undefined){
                        res.end("true");
                    }
                    else{
                        //修改信箱
                        if(req.session.email == req.body.email)
                            res.end("true");
                        else
                            res.end("false");
                    }   
                        
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
                req.session.email = req.body.email;
                req.session.pwd = req.body.pwd;
                res.redirect("/profile");
            }
        });
    },
    //登出
    logout: function (req, res) {
        delete(req.session.userid);
        delete(req.session.email);
        delete(req.session.pwd);
        res.redirect("/");
    },
    //大頭貼
    myPhoto: function (req, res) {
        if(req.session.userid){
            User.findOne({
                id: req.session.userid
            })
            .exec(function(err, user) {
                if(!err){
                    var filePath = "assets" + user.photo;
                    var stat = fs.statSync(filePath);

                    res.writeHead(200, {
                        "Content-Type": "application/exe",
                        "Content-Length": stat.size
                    });

                    var readStream = fs.createReadStream(filePath);
                    readStream.pipe(res);
                }
            });
        }
        else{
            var filePath = "assets/images/layout/logo.png";
            var stat = fs.statSync(filePath);

            res.writeHead(200, {
                "Content-Type": "application/exe",
                "Content-Length": stat.size
            });

            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    },
    //個人資料
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
    //編輯個人資料
    editProfile: function (req, res) {
        var value = {
            email: req.body.email,
            pwd: md5(req.body.pwd),
            phone: req.body.phone,
            name: req.body.name,
            gender: req.body.gender,
            school: req.body.school,
            grade: req.body.grade,
            reference: req.body.reference,
        };

        if (req.session.userid) {
            req.file("photo").upload({ dirname: sails.config.appPath+"/assets/files/"+req.session.userid}
            , function (err, uploadedFiles) {
                if (err) 
                    return res.end(JSON.stringify(err));
                //有上傳檔案
                if (uploadedFiles.length > 0) {
                    //圖片檔
                    if (uploadedFiles[0].type.substring(0, 5) == "image") {    
                        if (uploadedFiles[0].size > 2 * 1024 * 1024) {
                            return res.end("圖片大小須小於2MB");
                        }
                        var url = uploadedFiles[0].fd;
                        var start = url.search("files") - 1;
                        url = url.slice(start);
                        url = url.replace(/\\/g, "/");
                        value.photo = url;
                    }
                    //非圖片檔
                    else {
                        fs.unlink(uploadedFiles[0].fd, function (err) {  
                            if (err) 
                                console.error(err) 
                        });  
                        return res.end("檔案格式錯誤");
                    }      

                    //取得舊照片位址
                    User.findOne({
                        id: req.session.userid
                    })
                    .exec(function (err, user) {
                        if (err) {
                            res.end(JSON.stringify(err));
                        }
                        else {
                            var oldPhoto = user.photo;

                            User.update({id: user.id}, value)
                            .exec(function (err, datas) {
                                if (err) {
                                    //刪除上傳檔案
                                    fs.unlink(uploadedFiles[0].fd, function (err) {  
                                        if (err) 
                                            console.error(err) 
                                    });  
                                    
                                    res.end(JSON.stringify(err));
                                }
                                else {
                                    //刪除舊檔案
                                    if (oldPhoto != "/images/layout/logo.png") {
                                        var imagePath = sails.config.appPath + "/assets" + oldPhoto;

                                        fs.unlink(imagePath, function (err) {  
                                            if (err) 
                                                console.error(err) 
                                        });  
                                    }
                                    req.session.email = req.body.email;
                                    req.session.pwd = req.body.pwd;
                                    res.redirect("/profile");
                                }
                            });
                        }
                    });             
                }
                //沒上傳檔案
                else{
                    User.update({id: req.session.userid}, value)
                    .exec(function (err, datas) {
                        if (err) {
                            res.end(JSON.stringify(err));
                        }
                        else {
                            req.session.email = req.body.email;
                            req.session.pwd = req.body.pwd;
                            res.redirect("/profile");
                        }     
                    });
                }
            });
        }
        else{
            return res.forbidden();
        }  
    },
    //DISC
    disc: function (req, res) {
        if(req.session.userid){
            UserDISC.findOne({
                user: req.session.userid
            })
            .exec(function(err, disc) {
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    return res.view("frontend/pages/userDisc", {
                        disc: disc
                    });
                }
            });
        }
        else{
            return res.forbidden();
        }  
    },
    //編輯DISC
    editDisc: function (req, res) {
        var value = {};
        
        if(req.session.userid){
            for(var i = 1; i <= 26; i++){
                if(req.body["q" + i] == undefined)
                    return res.end("測驗未完成");
                value["q" + i] = req.body["q" + i];
            }

            UserDISC.update({user: req.session.userid}, value)
            .exec(function (err, datas) {
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    res.redirect("/disc");
                }
            });

        }
        else{
            return res.forbidden();
        }  
    },
    //上傳報名表
    uploadReg: function (req, res) {
        var value = {};

        if(req.session.userid){
            req.file("registration").upload({ dirname: sails.config.appPath+"/assets/files/"+req.session.userid}
            , function (err, uploadedFiles) {
                if (err) 
                    return res.end(JSON.stringify(err));
                //有上傳檔案
                if (uploadedFiles.length > 0) {
                    //PDF檔
                    if (uploadedFiles[0].type == "application/pdf") {    
                        if (uploadedFiles[0].size > 5 * 1024 * 1024) {
                            return res.end("檔案需小於5MB");
                        }
                        var url = uploadedFiles[0].fd;
                        var start = url.search("files") - 1;
                        url = url.slice(start);
                        url = url.replace(/\\/g, "/");
                        value.registration = url;
                        value.registrationUT = new Date();
                    }
                    //非PDF檔
                    else {
                        fs.unlink(uploadedFiles[0].fd, function (err) {  
                            if (err) 
                                console.error(err) 
                        });  
                        return res.end("檔案格式錯誤");
                    }      

                    //取得舊檔案位址
                    UserFiles.findOne({
                        user: req.session.userid
                    })
                    .exec(function (err, file) {
                        if (err)
                            res.end(JSON.stringify(err));
                        else {
                            var oldFile = file.registration;

                            UserFiles.update({id: file.id}, value)
                            .exec(function (err, datas) {
                                if (err) {
                                    //刪除上傳檔案
                                    fs.unlink(uploadedFiles[0].fd, function (err) {  
                                        if (err) 
                                            console.error(err) 
                                    });  
                                    res.end(JSON.stringify(err));
                                }
                                else {
                                    if(oldFile != null){
                                        //刪除舊檔案
                                        var filePath = sails.config.appPath + "/assets" + oldFile;

                                        fs.unlink(filePath, function (err) {  
                                            if (err) 
                                                console.error(err) 
                                        }); 
                                    }
                                    res.redirect("/files");
                                }
                            });
                        }
                    });                        
                }
                //沒上傳檔案
                else{
                    return res.end("未上傳檔案");
                }
            });
        }
        else{
            return res.forbidden();
        }  
    },
    //上傳自傳
    uploadAut: function (req, res) {
        if(req.session.userid){
            
        }
        else{
            return res.forbidden();
        }  
    },
    //上傳匯款證明
    uploadRec: function (req, res) {
        if(req.session.userid){
            
        }
        else{
            return res.forbidden();
        }  
    },
};
