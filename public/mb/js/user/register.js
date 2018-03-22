$(function () {
    $(".mui-btn-primary").on('tap',function () {
        var data={
            username:$('[name="username"]').val(),
            password:$('[name="password"]').val(),
            mobile:$('[name="mobile"]').val()
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
        if (!data.mobile){
            mui.toast('请输入手机号');
            return false;
        }
        if (!(data.mobile.length===11)){
            mui.toast('请输入11位手机号');
            return false;
        }
        /*发送数据*/
        $.ajax({
            type:'post',
            url:'/user/register',
            data:data,
            dataType:'json',
            success:function (data) {
                if (data.success){
                    location.href='../index.html';
                }else {
                    mui.toast('注册失败！');
                }
            },
            error:function () {
                mui.toast('服务繁忙！');
            }
        })
    })
});
