
$('#login').on('click',function(){
    var us=$('#us').val(),
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
            localStorage.setItem('id',data._id);
            // console.log(localStorage.getItem('id'))
            location.href='html/test.html';
        }else{
            console.log(data.msg)
        }
    }
})
}); 
//用户信息
var curId=localStorage.getItem('id');
$.ajax({
    url:'http://ajaxtest.sharingbai.top:3000/user/getInfoById',
    type:'post',
    data: {
        _id: curId
    },
    success: function(data){
        if(data.err==0){
            console.log(data);
            $('#welcome').append(data.list[0].name)
            $('#self-id').append(data.list[0]._id);
            $('#self-sex').append(data.list[0].sex);
            $('#self-tel').append(data.list[0].tel);
            $('#self-integral').append(data.list[0].integral);
            $('#self-name').append(data.list[0].name);
            $('#self-email').append(data.list[0].us);
        }else{
            console.log(data.msg)
        }
    }
})
$('#self').on('click',function(){
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/user/getInfoById',
        type:'post',
        data: {
            _id: curId
        },
        success: function(data){
            if(data.err==0){
                console.log(data);
                
            }else{
                console.log(data.msg)
            }
        }
    })
});
//修改信息
$('#self-modify').on('click',function(){
    let selfId=$('#self-id').val(),
        selfName=$('#self-name').val(),
        selfSex=$('#self-sex').val(),
        selfTel=$('#self-tel').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/user/updata',
                type:'post',
                data:{
                    _id: selfId,
                    name: selfName,
                    sex: selfSex,
                    tel: selfTel,
                },
                success: function(data){
                    if(data.err==0){
                        location.href='self.html';
                        alert('修改成功')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})
$('#self-return').on('click',function(){
    location.href='self.html'
})
//登出
$('#out').on('click',function(){
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/user/logout',
        type:'post',
        success: function(data){
            if(data.err==0){
                console.log('成功退出');
                
            }else{
                console.log(data.msg)
            }
        }
    })
})
//所有菜单
var allPage,total,pageSize;
var curPage=1;
$.ajax({
    url:'http://ajaxtest.sharingbai.top:3000/food/getInfoByPage',
    type:'post',
    data:{
        pageSize:'5',
        page: toString(curPage)
    },
    success: function(data){
        if(data.err==0){
            console.log(data);
            allPage=data.info.allpage;
            total=data.info.count;
            
            $.each(data.info.list,function(i){
                $('#a').append('<tr><td>'+data.info.list[i].name+'</td><td>'+data.info.list[i].price+'</td><td>'+data.info.list[i].desc+'</td><td>'+data.info.list[i].typename+'</td><td>'+data.info.list[i]._id+'</td></tr>');
            });
            $('#control_page').empty();
            $('#control_page').prepend(curPage+'页/共'+allPage+'页')
            // $('#a').append('<tr><td>'+data.info.list[0].name+'</td><td>'+data.info.list[0].price+'</td><td>'+data.info.list[0].desc+'</td><td>'+data.info.list[0].typename+'</td></tr>');
            
        }else{
            console.log(data.msg)
        }
    }
})
$('#gonext').on('click',function(){
    if(curPage>=1 && curPage<allPage){
        curPage+=1;
    }
    console.log(curPage)
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/food/getInfoByPage',
        type:'post',
        data:{
            pageSize:'5',
            page: JSON.stringify(curPage)
        },
        success: function(data){
            if(data.err==0 && curPage<=allPage){
                console.log(data);
                $('#a').empty();
                $.each(data.info.list,function(i){
                    $('#a').append('<tr><td>'+data.info.list[i].name+'</td><td>'+data.info.list[i].price+'</td><td>'+data.info.list[i].desc+'</td><td>'+data.info.list[i].typename+'</td><td>'+data.info.list[i]._id+'</td></tr>');
                });
                $('#control_page').empty();
                $('#control_page').prepend(curPage+'页/共'+allPage+'页')
                // $('#a').append('<tr><td>'+data.info.list[0].name+'</td><td>'+data.info.list[0].price+'</td><td>'+data.info.list[0].desc+'</td><td>'+data.info.list[0].typename+'</td></tr>');
               
            }else{
                console.log(data.msg)
            }
        }
    })                    
})
$('#gopre').on('click',function(){
    if(curPage>1 && curPage<=allPage){
        curPage+=-1;
    }
    console.log(curPage)
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/food/getInfoByPage',
        type:'post',
        data:{
            pageSize:'5',
            page: JSON.stringify(curPage)
        },
        success: function(data){
            if(data.err==0 && curPage>0){
                console.log(data);
                $('#a').empty();
                $.each(data.info.list,function(i){
                    $('#a').append('<tr><td>'+data.info.list[i].name+'</td><td>'+data.info.list[i].price+'</td><td>'+data.info.list[i].desc+'</td><td>'+data.info.list[i].typename+'</td><td>'+data.info.list[i]._id+'</td></tr>');
                });
                // $('#a').append('<tr><td>'+data.info.list[0].name+'</td><td>'+data.info.list[0].price+'</td><td>'+data.info.list[0].desc+'</td><td>'+data.info.list[0].typename+'</td></tr>');
                $('#control_page').empty();
                $('#control_page').prepend(curPage+'页/共'+allPage+'页')
            }else{
                console.log(data.msg)
            }
        }
    })                    
})
//添加菜品
$('#menu-add').on('click',function(){
    let foodName=$('#food-name').val(),
        foodPrice=$('#food-price').val(),
        foodDesc=$('#food-desc').val(),
        foodType=$('#food-type').val(),
        foodTypeid=$('#food-typeid').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/food/add',
                type:'post',
                data:{
                    name: foodName,
                    price: foodPrice,
                    desc: foodDesc,
                    typename: foodType,
                    typeid: foodTypeid
                },
                success: function(data){
                    if(data.err==0){
                        alert('添加成功')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})
//修改菜单
$('#menu-modify').on('click',function(){
    let foodName=$('#food-name2').val(),
        foodPrice=$('#food-price2').val(),
        foodDesc=$('#food-desc2').val(),
        foodType=$('#food-type2').val(),
        foodTypeid=$('#food-typeid2').val(),
        foodId=$('#food-id').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/food/updata',
                type:'post',
                data:{
                    _id: foodId,
                    name: foodName,
                    price: foodPrice,
                    desc: foodDesc,
                    typename: foodType,
                    typeid: foodTypeid
                },
                success: function(data){
                    if(data.err==0){
                        alert('修改成功')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})
//删除菜品
$('#menu-delete').on('click',function(){
    let foodId=$('#food-id2').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/food/del',
                type:'post',
                data:{
                    _id: foodId
                },
                success: function(data){
                    if(data.err==0){
                        alert('已删除')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})
//所有订单
var allPage2,total2,pageSize2;
$.ajax({
    url:'http://ajaxtest.sharingbai.top:3000/order/getInfoByPage',
    type:'post',
    data:{
        pageSize:'5',
        page: toString(curPage)
    },
    success: function(data){
        if(data.err==0){
            console.log(data);
            allPage2=data.info.allpage;
            total2=data.info.count;
            $.each(data.info.list,function(i){
                $('#b').append('<tr><td>'+data.info.list[i].food+'</td><td>'+data.info.list[i].receivables+'</td><td>'+data.info.list[i].drawee+'</td><td>'+data.info.list[i].createTime+'</td><td>'+data.info.list[i]._id+'</td></tr>');
            });
            $('#control_page2').empty();
            $('#control_page2').prepend(curPage+'页/共'+allPage2+'页')
            // $('#a').append('<tr><td>'+data.info.list[0].name+'</td><td>'+data.info.list[0].price+'</td><td>'+data.info.list[0].desc+'</td><td>'+data.info.list[0].typename+'</td></tr>');
            
        }else{
            console.log(data.msg)
        }
    }
})
$('#gonext2').on('click',function(){
    if(curPage>=1 && curPage<allPage2){
        curPage+=1;
    }
    console.log(curPage)
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/order/getInfoByPage',
        type:'post',
        data:{
            pageSize:'5',
            page: JSON.stringify(curPage)
        },
        success: function(data){
            if(data.err==0 && curPage<=allPage2){
                console.log(data);
                $('#b').empty();
                $.each(data.info.list,function(i){
                    $('#b').append('<tr><td>'+data.info.list[i].food+'</td><td>'+data.info.list[i].receivables+'</td><td>'+data.info.list[i].drawee+'</td><td>'+data.info.list[i].createTime+'</td><td>'+data.info.list[i]._id+'</td></tr>');
                });
                $('#control_page2').empty();
                $('#control_page2').prepend(curPage+'页/共'+allPage2+'页')
            }else{
                console.log(data.msg)
            }
        }
    })                    
})
$('#gopre2').on('click',function(){
    if(curPage>1 && curPage<=allPage2){
        curPage+=-1;
    }
    console.log(curPage)
    $.ajax({
        url:'http://ajaxtest.sharingbai.top:3000/order/getInfoByPage',
        type:'post',
        data:{
            pageSize:'5',
            page: JSON.stringify(curPage)
        },
        success: function(data){
            if(data.err==0 && curPage>0){
                console.log(data);
                $('#b').empty();
                $.each(data.info.list,function(i){
                    $('#b').append('<tr><td>'+data.info.list[i].food+'</td><td>'+data.info.list[i].receivables+'</td><td>'+data.info.list[i].drawee+'</td><td>'+data.info.list[i].createTime+'</td><td>'+data.info.list[i]._id+'</td></tr>');
                });
                $('#control_page2').empty();
                $('#control_page2').prepend(curPage+'页/共'+allPage2+'页')
            }else{
                console.log(data.msg)
            }
        }
    })                    
})
//添加订单
$('#order-add').on('click',function(){
    let orderName=$('#order-name').val(),
        orderPrice=$('#order-price').val(),
        orderPhone=$('#order-phone').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/order/add',
                type:'post',
                data:{
                    food: orderName,
                    receivables: orderPrice,
                    drawee: orderPhone
                },
                success: function(data){
                    if(data.err==0){
                        alert('添加成功')
                    }else{
                        alert(data.msg)
                    }
                }
            })
})
//修改订单
$('#order-modify').on('click',function(){
    let orderId=$('#order-id').val(),
        orderName=$('#order-name2').val(),
        orderPrice=$('#order-price2').val(),
        orderPhone=$('#order-phone2').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/order/updata',
                type:'post',
                data:{
                    _id: orderId,
                    food: orderName,
                    receivables: orderPrice,
                    drawee: orderPhone
                },
                success: function(data){
                    if(data.err==0){
                        alert('修改成功')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})
//删除订单
$('#order-delete').on('click',function(){
    let orderId=$('#order-id2').val();
    $.ajax({
                url:'http://ajaxtest.sharingbai.top:3000/order/del',
                type:'post',
                data:{
                    _id: orderId
                },
                success: function(data){
                    if(data.err==0){
                        alert('删除成功')
                    }else{
                        console.log(data.msg)
                    }
                }
            })
})