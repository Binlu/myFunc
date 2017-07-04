/*
    #author     lut000
    #date       2017/03/28
*/
require.config({
    paths:{
        "laypage":["lib/laypage"]
    },
    shim:{
        "laypage":{
            exports:"laypage"
        }
    }
});
require(["jquery","general","laypage"],function(jquery,pop,laypage){
    $(function(){
        // 分页
        
        var href_obj=pop.fn.getLocationParameter();
        require(["photo-json/"+href_obj["act"]],function(data){
            var def={
                pages:1,
                n_times:(new Date()).getTime(),
                arr:data,
                num:20,
                npage:getvl(window.location.search.substr(1)+"#!position"),
                atten_ele:$(".js-txt")
            };
            def.pages=Math.ceil(def.arr.length/def.num);
            if(def.npage>def.pages){
                def.npage=def.pages;
            }
            laypage({
                cont:$(".js-page-controller"),
                pages:def.pages,
                curr:def.npage,
                groups:3,
                skin:"#f40",
                first:"首页",
                last:"尾页",
                prev:"上一页",
                next:"下一页",
                skip:true,
                hash:"position",
                jump:setDom
            });
            function setDom(obj,first){         //生成相册
                var curr=obj.curr-1;
                var _html='',arr=def.arr,tar=$('.js-photos-detail-list');
                var this_len=def.num;        //当前循环数20
                var len=arr.length;
                var max_num=(curr+1)*20;        //上限
                max_num=max_num>arr.length?arr.length:max_num;
                var re=/^http:\/\/[^\/]+\//;
                for(var i=curr*20;i<max_num;i++){
                    var src=arr[i]["small"]?arr[i]["small"]:"";
                    var big_src=arr[i]["big"]?arr[i]["big"]:"";
                    var txt=arr[i]["title"]?arr[i]["title"]:"";
                    if((i+1)%4==0){
                        _html+='<li data-src="'+pop.def.global_img_path+big_src.replace(re,"")+'" title="'+txt+'" style="margin-right:0">';
                    }else{
                        _html+='<li data-src="'+pop.def.global_img_path+big_src.replace(re,"")+'" title="'+txt+'">';
                    }
                    _html+='<img src="'+pop.def.global_img_path+src.replace(re,"")+'?r='+def.n_times+'" alt="pic">';
                    _html+='</li>';
                }
                tar.html(_html);
            }
            // 图片放大
            var show_box=$(".js-show-pic-box"),show_pic=$(".js-show-pic"),show_bg=$(".js-bg");
            var ww=document.documentElement.clientWidth;
            var wh=document.documentElement.clientHeight;
            var current_index=0;

            // 事件绑定
            $(".js-photos-detail-box").on("click",".js-photos-detail-list>li",function(){
                var index=$(this).index();
                current_index=index;
                setImgSrc(current_index);

                show_box.fadeIn(200);
                show_bg.fadeIn(400);
                
            });
            // 下一张
            $(".js-next-btn").on("click",function(){
                current_index++;
                var _src=def.arr[current_index]["big"];
                setImgSrc(current_index);
            });
            // 上一张
            $(".js-prev-btn").on("click",function(){
                current_index--;
                var _src=def.arr[current_index]["big"];
                setImgSrc(current_index);
            });
            // 关闭弹框
            $(".js-close-btn").on("click",function(){
                show_box.fadeOut(200);
                show_bg.fadeOut(400);
            });
            function setImgSrc(nindex){
                show_pic.on("load",function(){
                    var ow=this.width;
                    var oh=this.height;
                    var nh=Math.floor(ww*0.8*oh/ow);
                    if(nh>wh*0.8){
                        $(this).css({"width":"auto","margin-top":0.1*wh+"px","height":wh*0.8+"px"});
                    }else{
                        $(this).css({"width":"80%","height":"auto","margin-top":(wh-nh)/2+"px"});
                    }
                });
                var _src=def.arr[nindex]["big"]+"?r="+def.n_times;
                var _title=def.arr[nindex]["title"];
                show_pic.attr("src",_src);
                def.atten_ele.text(_title);
                var len=def.arr.length;
                if(current_index<=0){
                    $(".js-prev-btn").hide();
                }else if(current_index>=len-1){
                    $(".js-next-btn").hide();
                }else{
                    $(".js-prev-btn").show();
                    $(".js-next-btn").show();
                }
            };
            function getvl(name) {          //获取url参数
                var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
                if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
                return "";
            }; 


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
            };
        });
    });
});