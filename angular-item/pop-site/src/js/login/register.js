/*
	#author		lut000
	#date 		2017/04/11
*/
require(["jquery","general","msg"],function(jquery,general,msg){
    $(function(){
        var def={
            check_src:general.def.img_href+"login/check.png",
            no_check_src:general.def.img_href+"login/n-check.png"
        };
        // 注册类型
        $(".js-check-ele").on("click",function(){
            if(!$(this).hasClass("js-now")){
                $(this).addClass("js-now").siblings("label.js-check-ele").removeClass("js-now");
                $(this).children("img").attr("src",def.check_src);
                $(this).siblings("label.js-check-ele").children("img").attr("src",def.no_check_src);
            }
        });
        // 同意协议
        $(".js-agreement").on("click",function(event){
            if(!$(this).hasClass("js-now")){
                $(this).addClass("js-now").attr("src",def.check_src);
            }else{
                $(this).removeClass("js-now").attr("src",def.no_check_src);
            }
            general.fn.stopBubble(event);
        });
        // 查看协议
        $(".js-show-agreement").on("click",function(){
            $(".js-agreement-div").fadeIn(200);
            $(".js-agreement-bg").fadeIn(400);
            setCenter();
            return false;
        });
        // 确认协议
        $(".js-agreement-btn").on("click",function(){
            if(!$(".js-agreement").hasClass("js-now")){
                $(".js-agreement").addClass("js-now").attr("src",def.check_src);
            }
            $(".js-agreement-div").fadeOut(200);
            $(".js-agreement-bg").fadeOut(400);
        });
        // 关闭协议
        $(".js-close-agreement").on("click",function(){
            $(".js-agreement-div").fadeOut(200);
            $(".js-agreement-bg").fadeOut(400);
        });
        // input判断
        $(".js-input-area").on("focus",function(){
            var tar=null;
            if($(this).hasClass("js-code") || $(this).hasClass("js-message")){
                tar=$(this).parent().next();
            }else{
                tar=$(this).next();
            }
            tar.css({"opacity":0});
        }).on("blur",function(){
            var index=$(".js-input-area").index($(this));
            var is_ok=true,txt=$(this).val();
            txt=txt.replace(/\s/g,"");
            var re=/1[1-9]+[0-9]{9}$/;
            var tar=null;
            if($(this).hasClass("js-code") || $(this).hasClass("js-message")){
                tar=$(this).parent().next();
            }else{
                tar=$(this).next();
            }
            var nlen=general.fn.getCharacterLen(txt);
            switch(index){
                case 0:
                    if(txt=="" || nlen<4 || nlen>20){
                        is_ok=false;
                    }
                    break;
                case 1:
                    if(txt=="" || nlen<6 || nlen>20){
                        is_ok=false;
                    }else{
                        var repass_val=$(".js-input-area").eq(2).val();
                        if(repass_val!=""){
                            if(repass_val!=txt){
                                $(".js-input-area").eq(2).next().css({"opacity":1});
                            }else{
                                $(".js-input-area").eq(2).next().css({"opacity":0});
                            }
                        }
                    }
                    break;
                case 2:
                    var pass_val=$(".js-input-area").eq(1).val();
                    if(txt=="" || pass_val!=txt || nlen<6 || nlen>20){
                        is_ok=false;
                    }
                    break;
                case 3:
                    if(txt=="" || nlen<4 || nlen>20){
                        is_ok=false;
                    }
                    break;
                case 4:
                    if(txt=="" || !re.test(txt)){
                        is_ok=false;
                    }
                    break;
                case 5:
                    if(txt=="" || txt.length<4){
                        is_ok=false;
                    }
                    break;
                case 6:
                    if(txt==""){
                        is_ok=false;
                    }
                    break;
                default:
                    break;
            }
            if(is_ok==true){
                tar.css({"opacity":0});
            }else{
                tar.css({"opacity":1});
            }
            $(this).val(txt);
        });
        //请求短信验证码
        $(".js-get-message").on("click",function(){
            getMessageCode($(this));
        });
        //注册
        $(".js-register-btn").on("click",function(){
            subFunc($(this));
        });
        //提交数据
        function subFunc(obj){
            var str = decodeURIComponent( $(".js-form-ele").serialize() , true );
            var data=general.fn.getLocationParameter("?"+str);
            var re=/^1[1-9]{1}[0-9]{9}$/;
            var error_eles=$(".js-error-spn");
            if(data["username"]=="" || general.fn.getCharacterLen(data["username"])<4 || general.fn.getCharacterLen(data["username"])>20){
                error_eles.eq(0).css({"opacity":1});
                return false;
            }else if(data["password"]=="" || general.fn.getCharacterLen(data["password"])<6 || general.fn.getCharacterLen(data["password"])>20){
                error_eles.eq(1).css({"opacity":1});
                return false;
            }else if(data["re_password"]=="" || data["re_password"]!=data["password"]){
                error_eles.eq(2).css({"opacity":1});
                return false;
            }else if(data["truename"]=="" || general.fn.getCharacterLen(data["truename"])<4 || general.fn.getCharacterLen(data["truename"])>20){
                error_eles.eq(3).css({"opacity":1});
                return false;
            }else if(data["cellphone"]=="" || !re.test(data["cellphone"])){
                error_eles.eq(4).css({"opacity":1});
                return false;
            }else if(data["code"]=="" || data["code"].length<4){
                error_eles.eq(5).css({"opacity":1});
                return false;
            }else if(data["message"]==""){
                error_eles.eq(6).css({"opacity":1});
                return false;
            }else if(!$(".js-agreement").hasClass("js-now")){
                pop.msg({"txt":"请认真阅读网站服务协议并同意方可注册POP会员！",btn:true});
                return false;
            }else{
                // 可以提交数据
                obj.off("click");
                obj.val("提交中...").addClass("disabled-ele");

                general.fn.subAjax({
					// header:{'Content-Type':'application/x-www-form-urlencoded'},
                    ctp:"application/x-www-form-urlencoded",
                    url:"/register.php?_a=new-account-do",
                    data:{
                        major:data["major"],
                        username:data["username"],
                        password:data["password"],
                        truename:data["truename"],
                        cellphone:data["cellphone"],
                        verifyCode:data["message"]
                    },
                    successFunc:function(data){
                        obj.on("click",function(){
                            subFunc($(this));
                        });
                        obj.val("立即注册").removeClass("disabled-ele");
                        pop.msg({"txt":"恭喜您，注册成功！立即去登录吧！",btn:true},function(){
                            window.location.href="/login.php";
                        });
                    },
                    errorFunc:function(){
                        obj.on("click",function(){
                            subFunc($(this));
                        });
                        obj.val("立即注册").removeClass("disabled-ele");
                    }
                });
            }
        };
        // 获取短信验证码
        function getMessageCode(obj){
            var str=$(".js-form-ele").serialize();
            var data=general.fn.getLocationParameter("?"+str);
            var re=/^1[1-9]{1}[0-9]{9}$/;
            var error_eles=$(".js-error-spn");
            if(data["cellphone"]=="" || !re.test(data["cellphone"])){
                error_eles.eq(4).css({"opacity":1});
            }else if(data["code"]=="" || data["code"].length<4){
                error_eles.eq(5).css({"opacity":1});
            }else{
                obj.off("click").addClass("disabled-ele");
                obj.text("发送中...");
                general.fn.subAjax({
                    url:"/asyncRequest.php",
                    // header:{'Content-Type':'application/x-www-form-urlencoded'},
					ctp:"application/x-www-form-urlencoded",
                    data:{m:"checkFree",o:"sendMessage",freeCellphone:data["cellphone"],major:data["major"],checkimg_code:data["code"]},
                    successFunc:function(data){

                        obj.text("60\" 重新获取");

                        var timer=null;
                        timeFn(60);

                        function timeFn(num){
                            timer=setTimeout(function(){
                                clearTimeout(timer);
                                num--;
                                if(num<1){
                                    obj.on("click",function(){
                                        getMessageCode($(this));
                                    });
                                    obj.text("免费获取").removeClass("disabled-ele");
                                }else{
                                    obj.text(num+"\" 重新获取");
                                    timeFn(num);
                                }
                                
                            },1000);
                        }
                    },
                    errorFunc:function(){
                        obj.on("click",function(){
                            getMessageCode($(this));
                        });
                        obj.text("免费获取").removeClass("disabled-ele");
                    }
                });
            }
        }
        $(window).on("resize",function(){
            setCenter();
        });
        //设置居中
        function setCenter(){
            var ele1=$(".js-agreement-div"),ele2=ele1.children("div");
            var oh=document.documentElement.clientHeight || document.body.clientHeight;
            ele2.height(oh*0.56+"px");
            var nh=ele1.height();
            ele1.css({"top":(oh-nh)/2+"px"})
        }
    });
});