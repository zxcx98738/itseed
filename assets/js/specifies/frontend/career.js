$( document ).ready(function() {
    $("#firm_button").click(function(){
        $(".personal").hide(100);
        $(".firm").show(100);
      });
      $("#personal_button").click(function(){
        $(".personal").show(100);
        $(".firm").hide(100);
      });
  });