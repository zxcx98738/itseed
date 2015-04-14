/**
 * CmsController
 *
 * @描述 : CMS的主controller
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //新增文章
    newPost: function(req, res){
        /*if(req.session.authorized){*/
            if(typeof req.param("postType") === "undefined"){
                return res.notfound();
            }
            var postType = req.param("postType");

            var post = {
                status: "new"
            };
            var action = {};

            switch(postType)
            {
                case "video":
                    action.create = "/cms/createVideo";
                    action.update = "/cms/updateVideo";
                    action.toDraft = "/cms/toDraftVideo";
                    action.publish = "/cms/publishVideo";
                    action.preview = "/cms/previewVideo";

                    break;
                default:
                    break;
            }
            return res.view("backend/pages/editor", {
                action: action,
                post: post
            });
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //編輯文章
    editPost: function(req, res){
        /*if(req.session.authorized){*/
            if(typeof req.param("postType") === "undefined"){
                return res.notfound();
            }
            var postType = req.param("postType");

            Video.findOne({
                id: req.param("id")
            })
            .exec(function(err, post){
                if(err)
                    res.end(JSON.stringify(err));
                else{
                    var action = {};
                    switch(postType)
                    {
                        case "video":
                            action.create = "/cms/createVideo";
                            action.update = "/cms/updateVideo";
                            action.toDraft = "/cms/toDraftVideo";
                            action.publish = "/cms/publishVideo";
                            action.preview = "/cms/previewVideo";
                            break;
                        default:
                            break;
                    }
                    return res.view("backend/pages/editor", {
                        action: action,
                        post: post
                    });
                }
            });
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
                var preview = {
                    method: "post",
                    url: req.param("url"),
                    title: req.param("title"),
                    content: req.param("content")
                }

                return res.view("backend/pages/preview", {
                    preview: preview
                });
            }
            /*收到GET request*/
            else{
                var preview = {
                    method: "get",
                    url: req.param("url"),
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

};