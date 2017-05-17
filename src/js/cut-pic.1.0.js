/*
    #author     lut000
    #date       2017/04/21
*/

!function(g){
    /*方法*/
    var fn={
        getStyle: function(obj,name){                   // 获取样式----------ie7需要单独处理
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return getComputedStyle(obj,false)[name];
            }
        },
    };
    function cutPic(str){
        this.box=document.querySelector(str);
        this.input_ele=this.box.querySelector(".js-up-input");          //上传元素
        this.place_pic=this.box.querySelector(".js-show-pic");          //当前剪裁图片
        this.cut_box=this.box.querySelector(".js-cut-div");            //剪裁包含框
        this.cut_ele=this.box.querySelector(".js-move-ele");           //剪裁框
        this.top_pic=this.box.querySelector(".js-top-pic");            //上层图片
        this.get_data_btn=this.box.querySelector(".js-get-data-btn");            //获取数据
        this.canvas_ele=null;            //canvas

        this.def={
            is_set_canvas:false,    //是否生成canvas
            k:1,                    //缩放比例饿
            file_type:"",           //文件属性
            img_info:{},            //图片属性
            quality:0.7,            //压缩质量
            cut_area:200,           //默认剪裁大小
            canvas_data:{},         //canvas数据

            box_info:{              //包含框尺寸
                ow:0,
                oh:0
            },
            cut_info:{              //剪裁框尺寸
                ow:0,
                oh:0
            }
        };

        this.init();
    };
    cutPic.prototype={
        init:function(){
            var a=this;
            a.setInfo();
            a.bind();
        },
        setInfo:function(){         //设置属性值
            var a=this;d=a.def;
            d.box_info.ow=parseInt(fn.getStyle(a.cut_box,"width"));
            d.box_info.oh=parseInt(fn.getStyle(a.cut_box,"height"));

            d.cut_info.ow=parseInt(fn.getStyle(a.cut_ele,"width"));
            d.cut_info.oh=parseInt(fn.getStyle(a.cut_ele,"height"));
        },
        setCutInfo:function(){      //设置剪裁框属性
            var a=this;d=a.def;
            a.cut_ele.style.width=d.cut_area+"px";
            a.cut_ele.style.height=d.cut_area+"px";
            d.cut_info.ow=d.cut_area;
            d.cut_info.oh=d.cut_area;
        },
        bind:function(){            //绑定事件
            var a=this,btn=a.get_data_btn,c=a.cut_ele,d=a.def,t=a.top_pic;
            var is_start=false;

            var def={
                pl:a.cut_box.offsetLeft,            //操作框左距离
                pt:a.cut_box.offsetTop,             //操作框上距离
                _x:0,           //相对鼠标位置x
                _y:0,           //相对鼠标位置y
                modified:2,             //修正系数
                is_start_drag:false
            };

            // 选择文件
            a.input_ele.addEventListener("change",function(){
                var src=a.getFileSrc(this);
                if(src!="" && src!=undefined){
                    a.setCutInfo();
                    a.loadImg(src);
                }
            },false);


            // 拖拽剪裁框
            t.addEventListener("dragstart",function(){return false},false);
            c.addEventListener("mousedown",dragStart,false);
            c.addEventListener("mousemove",dragMove,false);
            c.addEventListener("mouseup",dragEnd,false);

            function dragStart(ev){
                var e=ev || window.event;
                var nx=e.clientX,ny=e.clientY;
                def._x=nx-c.offsetLeft;
                def._y=ny-c.offsetTop;
                def.is_start_drag=true;
            };
            function dragMove(ev){
                if(def.is_start_drag==true){
                    var e=ev || window.event;
                    var min_x=d.img_info.x,min_y=d.img_info.y,max_x=d.img_info.x+d.img_info.ow-d.cut_info.ow-def.modified,max_y=d.img_info.y+d.img_info.oh-d.cut_info.oh-def.modified;
                    var nx=e.clientX,ny=e.clientY;
                    var x=nx-def._x;
                    var y=ny-def._y;
                    var limit_x=max_x<(d.box_info.ow-d.cut_info.ow-def.modified)?max_x:(d.box_info.ow-d.cut_info.ow-def.modified);
                    var limit_y=max_y<(d.box_info.oh-d.cut_info.oh-def.modified)?max_y:(d.box_info.oh-d.cut_info.oh-def.modified);
                    if(x<0 || x<min_x){
                        x=min_x<0?0:min_x;
                    }else if(x>limit_x){
                        x=limit_x;
                    }
                    if(y<0 || y<min_y){
                        y=min_y<0?0:min_y;
                    }else if(y>limit_y){
                        y=limit_y;
                    }


                    a.cut_ele.style.left=x+"px";
                    a.cut_ele.style.top=y+"px";
                    
                    a.top_pic.style.left=-(x-d.img_info.x+1)+"px";
                    a.top_pic.style.top=-(y-d.img_info.y+1)+"px";
                }
            };
            document.body.addEventListener("mouseup",function(){
                def.is_start_drag=false;
                def._x=0;
                def._y=0;
            },false);
            function dragEnd(ev){
                if(def.is_start_drag==true){
                    def.is_start_drag=false;
                    def._x=0;
                    def._y=0;
                }
            };


            btn.addEventListener("click",function(){
                var x=parseInt(fn.getStyle(t,"left"));
                var y=parseInt(fn.getStyle(t,"top"));
                x=(d.img_info.ow-d.cut_info.ow)/2<Math.abs(x)?Math.abs(x)+1:Math.abs(x)-1;
                y=(d.img_info.oh-d.cut_info.oh)/2<Math.abs(y)?Math.abs(y)+1:Math.abs(y)-1;
                d.canvas_data.x=x*d.k;
                d.canvas_data.y=y*d.k;
                d.canvas_data.ow=d.cut_info.ow*d.k;
                d.canvas_data.oh=d.cut_info.oh*d.k;
                a.setCanvas();
                getCanvasDate();
            },false);
            function getCanvasDate(){
                var base64_str=a.canvas_ele.toDataURL(d.img_info.file_type,d.quality);
                var blob_obj=dataURLtoBlob(base64_str);
                var img_type="jpg";
                if(/jpeg/i.test(d.img_info.file_type)){
                    img_type="jpg";
                }else if(/png/i.test(d.img_info.file_type)){
                    img_type="png";
                }else if(/gif/i.test(d.img_info.file_type)){
                    img_type="gif";
                }else{
                    img_type="jpg";
                }

                var form_data=new FormData();
                form_data.append("file",blob_obj,"pic."+img_type);

                d.canvas_data={
                    form_data:form_data,
                    blob_obj:blob_obj,
                    base64_str:base64_str
                };
                console.log(d.canvas_data);
                var img=new Image();
                img.src=base64_str;
                document.body.appendChild(img);
            };
            // 转化为blob
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
            };
        },
        getFileSrc:function(tar){           //获取文件src
            var a=this,d=a.def;
            if(tar.files && tar.files[0]){
                var file=tar.files[0],file_src="";
                d.img_info["name"]=file["name"];
                d.img_info["size"]=file["size"];
                if(/image\//.test(file.type) || file.type==""){
                    try{
                        file_src=window.URL.createObjectURL(file);
                    }catch(e){
                        //火狐7以上版本不能用getAsDataURL()方式获取，需要上面方式
                        file_src=file.getAsDataURL();
                    }
                    d.file_type=file["type"]?file["type"]:"image/jpeg";
                    return file_src;
                }else{
                    msg.msg({"txt":"请上传图片类型的文件！"},1200);
                }
            }else{
                console.warn("陛下，您的浏览器不支持新特file");
            }
        },
        loadImg:function(src){          //下载图片
            if(src==""){console.warn("图片src为空。");return};
            var a=this,d=a.def;
            var img=new Image();
            img.onload=function(){
                d.img_info.width=this.width;
                d.img_info.height=this.height;
                d.img_info.img=img;
                a.place_pic.src=src;
                a.top_pic.src=src;
                a.setImgPos(src);
            };
            img.src=src;
        },
        setImgPos:function(src){
            var a=this,d=a.def;
            if(src!="" && src!=undefined){

                var dep_img_state=d.img_info.width>d.img_info.height?1:2;
                if(dep_img_state==1){
                    d.img_info.ow=d.box_info.ow>d.img_info.width?d.img_info.width:d.box_info.ow;
                    d.img_info.oh=d.img_info.ow*d.img_info.height/d.img_info.width;
                }else{
                    d.img_info.oh=d.box_info.oh>d.img_info.height?d.img_info.height:d.box_info.oh;
                    d.img_info.ow=d.img_info.oh*d.img_info.width/d.img_info.height;
                }
                d.k=d.img_info.ow/d.img_info.width<1?d.img_info.width/d.img_info.ow:1;
                d.img_info.x=d.box_info.ow>d.img_info.ow?(d.box_info.ow-d.img_info.ow)/2:0;
                d.img_info.y=d.box_info.oh>d.img_info.oh?(d.box_info.oh-d.img_info.oh)/2:0;

                a.place_pic.style.width=d.img_info.ow+"px";
                a.place_pic.style.height=d.img_info.oh+"px";
                a.place_pic.style.left=d.img_info.x+"px";
                a.place_pic.style.top=d.img_info.y+"px";

                a.top_pic.style.width=d.img_info.ow+"px";
                a.top_pic.style.height=d.img_info.oh+"px";
                a.top_pic.style.left=-1+"px";
                a.top_pic.style.top=-1+"px";

                var dep_w=d.img_info.ow>d.img_info.oh?d.img_info.oh:d.img_info.ow;
                if(d.cut_info.ow>dep_w){
                    d.cut_info.ow=dep_w;
                    d.cut_info.oh=dep_w;
                    a.cut_ele.style.width=dep_w+"px";
                    a.cut_ele.style.height=dep_w+"px";
                }
                a.cut_ele.style.left=d.img_info.x+"px";
                a.cut_ele.style.top=d.img_info.y+"px";
            }else{
                console.warn("src is must！");
            }
            
        },
        setCanvas:function(){
            var a=this,d=a.def,data=d.canvas_data;
            if(!a.canvas_ele){
                a.canvas_ele=document.createElement("canvas");
            }
            a.canvas_ele.width=data.ow;
            a.canvas_ele.height=data.oh;

            var ctx=a.canvas_ele.getContext("2d");         //画布
            ctx.clearRect(0,0,data.ow,data.oh);
            if(d.img_info.img){
                ctx.drawImage(d.img_info.img,data.x,data.y,data.ow,data.oh,0,0,data.ow,data.oh);
            }else{
                console.warn("the img is must!");
            }
            
        },
    };
    g.cutPic=cutPic;
}(window);