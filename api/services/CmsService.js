/**
 * CmsService
 *
 * @描述 : 內容管理系統服務
 */

module.exports = {
    /*CRUD*/
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

    /*計算數量*/
    countPost: function(module, criteria){
        return module.count(criteria);
    },

    /*格式化時間*/
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
