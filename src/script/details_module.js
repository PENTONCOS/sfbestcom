// 放大镜效果+渲染数据
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
            console.log(data);
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
        this.list = $('.list ul li');
        let $num = 5;//可视的li的长度
        let $liheight = this.list.eq(0).outerHeight(true);//1个li的高度

        console.log($liheight);
        console.log(this.list.length);
        console.log(this.list);
        
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



// ES6

function detailsShow() {
    //放大镜效果
    new Fdj().init();
}
export {
    detailsShow
}