$(function () {
    var currPage=1;
    var render=function () {
        getCategorySecond({
            page:currPage,
            pageSize:5
        },function (data) {
            $('tbody').html(template('template',data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render);
        })
    };
    render();

    var setPaginator = function(pageCurr,pageSum,callback){
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion:3,
            size:'small',
            currentPage:pageCurr,
            totalPages:pageSum,
            onPageClicked:function (event,originalEvent,type,page) {
                currPage=page;
                callback && callback();
            }
        })
    };

    //添加二级分类模态框
    $('#addBtn').on('click',function () {
        $('#addModal').modal('show');
    });
    //初始化模态框
    initDropDown();
    initUpload();
});
//校验信息
$('#form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    /*设置校验属性*/
    excluded:[],
    fields:{
        categoryId:{
            validators: {
                notEmpty: {
                    message: '一级分类名称不能为空'
                }
            }
        },
        brandName:{
            validators: {
                notEmpty: {
                    message: '二级分类名称不能为空'
                }
            }
        },
        brandLogo:{
            validators: {
                notEmpty: {
                    message: 'LOGO分类名称不能为空'
                }
            }
        }
    }
}).on('success.form.bv',function (e) {
    e.preventDefault();

});



//获取数据
var getCategorySecond=function (params,callback) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:params,
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
};

//下拉选择
var initDropDown=function () {
  var $dropDown=$('.dropdown-menu');
  $.ajax({
     type:'get',
     url:'/category/queryTopCategoryPaging',
      data:{
         page:1,
          pageSize:100
      },
      dataType:'json',
      success:function (data) {
          var html=[];
          console.log(data);
          $.each(data.rows,function (i,item) {//遍历处理data，可以是数组、DOM、json等，取决于直接给定或者ajax返回的类型,function (index, value)中index是当前元素的位置，value是值。
              html.push('<li><a data-id="'+item.id+'" href="javascript:;">'+item.categoryName+'</a></li>');
          });
          $dropDown.html(html.join(''));
      }
  });
  $dropDown.on('click','a',function () {
      $('.dropdown-text').html($(this).html());
      $('[name="categoryId"]').val($(this).data('id'));
      $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
};
//图片上传
var initUpload=function () {
  $('[name="pic1"]').fileupload({
      dataType:'json',
      done:function (e, data) {
          $(this).parent().parent().next().find('img').attr('src',data.result.picAddr);
          $('[name="brandLogo"]').val(data.result.picAddr);
          $('#from').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
  })
};