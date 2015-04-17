/**
 * VideoController
 *
 * @描述 : 影音專區
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	//前台顯示
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
    //預覽畫面
    preview: function(req, res){
        /*if(req.session.type == "admin"){*/
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
                        res.end("此文章不存在");
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
            return res.view("redirect", {
                message: "使用者權限不足",
                url: "/"
            });
        }*/
    },
    //後台清單
    list: function(req, res){
        /*if(req.session.type == "admin"){*/
            var status = req.param("status");

            async.series({
                total: function(callback){
                    var criteria = {};
                    
                    CmsService.countPost(Video, criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
                draftNum: function(callback){
                    var criteria = {
                        status: "D"
                    };

                    CmsService.countPost(Video, criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
                publishNum: function(callback){
                    var criteria = {
                        status: "P"
                    };
                    
                    CmsService.countPost(Video, criteria)
                    .then(function(count){
                        callback(null, count);
                    })
                },
            },
            function(err, results){
                if(err){
                    res.end(JSON.stringify(err));
                }
                else {
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
                    CmsService.findPosts(Video, criteria)
                    .then(function(datas){
                        for(var i = 0; i < datas.length; i++){
                            datas[i].createdAt = CmsService.formatTime(datas[i].createdAt);
                        }
                        return res.view("backend/pages/cms", {
                            articles: datas,
                            postType: "video",
                            status: "all",
                            total: results.total,
                            draftNum: results.draftNum,
                            publishNum: results.publishNum,
                            scheduleNum: 0
                        });
                    })
                    .catch(function(err){
                        res.end(JSON.stringify(err));
                    });
                }
            });
        /*}
        else{
            return res.view("redirect", {
                message: "使用者權限不足",
                url: "/"
            });
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

