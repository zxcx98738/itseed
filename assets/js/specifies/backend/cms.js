function menuUI(postType, status, total, draftNum, publishNum, scheduleNum) {
    $("#"+postType).addClass("open");
    $("#"+postType+">ul").css("display", "block");
    $("#"+postType+" li."+status).addClass("active");

    $("#"+postType+" li.all span").append(" ("+total+")");
    $("#"+postType+" li.draft span").append(" ("+draftNum+")");
    $("#"+postType+" li.publish span").append(" ("+publishNum+")");
    $("#"+postType+" li.schedule span").append(" ("+scheduleNum+")");
}
function setSelectAll(checkbox, checkboxs) {
    $(checkbox).change(function() {
        if($(this).prop("checked")) {
            $(checkboxs).prop("checked", true);
        }
        else {
            $(checkboxs).prop("checked", false);
        }      
    });
    $(checkboxs).change(function() {
        if($(this).prop("checked") == false) {
            $(checkbox).prop("checked", false);
        }    
    });
}
function setGroupOperation(button, checkbox, getID, operation, message) {
    var postID;

    $(button).click(function() {
        if($(checkbox).length > 0){
            if(confirm(message)){
                $(checkbox).each(function() {
                    postID = $(this).parents(getID).attr("id");
                    operation(postID);
                    $(this).prop("checked", false);
                });
            }   
        }
        else{
            alert("未選取任何文章");
        }
    });
}
function setOperation(action) {
    var postID;
    /*新增*/
    $("#newPost").attr("href", action.new);
    /*編輯*/
    $(".edit").each(function() {
        postID = $(this).parents("tr").attr("id");
        $(this).attr("href", action.edit + "?id=" + postID);
    });
    /*檢視*/
    $(".view").each(function() {
        postID = $(this).parents("tr").attr("id");
        $(this).attr("href", action.view + postID);                
    });
    /*預覽*/
    $(".preview").each(function() {
        postID = $(this).parents("tr").attr("id");
        $(this).attr("href", action.preview + "?id=" + postID);                
    });
    /*刪除*/
    $(".deletePost").click(function() {
        if(confirm("確定要刪除選取的文章嗎?")){
            postID = $(this).parents("tr").attr("id");
            deletePost(postID);
        }   
    });
}
function publish(postID) {
    $.ajax({
        url: '/cms/publishVideo',
        method: 'get',
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("資料庫錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}
function toDraft(postID) {
    $.ajax({
        url: '/cms/toDraftVideo',
        method: 'get',
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("資料庫錯誤: " + msg);        
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}
function deletePost(postID) {
    $.ajax({
        url: '/cms/deleteVideo',
        method: 'get',
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("資料庫錯誤: " + msg);        
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    }); 
}