// 放大镜效果+渲染数据+添加到购物车
class Fdj {
    constructor() {
        // 放大镜
        this.fdj_right = $('.fdj_right');
        this.fdj_list = $('.fdj_list');
        this.spic = $('#spic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        this.top = $('#top');
        this.bot = $('#bot');
        this.ulmove = $('.list ul');
        // this.list = $('.list ul li');
        // 渲染数据
        this.sid = location.search.substring(1).split('=')[1];
        this.count = $('#number_300583');
    }

    init() {
        let _this = this;

        //渲染数据
        $.ajax({
            url: 'http://10.31.152.15/JS1912/sfbestcom/php/getsid.php',
            data: {
                sid: this.sid,
            },
            dataType: 'json'
        }).done((data) => {
            this.spic.find('img').attr('src', data.url);
            this.bpic.attr('src', data.url);
            $('#base_name-sf').prop('title', data.title);
            $('#base_name-sf').html(data.title);
            $('.priceBox .price').html(data.price);
            $('.pdetail ul li').eq(0).find('span a').prop('title', data.title);
            $('.pdetail ul li').eq(0).find('span a').html(data.title);
            $('.pdetail ul li').eq(3).html('重量：' + data.weight + 'kg (含包装)');
            let piclist = data.urls.split(',');
            let $strhtml = '';
            $.each(piclist, function (index, value) {
                $strhtml += `
                <li><img src="${value}" alt=""></li>
                `;
            })
            $('.list ul').html($strhtml);
        })

        //鼠标移入和移出时 显示和隐藏小放和大放
        // this.list = $('.list ul li');
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
        //刷新页面时通过点击事件来确认渲染出来的li的长度
        $(document).ready(function () {
            $('.fdj_list').find('#bot').click();
        })
        $('.fdj_list').on('click', '#bot', function () {
            let $liheight = $(this).siblings('.list').find('li').eq(0).outerHeight(true);//1个li的高度
            let $ul_li_length = $(this).siblings('.list').find('li').length;
            let $num = 5;//可视的li的长度

            if ($ul_li_length <= $num) {
                _this.bot.find('b').css({
                    'background-position': '-30px -10px'
                });
            }

            _this.bot.on('click', () => {
                if ($ul_li_length > $num) {
                    $num++;
                    _this.top.find('b').css({
                        'background-position': '-49px 0',
                    });
                    if ($num === $ul_li_length) {
                        _this.bot.css({
                            cursor: 'default'
                        });
                        _this.bot.find('b').css({
                            'background-position': '-30px -10px',
                        });
                    }
                    _this.ulmove.stop(true).animate({
                        top: -($num - 5) * $liheight
                    });
                }
            });

            _this.top.on('click', () => {
                if ($num > 5) {
                    $num--;
                    _this.bot.find('b').css({
                        'background-position': '-49px -10px',
                    });
                    if ($num === 5) {
                        _this.top.css({
                            cursor: 'default'
                        });
                        _this.top.find('b').css({
                            'background-position': '-30px 0',
                        });
                    }
                    _this.ulmove.stop(true).animate({
                        top: -($num - 5) * $liheight
                    });
                }
            });
        })
        // 添加到购物车
        this.addCart();
        //文本框值的改变
        this.valuechange();
    }

    // 添加到购物车
    addCart() {
        let goodsnum = []; //商品的数量
        let goodsid = []; //商品的编号
        //cartnum  cartsid:本地存储的key值
        function getcookie() {
            if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                goodsnum = localStorage.getItem('cartnum').split(',');
                goodsid = localStorage.getItem('cartsid').split(',');
            }
        }
        $('#cart-add-btn-sf a').on('click', () => {
            getcookie();
            if ($.inArray(this.sid, goodsid) === -1) { //第一次点击,将sid传入，取到数量直接传入
                goodsid.push(this.sid);
                localStorage.setItem('cartsid', goodsid); //存入sid
                goodsnum.push(this.count.val());
                localStorage.setItem('cartnum', goodsnum); //存入数量
            } else {
                let index = $.inArray(this.sid, goodsid); //当前sid在数组中对应的位置
                let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val()); //原来存储的值+当前的值
                goodsnum[index] = newnum; //新的数量
                localStorage.setItem('cartnum', goodsnum); //存入数量
            }
        });
    }
    //文本框值的改变
    valuechange() {
        if ($('#number_300583').val() > 1) {
            $('#reduce-sell-num').removeClass('disable');
        }
        //++
        $('#add-sell-num').on('click', function () {
            let $num = $('#number_300583').val();
            $num++;
            $('#number_300583').val($num);
            //等于value大于1的时候 减号可用
            if ($num >= 1) {
                $('#reduce-sell-num').removeClass('disable');
            }
        });
        //--
        $('#reduce-sell-num').on('click', function () {
            let $num = $('#number_300583').val();
            $num--;
            //等于value小于1的时候 减号不可用
            if ($num <= 1) {
                $num = 1;
                $('#reduce-sell-num').addClass('disable');
            }
            $('#number_300583').val($num);
        });
    }
}



// ES6

function detailsShow() {
    //放大镜效果
    new Fdj().init();
}
export {
    detailsShow
}