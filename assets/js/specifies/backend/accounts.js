function resetUserPass() {
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
function resetUserType() {
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
                data: { type: set_type, email: user_email },
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
function deleteUser() {
    var user_name = $(this).data('name');
    var user_email = $(this).data('email');
    var $btn = $(this);
    swal({
        title: `你確定要把 ${user_name} 會員刪除嗎`,
        text: `信箱: ${user_email}`,
        type: 'warning',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除',
        inputValidator: (value) => {
            return value != 'itseed15' && '驗證碼錯誤'
        },
        preConfirm: (value) => {
            if (value) {
                $.ajax({
                    type: "POST",
                    url: '/cms/deleteUser',
                    data: { email: user_email },
                    success: function (result) {
                        swal(
                            `成功刪除 ${user_name} 的會員!`,
                            'success'
                        )
                        window.table
                            .row($btn.parents('tr'))
                            .remove()
                            .draw();
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
        }
    })
}

function setSelectAll(checkbox, checkboxs) {
    $(checkbox).change(function () {
        if ($(this).prop("checked")) {
            $(checkboxs).prop("checked", true);
        }
        else {
            $(checkboxs).prop("checked", false);
        }
    });
    $(checkboxs).change(function () {
        if ($(this).prop("checked") == false) {
            $(checkbox).prop("checked", false);
        }
    });
}

function sendEmail(button, checkboxs) {
    $(button).click(function () {
        var emailList = "";

        $(checkboxs).each(function () {
            if ($(this).prop("checked") == true) {
                emailList += $(this).parents("tr").find(".email").text();
                emailList += ";";
            }
        });

        if (emailList == "")
            alert("未選取任何報名者");
        else
            window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + emailList);
    });
}

function toReverseObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[arr[i]] = i;
    return rv;
}


/* Custom filtering function which will search data in column four between two values */
let index_name_arr = "selection,photo,authority,name,school,major_and_degree,email,login,register_date,operation".split(',');
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
            (from <= date && to == "")||
            (from <= date && date <= to)) {
            return true;
        }
        return false;
    }
);
// 會員身份查詢
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        $checked_box = $(`input[name="authority[]"]:checked`);
        let checked_arr = $.map($checked_box,(ele => $(ele).val()));
        let index = index_name_obj['authority'];
        let authority = data[index]; // use data for the authority column
        if (checked_arr == [] ||
            checked_arr.includes(authority)) {
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
        let login = data[index]; // use data for the login column
        if (checked_arr == [] ||
            checked_arr.includes(login)) {
            return true;
        }
        return false;
    }
);

$(document).ready(function(){
    window.table = $('#data-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy','csv','excel', 'pdf'
        ],
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "所有"]],
        order: [],
        columnDefs: [
            { "orderable": false, "targets": 0 },
            { "orderable": false, "targets": 1 },
        ],
        language: {
            url: "/js/specifies/backend/plugins/Chinese-traditional.json"
        }
    });
    setSelectAll("#selectAll", ".selector>input");
    sendEmail("#mailTo", ".selector>input");
    $('.reset-pass-btn').click(resetUserPass);
    $('.set-user-type-btn').click(resetUserType);
    $('.delete-btn').click(deleteUser);
    $('.js-search-date input.js-from , .js-search-date input.js-to').change(function () {
        table.draw();
    });
    $(".js-search-authority  input[name='authority[]'").change(function () {
        table.draw();
    });
    $(".js-search-login  input[name='login[]'").change(function () {
        table.draw();
    });
    $('.js-date-clear-btn').click(function () {
        $('.js-search-date input.js-from , .js-search-date input.js-to').val('');
    });
    $('.js-authority-all-btn').click(function () {
        $(".js-search-authority  input[name='authority[]']").each(function () {
            $(this).prop("checked", true);
            table.draw();
        });
    });
    $('.js-login-all-btn').click(function () {
        $(".js-search-login  input[name='login[]']").each(function () {
            $(this).prop("checked", true);
            table.draw();
        });
    });
});
