;
(function ($) {
    class render {
        constructor() {
            this.goods = $('.banner_main_center');
            this.piclist = $('.slide_main_ul');//运动图片的ul
            this.pics = $('.slide_main_ul li');//6张图片
            this.picli = $('.slide_bot_btn li');//6个小按钮
            this.bgcolor_ul = $('.banner_bgcolor_ul')//运动背景图的ul
            this.bgcolor_li = $('.banner_bgcolor_ul li')//6个运动背景图
            this.index = 0;//存储索引。
            this.timer = null;
            this.flag = true;//标记。
        }
        init() {
            // let _this = this;
            //鼠标经过右边悬浮单一模块时 其他两个模块变暗
            $('.fixed_right a').hover(function () {
                $(this).find('.mask').hide();
                $(this).siblings('a').find('.mask').show();
            }, function () {
                $(this).siblings('a').find('.mask').hide()
            })
            //轮播图
            //1.改变布局
            let firstpic = this.pics.eq(0).clone();//第一张图片
            this.piclist.append(firstpic);

            let firstbg = this.bgcolor_li.eq(0).clone();//第一张背景
            this.bgcolor_ul.append(firstbg);


            //2.ul赋值宽度和定位--运动的盒子
            this.pics = $('.slide_main_ul li');//7张图片,结构改变了
            this.liwidth = this.pics.eq(0).width();//1个li的宽度。
            this.piclist.width(this.pics.length * this.liwidth);//设置宽度

            this.bgcolor_li = $('.banner_bgcolor_ul li');//7张背景,结构改变了
            this.bgwidth = this.bgcolor_li.eq(0).width();//1个背景的宽度。
            this.bgcolor_ul.width(this.bgcolor_li.length * this.bgwidth);//设置宽度

            //3.按钮添加事件
            for (let i = 0; i < this.picli.length; i++) {
                this.picli.eq(i).hover(() => {
                    this.index = i;
                    this.picli.eq(i).addClass('active').siblings('li').removeClass('active');//给当前点击的按钮添加背景
                    this.piclist.stop(true, true).animate({
                        left: -this.liwidth * i
                    }, 'faster')
                    this.bgcolor_ul.stop(true, true).animate({
                        left: -this.bgwidth * i
                    }, 'faster')
                })
            }
            //4.自动播放
            this.autoplay();
            //5.鼠标停留时停止自动播放 离开时开启自动播放
            this.goods.hover(() => {
                clearInterval(this.timer);
            }, () => {
                this.autoplay();
            })
        }
        autoplay() {
            this.timer = setInterval(() => {
                this.index++;
                // console.log(this.index)
                // console.log(this.pics.length - 1)
                if (this.index === this.pics.length - 1) {
                    this.picli.eq(0).addClass('active').siblings('li').removeClass('active');
                }
                if (this.index > this.pics.length - 1) {
                    this.index = 0;
                    this.piclist.css({
                        left: 0
                    })
                    // console.log(this.index)
                } else {
                    this.piclist.stop(true, true).animate({
                        left: -this.liwidth * this.index
                    })
                    this.bgcolor_ul.stop(true, true).animate({
                        left: -this.bgwidth * this.index
                    })
                    this.picli.eq(this.index).addClass('active').siblings('li').removeClass('active');
                }
            }, 4000);
        }

    }
    new render().init();
})(jQuery)