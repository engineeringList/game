$(function (){

    // QQ微博 小图标切换
    var _qq =  $(".attention2 .QQ");
    var _weibo =  $(".attention2 .weibo");
    var _ErweimaQQ =  $(".attention2 .attention2ErweimaQQ");
    var _ErweimaWeibo =  $(".attention2 .attention2ErweimaWeibo");
    _qq.on("click" ,function (){
        $(this).addClass("on")
        _weibo.removeClass("on");
        _ErweimaQQ.addClass("on");
        _ErweimaWeibo.removeClass("on");
    })
    _weibo.on("click" ,function (){
        $(this).addClass("on")
        _qq.removeClass("on");
        _ErweimaWeibo.addClass("on");
        _ErweimaQQ.removeClass("on");
    })

    //分页 
    // page 分页点击
	$("#pages").on("click","a",function(event){
		event.preventDefault();
		
		var _thatHref = $(this).attr("href");

        //交互填充 拼接参数 请求数据 
        console.log(_thatHref);
	});



    // 立即预约弹层 交互
    $(".ad1YuyueBtn").on("click" ,function (){
        $.backgroundShow();
        setTimeout(function (){
            $(".moduleTan").addClass("active").show();
        },200)
    });

    $(".ad1YaoqingBtn").on("click" ,function (){
        $.backgroundShow();
        $(".yanqingTan").show();
    });

    $(".yanqingTanClose").on("click",function (){
        $(this).parent().hide();
        setTimeout(function (){
            $.backgroundHide();
        },200);
    })
    

    // 立即预约弹层 交互
    $(".moduleTan  .closeBtn").on("click" ,function (){
        $(".moduleTan").hide();
        setTimeout(function (){
            $.backgroundHide();
            $(".phone").val("");
            $(".code").val("");
            $(".verificationCode").text("获取验证码");
        } , 200)
    })

    $(".closeBtn2").on("click" ,function (){
        $(".moduleTanSecc").hide();
        setTimeout(function (){
            $.backgroundHide();
        } , 200)
    })

    // 手机ios 和安卓 选择
    $(".selePhone li").on("click" ,function (){
        $(this).addClass("active").siblings().removeClass("active");
    })

    $.dingshiqi({
        target : ".verificationCode",
        clickFun: function (timerTask){
            var _phone = $(".phone").val();
            if (!_phone || !$(".phone").val().isPhone()){
                timerTask.init();
                return $.alert("请输入正确的手机号");
            }

            $.get("/api/sendSms?mobile=" + _phone + "&callback=?", function (data){
                console.log(data);
                //倒计时开始
                if( data.code != 1){
                    timerTask.init();
                    $.alert(data.msg);
                }	
                if( data.code == 1){
                    $('.verificationCode').addClass("prohibited");
                    timerTask.timerStart();
                }
            })
        },
        afterFun: function (){
            $('.verificationCode').removeClass("prohibited");
        }
    });
    // 预约 提交
    var falg = false; 
    $(".sumbitBtn").on("click" , function (){
        if (falg){
            return;
        }

        var _phone = $(".phone").val();
        var _code = $(".code").val();
        var _type = $(".selePhone").find(".active").data("phonetype");
        if (!_phone || !$(".phone").val().isPhone()){
            return $.alert("请输入正确的手机号");
        }
        falg = true;
        $(this).addClass("active");

        $.get("/api/subscribe?mobile="+ _phone + "&code=" + _code + "&type="+ _type, function (data){
            
            if(data.code == 1){
                $('.moduleTan').hide();
                $(".phone").val("");
                $(".code").val("");
                $(".verificationCode").text("获取验证码");

                

                $(".jihuoma").text(data.data.num);
                $(".moduleTanSecc").show();
                // $.backgroundHide();
            }else {
                $.alert(data.msg);
            }
            
            $(".sumbitBtn").removeClass("active");
            falg = false;
        })
    })
})