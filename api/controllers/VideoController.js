/**
 * VideoController
 *
 * @描述 : 影音專區
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //載入編輯器
    editor: function(req, res){
        /*if(req.session.authorized){*/           
            var action = {};
            var post = {};
            var menu = {};

            /*新增文章*/
            if(typeof req.param("id") === "undefined"){
                post.status = "new";

                action = CmsService.getAction(Video);
                menu = CmsService.getMenu(Video);

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

                CmsService.findOnePost(Video, criteria)
                .then(function(data){
                    if(!data){
                        return res.notFound();
                    }
                    else{
                        action = CmsService.getAction(Video);
                        menu = CmsService.getMenu(Video);

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
           var method = req.param("method");

            /*收到POST request*/
            if(method == "post"){
                var action = CmsService.getAction(Video);
                var url = action.load;

                var preview = {
                    method: "post",
                    url: url,
                    title: req.param("title"),
                    content: req.param("content")
                }

                return res.view("backend/pages/preview", {
                    preview: preview
                });
            }
            /*收到GET request*/
            else{
                var action = CmsService.getAction(Video);
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
            /*收到POST request*/
            if(typeof req.param("id") === "undefined"){
                var data = {
                    title: req.param("title"),
                    content: req.param("content")
                }
                return res.view("frontend/pages/video", {
                    videos: [data]
                });
            }
            /*收到GET request*/
            else{
                var criteria = {
                    id: req.param("id")
                }

                CmsService.findOnePost(Video, criteria)
                .then(function(data){
                    if(!data){
                        return res.notFound();
                    }
                    else{
                        return res.view("frontend/pages/video", {
                            videos: [data]
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
    //回傳前台顯示的內容
    show: function(req, res){
        var criteria = {   
            where: { status: "P" }, 
            sort: { order: "asc" }
        }

        CmsService.findPosts(Video, criteria)
        .then(function(datas){
            return res.view("frontend/pages/video", {
                videos: datas
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },
    //回傳後台顯示的文章列表
    list: function(req, res){
        /*if(req.session.authorized){*/
            var status = req.param("status");

            var modelArr = ["AboutITSeed", "AboutNTCA", "BusinessVisit", "CourseInfo", "CourseList", "FAQ", 
                            "MemberList", "News", "OverseaVisit", "Project", "RegFile", "RegInfo", "Sharing",
                            "Slider", "Timeline", "Video"];
            var counts = {};

            var now = new Date();

            /*先計算每個model裡的文章數*/
            async.each(modelArr, function(model, callback) {
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
                            createdAt: { '<=': now }
                        };

                        CmsService.countPost(sails.models[model.toLowerCase()], criteria)
                        .then(function(count){
                            callback(null, count);
                        })
                    },
                    scheduleNum: function(callback){
                        var criteria = {
                            status: "P",
                            createdAt: { '>': now }
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
            }, function(err) { 
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    if(status == "all"){
                        var criteria = {   
                            sort: { order: "asc" }
                        }
                    }
                    else if(status == "draft"){
                        var criteria = {   
                            where: { status: "D" }, 
                            sort: { order: "asc" }
                        }
                    }
                    else{
                        var criteria = {   
                            where: { status: "P" }, 
                            sort: { order: "asc" }
                        }
                    }
                    /*再撈正在編輯的model的文章列表*/
                    CmsService.findPosts(Video, criteria)
                    .then(function(datas){
                        for(var i = 0; i < datas.length; i++){
                            datas[i].formatTime = CmsService.formatTime(datas[i].createdAt);
                        }
                        return res.view("backend/pages/cms", {
                            articles: datas,
                            postType: "Video",
                            status: status,
                            action: CmsService.getAction(Video),
                            menu: CmsService.getMenu(Video),

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
            var values = {
                /*author: req.session.userid,*/
                title: req.param("title"),
                content: req.param("content"),
                status: req.param("status")
            }

            CmsService.createPost(Video, values)
            .then(function(data){
                data.message = "success";
                res.end(JSON.stringify(data));
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //更新
    update: function(req, res){
        /*if(req.session.authorized){*/
            var criteria = {
                id: req.param("id")
            }
            var values = {
                title: req.param("title"),
                content: req.param("content"),
                status: req.param("status")
            }

            CmsService.updatePost(Video, criteria, values)
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
    //發布
    publish: function(req, res){
        /*if(req.session.type == "admin"){*/
            var criteria = {
                id: req.param("id")
            }
            var values = {
                status: "P"
            }

            CmsService.updatePost(Video, criteria, values)
            .then(function(){
                res.end("success");
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });
        /*}
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/
    },
    //還原為草稿
    toDraft: function(req, res){
        /*if(req.session.type == "admin"){*/
            var criteria = {
                id: req.param("id")
            }
            var values = {
                status: "D"
            }

            CmsService.updatePost(Video, criteria, values)
            .then(function(){
                res.end("success");
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            });    
        /*}
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/
    },
    //刪除
    delete: function(req, res){
        /*if(req.session.type == "admin"){*/
            var criteria = {
                id: req.param("id")
            }

            CmsService.deletePost(Video, criteria)
            .then(function(){
                res.end("success");
            })
            .catch(function(err){
                res.end(JSON.stringify(err));
            }); 
        /*}
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/ 
    },
};

