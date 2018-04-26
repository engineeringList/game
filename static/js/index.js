;$(function (){

    // 游戏特色图片 hover 时交互
    $(".accordion-item .s-img").mouseover(function() {
        $(this).parent().addClass("active").siblings().removeClass("active")
    })

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

    $.get("/api/subscribe/count?callback=?" ,function (data){
        if(data.code == 1) {
            $(".ad1YuyueBtnNum").text(data.data.count)
        }
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

    // 视频弹层 交互
    var html = '<div style="position:relative;left:0;top:0;display:inline-block;width:850px;height:470px">' +
                    '<video controls="controls" src="https://crazynote.v.netease.com/2017/1218/e5634fa4ed5f4f396e0e151fba098c55qt.mp4" width="850" height="470" autoplay="autoplay" style="background-color: black;">' +
                        '<source src="https://crazynote.v.netease.com/2017/1218/e5634fa4ed5f4f396e0e151fba098c55qt.mp4" type="video/mp4">'
                        '</video>'+
                '</div>';

    $(".ad1Video").click(function() {
        // $.backgroundShow();
        // $("#videoBox").html(html);
        // $("#videoContainer").show();
        $.alert("视频制作中，敬请期待");
    });
     $("#videoCloseBtn").click(function() {
        $("#videoBox").html("");
        $("#videoContainer").hide();
        $.backgroundHide();
    })


    $(".ad3Round1").on("click" ,function (){
        $(this).addClass("active").siblings().removeClass("active");
        moveTo(0)
    });
    $(".ad3Round2").on("click" ,function (){
        var scrollTarget = $(".ad2").offset().top;
        $(this).addClass("active").siblings().removeClass("active");
        moveTo(scrollTarget);
    });

    $(".ad3Round3").on("click" ,function (){
        var scrollTarget = $("footer").offset().top;
        $(this).addClass("active").siblings().removeClass("active");
        moveTo(scrollTarget);
    });

    // 滑屏 函数
	function moveTo(target) {
		var _now = $(document).scrollTop();
		var upOrDown = target - _now;  // 判断方向
        var scroDIST;      //每次滚动的距离(单位：px)  
		var stime = 1;         //每次滚动花费时间(单位：毫秒)
		
		upOrDown > 0 ?  (scroDIST = 20) : (scroDIST = -20);

		var d = setInterval(function () {  
			window.scrollTo(_now, _now + scroDIST);  
			_now = _now + scroDIST;  
  
			if((upOrDown > 0 && _now >= target) || (upOrDown < 0 &&  _now <= target) ) {
				clearInterval(d);  
			}

		}, stime);  
    }

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