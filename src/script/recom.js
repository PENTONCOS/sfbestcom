;
(function ($) {
    class render {
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

    new render().init();
})(jQuery);