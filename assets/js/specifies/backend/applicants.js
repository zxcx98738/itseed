function toReverseObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[arr[i]] = i;
    return rv;
}

/* Custom filtering function which will search data in column four between two values */
let index_name_arr = "selection,register_date,photo,name,school,major_and_degree,email,login,phone,reference,file1,file2,disc,marketing,operation".split(',');
let index_name_obj = toReverseObject(index_name_arr);

// 註冊日期查詢
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        let from = $('.js-search-date input.js-from').val();
        let to = $('.js-search-date input.js-to').val();
        let index = index_name_obj['register_date'];
        let date = data[index]; // use data for the date column
        if ((from == "" && to == "") ||
            (from == "" && date <= to) ||
            (from <= date && to == "") ||
            (from <= date && date <= to)) {
            return true;
        }
        return false;
    }
);

// 登入方式
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        $checked_box = $(`input[name="login[]"]:checked`);
        let checked_arr = $.map($checked_box, (ele => $(ele).val()));
        let index = index_name_obj['login'];
        let login = data[index]; // use data for the date column
        if (checked_arr == [] ||
            checked_arr.includes(login)) {
            return true;
        }
        return false;
    }
);

$(function() {
    table = $('#applicantsTable table').DataTable({
        "lengthMenu": [ [ 10, 25, 50, 100, -1 ], [10, 25, 50, 100, "所有"] ],
        "order": [],
        "columnDefs": [
        	{ "orderable": false, "targets": 0 },
        	{ "orderable": false, "targets": 1 },
        ],
        "language": {
            "url": "/js/specifies/backend/plugins/Chinese-traditional.json"
        }
    });

    setSelectAll("#selectAll", ".selector>input");
    sendEmail("#mailTo", ".selector>input");
    $('.set-user-type-btn').click(resetUserPass);
    $('.js-search-date input.js-from , .js-search-date input.js-to').change(function () {
        table.draw();
    });
    $(".js-search-login  input[name='login[]'").change(function () {
        table.draw();
    });
    $('.js-date-clear-btn').click(function () {
        $('.js-search-date input.js-from , .js-search-date input.js-to').val('');
    });
    $('.js-login-all-btn').click(function () {
        $(".js-search-login  input[name='login[]']").each(function () {
            $(this).prop("checked", true);
            table.draw();
        });
    });
});

function setSelectAll(checkbox, checkboxs) {
    $(checkbox).change(function() {
        if($(this).prop("checked")) {
            $(checkboxs).prop("checked", true);
        }
        else {
            $(checkboxs).prop("checked", false);
        }      
    });
    $(checkboxs).change(function() {
        if($(this).prop("checked") == false) {
            $(checkbox).prop("checked", false);
        }    
    });
}

function sendEmail(button, checkboxs) {
	$(button).click(function() {
		var emailList = "";

		$(checkboxs).each(function() {
			if($(this).prop("checked") == true) {
				emailList += $(this).parents("tr").find(".email").text();
				emailList += ";";
			}
		});

		if(emailList == "")
			alert("未選取任何報名者");
		else
			window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+emailList);
	});
}

function resetUserPass(){
    var user_name = $(this).data('name');
    var user_email = $(this).data('email');
    swal({
        title: `你確定要重設 ${user_name} 的密碼`,
        text: `信箱: ${user_email}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: '/cms/resetPass',
                data: { email: user_email },
                success: function (result) {
                    swal(
                        `成功更新 ${user_name} 的密碼!`,
                        '密碼重設為 00000000',
                        'success'
                    )
                }
            });
        }
    })
}
$('.reset-pass-btn').click(resetUserPass);