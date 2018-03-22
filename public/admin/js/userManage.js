$(function () {
   var currPage=1;
   var render=function () {
     userData({
         page:currPage,
         pageSize:5
     },function (data) {
        $('tbody').html(template('list',data));

        setPaginator(data.page,Math.ceil(data.total/data.size),render);
         // setPaginator(data.page,Math.ceil(data.total/data.size));
     })
   };
   render();

    //分页,注释代码为另一种方法
    var setPaginator=function (pageCurr,pageSum,callback) {
        // var setPaginator=function (pageCurr,pageSum) {
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion:3,
            size:'small',
            currentPage:pageCurr,
            totalPages:pageSum,
            onPageClicked:function (event,originalEvent,type,page) {
                currPage=page;
                callback &&callback();
                //render();
            }
        })
    };
    //启用用户
    $('tbody').on('click','.btn',function () {
        var id=$(this).data('id');
        var name=$(this).data('name');
        var isDelete=$(this).hasClass('btn-danger')?0:1;
        //显示模态框
        $('#optionModal').find('strong').html(($(this).hasClass('btn-danger')?'禁用':'启用')+name);
        $('#optionModal').modal('show');
        $('#optionModal').off('click','.btn-primary').on('click','.btn-primary',function () {
            //发送请求
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function (data) {
                    if (data.success){
                        render();
                        $('#optionModal').modal('hide');
                    }
                }
            })
        });
    });
});



//获取数据
var userData=function (params,callback) {
  $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:params,
      dataType:'json',
      success:function (data) {
          //console.log(data);
          callback && callback(data);
      }
  })
};