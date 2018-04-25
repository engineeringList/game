$(function (){
    $(window).on("resize",function(){
		$("html").css("fontSize",$(window).width()/6.4);
    }).resize();
    
    $.mAlert("aaaaaaaaaaa")

    $(".yuyue").touchClick(function (){
        console.log("22222222")
    })

    $.touchSlider({
        slideCell: "#slideshow1",
        titCell: "#slideshow1 .hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell: "#slideshow1 .bd ul",
        effect: "left",
        autoPlay: true, //自动播放
        autoPage: true //自动分页
    });


    $(".yuyue").touchClick(function (){
        $.backgroundShow();
        setTimeout(function (){
            $(".moduleTan").addClass("active").show();
        },200)
    })

    $("body").touchClick("#backgroundDiv" ,function (){
        setTimeout(function (){
            $.backgroundHide();
            $(".phone").val("");
            $(".code").val("");
            $(".verificationCode").text("获取验证码");
        } , 200)
        $(".moduleTan").hide();
    })

    // 手机ios 和安卓 选择
    $(".selePhone li").touchClick(function (){
        $(this).addClass("active").siblings().removeClass("active");
    })

    // 视频弹层 交互
    var html = '<div>' +
                    '<video controls="controls" src="https://crazynote.v.netease.com/2017/1218/e5634fa4ed5f4f396e0e151fba098c55qt.mp4"autoplay="autoplay" style="background-color: black;">' +
                        '<source src="https://crazynote.v.netease.com/2017/1218/e5634fa4ed5f4f396e0e151fba098c55qt.mp4" type="video/mp4">'
                        '</video>'+
                '</div>';

    $(".ad1Video").touchClick(function() {
        $.backgroundShow();
        $("#videoBox").html(html);
        $("#videoContainer").show();
    });
     $("#videoCloseBtn").touchClick(function() {
        $("#videoBox").html("");
        $("#videoContainer").hide();
        $.backgroundHide();
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
            $.alert(data.msg);
            if(data.code == 1){
                $('.moduleTan').hide();
                $.backgroundHide();
                $(".phone").val("");
                $(".code").val("");
                $(".verificationCode").text("获取验证码");
            }
            $(".sumbitBtn").removeClass("active");
            falg = false;
        })
    })
})