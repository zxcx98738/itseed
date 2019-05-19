$(function(){
  /*表單驗證*/

	$("form").validate({
		submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      element.closest('div').append(error);
      element.closest('div').addClass('error');
    },
    success: function(element) {
      element.closest('div').removeClass('error');
    },
  });

});
$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
  $("#file_progress").addClass('active');
  $("#form_progress").addClass('active');

  var timeoutId;
  $('form input, form textarea').on('input propertychange change', function() {
      //console.log('Textarea Change');
      Qid = $(this).attr('id'); 
      text = $(this).val();
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
          // Runs 1 second (1000 ms) after the last change    
          saveToDB(Qid,text);
      }, 4000);
  });

  function saveToDB(Qid,text)
  {
      console.log('Saving to the db');
      console.log(Qid,text);
      //console.log($("form textarea").val());
      // document.querySelector('form')
      // $('form').submit(function() {
      //     // Get all the forms elements and their values in one step
      //     var values = $("form").text();;
      //     console.log(values);

      // });
      $.ajax({
          url: "/auto_saveForm",
          type: "Post",
          data: JSON.stringify({"Qid":Qid, "text": text}),
          datatype: "json",
          contentType: "application/json; charset=utf-8",
          success: function (result) {
              console.log(result);
          },
          error: function(result){
              console.log(result);
          }
      });
           
      // var formdata = new FormData($('form')[0]);
      // console.log(formdata);      
      // Now show them we saved and when we did
      // var d = new Date();
      // $('.form-status-holder').html('Saved! Last: ' + d.toLocaleTimeString());
  }




});
// $.ajax({
//     url: "/editform",
//     type: "Post",
//     data: ko.toJSON(self.stripDownObj()),
//     datatype: "json",
//     contentType: "application/json; charset=utf-8",
//     success: function (result) {
//         console.log(result);
//         if(result.status == 200){
//             self.isEditMode(!self.isEditMode());
//         }
//     },
//     error: function(result){
//         console.log(result);
//     }
// });
