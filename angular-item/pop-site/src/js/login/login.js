/*
	#author		lut000
	#date 		2017/10/26
	#purpose 	登录
*/
require(["jquery","general","msg"],function(jquery,general){
	$(function(){
		// pop.msg({"txt":"欢迎登录pop！"},1200);       //弹出提示层

		var def={
            check_src:general.def.img_href+"login/check.png",
            no_check_src:general.def.img_href+"login/n-check.png"
        };
		
		// input判断
        $(".js-input-area").on("focus",function(){
            var tar=$(this).hasClass("js-code")?$(this).parent().next(".js-error-ele"):$(this).next(".js-error-ele");
            tar.css({"opacity":0});
        }).on("blur",function(){
            var index=$(".js-input-area").index($(this));
            var is_ok=true,txt=$(this).val();
            var tar=$(this).hasClass("js-code")?$(this).parent().next(".js-error-ele"):$(this).next(".js-error-ele");
            txt=txt.replace(/\s/g,"");
        	// console.log(txt);
            switch(index){
                case 0:
                    if(txt=="" || general.fn.getCharacterLen(txt)<4){
                        is_ok=false;
                    }
                    break;
                case 1:
                    if(txt=="" || general.fn.getCharacterLen(txt)<6){
                        is_ok=false;
                    }
                    break;
                case 2:
                    if(txt=="" || txt.length<4){
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
        });

		// 提交数据
        $(".js-form-ele").on("submit",function(){
            var str=$(this).serialize();
            var data=general.fn.getLocationParameter("?"+str);
            // console.log(data);
            var error_eles=$(".js-error-ele");
            if(data["account"]=="" || general.fn.getCharacterLen(data["account"])<4 || general.fn.getCharacterLen(data["account"])>20){
                error_eles.eq(0).css({"opacity":1});
                return false;
            }else if(data["passwd"]=="" || general.fn.getCharacterLen(data["passwd"])<6 || general.fn.getCharacterLen(data["passwd"])>20){
                error_eles.eq(1).css({"opacity":1});
                return false;
            }else if(data["code"]=="" || data["code"].length<4){
                error_eles.eq(2).css({"opacity":1});
                return false;
            }else{
                // 可以提交数据
                // pop.msg({"txt":"登录成功！",btn:true},function(){
                //     window.location.href="http://www.pop136.com/";
                // });
                // return false;
            }
        });
		

		// 选择记住密码
		var check_ele=$(".js-check-area"),check_tag_img=check_ele.children("img"),ncheck_src="n-check.png",check_src="check.png";
		check_ele.on("click",function(){
			if(!$(this).hasClass("js-now")){
				$(this).addClass("js-now");
				check_tag_img.attr("src",def.check_src);
			}else{
				$(this).removeClass("js-now");
				check_tag_img.attr("src",def.no_check_src);
			}
			
		});
	});
});