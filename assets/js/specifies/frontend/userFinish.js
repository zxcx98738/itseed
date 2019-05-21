$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
  $("#file_progress").addClass('active');
  $("#form_progress").addClass('active');
  $("#finish_progress").addClass('active');
});
function finish() {
  var form = $(this).parents('form');   
  swal({
    title: '確定要繳交嗎?，不能再更改囉!',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    showCancelButton: true
  })
  .then(function(result) {
    if (result.value) {
      console.log("完成繳交");
      document.location.href = "/confirm";  
    }
  });
}