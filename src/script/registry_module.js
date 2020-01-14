//做账户名唯一性检测---失去焦点
class Unique {
    constructor() {
        this.user = $('#userMam');
        this.userflag = true;
    }
    init() {
        this.user.on('blur',  ()=> {
            $.ajax({
                type: 'post',
                url: 'http://10.31.152.15/JS1912/sfbestcom/php/registry.php',
                data: {
                    username: this.user.val()
                }
            }).done(function (result) {
                console.log(result);
                if (!result) { //不存在
                    $('.reg_error').html('√').css('color', 'green');
                    this.userflag = true;
                } else {
                    $('.reg_error').html('改用户名已经存在').css('color', 'red');
                    this.userflag = false;
                }
            });
        });

        $('form').on('submit', function () {
            if (this.user.val() == '') {
                $('.reg_error').html('请输入用户名').css('color', 'red');
                this.userflag = false;
            };
            if (!this.userflag) {
                return false;
            }
        });
    }
}

//表单验证
class Validation{
    constructor(){
        this.inputs = $('.regInput');

    }
    init(){
        
    }
}

define([], function () {
    return {
        init: function () {
            //检测用户名的唯一性
            new Unique().init();
            //表单验证
            new Validation().init();
        }
    }

})