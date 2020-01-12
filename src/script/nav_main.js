;
(function ($) {
    class render {
        constructor() {
        }
        init() {
            //鼠标经过右边悬浮单一模块时 其他两个模块变暗
            $('.fixed_right a').hover(function () {
                $(this).find('.mask').hide();
                $(this).siblings('a').find('.mask').show();
            }, function () {
                $(this).siblings('a').find('.mask').hide()
            })
            //轮播图
        }
    }
    new render().init();
})(jQuery)