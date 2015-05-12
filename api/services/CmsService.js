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
            case AboutNTCA:
                action.new = "/cms/new/aboutNTCA"
                action.edit = "/cms/edit/aboutNTCA"

                action.view = "/aboutNTCA#"
                action.preview = "/cms/preview/aboutNTCA";
                action.load = "/cms/load/aboutNTCA";
                action.url = "frontend/pages/aboutNTCA";
                
                action.create = "/cms/create/aboutNTCA";
                action.update = "/cms/update/aboutNTCA";
                action.toDraft = "/cms/toDraft/aboutNTCA";
                action.publish = "/cms/publish/aboutNTCA";
                action.delete = "/cms/delete/aboutNTCA";

                action.sort = "disabled";           
                break;

            case AboutITSeed:
                action.new = "/cms/new/aboutITSeed"
                action.edit = "/cms/edit/aboutITSeed"

                action.view = "/aboutITSeed#"
                action.preview = "/cms/preview/aboutITSeed";
                action.load = "/cms/load/aboutITSeed";
                action.url = "frontend/pages/aboutITSeed";
                
                action.create = "/cms/create/aboutITSeed";
                action.update = "/cms/update/aboutITSeed";
                action.toDraft = "/cms/toDraft/aboutITSeed";
                action.publish = "/cms/publish/aboutITSeed";
                action.delete = "/cms/delete/aboutITSeed";

                action.sort = "disabled";           
                break;

             case MemberList:
                action.new = "/cms/new/memberList"
                action.edit = "/cms/edit/memberList"

                action.view = "/memberList#"
                action.preview = "/cms/preview/memberList";
                action.load = "/cms/load/memberList";
                action.url = "frontend/pages/memberList";
                
                action.create = "/cms/create/memberList";
                action.update = "/cms/update/memberList";
                action.toDraft = "/cms/toDraft/memberList";
                action.publish = "/cms/publish/memberList";
                action.delete = "/cms/delete/memberList";

                action.sort = "/cms/sort/memberList";           
                break;

            case CourseList:
                action.new = "/cms/new/courseList"
                action.edit = "/cms/edit/courseList"

                action.view = "/courseList#"
                action.preview = "/cms/preview/courseList";
                action.load = "/cms/load/courseList";
                action.url = "frontend/pages/courseList";
                
                action.create = "/cms/create/courseList";
                action.update = "/cms/update/courseList";
                action.toDraft = "/cms/toDraft/courseList";
                action.publish = "/cms/publish/courseList";
                action.delete = "/cms/delete/courseList";

                action.sort = "/cms/sort/courseList";           
                break;

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
                break;
        }
        return action;
    },

    getMenu: function(module){
        var menu = {};

        switch(module)
        {
            case AboutNTCA:
                menu.datePicker = "off";
                menu.tag = "off";
                break;
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
