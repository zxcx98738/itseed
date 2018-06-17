function menuUI(postType, status, postAmounts) {
    /*開關效果*/
    $("#menu li.has-sub>a").on("click", function(){
        $(this).removeAttr("href");
        var element = $(this).parent("li");
        if(element.hasClass("open")){
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp();
        }
        else{
            element.addClass("open");
            element.children("ul").slideDown();
            element.siblings("li").children("ul").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp();
        }
    });
    $("#menu>ul>li.has-sub>a").append("<span class='holder'></span>");

    /*打開編輯中的項目*/
    $("#"+postType).addClass("open");
    $("#"+postType+">ul").css("display", "block");
    $("#"+postType+" li."+status).addClass("active");

    /*加上文章數*/
    for(var module in postAmounts){
        $("#"+module+" li.all span").append(" ("+postAmounts[module].total+")");
        $("#"+module+" li.draft span").append(" ("+postAmounts[module].draftNum+")");
        $("#"+module+" li.publish span").append(" ("+postAmounts[module].publishNum+")");
        $("#"+module+" li.schedule span").append(" ("+postAmounts[module].scheduleNum+")");
    }
}

function setSorting(url) {
    $("td").each(function(){
        $(this).css("width", $(this).width() + "px");
    });

    $(".sortable").sortable({
        handle: ".handle",
        placeholder: "highlight",
        opacity: "0.8",
        axis: "y",
        containment: ".sortable",
        helper: "clone",
        revert: 100,
        tolerance: "pointer",
        
        update: function(event, ui){
            var postOrder = JSON.stringify($(this).sortable("toArray"));
            $.ajax({
                url: url,
                method: "get",
                data: {
                    orders: postOrder
                },
                success: function(msg){
                    if(msg == "success")
                        alert("更新成功");
                    else
                        alert("伺服器錯誤: " + msg);        
                },
                error: function(xhr, ajaxOptions, thrownError){ 
                    alert("Ajax錯誤: " + xhr.status);
                }
            });
        }
    });
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

function setGroupOperation(button, checkbox, getID, operation, url, message) {
    var postID;

    $(button).click(function() {
        if($(checkbox).length > 0){
            if(confirm(message)){
                $(checkbox).each(function() {
                    postID = $(this).parents(getID).attr("id");
                    operation(postID, url);
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
            deletePost(postID, action.delete);
        }   
    });
}

function publish(postID, url) {
    $.ajax({
        url: url,
        method: "get",
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("伺服器錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}

function toDraft(postID, url) {
    $.ajax({
        url: url,
        method: "get",
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("伺服器錯誤: " + msg);        
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}

function deletePost(postID, url) {
    $.ajax({
        url: url,
        method: "get",
        data: {
            id: postID,
        },
        success: function(msg){
            if(msg == "success")
                location.reload();
            else
                alert("伺服器錯誤: " + msg);        
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    }); 
}

function sendEmail(button, checkboxs) {
    $(button).click(function () {
        var emailList = "";

        $(checkboxs).each(function () {
            if ($(this).prop("checked") == true) {
                emailList += $(this).parents("tr").find(".email").text();
                emailList += ";";
            }
        });

        if (emailList == "")
            alert("未選取任何報名者");
        else
            window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + emailList);
    });
}