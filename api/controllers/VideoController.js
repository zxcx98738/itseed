/**
 * VideoController
 *
 * @描述 : 影音專區
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	//前台顯示
	show: function(req, res){
		Video.find()
		.where({ status: "P" })
		.sort({ order: "asc" })
		.exec(function(err, videos){
			if(err)
				res.end(JSON.stringify(err));
			else{
				if(videos.length == 0){
					res.end("還沒有影片啦");
				}
				else{
					return res.view("frontend/pages/video", {
						videos: videos
					});
				}
			}
		});
    },
    //後台清單
    list: function(req, res){
        /*if(req.session.type == "admin"){*/
            var status = req.param('status');

            async.series({
                total: function(callback){
                    Video.count()
                    .exec(function(err, count){
                        callback(null, count);
                    });
                },
                draftNum: function(callback){
                    Video.count({
                        status: "D"
                    }).exec(function(err, count){
                        callback(null, count);
                    });
                },
                publishNum: function(callback){
                    Video.count({
                        status: "P"
                    }).exec(function(err, count){
                        callback(null, count);
                    });
                },
            },
            function(err, results){
                if(err){
                    res.end(JSON.stringify(err));
                }
                else {
                    if(status == "all"){
                        Video.find()
                        .sort({ order: "asc" })
                        .exec(function(err, videos){
                            if(err)
                                res.end(JSON.stringify(err));
                            else{
                                for(var i = 0; i < videos.length; i++){
                                    videos[i].createdAt = formatTime(videos[i].createdAt);
                                };
                                return res.view("backend/pages/cms", {
                                    articles: videos,
                                    editing: "video",
                                    status: "all",
                                    total: results.total,
                                    draftNum: results.draftNum,
                                    publishNum: results.publishNum,
                                    scheduleNum: 0
                                });
                            }
                        });
                    }
                    else if(status == "draft"){
                        Video.find()
                        .where({ status: "D" })
                        .sort({ order: "asc" })
                        .exec(function(err, videos){
                            if(err)
                                res.end(JSON.stringify(err));
                            else{
                                if(videos.length == 0){
                                    res.end("還沒有影片啦");
                                }
                                else{
                                    return res.view("backend/pages/cms", {
                                        articles: videos,
                                        editing: "video",
                                        status: "draft",
                                        total: results.total,
                                        draftNum: results.draftNum,
                                        publishNum: results.publishNum,
                                        scheduleNum: 0
                                    });
                                }
                            }
                        });
                    }
                    else {
                        Video.find()
                        .where({ status: "P" })
                        .sort({ order: "asc" })
                        .exec(function(err, videos){
                            if(err)
                                res.end(JSON.stringify(err));
                            else{
                                if(videos.length == 0){
                                    res.end("還沒有影片啦");
                                }
                                else{
                                    return res.view("backend/pages/cms", {
                                        articles: videos,
                                        editing: "video",
                                        status: "publish",
                                        total: results.total,
                                        draftNum: results.draftNum,
                                        publishNum: results.publishNum,
                                        scheduleNum: 0
                                    });
                                }
                            }
                        });
                    }
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
    //新增文章
    create: function(req, res){
    	if(req.session.type == "admin"){
            var newVideo = {
                /*author: req.session.userid,*/
                title: req.body.title,
                content: req.body.content,
                status: req.status
            }
            Video.create(newVideo)
            .exec(function(err, data){
                if(err){
                    res.end(JSON.stringify(err));
                }
                else{
                    return res.redirect("back");  
                } 
            });
    	}
    	else{
/*    		return res.view("redirect", {
    			message: "請先登入",
    			url: "/forum?id="+req.body.fid
    		});*/
    	}
    },
    //編輯
    update: function(req, res){
    },
    //發布
    publish: function(req, res){
/*        if(req.session.type == "admin"){*/
            var id = req.param('id');

            Video.update({
                id: id
            }, {
                status: "P"
            })
            .exec(function(err){
                if(err)
                    res.end(JSON.stringify(err));
                else  
                    res.end("success");
            });     
/*        }
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/
    },
    //還原為草稿
    toDraft: function(req, res){
/*        if(req.session.type == "admin"){*/
            var id = req.param('id');

            Video.update({
                id: id
            }, {
                status: "D"
            })
            .exec(function(err){
                if(err)
                    res.end(JSON.stringify(err));
                else  
                    res.end("success");
            });     
/*        }
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/
    },
    //刪除
    delete: function(req, res){
/*        if(req.session.type == "admin"){*/
            var id = req.param('id');

            Video.destroy({
                id: id
            })
            .exec(function(err){
                if(err)
                    res.end(JSON.stringify(err));
                else  
                    res.end("success");
            });
/*        }
        else{
            return res.view("redirect", {
                message: "請先登入",
                url: "/forum?id="+req.body.fid
            });
        }*/ 
    },
};

function formatTime(time)
{
    var year = time.getFullYear();
    var month = time.getMonth();
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    if(hour == 0){
        return year + "/" + (month + 1) + "/" + date + " 上午 " + "12" + ":" + minute;
    }
    else if(hour < 12){
        return year + "/" + (month + 1) + "/" + date + " 上午 " + hour + ":" + minute;
    }
    else if(hour == 12){
        return year + "/" + (month + 1) + "/" + date + " 下午 " + "12" + ":" + minute;
    }
    else{
        return year + "/" + (month + 1) + "/" + date + " 下午 " + (hour - 12) + ":" + minute;
    }      
}


/*Video.findOne({
	id: "1"
})
.exec(function(err, videos){
	if(err)
		res.end("err");
	else{
		if(!videos){
			res.end("empty");
		}
		else{
			res.end("something");
		}
	}
});*/
