$(function () {
    $('#applicantsTable table').DataTable({
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "所有"]],
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

function resetUserPass() {
    var user_name = $(this).data('name');
    var user_email = $(this).data('email');
    var set_type = $(this).data('type');
    var $btn = $(this);
    swal({
        title: `你確定要把 ${user_name} 得會員權限設定成 ${set_type} `,
        text: `信箱: ${user_email}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定修改'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: '/cms/setUserType',
                data: { type: set_type,email: user_email },
                success: function (result) {
                    swal(
                        `成功更新 ${user_name} 的會員權限!`,
                        `會員權限設為 ${set_type}`,
                        'success'
                    )
                    $btn.parent().parent().find('.user-type').text(set_type);
                },
            })
        }
    })
}
$('.set-user-type-btn').click(resetUserPass);