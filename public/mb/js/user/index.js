$(function () {
    lt.queryUserMessage({

    },function (data) {
        console.log(data);
        $('.love').html(template('personage',data));
    });
    //登出功能
    $('[data-logout]').on('tap',function () {
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:{},
            dataType:'json',
            success:function (data) {
                if(data.success){
                    location.href='login.html'
                }
            }
        })
    });
});