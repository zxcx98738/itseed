/**
 * CmsController
 *
 * @描述 : 內容管理系統
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

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
                post.status = "new";

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
            var method = req.param("method");

            /*收到POST request*/
            if(method == "post"){
                var action = CmsService.getAction(model);
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
            if(typeof req.param("id") === "undefined"){
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
    //回傳前台顯示的內容
    show: function(req, res){
        var model = sails.models[req.param("model").toLowerCase()]; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P", createdAt: { '<=': now } }, 
            sort: { order: "asc" }
        }

        CmsService.findPosts(model, criteria)
        .then(function(datas){
            for(var i = 0; i < datas.length; i++){
                datas[i].formatTime = CmsService.formatTime(datas[i].createdAt);
            }
            return res.view(action.url, {
                datas: datas
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },
    //回傳後台顯示的文章列表
    list: function(req, res){
        /*if(req.session.authorized){*/
            var theModel = sails.models[req.param("model").toLowerCase()];   
            var status = req.param("status");
            var modelArr = ["aboutITSeed", "aboutNTCA", "businessVisit", "courseInfo", "courseList", "faq", 
                            "memberList", "news", "overseaVisit", "project", "regFile", "regInfo", "sharing",
                            "slider", "timeline", "video"]
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
                        var criteria = {   
                            sort: { order: "asc" }
                        };
                    }
                    else if(status == "draft"){
                        var criteria = {   
                            where: { status: "D" }, 
                            sort: { order: "asc" }
                        };
                    }
                    else if(status == "schedule"){
                        var criteria = {   
                            where: { status: "P", createdAt: { ">": now } }, 
                            sort: { order: "asc" }
                        };
                    }
                    else{
                        var criteria = {   
                            where: { status: "P", createdAt: { "<=": now } }, 
                            sort: { order: "asc" }
                        };
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

            //共通的attributes 
            var value = {
                /*author: req.session.userid,*/
                title: req.param("title"),
                content: req.param("content"),
                status: req.param("status")
            }
            //各自Model的attributes
            switch(model)
            {
                case Video:
                    break;
                default:
                    break;
            }

            CmsService.createPost(model, value)
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
            var model = sails.models[req.param("model").toLowerCase()]; 
            var criteria = {
                id: req.param("id")
            }

            //共通的attributes 
            var value = {
                title: req.param("title"),
                content: req.param("content"),
                status: req.param("status")
            }
            //各自Model的attributes
            switch(model)
            {
                case Video:
                    break;
                default:
                    break;
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

            CmsService.deletePost(model, criteria)
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

