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