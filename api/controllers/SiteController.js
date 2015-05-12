/**
 * SiteController
 *
 * @描述 : 前台顯示內容
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //公會簡介
    aboutNTCA: function(req, res){
        var model = AboutNTCA; 
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
    //計畫簡介
    aboutITSeed: function(req, res){
        var model = AboutITSeed; 
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
    //計畫簡介
    memberList: function(req, res){
        var model = MemberList; 
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
    //影音專區
    video: function(req, res){
        var model = Video; 
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
};

