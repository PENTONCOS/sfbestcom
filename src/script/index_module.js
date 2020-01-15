//顶部广告效果+点击地区
class AdTop {
    constructor() {
        this.banner_big = $('.banner_big');
        this.banner = $('.banner');
        this.banner_span = $('.banner span');
        this.timer = null;
        this.city = $('.city');
    }
    init() {
        let _this=this;
        //给头部广告定时 时间到后关闭大的显示小的
        this.timer = setTimeout(() => {
            // this.banner_big.css('display', 'none');
            this.banner_big.animate({
                height: 0
            });
            this.banner.animate({
                height: 80
            });
        }, 2000)
        //点击关闭按钮 关闭小的
        this.banner_span.on('click', () => {
            this.banner.hide();
            this.banner_big.hide();
        })

        // clearTimeout(this.timer);

        //点击地区
        $('.citys_middle').on('click','a',function(){
            _this.city.html($(this).html());
        })
        $('.citys_bottom').on('click','li',function(){
            _this.city.html($(this).html());
        })
       
    }
}

//nav轮播图
class NavMain {
    constructor() {
        this.goods = $('.banner_main_center');
        this.piclist = $('.slide_main_ul');//运动图片的ul
        this.pics = $('.slide_main_ul li');//6张图片
        this.picli = $('.slide_bot_btn li');//6个小按钮
        this.bgcolor_ul = $('.banner_bgcolor_ul')//运动背景图的ul
        this.bgcolor_li = $('.banner_bgcolor_ul dd')//6个运动背景图
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

        this.bgcolor_li = $('.banner_bgcolor_ul dd');//7张背景,结构改变了
        this.bgwidth = this.bgcolor_li.eq(0).width();//1个背景的宽度。
        this.bgcolor_ul.width(this.bgcolor_li.length * this.bgwidth);//设置宽度

        //3.按钮添加事件
        for (let i = 0; i < this.picli.length; i++) {
            this.picli.eq(i).hover(() => {
                this.index = i;
                this.picli.eq(i).addClass('active').siblings('li').removeClass('active');//给当前点击的按钮添加背景
                this.piclist.stop(true).animate({
                    left: -this.liwidth * i
                }, 'faster')
                this.bgcolor_ul.stop(true).animate({
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
            this.picli.eq(this.index).addClass('active').siblings('li').removeClass('active');
            if (this.index === this.pics.length - 1) {
                this.picli.eq(0).addClass('active').siblings('li').removeClass('active');
            }

            this.piclist.stop(true, true).animate({
                left: -this.liwidth * this.index
            }, () => {
                if (this.index >= this.pics.length - 1) {
                    this.index = 0;
                    this.piclist.css({
                        left: 0
                    })
                }
            })
            this.bgcolor_ul.stop(true, true).animate({//背景
                left: -this.bgwidth * this.index
            }, () => {
                if (this.index > this.bgcolor_li.length - 1) {
                    this.index = 0;
                    this.bgcolor_ul.css({
                        left: 0
                    })
                }
            })
        }, 4000);
    }
}

//优选渲染
class BestChoose {
    constructor() {
        this.bc_leftBot = $('.bc_leftBot');
    }
    init() {
        $.ajax({
            url: 'http://10.31.152.15/JS1912/sfbestcom/php/data_bestchoose.php',
            dataType: 'json'
        }).done((data) => {
            // console.log(data);
            let $strhtml = '';
            $.each(data, function (index, value) {
                $strhtml += `
                <li class="buy_list">
                    <a class="bc_buy" href="details.html?sid=${value.sid}" title="${value.title}">${value.title}</a>
                    <div class="bc_price"><i>￥</i>${value.price}</div>
                    <a href="details.html?sid=${value.sid}"><img class="bc_pic"
                            src="${value.url}"
                            alt=""></a>
                    <div class="common_buybtn">
                        <a href="details.html?sid=${value.sid}">加入购物车</a>
                    </div>
                </li>
                `;
            });
            this.bc_leftBot.html($strhtml);
        })
    }
}

//水果渲染
class Fruit {
    constructor() {
        this.sg_ul = $('.sg_ul');
    }
    init() {
        $.ajax({
            url: 'http://10.31.152.15/JS1912/sfbestcom/php/data_fruit.php',
            dataType: 'json'
        }).done((data) => {
            let $strhtml = '';
            $.each(data, function (index, value) {
                $strhtml += `
                <li class="sg_list">
                    <div class="sg_img">
                        <a href="details.html?sid=${value.sid}">
                            <img src="${value.url}" alt="">
                        </a>
                        <div class="common_buybtn">
                            <a href="details.html?sid=${value.sid}">加入购物车</a>
                        </div>
                    </div>
                    <div class="sg_title">
                        <a href="details.html?sid=${value.sid}">${value.title}</a>
                    </div>
                    <div class="sg_price">
                        <span>
                            <i>￥</i>${value.price}
                        </span>
                    </div>
                </li>
                `;
            });
            this.sg_ul.html($strhtml);
        })
    }
}

//为你推荐
class Recom {
    constructor() {
        this.recom_bot = $('.recom_bot');
    }
    init() {
        $.ajax({
            url: 'http://10.31.152.15/JS1912/sfbestcom/php/data_bestchoose.php',
            dataType: 'json'
        }).done((data) => {
            let $strhtml = '';
            $.each(data, function (index, value) {
                $strhtml += `
                <li class="sg_list">
            <div class="sg_img">
                <a href="details.html?sid=${value.sid}"><img src="${value.url}" alt=""></a>

                <div class="common_buybtn">
                    <a href="details.html?sid=${value.sid}">加入购物车</a>
                </div>
            </div>
            <div class="sg_title">
                <a href="details.html?sid=${value.sid}">${value.title}</a>
            </div>
            <div class="sg_price">
                <span>
                    <i>￥</i>${value.price}
                </span>
            </div>
        </li>
                `;
            });
            this.recom_bot.html($strhtml);
        })
    }
}

//楼梯
class Louti {
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

//热门晒单
class Hotspot {
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
            this.upslide_ul.animate({
                top: -this.upslide_height * this.index * 2
            }, 'slow', () => {
                if (this.index >= (this.upslide_li.length - 2) / 2) {
                    this.index = 0;
                    this.upslide_ul.css({
                        top: 0
                    })
                }
            })

        }, 3000);
    };
}

//登录成功后首页显示用户名
class ShowName{
    constructor(){

    }
    init(){
        if(localStorage.getItem('username')){
            $('.login').hide();
            $('.loginTihuan').show();
            $('.loginTihuan').html('嘿，'+localStorage.getItem('username')+' 欢迎来到顺丰优选！<a class="exit" href="javascript:;">退出</a>');
        }
        $('.exit').on('click',function(){
            $('.login').show();
            $('.loginTihuan').hide();
            localStorage.removeItem('username');
        })
    }
}



//定义模块
// define([], function () {
//     return {
//         init: function () {
//             //顶部广告效果
//             new AdTop().init();
//             //顶部轮播图
//             new NavMain().init();
//             //优选渲染
//             new BestChoose().init();
//             //水果渲染
//             new Fruit().init();
//             //为你推荐渲染
//             new Recom().init();
//             //楼梯动画
//             new Louti().init();
//             //热门评论轮播
//             new Hotspot().init();
//         }
//     }
// });


//es6

function indexShow() {
    //顶部广告效果+点击地区
    new AdTop().init();
    //顶部轮播图
    new NavMain().init();
    //优选渲染
    new BestChoose().init();
    //水果渲染
    new Fruit().init();
    //为你推荐渲染
    new Recom().init();
    //楼梯动画
    new Louti().init();
    //热门评论轮播
    new Hotspot().init();
    //首页显示姓名
    new ShowName().init();
}
export {
    indexShow
}