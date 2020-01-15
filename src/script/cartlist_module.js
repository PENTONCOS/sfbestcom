
//渲染物品列表
class RenderList {
    constructor() {
        this.list = $('.cartList ');
        this.href = 'http://10.31.152.15/JS1912/sfbestcom/src/details.html?sid=';
    }
    init() {
        //获取本地存储
        if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
            let csid = localStorage.getItem('cartsid').split(','); //sid
            let cnum = localStorage.getItem('cartnum').split(','); //数量
            for (let i = 0; i < csid.length; i++) {
                this.render(csid[i], cnum[i]);
            }
        }
        //全选
        this.allselect();
        //文本框值的改变
        this.valuechange()
    }
    //渲染数据
    render(sid, num) {
        $.ajax({
            url: 'http://10.31.152.15/JS1912/sfbestcom/php/data_sfbest.php',
            dataType: 'json'
        }).done((data) => {
            // console.log(data);
            $.each(data, (index, value) => {
                if (sid === value.sid) {
                    let $clonebox = $('.cartItem:hidden').clone(true, true);
                    $clonebox.find('.cart_pimg a').attr('title', value.title);
                    $clonebox.find('.cart_pimg a').attr('href', (this.href + value.sid));
                    $clonebox.find('.cart_pimg a img').attr('src', value.url);
                    $clonebox.find('.cart_pimg a img').attr('sid', value.sid);//给img一个独一无二的标签sid属性
                    $clonebox.find('.cart_pname a').html(value.title);
                    $clonebox.find('.cart_pname a').attr('title', value.title);
                    $clonebox.find('.cart_pname a').attr('href', (this.href + value.sid));
                    $clonebox.find('.spree_p10 strong').html(value.price);
                    $clonebox.find('.pAmount').val(num);
                    $clonebox.find('.pWeight').html(value.weight * num + 'kg');
                    $clonebox.find('#total_price').html((value.price * num).toFixed(2));
                    $clonebox.show();
                    $('.cartList ').append($clonebox);
                    this.allprice();
                }
            })
        });
    }

    //计算总价+总重量
    allprice() {
        let $all_goods_sum = 0; //全部商品的总价
        let $all_weight_sum = 0; //全部商品的总价
        $('.cartItem:visible').each(function (index, element) {
            if ($(element).find('input:checkbox').is(':checked')) {

                $all_goods_sum += parseFloat($(element).find('#total_price').html());
                // $all_weight_sum += parseFloat($(element).find('.pWeight').html()*$(element).find('.cartAmount .pAmount').val());
                $all_weight_sum += parseFloat($(element).find('.pWeight').html());
                $all_weight_sum += parseFloat($(element).find('.cartAmount .pAmount').val());
                // console.log($all_weight_sum);
            }
        });
        //总重量
        $('#allWeight').html($all_weight_sum + 'kg');
        //总价
        $('#allMoney2').html('￥' + $all_goods_sum);
    }

    //全选
    allselect() {
        $('.selectAll').on('change', () => {

            $('.cartItem:visible').find('input:checkbox').prop('checked', $('.selectAll').prop('checked'));
            this.allprice(); //求和
        });
        let $checkinput = $('.selectAll:visible').find('input:checkbox'); //委托的元素。
        $('.cartList ').on('click', $checkinput, () => {
            let $inputs = $('.cartItem:visible').find('input:checkbox');
            if ($('.cartItem:visible').find('input:checked').length === $inputs.length) {
                $('.selectAll').prop('checked', true);
            } else {
                $('.selectAll').prop('checked', false);
            }
            this.allprice(); //求和
        });
    }

    //文本框值的改变
    valuechange() {
        //++
        $('.up').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            $(this).prev('input').val($num);
            $(this).parents('.cartItem').find('.pSubtotal span').html(singleprice($(this))); //求单价
            local($(this).parents('.cartItem').find('.cart_pimg img').attr('sid'), $num); //存储数量
            // $(this).parents('.cartItem').find('.pWeight').html((* $num + 'kg');

        });

        //--
        $('.down').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;
            }
            $(this).next('input').val($num);
            $(this).parents('.cartItem').find('.pSubtotal span').html(singleprice($(this)));
            local($(this).parents('.cartItem').find('.cart_pimg img').attr('sid'), $num);
        });

        //直接输入
        $('.cartAmount input').on('input', function () {
            let $reg = /^\d+$/;
            let $inputvlaue = $(this).val();
            if ($reg.test($inputvlaue)) {
                if ($inputvlaue < 1) {
                    $(this).val(1)
                } else {
                    $(this).val($inputvlaue)
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.cartItem').find('.pSubtotal span').html(singleprice($(this)));

            local($(this).parents('.cartItem').find('.cart_pimg img').attr('sid'), $(this).val());
        });
        //封装计算单价
        function singleprice(obj) {
            // let $dj = parseFloat(obj.parents('.cartItem').find('.pSubtotal span').html());
            let $dj = parseFloat(obj.parents('.cartItem').find('.spree_p10 span strong').html());
            let $count = parseFloat(obj.parents('.cartItem').find('.pQuantity .cartAmount input').val());
            return $dj * $count.toFixed(2);
        }

        //改变数量--重新本地存储。
        //通过sid获取数量的位置，将当前改变的值存放到对应的位置。
        function local(sid, value) { //sid:当前的索引   value：数量
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                let arrsid = localStorage.getItem('cartsid').split(',');
                let arrnum = localStorage.getItem('cartnum').split(',');
                let index = $.inArray(sid, arrsid); //sid在数组中的位置索引。
                arrnum[index] = value;
                localStorage.setItem('cartnum', arrnum.toString());
            }
        }
    }

}


function cartlistShow() {
    new RenderList().init();
}
export {
    cartlistShow
}