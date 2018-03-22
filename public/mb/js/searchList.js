mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
//下拉刷新初始化
mui.init({
   pullRefresh:{
       container:".mui-scroll-wrapper",
       down:{
           callback:function () {
               /*注意：下拉操作完成之后*/

           }
       },
       up:{
           callback:function () {

           }
       }
   }
});
$(function () {
    var urlParams = lt.getUrlParams();
    var render=function () {
        var key=decodeURI(lt.getUrlParams().key||'');
        //console.log(key);
        if (key){
            $('.search_input').val(key);
            getProductListData({
                proName:key,
                page:1,
                pageSize:10
                // id:urlParams.key
            },function (data) {
                console.log(data);
                //获取成功后 渲染商品列表
                $('.lt_product').html(template('productTpl',data));
            })
        }
    };
    render();

    //当前页搜索
    $(".search_btn").on('tap',function () {
        // var arrow=$this.find('span');
        //每次搜索重置底下排序样式
        $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

        //获取搜索框中的内容
        var key=$.trim($('.search_input').val());
        //判断key是否存在
        if (!key){
            mui.toast("请输入要搜索内容");
            return false;
        }
        if (key){
            $('.lt_product').html("<div class='loading'><span class='mui-icon mui-icon-spinner'></span></div>");
        }
        getProductListData({
            proName:key,
            page:1,
            pageSize:10
            //id:urlParams.key
        },function (data) {
            //console.log(data);

            //获取成功后 渲染商品列表
            $('.lt_product').html(template('productTpl',data));
        })


    });

    //排序展示
    $('[data-type]').on('tap',function () {
       var $this=$(this);
       //$this 只是个变量名，加$是为说明其是个jquery对象。而$(this)是个转换，将this表示的dom对象转为jquery对象，这样就可以使用jquery提供的方法操作。
       var arrow=$this.find('span');
       if ($this.hasClass('now')){
           if (arrow.hasClass('fa-angle-down')){
               arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
           }else {
               arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
           }
       }else{
           $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
           $this.addClass('now');
        }
        //开始排序   注释为另一种方法
        var type=$('[data-type].now').attr('data-type');
        var value=$('[data-type].now').find('span').hasClass('fa-angle-down')?1:2;

       var order={};
            order[type]=value;
       //      console.log(order);
        //获取搜索框中的内容
        var key=$.trim($('.search_input').val());
        //判断key是否存在
        if (!key){
            mui.toast("请输入要搜索内容");
            return false;
        }
        getProductListData($.extend({
            proName:key,
            page:1,
            pageSize:10
        },order),function (data) {
            console.log(data);
            //获取成功后 渲染商品列表
            $('.lt_product').html(template('productTpl',data));
        });
        // console.log($.extend({
        //     proName:key,
        //     page:1,
        //     pageSize:10
        // },order));
    });

});
//获取后台数据 商品列表数据
var getProductListData=function (params,callback) {
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:params,
        dataType:'json',
        success:function (data) {
            // console.log(data);
           // setTimeout(function () {
                if (data.data.length===0) mui.toast('没有相关商品');
                callback&&callback(data);
           // },2000);
        }
    })
};
// $(function(){
//     /*1.初始化渲染*/
//     /*获取地址栏关键字*/
//     var key = lt.getUrlParams().key || '';
//    // console.log(decodeURI(key)===key);
//     /*显示在搜索框中*/
//     $('.search_input').val(decodeURI(key));
//     /*当前渲染页面*/
//     var currPage = 1;
//
//     /*4.优化渲染操作*/
//     /* 加载时候   关键字 排序（key=value） 当前页  页面*/
//     var render = function(callback){
//         /*获取搜索框当中的按钮*/
//         var key = $.trim($('.search_input').val());
//         /*判断是否输入了内容*/
//         if(!key){
//             mui.toast('请输入关键字');
//             return false;
//         }
//         /*获取需要排序的方式*/
//         var type = $('[data-type].now').attr('data-type');
//         var value = $('[data-type].now').find('span').hasClass('fa-angle-down')?2:1;
//         var order = {};
//         if(type){
//             order[type] = value;
//         }
//         /*显示多少条*/
//         var pageSize = 10;
//
//         /*去后台获取数据*/
//         getProductListData($.extend({
//             proName:key,
//             page:currPage,
//             pageSize:pageSize
//         },order),function(data){
//             /*渲染商品列表*/
//             if(currPage == 1){
//                 $('.lt_product').html(template('productTpl',data));
//             }else{
//                 $('.lt_product').append(template('productTpl',data));
//             }
//
//             /*成功请求的其他业务*/
//             callback && callback();
//         });
//     };
//     render();
//
//     /*2.当前页搜索*/
//     $('.search_btn').on('tap',function(){
//         /*去掉排序*/
//         $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
//         /*显示加载*/
//         $('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
//         /*当前页码*/
//         currPage = 1;
//         /*渲染*/
//         render();
//     });
//
//     /*3.排序展示*/
//     $('[data-type]').on('tap',function(){
//         /*当前点击的元素*/
//         var $this = $(this);
//         /*换箭头*/
//         if($this.hasClass('now')){
//             var arrow = $(this).find('span');
//             if(arrow.hasClass('fa-angle-down')){
//                 arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
//             }else{
//                 arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
//             }
//         }else{
//             /*给当前元素加上now*/
//             $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
//             $this.addClass('now');
//         }
//         /*当前页码*/
//         currPage = 1;
//         /*渲染*/
//         render();
//     });
//
//     mui.init({
//         /*4.下拉刷新*/
//         pullRefresh : {
//             container:".mui-scroll-wrapper",
//             down : {
//                 callback :function(){
//                     /*注意：下拉操作完成之后 业务 */
//                     /*模拟一次向后台发送请求 响应之后的时间消耗*/
//                     var that = this;/*这个是下拉组件对象  对象当中含有终止下拉操作的方法*/
//                     /*当前页码*/
//                     currPage = 1;
//                     /*开发真实的业务*/
//                     render(function(){
//                         /*下拉效果隐藏*/
//                         that.endPulldownToRefresh();
//                     });
//                 }
//             },
//             /*5.上拉加载*/
//             up : {
//                 callback:function(){
//                     /*注意：上拉操作完成之后 业务 */
//                     /*模拟一次向后台发送请求 响应之后的时间消耗*/
//                     var that = this;/*这个是上拉组件对象  对象当中含有终止下拉操作的方法*/
//                     setTimeout(function(){
//                         /*上拉效果隐藏*/
//                         /*可传参 如果传的是true 表示没有更多数据*/
//                         that.endPullupToRefresh();
//                     },1000);
//
//                     /*下一页*/
//                     currPage ++;
//                     /*开发真实的业务*/
//                     render(function(){
//                         /*上拉效果隐藏*/
//                         /*可传参 如果传的是true 表示没有更多数据*/
//                         that.endPullupToRefresh();
//                     });
//                 }
//             }
//         }
//     });
//
// });
//
// /*获取后台数据 商品列表数据*/
// var getProductListData = function(prams,callback){
//     $.ajax({
//         type:'get',
//         url:'/product/queryProduct',
//         data:prams,
//         dataType:'json',
//         success:function(data){
//             console.log(data.data);
//             /*模拟一下加载时间*/
//             setTimeout(function(){
//                 if(data.length == 0) mui.toast('没有相关商品');
//                 callback && callback(data);
//             },1000);
//         }
//     });
// }