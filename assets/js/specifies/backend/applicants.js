$(function() {
    $('#applicantsTable table').DataTable({
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
                url: 'cms/resetPass',
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