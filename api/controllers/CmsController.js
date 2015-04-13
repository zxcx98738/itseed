/**
 * CmsController
 *
 * @描述 : CMS的主controller
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //新增文章
    newPost: function(req, res){
        /*if(req.session.type == "admin"){*/
            var url = req.param("url");

            return res.view("backend/pages/editor", {
                url: url
            });
        /*}
        else{
            return res.view("redirect", {
                message: "使用者權限不足",
                url: "/"
            });
        }*/
    },
    //預覽畫面
    preview: function(req, res){
        /*if(req.session.type == "admin"){*/
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
            return res.view("redirect", {
                message: "使用者權限不足",
                url: "/"
            });
        }*/
    },

};