/*初始左侧滚动*/
mui('.lt_cateLeft').scroll({
    indicators:false
});
/*初始右侧滚动*/
var scrollRight=mui('.lt_cateRight').scroll({
    indicators:false
});
mui.init({
   pullRefresh:{
       container:".lt_cateRight",
       up:{
           height:150,
           auto:true,
           contentrefresh:"正在加载...",
           contentnomore:"没有更多数据了...",
           callback:function () {
               var that=this;
               setTimeout(function () {
                   that.endPullupToRefresh();
               },1000);
           }
       }
   }
});
$(function () {
    getFirstCategoryData(function (data) {
        $(".lt_cateLeft").find("ul").html(template("firstCategory",data));
        getSecondCategoryData({
            id:data.rows[0].id /*第一个一级分类的ID*/
        },function(data){
            $('.lt_cateRight').find('ul').html(template('secondCategory',data));
        });
    });
/*交互*/
    $('.lt_cateLeft').on('tap','ul li',function () {
        $('.lt_cateLeft').find('li').removeClass('now');
        $(this).addClass('now');
        getSecondCategoryData({
            id:$(this).data("id")
        },function(data){
            // console.log(secondCategory);
            $('.lt_cateRight').find('ul').html(template('secondCategory',data));
            scrollRight.scrollTo(0,0,100);
        });
    })
});
/*获取一级分类*/
var getFirstCategoryData=function (callback) {
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        data:{},
        dataType:"json",
        success:function (data) {
            callback && callback(data);
        }
    });
};
/*获取二级分类*/
var getSecondCategoryData=function (params,callback) {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategory",
        data: params,
        dataType: "json",
        success: function (data) {
            callback && callback(data);
            //console.log(data);
        }
    });
};