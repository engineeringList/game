;$(function (){
    // $(window).on("resize",function(){
	// 	$("html").css("fontSize",$(window).width()/19.2);
	// }).resize();

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

    // 立即预约弹层 交互
    $(".moduleTan  .closeBtn").on("click" ,function (){
        $(".moduleTan").hide();
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
        $.backgroundShow();
        $("#videoBox").html(html);
        $("#videoContainer").show();
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

    function dingshiqi(obj){
		var pro = {
			target : "",   //目标DOM元素 非JQ元素
			timeSum : 60,  //倒计时的起始事件
			text: "重新发送", //倒计时读秒完成后的文案
            clickFun : "",//当前DOM 元素点击时的 执行方法
            afterFun : "" //定时器执行完成后的方法
		};

        var  timerTask ={
            // 倒计时开始执行 的方法
            timerStart : function (){
                flag = false;
                var timer = setInterval(function (){
                    step = step - 1;
                    _target.text(step + "秒");

                    if(step <= 0){
                        clearInterval(timer);
                        _target.text(pro.text);
                        flag = true;
                        step = pro.timeSum;

                        $(pro.target).one("click" ,clickDone);

                        $.isFunction (pro.afterFun) && pro.afterFun();
                    }
                },1000);
            },
            init : function (){
                $(pro.target).one("click" ,clickDone);
            }
        }

		$.extend(pro , obj);

		var flag = true ; // 节流阀
		var step = pro.timeSum;
		var _target = $(pro.target);

		$(pro.target).one("click" ,clickDone);

        function clickDone(){
            if(flag) {
                pro.clickFun(timerTask);
            }
        }
	}

    $.dingshiqi({
        target : ".verificationCode",
        clickFun: function (timerTask){
            var _phone = $(".phone").val();
            if (!_phone || !$(".phone_ipt").val().isPhone()){
                return $.alert("请输入正确的手机号");
            }

            $.get("/api/sendSms?mobile=" + _phone + "&callback=?", function (data){
                console.log(data);
                //倒计时开始
                if( d.code != 1){
                    timerTask.init();
                    $.alert(d.msg);
                    yanzhengma();
                }	
                if( d.code == 1){
                    $('.dongtai_ipt').val('');
                    timerTask.timerStart();
                }
            })
        },
        afterFun: function (){
            yanzhengma();
            
        }
    });
})