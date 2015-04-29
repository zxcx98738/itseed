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
    getAction: function(model){
        var action = {};

        switch(model)
        {
            case Video:
                action.new = "/cms/new/video"
                action.edit = "/cms/edit/video"

                action.view = "/video#"
                action.preview = "/cms/preview/video";
                action.load = "/cms/load/video";
                action.url = "frontend/pages/video";
                
                action.create = "/cms/create/video";
                action.update = "/cms/update/video";
                action.toDraft = "/cms/toDraft/video";
                action.publish = "/cms/publish/video";
                action.delete = "/cms/delete/video";
                action.sort = "/cms/sort/video";           
                break;
            default:
            //TODO: 防呆
                action.sort = "disabled";
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
            //TODO: 防呆
                break;
        }
        return menu;
    },


/*其他函式*/
    formatTime: function(milliseconds){
        var time = new Date(milliseconds);

        var year = time.getFullYear();
        var month = time.getMonth();
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();

        //補零
        if(hour%12 < 10){
            hour = "0" + hour;
        }
        if(minute < 10){
            minute = "0" + minute;
        }
            
        //標準格式化
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
