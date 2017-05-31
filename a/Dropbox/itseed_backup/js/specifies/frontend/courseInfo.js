$(function(){
    var len = 60; // 超過50個字以"..."取代
    $(".course-content").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });

    $(".top-box").click(function() {
    	$("html, body").animate({scrollTop: 0}, 500);
    })
});