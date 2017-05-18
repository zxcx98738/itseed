/**
 * UserController
 *
 * @描述 : 使用者相關
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

 var md5 = require("MD5")
 var fs = require("fs");

 module.exports = {
    //移除blueprint內建的actions
    _config: {
        actions: false,
        rest: false,
        shortcuts: false
    },

    /*前台*/

    //登入頁
    loginPage: function (req, res) {
        //判斷系統開放與否
        SystemSetting.findOne({
            name: "startDate"
        })
        .exec(function (err, parameter1) {
            if (err) {
                return res.end(JSON.stringify(err));
            }
            else {
                if (parameter1 == undefined)
                    startDate = "";
                else {
                    startDate = (new Date(parameter1.value)).getTime();
                }

                SystemSetting.findOne({
                    name: "endDate"
                })
                .exec(function (err, parameter2) {
                    if (err) {
                        return res.end(JSON.stringify(err));
                    }
                    else {
                        if (parameter2 == undefined)
                            endDate = "";
                        else {
                            endDate = (new Date(parameter2.value)).getTime();
                        }

                        //還沒設定
                        if (startDate == "" || endDate == "") {
                            return res.view("frontend/pages/login", {
                                system: "open"
                            });
                        }
                        else {
                            var now = (new Date()).getTime();

                            //系統開放
                            if (startDate < now && now < endDate){
                                return res.view("frontend/pages/login", {
                                    system: "open"
                                });
                            }
                            //系統關閉
                            else {
                                return res.view("frontend/pages/login", {
                                    system: "close"
                                });
                            }
                        }
                    }
                });
            }
        });
    },
    //註冊
    register: function(req, res){
        //TODO: 系統開關

        var newuser = {
            email: req.body.email,
            pwd: md5(req.body.pwd),
        };

        SystemSetting.findOne({
            name: "th"
        })
        .exec(function (err, parameter) {
            if(err){
                return res.end(JSON.stringify(err));
            }
            else{
                if(parameter != undefined){
                    newuser.th = parameter.value;
                }
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
                                        //連結table
                                        User.update({
                                            id: user.id
                                        },{
                                            disc: disc.id,
                                            files: files.id
                                        })
                                        .exec(function(err, data) {
                                            if(err){
                                                res.end(JSON.stringify(err));
                                            }
                                            else{
                                                //完成
                                                req.session.userid = user.id;
                                                req.session.email = req.body.email;
                                                req.session.pwd = req.body.pwd;
                                                req.session.type =  user.type;
                                                req.session.authorized = {
                                                    cms: false,
                                                    systemSetting: false,
                                                };

                                                res.redirect("/profile");
                                            }
                                        });
                                    }
                                });     
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
                req.session.email = user.email;
                req.session.pwd = req.body.pwd;
                req.session.type =  user.type;
                
                if (user.type == "A") {
                    req.session.authorized = {
                        cms: true,
                        systemSetting: true,
                    };
                }
                else {
                    req.session.authorized = {
                        cms: false,
                        systemSetting: false,
                    };
                }

                res.redirect("/profile");
            }
        });
    },
    //登出
    logout: function (req, res) {
        delete(req.session.userid);
        delete(req.session.email);
        delete(req.session.pwd);
        delete(req.session.type);
        delete(req.session.authorized);
        res.redirect("/");
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
        if(req.session.type == "A")
            value.th = req.body.th;

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
            var a =[ 0 , 0 , 0 , 0];
            for(var i = 1; i <= 20; i++){
                for (var j = 1; j <5 ; j++){ //計算動物
                    if(req.body["q" + i] == j)
                        a[i-1] += 1;
                }
                var animal = ['老虎','孔雀','無尾熊','貓頭鷹'];
                value["animal"] = animal[a.indexOf(Math.max(a[0],a[1],a[2],a[3]))] ; //算動物最大值
                
                if(req.body["q" + i] == undefined)
                    return res.end("測驗未完成");
                value["q" + i] = req.body["q" + i];
            }
            value["finished"] = "已完成"; //未用到
            // window.alert('填寫完成');

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
    //報名資料
    files: function (req, res) {
        if (req.session.userid) {
            UserFiles.findOne({
                user: req.session.userid
            })
            .exec(function (err, files) {
                if (err) {
                    res.end(JSON.stringify(err));
                }
                else {
                    if (files.registrationUT != null)
                        files.registrationUT = CmsService.formatTime(files.registrationUT);
                    if (files.autobiographyUT != null)
                        files.autobiographyUT = CmsService.formatTime(files.autobiographyUT);
                    if (files.receiptUT != null)
                        files.receiptUT = CmsService.formatTime(files.receiptUT);

                    var startDate, endDate;

                    //判斷系統開放與否
                    SystemSetting.findOne({
                        name: "startDate"
                    })
                    .exec(function (err, parameter1) {
                        if (err) {
                            return res.end(JSON.stringify(err));
                        }
                        else {
                            if (parameter1 == undefined)
                                startDate = "";
                            else {
                                startDate = (new Date(parameter1.value)).getTime();
                            }

                            SystemSetting.findOne({
                                name: "endDate"
                            })
                            .exec(function (err, parameter2) {
                                if (err) {
                                    return res.end(JSON.stringify(err));
                                }
                                else {
                                    if (parameter2 == undefined)
                                        endDate = "";
                                    else {
                                        endDate = (new Date(parameter2.value)).getTime();
                                    }

                                    //還沒設定
                                    if (startDate == "" || endDate == "") {
                                        return res.view("frontend/pages/userFiles", {
                                            system: "open",
                                            files: files
                                        });
                                    }
                                    else {
                                        var now = (new Date()).getTime();

                                        //系統開放
                                        if (startDate < now && now < endDate){
                                            return res.view("frontend/pages/userFiles", {
                                                system: "open",
                                                files: files
                                            });
                                        }
                                        //系統關閉
                                        else {
                                            return res.view("frontend/pages/userFiles", {
                                                system: "close",
                                                files: files
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    });
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

        //TODO: 系統開關
        if(req.session.userid){
            var uploadOptions = {
                dirname: sails.config.appPath+"/assets/files/"+req.session.userid,
                saveAs: function (__newFileStream, cb) {
                    var i = 0;
                    var uploadFile = req.file("registration")._files[0].stream.filename;
                    var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                    var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";
                    
                    //檔名重複時重新命名舊檔案
                    if (fs.existsSync(newPath)) {
                        fs.renameSync(newPath, tmpPath)
                    }
                    cb(null, __newFileStream.filename);
                },
            }

            req.file("registration").upload(uploadOptions, function (err, uploadedFiles) {
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
                                var uploadFile = req.file("registration")._files[0].stream.filename;
                                var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                                var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";

                                if (err) {
                                    //刪除上傳檔案
                                    fs.unlink(uploadedFiles[0].fd, function (err) {  
                                        if (err) 
                                            console.error(err) 
                                    });  

                                    //還原舊檔案
                                    if (fs.existsSync(tmpPath)) {
                                        fs.renameSync(tmpPath, newPath)
                                    }
                                    res.end(JSON.stringify(err));
                                }
                                else {
                                    if(oldFile != null){                     
                                        var filePath = sails.config.appPath + "/assets" + oldFile;

                                        //刪除舊檔案
                                        if (fs.existsSync(tmpPath)) {
                                            fs.unlink(tmpPath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
                                        else {
                                            fs.unlink(filePath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
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
        var value = {};

        //TODO: 系統開關
        if(req.session.userid){
            var uploadOptions = {
                dirname: sails.config.appPath+"/assets/files/"+req.session.userid,
                saveAs: function (__newFileStream, cb) {
                    var i = 0;
                    var uploadFile = req.file("autobiography")._files[0].stream.filename;
                    var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                    var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";
                    
                    //檔名重複時重新命名舊檔案
                    if (fs.existsSync(newPath)) {
                        fs.renameSync(newPath, tmpPath)
                    }
                    cb(null, __newFileStream.filename);
                },
            }

            req.file("autobiography").upload(uploadOptions, function (err, uploadedFiles) {
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
                        value.autobiography = url;
                        value.autobiographyUT = new Date();
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
                            var oldFile = file.autobiography;

                            UserFiles.update({id: file.id}, value)
                            .exec(function (err, datas) {
                                var uploadFile = req.file("autobiography")._files[0].stream.filename;
                                var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                                var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";

                                if (err) {
                                    //刪除上傳檔案
                                    fs.unlink(uploadedFiles[0].fd, function (err) {  
                                        if (err) 
                                            console.error(err) 
                                    });  
                                    
                                    //還原舊檔案
                                    if (fs.existsSync(tmpPath)) {
                                        fs.renameSync(tmpPath, newPath)
                                    }
                                    res.end(JSON.stringify(err));
                                }
                                else {
                                    if(oldFile != null){                     
                                        var filePath = sails.config.appPath + "/assets" + oldFile;

                                        //刪除舊檔案
                                        if (fs.existsSync(tmpPath)) {
                                            fs.unlink(tmpPath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
                                        else {
                                            fs.unlink(filePath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
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
    //上傳匯款證明
    uploadRec: function (req, res) {
        var value = {};

        //TODO: 系統開關
        if(req.session.userid){
            var uploadOptions = {
                dirname: sails.config.appPath+"/assets/files/"+req.session.userid,
                saveAs: function (__newFileStream, cb) {
                    var i = 0;
                    var uploadFile = req.file("receipt")._files[0].stream.filename;
                    var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                    var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";
                    
                    //檔名重複時重新命名舊檔案
                    if (fs.existsSync(newPath)) {
                        fs.renameSync(newPath, tmpPath)
                    }
                    cb(null, __newFileStream.filename);
                },
            }

            req.file("receipt").upload(uploadOptions, function (err, uploadedFiles) {
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
                        value.receipt = url;
                        value.receiptUT = new Date();
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
                            var oldFile = file.receipt;

                            UserFiles.update({id: file.id}, value)
                            .exec(function (err, datas) {
                                var uploadFile = req.file("receipt")._files[0].stream.filename;
                                var newPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/"+uploadFile;
                                var tmpPath = sails.config.appPath+"/assets/files/"+req.session.userid+"/tmp.pdf";
                                
                                if (err) {
                                    //刪除上傳檔案
                                    fs.unlink(uploadedFiles[0].fd, function (err) {  
                                        if (err) 
                                            console.error(err) 
                                    });  
                                    
                                    //還原舊檔案
                                    if (fs.existsSync(tmpPath)) {
                                        fs.renameSync(tmpPath, newPath)
                                    }
                                    res.end(JSON.stringify(err));
                                }
                                else {
                                    if(oldFile != null){                     
                                        var filePath = sails.config.appPath + "/assets" + oldFile;

                                        //刪除舊檔案
                                        if (fs.existsSync(tmpPath)) {
                                            fs.unlink(tmpPath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
                                        else {
                                            fs.unlink(filePath, function (err) {  
                                                if (err) 
                                                    console.error(err) 
                                            }); 
                                        }
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

    /*後台*/

    //報名者資料
    applicants: function (req, res) {
        if (req.session.userid) {
            var th;

            SystemSetting.findOne({
                name: 'th'
            })
            .exec(function (err, parameter1) {
                if (err) {
                    return res.end(JSON.stringify(err));
                }
                else {
                    if (parameter1 == undefined)
                        th = '';
                    else
                        th = parameter1.value;
                }
                User.find({
                    th: th,
                    type: 'U'
                })
                .populate('files')
                .populate('disc')
                .exec(function (err, users) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        for (var i = 0; i < users.length; i++) {
                            if (users[i].files.registrationUT != null)
                                users[i].files.registrationUT = CmsService.formatTime(users[i].files.registrationUT);
                            if (users[i].files.autobiographyUT != null)
                                users[i].files.autobiographyUT = CmsService.formatTime(users[i].files.autobiographyUT);
                            if (users[i].files.receiptUT != null)
                                users[i].files.receiptUT = CmsService.formatTime(users[i].files.receiptUT);
                            if (users[i].disc != null){
                                users[i].disc.q1 = users[i].disc.animal;
                            }
                            // users[i].disc.q1 = CmsService.formatTime(users[i].disc.q1);

                        }
                        return res.view("backend/pages/applicants", {
                            users: users

                        });
                    }
                });
            });
        }
        else{
            return res.forbidden();
        }  
    },
};
