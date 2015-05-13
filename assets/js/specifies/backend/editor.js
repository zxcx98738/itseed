function editorUI() {
    /*載入編輯器*/
    $(".summernote").summernote({
        height: window.innerHeight - 185, 
        codemirror: {
            theme: "monokai"
        },
        lang: "zh-TW",
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "hr"]],
            ["view", ["fullscreen", "codeview"]],
            ["help", ["help"]]
        ],
        fontNames: [
            "微軟正黑體", "標楷體", "新細明體", "Arial", "Arial Black", "Comic Sans MS", "Courier New",
            "Helvetica Neue", "Impact", "Lucida Grande",
            "Tahoma", "Times New Roman", "Verdana"
        ],
    });
    /*取消編輯器高度縮放*/
    $(".note-statusbar").unbind();
    /*調整側邊欄高度*/
    $("#setting").css("height", window.innerHeight-50-64);
}

function menuUI() {
    $("#setting li.has-sub>a").click(function(){
        $(this).removeAttr("href");
        var element = $(this).parent("li");
        if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("div.settings").slideUp();
        }
        else {
            element.addClass("open");
            element.children("div.settings").slideDown();
            element.siblings("li").children("div").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp();
        }
    });
}

function setOperation(action) {
    /*發佈*/
    $("#newPost").click({action: action}, newPost);
    $("#publish").click({action: action}, publish);
    /*儲存*/
    $("#newDraft").click({action: action}, newDraft);
    $("#update").click({action: action}, update);
    /*還原為草稿*/
    $("#toDraft").click({action: action}, toDraft);
    /*預覽*/
    $("#preview").click(function() {
        $("#form-preview>input.title").val($("#title").val());
        $("#form-preview>textarea.content").val($(".summernote").code());
        $("#form-preview").submit();
    });
    /*關閉*/
    $("#close").click(function() {
        location.href = document.referrer;
    });
}

function newPost(event) {
    $("#content").val($(".summernote").code());
    $("#status").val("P");

    /*建立FormData物件來同時上傳表單與檔案*/
    var formData = new FormData($("#form-edit")[0]);
    var poData = $("#form-extra").serializeArray();

    for(var i = 0; i < poData.length; i++){
        formData.append(poData[i].name, poData[i].value);
    }
    if($("#form-extra input[type=file]").length > 0)
        formData.append("photo", $("#form-extra input[type=file]")[0].files[0]); 

    $.ajax({
        url: event.data.action.create,
        method: "post",
        data: formData,
        enctype:"multipart/form-data",
        processData: false,
        contentType: false,
        success: function(json){
            var obj = JSON.parse(json);

            if(obj.message == "success")
                location.href = document.referrer;
            else
                alert("伺服器錯誤: " + json);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}

function newDraft(event) {
    $("#content").val($(".summernote").code());
    $("#status").val("D");

    $.ajax({
        url: event.data.action.create,
        method: "post",
        enctype: 'multipart/form-data',
        data: $("#form-edit").serialize()+'&'+$("#form-extra").serialize(),
        success: function(json){
            var obj = JSON.parse(json);

            if(obj.message == "success"){
                alert("儲存成功");
                /*儲存成功時，將回傳的id與update, publish事件綁定*/
                $("#id").val(obj.id);
                $("#newPost").off("click").click({action: event.data.action}, publish);
                $("#newDraft").off("click").click({action: event.data.action}, update);
            }    
            else
                alert("伺服器錯誤: " + json);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    }); 
}

function update(event) {
    $("#content").val($(".summernote").code());

    $.ajax({
        url: event.data.action.update,
        method: "post",
        enctype: 'multipart/form-data',
        data: $("#form-edit").serialize()+'&'+$("#form-extra").serialize(),
        success: function(msg){
            if(msg == "success")
                alert("儲存成功");
            else
                alert("伺服器錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}

function toDraft(event) {
    $("#content").val($(".summernote").code());
    $("#status").val("D");

    $.ajax({
        url: event.data.action.update,
        method: "post",
        enctype: 'multipart/form-data',
        data: $("#form-edit").serialize()+'&'+$("#form-extra").serialize(),
        success: function(msg){
            if(msg == "success"){
                alert("儲存成功");
                /*還原為草稿後，將publish事件綁定*/
                $("#toDraft").off("click").click({action: event.data.action}, publish);
                $("#toDraft").text("發佈");
            }
            else
                alert("伺服器錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });  
}

function publish(event) {
    $("#content").val($(".summernote").code());
    $("#status").val("P");

    $.ajax({
        url: event.data.action.update,
        method: "post",
        enctype: 'multipart/form-data',
        data: $("#form-edit").serialize()+'&'+$("#form-extra").serialize(),
        success: function(msg){
            if(msg == "success")
                location.href = document.referrer;
            else
                alert("伺服器錯誤: " + msg);       
        },
        error: function(xhr, ajaxOptions, thrownError){ 
            alert("Ajax錯誤: " + xhr.status);
        }
    });   
}