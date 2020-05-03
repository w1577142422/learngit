
$('#login').on('click',function(){
        var storage=window.localStorage,
            us=$('#us').val(),
            ps=$('#ps').val();
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/user/login',
        type:'post',
        data:{
            us: us,
            ps: ps
        },
        success: function(data){
            if(data.err==0){
                console.log('yes');
                storage.id=data._id;
                console.log()
                location.href='test.html';
            }else{
                console.log(data.msg)
            }
        }
    })
});
$("body").keydown(function() {
    if (event.keyCode == "13") {
      
    }
  });
// 主页 
