$('.testttt').css('display',"none");

$('.faq').click(function(){
	console.log("aa");
	if($(this).find("span").hasClass("triangle-rotate")){
		$(this).find("span").removeClass("triangle-rotate");
		$(this).find("span").addClass("rotate");
	}else{
		$(this).find("span").addClass("triangle-rotate");
		$(this).find("span").removeClass("rotate");
	}
});