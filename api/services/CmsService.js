/**
 * CmsService
 *
 * @描述 : 內容管理系統服務
 */

module.exports = {
/*文章的新增, 讀取, 修改, 刪除*/
	createPost: function(module, values){
        return module.create(values);
    },

    findOnePost: function(module, criteria){
        return module.findOne(criteria);
    },

    findPosts: function(module, criteria){
        return module.find(criteria);
    },

    updatePost: function(module, criteria, values){
        return module.update(criteria, values);
    },

    deletePost: function(module, criteria){
        return module.destroy(criteria);
    },

    //計算數量
    countPost: function(module, criteria){
        return module.count(criteria);
    },

/*編輯器*/
    getAction: function(module){
        var action = {};

        switch(module)
        {
            case Video:
                action.new = "/cms/newVideo"
                action.edit = "/cms/editVideo"

                action.view = "/video#"
                action.preview = "/cms/previewVideo";
                action.load = "/cms/loadVideo";
                
                action.create = "/cms/createVideo";
                action.update = "/cms/updateVideo";
                action.toDraft = "/cms/toDraftVideo";
                action.publish = "/cms/publishVideo";
                action.delete = "/cms/deleteVideo";
                break;
            default:
                break;
        }
        return action;
    },

    getMenu: function(module){
        var menu = {};

        switch(module)
        {
            case Video:
                menu.datePicker = "off";
                menu.tag = "off";
                break;
            default:
                break;
        }
        return menu;
    },


/*其他函式*/
    formatTime: function(time){
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
    },

    
};
