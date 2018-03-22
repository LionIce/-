//进度条功能
//不显示加载的进度环
NProgress.configure({
   showSpinner:false
});
//在ajax开始的时候启动进度条
$(window).ajaxStart(function () {
   NProgress.start();
});
//在ajax结束的时候完成进度条
$(window).ajaxStop(function () {
    NProgress.done();
});
//左菜单的显示和隐藏
$('[data-menu]').on('click',function () {
   $('.ad_aside').toggle();
   $('.ad_section').toggleClass('menu');
});
//退出功能
// $('[data-logout]').on('click',function () {
//    //构建模态框
//     var logoutModal =
//         '<div class="modal fade" id="logoutModal">'+
//         '<div class="modal-dialog modal-sm">'+
//         '<div class="modal-content">'+
//         '<div class="modal-header">'+
//         '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
//         '<h4 class="modal-title">温馨提示</h4>'+
//         '</div>'+
//         '<div class="modal-body">'+
//         '<p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>'+
//         '</div>'+
//         '<div class="modal-footer">'+
//         '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
//         '<button type="button" class="btn btn-primary">确定</button>'+
//         '</div>'+
//         '</div>'+
//         '</div>'+
//         '</div>';
//     $('body').append(logoutModal);
//     $('#logoutModal').modal('show');
//     $('#logoutModal').off('click','.btn-primary').on('click','.btn-primary',function () {
//         $.ajax({
//             type:'get',
//             url:'/employee/employeeLogout',
//             data:{},
//             dataType:'json',
//             success:function (data) {
//                 if (data.success){
//                     location.href='login.html';
//                 }
//             }
//         })
//     })
// });