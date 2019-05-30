$(function(){
  /*表單驗證*/
  
  $('#goto_upload').click(function(){
    $("form").validate({
      submitHandler: function(form) {
        form.submit();
      },
      errorPlacement: function(error, element) {
        element.closest('div').append(error);
        element.closest('div').addClass('error');
      },
      rules: {      		
        Q1: {
          required: true,
        },
        Q2: {
          required: true,
        },
        Q3: {
          required: true,
        },
        Q4: {
          required: true,
        },
        Q5_1: {
          required: true,
        },
        Q5_2: {
          required: true,
        },
        Q6: {
          required: true,
        }
      }
    });
    $("form").submit();
  });
  $('#no_require_save').click(function(){
  });

});
$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
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
      }, 2000);
  });

  function saveToDB(Qid,text)
  {
      // console.log('Saving to the db');
      // console.log(Qid,text);
      $.ajax({
          url: "/auto_saveForm",
          type: "Post",
          data: JSON.stringify({"Qid":Qid, "text": text}),
          datatype: "json",
          contentType: "application/json; charset=utf-8",
          success: function (result) {
              console.log(result);
              console.log('#'+String(Qid));
              var d = new Date();
              $('#'+String(Qid)+"_status").html('儲存成功: ' + d.toLocaleTimeString());;
          },
          error: function(result){
              console.log(result);
          }
      });
  }




});
