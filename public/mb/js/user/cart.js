$(function () {
    //初始化下拉刷新
    mui.init({
        pullRefresh:{
            //要下拉的组件容器
            container:".mui-scroll-wrapper",
            //下拉
            down:{
                //默认下拉一次
                auto:true,
                //下拉操作后的回调函数
                callback:function () {
                    //当前下拉组件
                    var that=this;
                    getCartData(function (data) {
                        //console.log(data);
                        //展示商品
                        $('.mui-table-view').html(template('cart',data));
                        //清除下拉效果
                        that.endPulldownToRefresh();
                    })
                }
            }
        }
    });
    //删除商品
    $('.mui-table-view').on('tap','.mui-btn-red',function () {
        var id=$(this).attr('data-id');
        mui.confirm('您是否确定删除？','温馨提示',['确定','取消'],function (e) {
            if (e.index===0){
                //向后台发送删除商品请求
                lt.ajaxFilter({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{id:id},
                    dataType:'json',
                    success:function (data) {
                        if (data.success){
                            getCartData(function (data) {
                                //console.log(data);
                                //展示商品
                                $('.mui-table-view').html(template('cart',data));
                            })
                        }
                    }
                })
            }else {

            }
        })
    });
    //编辑商品
    $('.mui-table-view').on('tap','.mui-btn-blue',function () {
        //疑问点？
        var id=$(this).attr('data-id');
        var size=$(this).attr('data-size');
        var num=$(this).attr('data-num');
        //replace(/\n/g,'')替换标签中的换行为空格
        //console.log(this.dataset);
        //使用dataset访问你自定义的data属性
        var data=this.dataset;
        mui.confirm(template('edit',this.dataset).replace(/\n/g,''),'编辑商品',['确定','取消'],function (e) {
            if (e.index===0){
                lt.ajaxFilter({
                    type:'post',
                    url:'/cart/updateCart' ,
                    data:{
                        id:data.id,
                        size:$('.lt_cart_edit span.now').html(),
                        num:$('.mui-numbox input').val()
                    },
                    dataType:'json',
                    success:function (data) {
                        if (data.success){
                            getCartData(function (data) {
                                //console.log(data);
                                $('.mui-table-view').html(template('cart',data));
                            })
                        }
                    }
                })
            }
        });
        //重新初始化数量选择，不然无法进行数量操作
        mui('.mui-numbox').numbox();
        // //初始化尺码选择，不然无法进行尺码选择操作
        // $('.lt_cart_edit').on('tap','span',function () {
        //     $('.lt_cart_edit span').removeClass('now');
        //     $(this).addClass('now');
        // });
    });
    //价格计算
    // $('input[type=checkbox]').change(function () {
    //     console.log(a);
    // })
    $('.mui-table-view').on('change','input',function () {
        setAmount();
    });
});
var getCartData=function (callback) {
    lt.ajaxFilter({
        type:'get',
        url:'/cart/queryCartPaging',
        //data:data,
        data:{
            page:1,
            pageSize:100
        },
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
};
var setAmount=function () {
    var amount=0;
    $('input:checked').each(function () {
        var num=$(this).attr('data-num');
        var price=$(this).attr('data-price');
        amount+=num*price;
    });
    $('.lt_cart span').html(Math.floor(amount*100)/100);

};

