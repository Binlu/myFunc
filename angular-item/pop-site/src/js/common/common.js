/*
	#author		shuzhan
	#date 		2017/10/20
	#purpose	共用方法
*/
require(["jquery","general"],function(jquery,pop){
	
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