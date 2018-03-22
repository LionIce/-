/*区域滚动*/
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
/*封装工具函数*/
window.lt = {};
/*获取地址栏参数*/
lt.getUrlParams = function(){
    /*拿到以get形式传递的地址栏的数据 ?key=1&name=10*/
    var search = location.search;
    /*需要把字符串转换成对象  便于开发使用*/
    var params = {};
    /*如果有？代表有参数*/
    /*没有问号就没有参数*/
    if(search.indexOf('?') === 0){
        search = search.substr(1);//去掉字符串第一个字符'?'
        var arr = search.split('&');
        for(var i = 0 ; i < arr.length ; i++){
            /*itemArr name=10  ----> [name,10]*/
            var itemArr = arr[i].split('=');//以=分隔
            params[itemArr[0]] = itemArr[1];//-->{key:"2"};
        }
    }
    return params;
};
//登陆拦截 凡是需要登陆的操作 调用
lt.ajaxFilter=function (options) {
  $.ajax({
      type:options.type||'get',
      url:options.url||location.pathname,
      data:options.data||{},
      dataType:options.dataType||'json',
      beforeSend:function () {
          options.beforeSend && options.beforeSend();
      },
      success:function (data) {
          if (data.error===400){
              location.href='/mb/user/login.html?returnUrl='+location.href;
          }else {
              options.success && options.success(data);
          }
      },
      error:function () {
          options.error && options.error();
      }
  })  ;
};
/*轮播图*/
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//查询个人信息
lt.queryUserMessage=function (params,callback) {
  $.ajax({
      type:'get',
      url:'/user/queryUserMessage',
      data:{},
      dataType:'json',
      success:function (data) {
          callback&&callback(data);
      }
  })
};

// if(!lt) var lt = {};
/*常用地址*/
lt.LOGIN_URL = '/mobile/user/login.html';
lt.SEARCH_LIST_URL = '/mobile/searchList.html';
lt.CART_URL = '/mobile/cart.html';
lt.USER_URL = '/mobile/user/';

/*全局ajax工具函数*/
lt.ajax = function(options){
    if(!options.url) return false;
    $.ajax({
        url:options.url,
        type:options.type||'post',
        data:options.data||'',
        dataType:options.dataType||'json',
        timeout:options.timeout||50000,
        beforeSend:function(){
            options.beforeSend && options.beforeSend();
        },
        success:function(data){
            /*400代表未登录*/
            if(data && data.error == '400'){
                window.location.href = LeTao.LOGIN_URL+'?returnUrl='+decodeURI(location.href);
                return false;
            }
            setTimeout(function(){
                options.success && options.success(data);
            },1000);
        },
        error:function(xhr,type,errorThrown){
            mui.toast('服务繁忙');
            options.error && options.error({xhr:xhr,type:type,errorThrown:errorThrown});
        }
    });
};
lt.getObjectFromId = function(arr,id){
    var object = null;
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i];
        if(item && item.id == id){
            object = item;
            break;
        }
    }
    return object;
};