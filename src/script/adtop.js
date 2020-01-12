;
(function ($) {
    class render {
        constructor() {
            this.banner_big = $('.banner_big');
            this.banner = $('.banner');
            this.banner_span = $('.banner span');
            this.timer = null;
        }
        init() {
            //给头部广告定时 时间到后关闭大的显示小的
            this.timer = setTimeout(() => {
                // this.banner_big.css('display', 'none');
                this.banner_big.animate({
                    height:0
                });
                this.banner.animate({
                    height:80
                });
            }, 2000)
            //点击关闭按钮 关闭小的
            this.banner_span.on('click',()=>{
                this.banner.hide();
                this.banner_big.hide();
            })

            // clearTimeout(this.timer);
        }
    }
    new render().init();
})(jQuery)