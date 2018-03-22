//初始化区域滚动插件
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});

$(function(){
    /*
     * 初始渲染
     * 1.获取数据
     * 2.动态模版渲染
     * */
    var urlParams = lt.getUrlParams();
    var render = function(){
        /*获取id*/
        getProductDetailData({
            id:urlParams.productId
        },function(data){
            console.log(data);
            $('.mui-scroll').html(template('detail',data));
            /*轮播图的初始化*/
            mui('.mui-slider').slider({
                interval:4000
            });
            /*数量选择初始化*/
            mui('.mui-numbox').numbox().setValue(1);
        });
    };
    render();

    /*点击刷新按钮，重新加载页面数据*/
    $('.mui-icon-reload').on('tap',function(){
        $('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
        render();
    });

    /*尺码选择*/
    $('.mui-scroll').on('tap','.size',function(){
        var currSize = $(this);
        $('.size').removeClass('now');
        currSize.addClass('now');
    });

    //加入购物车
    $('.mui-btn-danger').on('tap',function () {
        //防重复提交
        if (window.addCarting){
            return false;
        }
        //1.获取商品数据
        var data={
            productId:urlParams.productId,
            num:$('.mui-input-numbox').val(),
            size:$('.size.now').html()
        };
        //console.log(data);
        //数据校验
        if(!data.productId){
            mui.toast('商品异常');
            return false;
        }
        if(!data.num){
            mui.toast('请选择数量');
            return false;
        }
        // if(!data.size){
        //     mui.toast('请选择尺码');
        //     return false;
        // }
        //发送数据
        lt.ajaxFilter({
           type:'post',
           url:'/cart/addCart',
           data:data,
            dataType:'json',
           beforeSend:function () {//发送之前,记录已经开始发了
               //$.ajax请求中有一个beforeSend方法，用于在向服务器发送请求前执行一些动作。
               window.addCarting=true;//window添加属性addCarting
           },
           success:function (data) {
                //成功
                if (data.success){
                    console.log(data.success);
                    mui.toast('添加购物车成功'+'<a href="user/cart.html">去看看</a>');
                    //location.href="#",地址跳转
                }
                else {
                    mui.toast('添加购物车失败，请重试');
                }
               window.addCarting= false;
            },
           error:function () {//发送完成(错误时)
               window.addCarting= false;
           }
        });
    });
});






//获取商品详情信息
var getProductDetailData=function (params,callback) {
  $.ajax({
      type:'get',
      url:'/product/queryProductDetail',
      data:params,
      dataType:'json',
      success:function (data) {
          //模拟数据加载
          setTimeout(function () {
              callback&&callback(data);
          },500);
      }
  });
};