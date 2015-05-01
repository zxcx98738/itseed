$(function() {
    /*設定畫面高度*/
    $("#page-wrapper").css("height", window.innerHeight-100);
    
    /*根據預覽設定調整寬度*/
    $("input[type=radio][name=device]").change(function() {
        if (this.value == "desktop") {
            $("#page").css("width", "992px");
        }
        else if (this.value == "tablet") {
            $("#page").css("width", "768px");
        }
        else{
            $("#page").css("width", "320px");
        }          
    });
    
    /*載入預覽內容到iframe*/
    $("#page-wrapper>form").submit();
});