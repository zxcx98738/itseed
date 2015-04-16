function init() {
    /*根據正在管理的頁面調整menu的UI*/
    editorUI();
    /*選單欄開合事件*/
    menuUI()
    /*綁定事件*/
    setOperation();
}
function editorUI() {
    /*載入編輯器*/
    $(".summernote").summernote();
    /*調整高度*/
    $("#page-wrapper").css("height", window.innerHeight-50);
    $(".note-editable").css("height", window.innerHeight-50-64-43-20);
    $(".note-codable").css("height", window.innerHeight-50-64-43-20);
    $("#setting").css("height", window.innerHeight-50-64);
    $(".note-editor").css("height", window.innerHeight-50-64);
}
function menuUI() {
    $('#setting li.has-sub>a').click(function(){
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('div.settings').slideUp();
        }
        else {
            element.addClass('open');
            element.children('div.settings').slideDown();
            element.siblings('li').children('div').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
}
function setOperation() {
    /*發佈*/
    $("#newPost").click(newPost);
    $("#publish").click(publish);
    /*儲存*/
    $("#newDraft").click(newDraft);
    $("#update").click(update);
    /*還原為草稿*/
    $("#toDraft").click(toDraft);
    /*預覽*/
    $("#preview").click(function() {
        $("#form-preview>input.title").val($("#title").val());
        $("#form-preview>input.content").val($(".summernote").code());
        $("#form-preview").submit();
    });
    /*關閉*/
    $("#close").click(function() {
        location.href = document.referrer;
    });
}
function newPost() {
    $("#content").val($(".summernote").code());
    /*未設定發佈時間時*/
    if($("#status").val() == "new")
        $("#status").val("P");

    $.ajax({
        url: createAction,
        method: "post",
        data: $("#form-edit").serialize(),
        success: function(json){
            var obj = JSON.parse(json);

            if(obj.message == "success")
                location.href = document.referrer;
            else
                alert("資料庫錯誤: " + json);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}
function newDraft() {
    $("#content").val($(".summernote").code());
    $("#status").val("D");

    $.ajax({
        url: createAction,
        method: "post",
        data: $("#form-edit").serialize(),
        success: function(json){
            var obj = JSON.parse(json);

            if(obj.message == "success"){
                alert("儲存成功");
                /*儲存成功時，將回傳的id與update, publish事件綁定*/
                $("#id").val(obj.id);
                $("#newDraft").off("click").click(update);
                $("#newPost").off("click").click(publish);
            }    
            else
                alert("資料庫錯誤: " + json);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    }); 
}
function update() {
    $("#content").val($(".summernote").code());

    $.ajax({
        url: updateAction,
        method: "post",
        data: $("#form-edit").serialize(),
        success: function(msg){
            if(msg == "success")
                alert("儲存成功");
            else
                alert("資料庫錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}
function toDraft() {
    $.ajax({
        url: toDraftAction,
        method: "get",
        data: {
            id: $("#id").val(),
        },
        success: function(msg){
            if(msg == "success"){
                alert("儲存成功");
                /*還原為草稿後，將publish事件綁定*/
                $("#toDraft").off("click").click(publish);
                $("#toDraft").text("發佈");
            }
            else
                alert("資料庫錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}
function publish() {
    update();

    $.ajax({
        url: publishAction,
        method: "get",
        data: {
            id: $("#id").val()
        },
        success: function(msg){
            if(msg == "success")
                location.href = document.referrer;
            else
                alert("資料庫錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}