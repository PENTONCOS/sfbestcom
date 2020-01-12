; (function ($) {
    class render {
        constructor() {
            this.upslide_ul = $('.upslide_ul');
            this.upslide_li = $('.upslide_ul li');
            this.timer = null;
            this.index = 0;
        }
        init() {
            /* 优选味道 */
            /* 热门晒单 */
            //1.改变布局
            let firstpic = this.upslide_li.eq(0).clone();//第一张图片
            let secpic = this.upslide_li.eq(1).clone();//第二张图片
            this.upslide_ul.append(firstpic);
            this.upslide_ul.append(secpic);

            //2.ul赋值宽度和定位--运动的盒子
            this.upslide_li = $('.upslide_ul li');//8张图片,结构改变了
            this.liheight = this.upslide_li.eq(0).outerHeight(true);//1个li的高度。
            this.upslide_ul.height(this.upslide_li.length * this.liheight);//设置高度


            this.upslide_height = this.upslide_li.outerHeight(true);
            //自动播放
            this.autoplay();

        }
        autoplay() {
            this.timer = setInterval(() => {
                this.index++;
                console.log(this.index);
                if (this.index >= this.upslide_li.length/2) {
                    this.index = 0;
                    this.upslide_ul.css({
                        top: 0
                    })
                } else {
                    this.upslide_ul.animate({
                        top: -this.upslide_height * this.index * 2
                    }, 'slow')
                }

            }, 3000);
        };
    }
    new render().init();
})(jQuery)