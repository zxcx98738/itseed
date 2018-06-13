$(function() {
    //聚焦在影片網址
    $("#youtube").on("shown.bs.modal", function(event) {
            $(this).find("input").focus();
        })
        //輸入網址後開啟插入影片按鈕
    $("#youtube input").keyup(function() {
        if ($("#youtube input").val() != "") {
            $("#youtube .modal-footer>button").removeClass("disabled");
        } else {
            $("#youtube .modal-footer>button").addClass("disabled");
        }
    });
    //插入影片
    $("#youtube .modal-footer>button").click(function() {
        var url = $("#youtube input").val();
        var video_id = url.split('v=')[1];
        var div = "<p><br></p><div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + video_id + "' frameborder='0' allowfullscreen=></iframe></div><p><br></p>";
        $(".note-editable").append(div);
        $("#youtube").modal('hide')
    });
});
