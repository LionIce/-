/*初始化区域滚动组件*/
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
/*轮播图的初始化*/
mui('.mui-slider').slider({
    interval:4000
});


$(function () {
    querySecondCategory({
        id:1
    },function (data) {
        console.log(data);
        $(".mui-scroll .lt_product").html(template("firstList",data));
    })
});
var querySecondCategory=function (params,callback) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:params,
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    });
};