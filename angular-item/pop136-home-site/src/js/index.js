/*
	#author		lut000
	#date 		2017/03/06
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
        
        //banner轮播
        var ow=document.documentElement.clientWidth || document.body.clientWidth;
        var nw=$(".js-container").width();
        ow=ow<nw?nw:ow;
        var nh=ow*7/20;
        $(".js-container").height(nh+"px");
        // $(".js-page-list>li").height(nh+"px");
        $(".js-progress-btn-div").css({"margin-top":-nh/2+"px"});
    	var ntab=new slideFun({
            "container":$(".js-container").get(0),
            "speed":200,
            "height":nh,
            loop:false
            // "direction":"vertical"
        });
        $(window).on("resize",function(){
            ntab.reStyle();
        });

        //滚动事件
        // var scroll_tags={
        //     advantage:$(".js-advantage-section").offset().top,
        //     is_move:{
        //         advantage:false
        //     }
        // };
        // $(window).on("scroll",function(){
        //     if(scroll_tags.is_move.advantage===false){
        //         var nscroll_y=$(this).scrollTop();
        //         if(nscroll_y>=scroll_tags.advantage){
        //             scroll_tags.is_move.advantage=true;
        //             $(".js-m-h3").addClass("move1");
        //             $(".js-m-p").addClass("move2");
        //         }
        //     }
        // });
    });
});