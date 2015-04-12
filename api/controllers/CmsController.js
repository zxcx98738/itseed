/**
 * CmsController
 *
 * @描述 : CMS的主controller
 * @文件 : See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //預覽畫面
    preview: function(req, res){
        /*if(req.session.type == "admin"){*/
            var url = req.param("url");

            return res.view("backend/pages/preview", {
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

};