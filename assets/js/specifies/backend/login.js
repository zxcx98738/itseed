$(function () {
    $("form").validate({
        submitHandler: function (form) {
            form.submit();
        },
        errorPlacement: function (error, element) {
            element.closest('div').append(error);
        },
        rules: {
            email: {
                required: true,
                remote: {
                    url: "/check-email",
                    type: "post",
                    data: {
                        email: function () {
                            return $("input[name='email']").val();
                        },
                        pwd: function () {
                            return $("input[name='pwd']").val();
                        },
                    }
                }
            },
            pwd: {
                required: true,
                remote: {
                    url: "/check-pwd",
                    type: "post",
                    data: {
                        email: function () {
                            return $("input[name='email']").val();
                        },
                        pwd: function () {
                            return $("input[name='pwd']").val();
                        },
                    }
                }
            },
        },
        messages: {
            email: {
                remote: "此帳號不存在",
            },
            pwd: {
                remote: "密碼錯誤",
            }
        }
    });
});