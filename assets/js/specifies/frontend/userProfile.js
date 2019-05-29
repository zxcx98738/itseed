(function() {
  $.validator.addMethod("fileSize", function(value, element, param) {
    var optionalValue = this.optional(element);
    if (optionalValue) {
      return optionalValue;
    }

    var limit = param * 1024 * 1024;
    var size = element.files[0].size;

    if(size > limit)
      return false;
    else
      return true;
  }, "檔案需小於{0}MB");

  $.validator.addMethod("accept", function(value, element, param) {
    // Split mime on commas in case we have multiple types we can accept
    var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
    optionalValue = this.optional(element),
    i, file;

    // Element is optional
    if (optionalValue) {
      return optionalValue;
    }

    if ($(element).attr("type") === "file") {
      // If we are using a wildcard, make it regex friendly
      typeParam = typeParam.replace(/\*/g, ".*");

      // Check if the element has a FileList before checking each file
      if (element.files && element.files.length) {
        for (i = 0; i < element.files.length; i++) {
          file = element.files[i];

          // Grab the mimetype from the loaded file, verify it matches
          if (!file.type.match(new RegExp( ".?(" + typeParam + ")$", "i"))) {
            return false;
          }
        }
      }
    }

    // Either return true because we've validated each file, or because the
    // browser does not support element.files and the FileList feature
    return true;
  }, $.validator.format("檔案格式錯誤"));
})();
  
$(function(){
  /*上傳圖片*/
  $('#uploadBtn').click(function(){
    $('input[name="photo"]').click();
  });

 //  /*表單驗證*/
	$("#uploadPhoto").validate({
		submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      element.closest('div').append(error);
      if(element.attr('type') == 'file'){
        element.siblings('button').addClass('error');
      }
    },
  	rules: {      		
      photo: {
        accept: 'image/*',
        fileSize: 2
      }
  	}
  });

});
$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
});
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
function autocomplete(inp, arr, element) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i][element].toUpperCase().replace("台", "臺").includes(val.toUpperCase().replace("台", "臺"))) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i][element].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i][element].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i][element] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
