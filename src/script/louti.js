;
(function ($) {
    class render {
        constructor() {

        }
        init() {
            //1.获取楼梯，给楼梯添加点击事件。
            $('#louti li').not('.last').on('click', function () {
                //点击之后取消滚轮事件
                $(window).off('scroll', loutiShow);
                //$(this).index():当前操作的元素的索引
                $(this).addClass('active').siblings('li').removeClass('active');
                let $top = $('.louceng').eq($(this).index()).offset().top; //和楼梯对应的楼层的top值。
                $('html').animate({
                    scrollTop: $top
                }, function () {//动画结束了 重新增加滚轮事件
                    $(window).on('scroll', loutiShow);
                });
            });
            //2.回调顶部
            $('.last').on('click', function () {
                $('html').animate({
                    scrollTop: 0
                });
            });
            //3.触发滚轮，对应的楼梯背景样式发生改变。

            function loutiShow() {
                let $top = $(window).scrollTop();
                if ($top >= 600) {
                    $('#louti').show();
                } else {
                    $('#louti').hide();
                }

                $('.louceng').each(function (index, element) { //触发滚轮，遍历一次。
                    //每一个楼层的top值
                    let $loucenttop = $('.louceng').eq(index).offset().top + $('.louceng').eq(index).height() / 2;
                    //每一次触发滚轮，用9个楼层的固有top和滚动条的top值进行比较
                    //如果楼层的固有top>滚动条的top  添加active
                    if ($loucenttop > $top) { //上面遍历一次，楼层比较9次，满足一次，立刻结束
                       
                        $('#louti li').not('.last').eq(index).addClass('active').siblings('li').removeClass('active');
                        return false; //结束
                    }
                });
            }
            loutiShow();
            $(window).on('scroll', loutiShow);
        }
    }
    new render().init();
})(jQuery)