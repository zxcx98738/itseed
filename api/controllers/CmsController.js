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
            if(typeof req.param("postType") === "undefined")
                return res.notfound();
            
            var action = {};
            var post = {status: "new"};
            var menu = {};
            var postType = req.param("postType");          

            /*根據文章類型註冊事件跟能調整的項目*/
            switch(postType)
            {
                case "video":
                    action.create = "/cms/createVideo";
                    action.update = "/cms/updateVideo";
                    action.toDraft = "/cms/toDraftVideo";
                    action.publish = "/cms/publishVideo";
                    action.preview = "/cms/previewVideo";

                    menu.datePicker = "off";
                    menu.tag = "off";
                    break;
                default:
                    break;
            }
            return res.view("backend/pages/editor", {
                action: action,
                post: post,
                menu: menu
            });
        /*}
        else{
            return res.forbidden();
        }*/
    },
    //編輯文章
    editPost: function(req, res){
        /*if(req.session.authorized){*/
            if(typeof req.param("postType") === "undefined")
                return res.notfound();
            
            var module;
            var action = {};
            var menu = {};
            var postType = req.param("postType");   

            switch(postType)
            {
                case "video":
                    module = Video;
                    break;
                default:
                    return res.notfound();
            }
            
            module.findOne({
                id: req.param("id")
            })
            .exec(function(err, post){
                if(err)
                    res.end(JSON.stringify(err));
                else{
                    /*根據文章類型註冊事件跟能調整的項目*/
                    switch(postType)
                    {
                        case "video":
                            action.create = "/cms/createVideo";
                            action.update = "/cms/updateVideo";
                            action.toDraft = "/cms/toDraftVideo";
                            action.publish = "/cms/publishVideo";
                            action.preview = "/cms/previewVideo";

                            menu.datePicker = "off";
                            menu.tag = "off";
                            break;
                        default:
                            break;
                    }
                    return res.view("backend/pages/editor", {
                        action: action,
                        post: post,
                        menu: menu
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