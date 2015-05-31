(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() > 300) {
			$("nav").addClass("navbar-shrink");
		}
		else{
			$("nav").removeClass("navbar-shrink");
		}
	});
})()