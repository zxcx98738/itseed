/**
 * CmsController
 *
 * @描述 : 內容管理系統
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

var fs = require("fs"); 

module.exports = {
    //載入編輯器
    editor: function(req, res){
        /*if(req.session.authorized){*/   
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //預覽畫面
    preview: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //載入預覽內容
    load: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //回傳後台顯示的文章列表
    list: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //新增
    create: function(req, res){
    	/*if(req.session.authorized){*/
            var model = sails.models[req.param("model").toLowerCase()];
            var menu = CmsService.getMenu(model);

            //共通的attributes 
            var value = {
                /*author: req.session.userid,*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //更新
    update: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //發布
    publish: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //還原為草稿
    toDraft: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //刪除
    delete: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //排序
    sort: function(req, res){
        /*if(req.session.authorized){*/
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
        /*}
        else{
            return res.forbidden();
        }*/
    },
};

