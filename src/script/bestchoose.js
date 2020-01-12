
;
(function ($) {
    class render {
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

    new render().init();
})(jQuery);

