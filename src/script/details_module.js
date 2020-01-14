// 放大镜效果
class Fdj {
    constructor() {
        this.fdj_right = $('.fdj_right');
        this.fdj_list = $('.fdj_list');
        this.spic = $('#spic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        this.top = $('#top');
        this.bot = $('#bot');
        this.ulmove = $('.list ul');
        this.list = $('.list ul li');
    }

    init() {
        let _this = this;
        //鼠标移入和移出时 显示和隐藏小放和大放
        this.spic.hover(() => {
            this.sf.css({
                visibility: 'visible',
                //求小放的尺寸
                width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight(),
            });
            this.bf.css('visibility', 'visible');

            //求比例
            this.left_bili = this.bpic.outerWidth() / this.spic.outerWidth();
            this.top_bili = this.bpic.outerHeight() / this.spic.outerHeight();
            //小放跟随鼠标移动
            this.spic.on('mousemove', (e) => {
                let $l = e.pageX - this.fdj_right.offset().left - this.sf.width() / 2 - this.fdj_list.outerWidth(true);
                let $t = e.pageY - this.fdj_right.offset().top - this.sf.height() / 2;
                if ($l < 0) {
                    $l = 0;
                } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth();
                }

                if ($t < 0) {
                    $t = 0;
                } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight();
                }
                this.sf.css({
                    left: $l,
                    top: $t
                });
                //大图同步移动
                this.bpic.css({
                    left: -$l * this.left_bili,
                    top: -$t * this.top_bili
                });
            })
        }, () => {
            this.sf.css('visibility', 'hidden');
            this.bf.css('visibility', 'hidden');
        });
        //鼠标移过li时 切换缩放的图片
        this.ulmove.on('mousemove', 'li', function () {
            let $picurl = $(this).find('img').attr('src');
            _this.spic.find('img').attr('src', $picurl);
            _this.bpic.attr('src', $picurl);
            _this.ulmove.find('img').removeClass('active');
            $(this).find('img').addClass('active');
        })
        //点击上下箭头，进行图片运动
        let $num = 5;//可视的li的长度
        let $liheight = this.list.eq(0).outerHeight(true);//1个li的高度
        if (this.list.length <= $num) {
            this.bot.css('color', '#fff');
        }

        this.bot.on('click', () => {
            if (this.list.length > $num) {
                $num++;
                this.top.find('b').css({
                    'background-position': '-49px 0',
                });
                if ($num === this.list.length) {
                    this.bot.css({
                        cursor: 'default'
                    });
                    this.bot.find('b').css({
                        'background-position': '-30px -10px',
                    });
                }
                this.ulmove.animate({
                    top: -($num - 5) * $liheight
                });
            }
        });

        this.top.on('click', () => {
            if ($num > 5) {
                $num--;
                this.bot.find('b').css({
                    'background-position': '-49px -10px',
                });
                if ($num === 5) {
                    this.top.css({
                        cursor: 'default'
                    });
                    this.top.find('b').css({
                        'background-position': '-30px 0',
                    });
                }
                this.ulmove.animate({
                    top: -($num - 5) * $liheight
                });
            }
        });
    }
}

//定义模块
// define([], function () {
//     return {
//         init: function () {
//             new Fdj().init();
//         }
//     }
// });

// ES6

function detailsShow() {
    new Fdj().init();
}
export {
    detailsShow
}