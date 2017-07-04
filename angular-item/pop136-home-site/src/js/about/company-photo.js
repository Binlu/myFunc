/*
	#author		lut000
	#date 		2017/03/28
*/
require.config({
    paths:{
        "laypage":["lib/laypage"],
        "photo_json":["about/photo-json"]
    },
    shim:{
        "laypage":{
            exports:"laypage"
        },
        "photo_json":{
            exports:"json"
        }
    }
});
require(["jquery","general","laypage","photo_json"],function(jquery,pop,laypage,json){
    $(function(){
        var def={
            arr:json,     //源数据
            "ul_len":json.length,     //总页数
            page:1,
            num:20,
            "this_page":1   //当前页数
        };
        def.this_page=getvl("sn=6#!position");
        def.page=Math.ceil(def.ul_len/def.num);
        if(def.this_page>def.page){
            def.this_page=def.page;
        }
        // 分页
        laypage({
            cont:$(".js-page-controller").eq(0),
            pages:def.page,
            curr:def.this_page,
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
        function setDom(obj,first){
            var curr=obj.curr-1;
            var _html='',arr=def.arr;
            var n_times=(new Date()).getTime();
            var this_len=def.num;        //当前循环数20
            var len=arr.length;
            var max_num=(curr+1)*20;        //上限
            max_num=max_num>arr.length?arr.length:max_num;
            for(var i=curr*20;i<max_num;i++){
                if(i%4===3){
                    _html+='<li style="margin-right:0"><a href="pop_album_photo.php?act=photo'+(len-i)+'" title="查看详情"><div>';
                }else{
                    _html+='<li><a href="pop_album_photo.php?act=photo'+(len-i)+'" title="查看详情"><div>';
                }
                // _html+='<img class="photo-ele" src="'+pop.def.global_img_path+"photo/photo_"+(len-i)+'.gif" alt="pic"><img src="'+pop.def.img_href+'about/icon2.png" alt="icon">';
                _html+='<img class="photo-ele" src="'+pop.def.global_img_path+"photo/h"+(len-i)+'/x1.jpg?r='+n_times+'" alt="pic"><img src="'+pop.def.img_href+'about/icon2.png" alt="icon">';
                _html+='</div><h3>'+arr[i]+'</h3></a></li>';
            }
            $('.js-photos-list').html(_html);
        };
        function getvl(name) {          //获取url参数
            var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
            if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
            return "";
        };
    });
});