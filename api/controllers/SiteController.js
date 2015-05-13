/**
 * SiteController
 *
 * @描述 : 前台顯示內容
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //最新消息
    newsList: function(req, res){
        var model = News; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P", createdAt: { '<=': now } }, 
            sort: { createdAt: "asc" }
        }

        CmsService.findPosts(model, criteria)
        .then(function(datas){
            for(var i = 0; i < datas.length; i++){
                datas[i].formatTime = CmsService.formatTime(datas[i].createdAt);
            }
            return res.view(action.list, {
                url: action.view,
                datas: datas
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },
    news: function(req, res){
        var model = News; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            id: req.param("id")
        }

        CmsService.findOnePost(model, criteria)
        .then(function(data){
            data.formatTime = CmsService.formatTime(data.createdAt);

            return res.view(action.url, {
                data: data
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },

    //公會簡介
    aboutNTCA: function(req, res){
        var model = AboutNTCA; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { createdAt: "asc" }
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

    //計畫簡介
    aboutITSeed: function(req, res){
        var model = AboutITSeed; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { createdAt: "asc" }
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

    //歷屆名單
    memberList: function(req, res){
        var model = MemberList; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //歷屆課程
    courseList: function(req, res){
        var model = CourseList; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //講座課程
    courseInfoList: function(req, res){
        var model = CourseInfo; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { order: "asc" }
        }

        CmsService.findPosts(model, criteria)
        .then(function(datas){
            for(var i = 0; i < datas.length; i++){
                datas[i].formatTime = CmsService.formatTime(datas[i].createdAt);
            }
            return res.view(action.list, {
                url: action.view,
                datas: datas
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },
    courseInfo: function(req, res){
        var model = CourseInfo; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            id: req.param("id")
        }

        CmsService.findOnePost(model, criteria)
        .then(function(data){
            data.formatTime = CmsService.formatTime(data.createdAt);

            return res.view(action.url, {
                data: data
            });
        })
        .catch(function(err){
            res.end(JSON.stringify(err));
        });
    },

    //專案實作
    project: function(req, res){
        var model = Project; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //海外參訪
    overseaVisit: function(req, res){
        var model = OverseaVisit; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //講師介紹
    instructor: function(req, res){
        var model = Instructor; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //報名資訊
    regInfo: function(req, res){
        var model = RegInfo; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { createdAt: "asc" }
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

    //書審資料
    regFile: function(req, res){
        var model = RegFile; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { createdAt: "asc" }
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

    //書審資料
    timeline: function(req, res){
        var model = Timeline; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
            sort: { createdAt: "asc" }
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

    //影音專區
    faq: function(req, res){
        var model = Faq; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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

    //影音專區
    video: function(req, res){
        var model = Video; 
        var action = CmsService.getAction(model);
        var now = new Date();
        var criteria = {   
            where: { status: "P" }, 
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
};

