/*
	#author		lut000
	#date 		2017/03/03
*/
require.config({
    baseUrl:"src/js",
    urlArgs:"r="+(new Date()).getTime(),
    paths:{
        "jquery":["lib/jquery-1.11.3.min"],
        "general":["common/general-1.0"],
        "msg":["method/pop-msg-1.0"],
//        "angular-set":["common/angular-set"]
    },
    shim:{
        "general":{
            deps:["jquery"],
            exports:"pop"
        },
        "msg":{
            deps:["jquery"],
            exports:"msg"
        }
    }
});
require(["jquery","general"],function(jquery,pop){
    $(function(){
        //获取url参数
        var href_def={
            "_href":window.location.href||'',
            "nav_num":0,        //记录哪个页面
            obj:pop.fn.getLocationParameter()
        };

        var page_arr=["index","product_service","partner","aboutpop","contactpop"];
        for(var i=0,len=page_arr.length;i<len;i++){
            if(href_def._href.indexOf(page_arr[i])!=-1){
                href_def.nav_num=i;
                break;
            }
        };
        //有下拉列表的来源 
        var nindex=href_def.obj.sn-1 || 0;
        $(".js-nav-list").each(function(){
            $(this).children("li").eq(href_def.nav_num).children(".js-down-list").children("li").eq(nindex).addClass("now-position")
        });
        
    	var def={
    		obj:{
    			nav_list:$(".js-nav-list"),
    			nav_section:$(".js-nav-section")
    		},
    		fn:{
    			setScroll:function(tag_y,nscroll_y){
    				var a=def;
    				if(nscroll_y>tag_y){
		                a.obj.nav_section.addClass("show-nav");
                        a.obj.nav_section.children("div").show();
		            }else{
		            	a.obj.nav_section.removeClass("show-nav");
                        a.obj.nav_section.children("div").hide();
		            }
    			}
    		}
    	};
    	//监听滚动
    	var tag_y=def.obj.nav_list.offset().top;
    	def.fn.setScroll(tag_y,$(window).scrollTop());
        $(window).on("scroll",function(){
            var nscroll_y=$(this).scrollTop();
            def.fn.setScroll(tag_y,nscroll_y);
        });
        $(".js-logo").on("click",function(){
            window.location.href="http://www.pop136.com";
        });

    });
});