var dropImage; // global, set when image changes

$(function() {  
  // image changed
  $('.drop-image').on('load', function () {
    if (this.naturalWidth > 1650 || this.naturalHeight > 1650) {
        $('.drop-zone').addClass("drop-error")
        $('.drop-zone').html("圖片大小<br>過大")
    }
    else {
      dropImage = this;
    }
  });
  
  // drag and drop stuff
  $('.drop-zone')
    .on('dragover', function () {
      $(this).addClass('drop-over');
      return false;
    })
    .on('dragleave', function () {
      $(this).removeClass('drop-over');
      return false;
    })
    .on('drop', function (e) {
      $(this).removeClass('drop-over');
      loadFromDesktop(e.originalEvent.dataTransfer.files[0]);
      e.preventDefault();
      return false;
    });
});

function loadFromDesktop(file) {
  if (!file || file.type.indexOf('image/') !== 0) {
    $('.drop-zone').addClass("drop-error")
    $('.drop-zone').html("檔案格式<br>錯誤")
  }
  else {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.miniature').append('<div><i class="fa fa-times-circle remove"></i><img class="full-width" src="'+e.target.result+'"></div>');
      $('.miniature i').on('click', function (e) {
            $(this).parent().remove();
            changeImages();
            refreshSlider("#slider-settings", "#slider .preview", "slider1");
      });
      changeImages();
    };
    reader.readAsDataURL(file);
  }
}

function changeImages() {
  var imageArr = [];
  $('.miniature').find("img").each(function() {
    var copy = $(this).clone();
    var image = $('<div>').append(copy).html();
    imageArr.push(image);
  });
  slider.setImages(imageArr);
  refreshSlider("#slider-settings", "#slider .preview", "slider1");
}
