/*
	#author		lut000
	#date 		2017/03/06
*/
require(["jquery"],function(jquery){
    $(function(){
        //计算宽度
        var setWidth=function(){
            var ow=document.documentElement.clientWidth || document.body.clientWidth;
            var header_ele=$(".header");
            var content_ele=$(".content");
            var section_ele=$(".section");
            var footer_ele=$(".footer");
            ow=ow<1200?960:ow;
            var ow1=ow<1200?920:1160;
            var ow2=ow<1200?1200:ow;
            header_ele.width(ow2+"px");
            content_ele.width(ow2+"px");
            section_ele.width(ow1+"px");
            footer_ele.width(ow2+"px");
            if(ow2<1300){
                $(".info-div>.section>h2").css({"margin-bottom":"0px"});
                $(".info-div>.section>p").css({"margin-top":"0px"});
            }
        };
        setWidth();
        $(window).on("resize",function(){
            setWidth();
        });
    });
});