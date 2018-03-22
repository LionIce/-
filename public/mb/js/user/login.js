$(function () {
    $(".mui-btn-primary").on('tap',function () {
        if (window.login){
            return false;
        }
        /*获取数据*/
        var data={
            username:$('[name="username"]').val(),
            password:$('[name="password"]').val()
        };
        /*校验数据*/
        if (!data.username){
            mui.toast('请输入用户名');
            return false;
        }
        if (!data.password){
            mui.toast('请输入密码');
            return false;
        }
        /*发送数据*/
        $.ajax({
            type:'post',
            url:'/user/login',
            data:data,
            dataType:'json',
            beforeSend:function () {
                window.login=true;
            },
            success:function (data) {
                if (data.success){
                    /*回跳*/
                    if (location.search&&location.search.indexOf('?returnUrl=')>-1){
                        var returnUrl=location.search.replace('?returnUrl=','');
                        location.href=returnUrl;
                    }
                    /*首页*/
                    else {
                        location.href='/mb/user/index.html';
                    }
                }else {
                    mui.toast('登陆失败！');
                }
                window.login=false;
            },
            error:function () {
                mui.toast('服务繁忙！');
                window.login=false;
            }
        })
    })
});