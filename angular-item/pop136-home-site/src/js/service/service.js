/*
	#author		shuzhan
	#date 		2017/03/07
*/
require.config({
    paths:{
        "tab":["method/stab-1.0.development"]
    },
    shim:{
        "tab": {
　　　　　　deps: ["jquery"],
　　　　　　exports: "tab"
　　　　}
    }
});
require(["jquery","tab"],function(jquery){

    $(function(){

        var def={
            img_src:"global/src/images/"
        }
        // 轮播
        var ntab_objs=$(".js-container");
        var ntab_ex={};
        ntab_objs.each(function(i){
            var a=this;
            ntab_ex["ntab"+i]=new slideFun({
                "container":a,
                "speed":200,
                "loop":false
            });
        });
    	$(window).on("resize",function(){
            ntab_objs.each(function(i){
                ntab_ex["ntab"+i].reStyle();
            });
        });
		
		//icon图标hover状态样式改变
		var befor_src='';		//hover前的src
		$(".js-list-hover a").hover(function(){
			befor_src=$(this).children("img").attr("src");
			var after_src=def.img_src+"service/"+$(this).attr("data-src");
			$(this).children("img").attr("src",after_src);
		},function(){
			$(this).children("img").attr("src",befor_src);
		});
		//返回顶部按钮
        var right_box_ele=$(".js-right-box");
		$(".js-top-btn").on("click",function(e){
			$("html,body").animate({"scrollTop":0},500);
		});
        // 滚动监听
        setRightFunc($(window).scrollTop());
        $(window).on("scroll",function(){
            var nscroll_y=$(this).scrollTop();
            setRightFunc(nscroll_y);
        });
        function setRightFunc(y){
            if(y>0){
                right_box_ele.show();
            }else{
                right_box_ele.hide();
            }
        }
    });
});