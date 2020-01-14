

//表单验证
class Validation {
    constructor() {
        this.biankuang = $('.defaultBorder');
        this.inputs = $('.regInput');
        this.spans = $('.reg_error');
        this.form = $('form');
        this.safes = $('.default');
        this.user_lock = true;
        this.pass_lock = true;
        this.pass_lock2 = true;
        this.email_lock = true;
        this.checked = true;
    }
    init() {
        let _this = this;
        //获得焦点时input所在span边框变色
        // console.log(this.biankuang);
        // $.each(this.biankuang, (index, value) => {
        //     $(value).on('click', () => {
        //         $(value).css('border', '1px,#669900');
        //     })
        // });

        //用户名
        this.inputs.eq(0).on({
            //获得焦点时
            focus: function () {
                _this.spans.eq(0).find('font').html('请输入您的用户名');
                _this.spans.eq(0).css('color', '#666');
            },
            //失去焦点时
            blur: function () {

                if ($(this).val() !== '') {//用户名不为空
                    // 做用户名唯一性检测
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.152.15/JS1912/sfbestcom/php/registry.php',
                        data: {
                            username: $(this).val()
                        }
                    }).done(function (result) {
                        if (!result) { //不存在

                        } else {
                            $('#userMamErr').find('font').html('该用户名已经存在').css('color', '#f00078');
                            _this.inputs.eq(0).parent('.regM').find('em').removeClass('regok');
                            _this.user_lock = false;
                        }
                    });
                    //表单验证
                    let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, '**').length;
                    if (len <= 14) {
                        $('#userMamErr').find('font').html('');
                        $(this).parent('.regM').find('em').addClass('regok');
                        // $(this).parent('.regM').addClass('border_green');
                        _this.user_lock = true;
                    } else {
                        // console.log(1)
                        _this.spans.eq(0).find('font').html('用户名不能超过7个汉字或14个字符');
                        _this.spans.eq(0).find('font').css('color', '#f00078');
                        $(this).parent('.regM').find('em').removeClass('regok');
                        _this.user_lock = false;
                    }
                } else {
                    //用户名为空
                    _this.spans.eq(0).find('font').html('用户名不能为空');
                    _this.spans.eq(0).find('font').css('color', '#f00078');
                    $(this).parent('.regM').find('em').removeClass('regok');
                    _this.user_lock = false;
                }
            }
        })

        //电子邮箱
        this.inputs.eq(1).on({
            focus: function () {
                _this.spans.eq(1).find('font').html('请输入正确的电子邮箱');
                _this.spans.eq(1).find('font').css('color', '#666');
                $(this).parent('.regM').find('em').removeClass('regok');
            },
            blur: function () {
                if ($(this).val() !== '') {
                    let reg = /^(\w+[\+\-\.]*\w+)\@(\w+[\+\-\.]*\w+)\.(\w+[\+\-\.]*\w+)$/;
                    if (reg.test($(this).val())) {
                        $('#userMamErr2').find('font').html('');
                        $(this).parent('.regM').find('em').addClass('regok');
                        _this.email_lock = true;
                    } else {
                        _this.spans.eq(1).find('font').html('电子邮箱格式不正确');
                        _this.spans.eq(1).find('font').css('color', '#F00078');
                        $(this).parent('.regM').find('em').removeClass('regok');
                        _this.email_lock = false;
                    }
                } else {
                    _this.spans.eq(1).find('font').html('电子邮箱不能为空');
                    _this.spans.eq(1).find('font').css('color', '#F00078');
                    $(this).parent('.regM').find('em').removeClass('regok');
                    _this.email_lock = false;
                }
            }

        })

        //登录密码
        this.inputs.eq(2).on({
            focus: function () {
                _this.spans.eq(2).find('font').html('请输入密码');
                _this.spans.eq(2).find('font').css('color', '#666');
                $(this).parent('.regM').find('em').removeClass('regok');
            },
            input: function () {
                if ($(this).val().length >= 8 && $(this).val().length <= 14) {
                    let reg_num = /\d+/; //数字
                    let reg_lower = /[a-z]+/; //小写字母
                    let reg_upper = /[A-Z]+/; //大写字母
                    let other = /[\W\_]+/;  //特殊字符
                    let count = 0;
                    if (reg_num.test($(this).val())) {
                        count++;
                    }
                    if (reg_lower.test($(this).val())) {
                        count++;
                    }
                    if (reg_upper.test($(this).val())) {
                        count++;
                    }
                    if (other.test($(this).val())) {
                        count++;
                    }

                    switch (count) {
                        case 1:
                            _this.safes.eq(0).css('background', 'red');
                            $(this).parent('.regM').find('em').removeClass('regok');
                            _this.pass_lock = false;
                            break;
                        case 2:
                        case 3:
                            _this.safes.eq(0).css('background', '#999999');
                            _this.safes.eq(1).css('background', 'orange');
                            $(this).parent('.regM').find('em').addClass('regok');
                            _this.spans.eq(2).find('font').html('');
                            _this.pass_lock = true;
                            break;
                        case 4:
                            _this.safes.eq(0).css('background', '#999999');
                            _this.safes.eq(1).css('background', '#999999');
                            _this.safes.eq(2).css('background', '#99FF33');
                            $(this).parent('.regM').find('em').addClass('regok');
                            _this.spans.eq(2).find('font').html('');
                            _this.pass_lock = true;
                            break;
                    }
                } else {
                    _this.spans.eq(2).find('font').html('密码长度有问题');
                    _this.spans.eq(2).find('font').css('color', '#F00078');
                    $(this).parent('.regM').find('em').removeClass('regok');
                    _this.safes.eq(0).css('background', '#999999');
                    _this.safes.eq(1).css('background', '#999999');
                    _this.safes.eq(2).css('background', '#999999');
                    _this.pass_lock = false;
                }
            }
        })

        //再次确认密码
        this.inputs.eq(3).on({
            foucs: function () {
                _this.spans.eq(3).find('font').html('请再次输入密码');
                _this.spans.eq(3).find('font').css('color', '#666');
                $(this).parent('.regM').find('em').removeClass('regok');
            },
            blur: function () {
                if ($(this).val() !== '') {
                    if (_this.inputs.eq(2).val() === $(this).val()) {
                        _this.spans.eq(3).find('font').html('');
                        $(this).parent('.regM').find('em').addClass('regok');
                        _this.pass_lock2 = true;
                    } else {
                        _this.spans.eq(3).find('font').html('您输入的密码有误');
                        _this.spans.eq(3).find('font').css('color', '#F00078');
                        _this.pass_lock2 = false;
                    }
                } else {
                    _this.spans.eq(3).find('font').html('密码不能为空');
                    _this.spans.eq(3).find('font').css('color', '#F00078');
                    _this.pass_lock2 = false;
                }
            }
        })

        //确认协议

        $('#AgreeId').on('click', function () {
            if ($('#AgreeId').prop('checked') !== true) {
                _this.checked = false;

            } else {
                _this.checked = true;
            }
            console.log($('#AgreeId').prop('checked'));
        })

        //点击提交按钮后 确认每一项是否输入正确
        this.form.on('submit', () => {
            if (this.inputs.eq(0).val() == '') {
                this.spans.eq(0).find('font').html('用户名不能为空');
                this.spans.eq(0).find('font').css('color', '#f00078');
                this.user_lock = false;
            }

            if (this.inputs.eq(1).val() == '') {
                this.spans.eq(1).find('font').html('电子邮箱不能为空');
                this.spans.eq(1).find('font').css('color', '#f00078');
                this.email_lock = false;
            }

            if (this.inputs.eq(2).val() == '') {
                this.spans.eq(2).find('font').html('密码不能为空');
                this.spans.eq(2).find('font').css('color', '#f00078');
                this.pass_lock = false;
            }
            if (this.inputs.eq(3).val() == '') {
                this.spans.eq(3).find('font').html('确认密码不能为空');
                this.spans.eq(3).find('font').css('color', '#f00078');
                this.pass_lock2 = false;
            }
            if ($('#AgreeId').prop('checked') !== true) {

                this.checked =false;
            }

            if (!this.user_lock || !this.pass_lock || !this.pass_lock2 || !this.email_lock || !this.checked) {
                return false;
            }
        })
    }
}


function registryShow() {
    //表单验证
    new Validation().init();
}

export {
    registryShow
}