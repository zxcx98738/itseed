/**
 * CmsController
 *
 * @描述 : 內容管理系統
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

var fs = require("fs");
var md5 = require("MD5")

module.exports = {
    //移除blueprint內建的actions
    _config: {
        actions: false,
        rest: false,
        shortcuts: false
    },
    //載入編輯器
    editor: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var action = {};
        var post = {};
        var menu = {};

        /*新增文章*/
        if(typeof req.param("id") === "undefined"){
            //共通的attributes
            post.status = "new";
            post.createdAt = "";

            //各自Model的attributes
            switch(model)
            {
                case CourseInfo:
                    post.th = "";
                    post.speaker = "";
                    post.speakerTitle = "";
                    post.photo = "";
                    break;
                case BusinessVisit:
                    post.th = "";
                    post.photo = "";
                    break;
                case Career:
                    post.th = "";
                    post.name = "";
                    post.photo = "";
                    break;
                case Project:
                    post.th = "";
                    break;
                case OverseaVisit:
                    post.th = "";
                    break;
                case Sharing:
                    post.th = "";
                    post.name = "";
                    post.photo = "";
                    break;
                default:
                    break;
            }

            action = CmsService.getAction(model);
            menu = CmsService.getMenu(model);

            return res.view("backend/pages/editor", {
                action: action,
                post: post,
                menu: menu
            });
        }
        /*編輯文章*/
        else{
            var criteria = {
                id: req.param("id")
            }

            CmsService.findOnePost(model, criteria)
            .then(function(data){
                if(!data){
                    return res.notFound();
                }
                else{
                    data.formatTime = CmsService.formatTime(data.createdAt);
                    action = CmsService.getAction(model);
                    menu = CmsService.getMenu(model);

                    return res.view("backend/pages/editor", {
                        action: action,
                        post: data,
                        menu: menu
                    });
                }
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });
        }
    },
    //預覽畫面
    preview: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];

        /*收到POST request*/
        if(req.method === 'POST'){
            var action = CmsService.getAction(model);
            var url = action.load;

            var preview = {
                method: "post",
                url: url,
                title: req.param("title"),
                content: req.param("content"),
            }

            return res.view("backend/pages/preview", {
                preview: preview
            });
        }
        /*收到GET request*/
        else{
            var action = CmsService.getAction(model);
            var url = action.load + "?id=" + req.param("id");

            var preview = {
                method: "get",
                url: url,
            }

            return res.view("backend/pages/preview", {
                preview: preview
            });
        }
    },
    //載入預覽內容
    load: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var action = CmsService.getAction(model);
        /*收到POST request*/
        if(req.method === 'POST'){
            var data = {
                title: req.param("title"),
                content: req.param("content")
            }
            return res.view(action.url, {
                datas: [data]
            });
        }
        /*收到GET request*/
        else{
            var criteria = {
                id: req.param("id")
            }

            CmsService.findOnePost(model, criteria)
            .then(function(data){
                if(!data){
                    return res.notFound();
                }
                else{
                    return res.view(action.url, {
                        datas: [data]
                    });
                }
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });
        }
    },
    //回傳後台顯示的文章列表
    list: function(req, res){
        var theModel = sails.models[req.param("model").toLowerCase()];
        var status = req.param("status");
        var modelArr = ["aboutITSeed", "aboutNTCA", "businessVisit", "courseInfo", "courseList", "faq", "instructor",
                        "memberList", "news", "overseaVisit", "project", "regFile", "regInfo", "sharing",
                        "timeline", "video"]
        var counts = {};
        var now = new Date();

        /*先計算每個model裡的文章數*/
        async.each(modelArr, function(model, callback){
            async.series({
                total: function(callback){
                    var criteria = {};

                    CmsService.countPost(sails.models[model.toLowerCase()], criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
                draftNum: function(callback){
                    var criteria = {
                        status: "D"
                    };

                    CmsService.countPost(sails.models[model.toLowerCase()], criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
                publishNum: function(callback){
                    var criteria = {
                        status: "P",
                        createdAt: { "<=": now }
                    };

                    CmsService.countPost(sails.models[model.toLowerCase()], criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
                scheduleNum: function(callback){
                    var criteria = {
                        status: "P",
                        createdAt: { ">": now }
                    };

                    CmsService.countPost(sails.models[model.toLowerCase()], criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
            },
            function(err, results){
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    counts[model] = {
                        total: results.total,
                        draftNum: results.draftNum,
                        publishNum: results.publishNum,
                        scheduleNum: results.scheduleNum
                    };
                    callback();
                }
            });
        }, function(err){
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                if(status == "all"){
                    if(typeof theModel.attributes.order !== "undefined"){
                        var criteria = {
                            sort: { order: "asc" }
                        };
                    }
                    else{
                        var criteria = {
                            sort: { createdAt: "asc" }
                        };
                    }

                }
                else if(status == "draft"){
                    if(typeof theModel.attributes.order !== "undefined"){
                        var criteria = {
                            where: { status: "D" },
                            sort: { order: "asc" }
                        };
                    }
                    else{
                        var criteria = {
                            where: { status: "D" },
                            sort: { createdAt: "asc" }
                        };
                    }
                }
                else if(status == "schedule"){
                    if(typeof theModel.attributes.order !== "undefined"){
                        var criteria = {
                            where: { status: "P", createdAt: { ">": now } },
                            sort: { order: "asc" }
                        };
                    }
                    else{
                        var criteria = {
                            where: { status: "P", createdAt: { ">": now } },
                            sort: { createdAt: "asc" }
                        };
                    }
                }
                else{
                    if(typeof theModel.attributes.order !== "undefined"){
                        var criteria = {
                            where: { status: "P", createdAt: { "<=": now } },
                            sort: { order: "asc" }
                        };
                    }
                    else{
                        var criteria = {
                            where: { status: "P", createdAt: { "<=": now } },
                            sort: { createdAt: "asc" }
                        };
                    }
                }

                /*再撈正在編輯的model的文章列表*/
                CmsService.findPosts(theModel, criteria)
                .populate('author')
                .then(function(datas){
                    //BUG: 回傳的createdAt是數字而非string
                    for(var i = 0; i < datas.length; i++){
                        datas[i].formatTime = CmsService.formatTime(datas[i].createdAt);
                    }

                    return res.view("backend/pages/cms", {
                        articles: datas,
                        postType: req.param("model"),
                        status: status,
                        action: CmsService.getAction(theModel),
                        menu: CmsService.getMenu(theModel),
                        postAmounts: counts,
                    });
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
    },
    //新增
    create: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var menu = CmsService.getMenu(model);

        //共通的attributes
        var value = {
            author: req.session.userid,
            title: req.param("title"),
            content: req.param("content"),
            status: req.param("status")
        }
        if(menu.datePicker == "on"){
            if(req.param("createdAt") != "auto" && typeof req.param("createdAt") !== "undefined")
                value.createdAt = req.param("createdAt");
        }
        //各自Model的attributes
        switch(model)
        {
            case CourseInfo:
                value.th = req.param("th");
                value.speaker = req.param("speaker");
                value.speakerTitle = req.param("speakerTitle");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/courseInfo'}, function (err, uploadedFiles) {
                    if (err)
                        return res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.createPost(model, value)
                    .then(function(data){
                        data.message = "success";
                        res.end(JSON.stringify(data));
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            case BusinessVisit:
                value.th = req.param("th");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/businessVisit'}, function (err, uploadedFiles) {
                    if (err)
                        return res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.createPost(model, value)
                    .then(function(data){
                        data.message = "success";
                        res.end(JSON.stringify(data));
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            case Project:
                value.th = req.param("th");
                break;
            case OverseaVisit:
                value.th = req.param("th");
                break;
            case Sharing:
                value.th = req.param("th");
                value.name = req.param("name");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/sharing'}, function (err, uploadedFiles) {
                    if (err)
                        return res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.createPost(model, value)
                    .then(function(data){
                        data.message = "success";
                        res.end(JSON.stringify(data));
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            case Career:
                value.th = req.param("th");
                value.name = req.param("name");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/career'}, function (err, uploadedFiles) {
                    if (err)
                        return res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.createPost(model, value)
                    .then(function(data){
                        data.message = "success";
                        res.end(JSON.stringify(data));
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            default:
                break;
        }
        switch(model)
        {
            case CourseInfo:
                break;
            case BusinessVisit:
                break;
            case Sharing:
                break;
            case Career:
                break;
            default:
                CmsService.createPost(model, value)
                .then(function(data){
                    data.message = "success";
                    res.end(JSON.stringify(data));
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
                break;
        }
    },
    //更新
    update: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var menu = CmsService.getMenu(model);
        var criteria = {
            id: req.param("id")
        }

        //共通的attributes
        var value = {
            title: req.param("title"),
            content: req.param("content"),
            status: req.param("status")
        }
        if(menu.datePicker == "on" && typeof req.param("createdAt") !== "undefined"){
            if(req.param("createdAt") == "auto"){
                value.createdAt = new Date();
            }
            else
                value.createdAt = req.param("createdAt");
        }
        //各自Model的attributes
        switch(model)
        {
            case CourseInfo:
                value.th = req.param("th");
                value.speaker = req.param("speaker");
                value.speakerTitle = req.param("speakerTitle");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/courseInfo'}, function (err, uploadedFiles) {
                    if (err)
                        res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.updatePost(model, criteria, value)
                    .then(function(){

                        //刪除原始檔案
                        if (uploadedFiles.length > 0 && req.param("oldPhoto") != '/images/courseInfo/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+req.param("oldPhoto");

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            case BusinessVisit:
                value.th = req.param("th");

                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/businessVisit'}, function (err, uploadedFiles) {
                    if (err)
                        res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.updatePost(model, criteria, value)
                    .then(function(){

                        //刪除原始檔案
                        if (uploadedFiles.length > 0 && req.param("oldPhoto") != '/images/businessVisit/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+req.param("oldPhoto");

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            case Project:
                value.th = req.param("th");
                break;
            case OverseaVisit:
                value.th = req.param("th");
                break;
            case Sharing:
                value.th = req.param("th");
                value.name = req.param("name");
                //上傳檔案
                req.file('photo').upload({ dirname: '../../assets/images/sharing'}, function (err, uploadedFiles) {
                    if (err)
                        res.end(JSON.stringify(err));
                    if (uploadedFiles.length > 0) {
                        //圖片檔
                        if(uploadedFiles[0].type.substring(0, 5) == "image"){
                            var url = uploadedFiles[0].fd;
                            var start = url.search("images") - 1;
                            url = url.slice(start);
                            url = url.replace(/\\/g, "/");
                            value.photo = url;
                        }
                        //非圖片檔
                        else{
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                            return res.end(JSON.stringify("檔案格式錯誤"));
                        }
                    }

                    CmsService.updatePost(model, criteria, value)
                    .then(function(){

                        //刪除原始檔案
                        if (uploadedFiles.length > 0 && req.param("oldPhoto") != '/images/sharing/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+req.param("oldPhoto");

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        //刪除上傳檔案
                        if (uploadedFiles.length > 0) {
                            fs.unlink(uploadedFiles[0].fd, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end(JSON.stringify(err));
                    });
                });
                break;
            default:
                break;
        }
        switch(model)
        {
            case CourseInfo:
                break;
            default:
                CmsService.updatePost(model, criteria, value)
                .then(function(){
                    res.end("success");
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
        }
    },
    //發布
    publish: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var criteria = {
            id: req.param("id")
        }
        var value = {
            status: "P"
        }

        CmsService.updatePost(model, criteria, value)
        .then(function(){
            res.end("success");
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
},
//還原為草稿
toDraft: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var criteria = {
            id: req.param("id")
        }
        var value = {
            status: "D"
        }

        CmsService.updatePost(model, criteria, value)
        .then(function(){
            res.end("success");
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },
    //刪除
    delete: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var criteria = {
            id: req.param("id")
        }

        //在刪除record前先取得要一起刪除的檔案位址
        switch(model)
        {
            case CourseInfo:
                CmsService.findOnePost(model, criteria)
                .then(function(data){
                    var photo = data.photo;

                    CmsService.deletePost(model, criteria)
                    .then(function(){
                        //刪除照片
                        if (data.photo != '/images/courseInfo/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+data.photo;

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        res.end(JSON.stringify(err));
                    });
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
                break;
            case BusinessVisit:
                CmsService.findOnePost(model, criteria)
                .then(function(data){
                    var photo = data.photo;

                    CmsService.deletePost(model, criteria)
                    .then(function(){
                        //刪除照片
                        if (data.photo != '/images/businessVisit/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+data.photo;

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        res.end(JSON.stringify(err));
                    });
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
                break;
            case Sharing:
                CmsService.findOnePost(model, criteria)
                .then(function(data){
                    var photo = data.photo;

                    CmsService.deletePost(model, criteria)
                    .then(function(){
                        //刪除照片
                        if (data.photo != '/images/sharing/default.png') {
                            var imagePath = sails.config.appPath+'/assets'+data.photo;

                            fs.unlink(imagePath, function (err) {
                                if (err)
                                    console.error(err)
                            });
                        }
                        res.end("success");
                    })
                    .catch(function(err){
                        res.end(JSON.stringify(err));
                    });
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
                break;
            default:
                break;
        }

        //刪除record
        switch(model)
        {
            case CourseInfo:
                break;
            case BusinessVisit:
                break;
            case Sharing:
                break;
            default:
                CmsService.deletePost(model, criteria)
                .then(function(){
                    res.end("success");
                })
                .catch(function(err){
                    res.end(JSON.stringify(err));
                });
        }
    },
    //排序
    sort: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()];
        var orders =  JSON.parse(req.param("orders"));

        async.each(orders, function(order, callback){
            var criteria = {
                id: order
            }
            var value = {
                order: orders.indexOf(order) + 1
            }

            CmsService.updatePost(model, criteria, value)
            .then(function(){
                callback();
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });
        }, function(err){
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                res.end("success");
            }
        });
    },
    //登入頁
    login: function (req, res) {
        User.findOne({
            email: req.body.email
        })
        .exec(function(err, user) {
            if(err){ res.end(JSON.stringify(err));}
            if (user == undefined || user.type != "A"){
                return res.forbidden("無權限觀看此頁");
            }
            if (md5(req.body.pwd) != user.pwd) {
                res.redirect("/backend");
            }
            req.session.userid = user.id;
            req.session.email = user.email;
            req.session.pwd = req.body.pwd;
            req.session.type =  user.type;
            req.session.authorized = {
                cms: true,
                systemSetting: true,
            };
            res.redirect("/backend");
        });
    },
    //個人資料
    profile: function (req, res) {
        console.log(req.session.userid);
        User.findOne({
            id: req.session.userid
        }).exec(function(err, user) {
            if(err){ res.end(JSON.stringify(err));}
            console.log(user);
            return res.view("backend/pages/profile", {
                user: user
            });
        });
    },
    //編輯個人資料
    editProfile: function (req, res) {
        var t = 0;
        var value = {
            pwd: md5(req.body.pwd),
            name: req.body.name,
            gender: req.body.gender,
        };
        User.update({ id: req.session.userid }, value).exec(function (err, datas) {
            req.session.email = req.body.email;
            req.session.pwd = req.body.pwd;
            res.redirect("/backend");
        });
    },
    //報名者資料
    applicants: function (req, res) {
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
                            // users[i].disc.q1 = users[i].disc.animal;
                        }
                        // users[i].disc.q1 = CmsService.formatTime(users[i].disc.q1);

                    }
                    return res.view("backend/pages/applicants", {
                        users: users
                    });
                }
            });
        });
    },
    //會員資料
    accounts: function (req, res) {
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
                            // users[i].disc.q1 = users[i].disc.animal;
                        }
                        // users[i].disc.q1 = CmsService.formatTime(users[i].disc.q1);

                    }
                    return res.view("backend/pages/accounts", {
                        users: users
                    });
                }
            });
        });
    },
    resetPass:function(req,res){
        var value = {
            pwd: md5('00000000'),
        };
        User.update({ email: req.body.email }, value).exec(function (err, datas) {
            if(err){
                console.error(err);
                res.status(500).end('fail');
            }
            res.status(200).end('success');
        });
    },
    setUserType: function (req, res) {
        // if (!['A','U','T'].includes(req.body.type)){
        //     res.end('fail:invaild data');
        // }
        var value = {
            type: req.body.type
        };
        User.update({ email: req.body.email }, value).exec(function (err, datas) {
            if (err) {
                console.error(err);
                res.status(500).send('fail');
            }
            res.status(200).send('success');
        });
    }
};
