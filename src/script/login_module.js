//登录验证
class Login {
    constructor() {
        this.denglu = $('#login_sub');
    }
    init() {
        this.denglu.on('click', function () {
            if ($('#uName').val() !== '' && $('#uPassword').val() !== '') {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.152.15/JS1912/sfbestcom/php/login.php',
                    data: {
                        user: $('#uName').val(),
                        pass: $('#uPassword').val()
                    }
                }).done(function (result) {
                    if (result) { //匹配成功
                        location.href = 'http://10.31.152.15/JS1912/sfbestcom/src/index1.html';
                        localStorage.setItem('username', $('#uName').val());
                    } else { //匹配失败
                        $('#uPassword').val('');
                        $('.loginErro').css('display', 'block');
                        $('.erroTips').html('密码与用户名不匹配,请重新输入');
                    }
                });
            }else if($('#uName').val() == ''){
                $('.loginErro').css('display', 'block');
                $('.erroTips').html('请输入用户名');
            }else{
                
                $('.loginErro').css('display', 'block');
                $('.erroTips').html('请输入密码');
            }

        })
        $('#uName').on({
            input: function () {
                if ($(this).val() !== '') {
                    $(this).siblings('em').css('display', 'block');
                }
            }
        })


        $('.loginPhone').find('em').on('click', function () {
            $('#uName').val('');
        })

        $('#uPassword').on({
            input: function () {
                if ($(this).val() !== '') {
                    $(this).siblings('em').css('display', 'block');
                }
            }
        })


        $('.padPhone').find('em').on('click', function () {
            $('#uPassword').val('');
        })
    }


}

function loginShow() {
    new Login().init();
}

export {
    loginShow
}