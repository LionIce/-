/*初始化区域滚动插件*/
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});
$(function () {
    var historyList=getHistoryData();
    $('.lt_history').html(template('historyTpl',{list:historyList}));
    $('.search_input').val('');
    //点击搜索
    $('.search_btn').on('tap',function () {
        var key=$.trim($('.search_input').val());
        if (!key){
            mui.toast('请输入关键字');
            return false;
        }
        //记录这一次的搜索
        var arr=getHistoryData();
        var isHave=false;
        var haveIndex;
        for (var i=0;i<arr.length;i++){
            if (key===arr[i]){
                isHave=true;
                haveIndex=i;
                break;
            }
        }
        if (isHave){
            arr.unshift(key);
            arr.splice(haveIndex+1,1);
        }else {
            if (arr.length<10){
                arr.unshift(key);
            }else {
                arr.unshift(key);
                //清除第一条
                arr.splice(haveIndex+1,1);
            }
        }
        console.log(haveIndex);
        //arr.push(key);
        //arr=arr.reverse();

        //存储
        localStorage.setItem('leTaoHistory',JSON.stringify(arr));//stringify()用于从一个对象解析出字符串
        //跳转搜索列表
        location.href='searchList.html?key='+key;
    });

    //删除操作
    $('.lt_history').on('tap','.mui-icon',function () {

        var index=$(this).attr('data-index');
        var arr=getHistoryData();
        arr.splice(arr.indexOf(index),1);
        localStorage.setItem('leTaoHistory',JSON.stringify(arr));
        //arr.reverse();
        $('.lt_history').html(template('historyTpl',{list:arr}));
    });
    //清空操作
    $('.lt_history').on('tap','.fa',function () {
        localStorage.setItem('leTaoHistory','');
        $('.lt_history').html(template('historyTpl',{list:[]}));
    })
});
/*获取存储数据*/
var getHistoryData = function () {
    var str=localStorage.getItem('leTaoHistory')||'[]';//读取保存在localStorage对象里名为leTaoHistory的变量的值，
    var arr=JSON.parse(str);//JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。
    console.log(arr);
    return arr;
};