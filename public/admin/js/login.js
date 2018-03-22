$(function () {
   $("#login").bootstrapValidator({
       feedbackIcons: {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },
       fields:{
           username:{
               validators:{
                   notEmpty:{
                       message:'用户名不能为空'
                   },
                   callback:{
                       message:'用户名错误'
                   }
               }
           },
           password:{
               validators:{
                   notEmpty:{
                       message:'密码不能为空'
                   },
                   stringLength:{
                       min:6,
                       max:12,
                       message:'密码在6-12个之间'
                   },
                   callback:{//用于更新表单验证时密码时的提示消息错误状态
                       message:'密码错误'
                   }
               }

           }
       }
   }).on('success.form.bv', function (e) {//表单验证成功
       //禁用默认的提交事件，因为要使用ajax提交而不是默认的提交方式
       e.preventDefault();
       //提交逻辑
       var $form=$(e.target);//获取当前表单
       //console.log($form.serialize());//serialize();表单序列化 例：username=qqq&password=1111111
       $.ajax({
          type:'post',
          url:'/employee/employeeLogin',
          data:$form.serialize(),
          dataType:'json',
          success:function (data) {
              if (data.success){
                  //root 123456
                  location.href='index.html';
              }else{
                  //登录验证不成功时
                  //恢复可提交按钮
                  $form.data('bootstrapValidator').disableSubmitButtons(false);
                  //指定某一个表单元素的错误提示
                  if (data.error===1000){
                      $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                      $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                  }else if (data.error===1001){
                      $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                  }

              }
          }
       });
   });
   //重置表单的验证信息
    $('[type=reset]').on('click',function () {
        $('#login').data("bootstrapValidator").resetForm();
    });
});