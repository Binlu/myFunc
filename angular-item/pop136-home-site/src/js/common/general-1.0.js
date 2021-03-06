/*
	#author		lut000
	#date 		2017/03/28
*/
define(["jquery"],function(){
    return {
        def:{
            golbal_path:"src/",        //js访问路径
            global_img_path:"",         //图片访问路径
            img_href:"src/images/",       //本项目图片访问路径
            img:{
                general:"/default_fabric.png",         //默认图片
                fabric_a:"/default_fabric.png"         //面料默认图片
            }
        },
        _boolean:{
            is_shence_set:false
        },
        source:{        //资源相关
            // is_online_environment:ulb_re.environment.test(window.location.host)===true?true:false
        },
        fn:{
            imgLoadError:function(obj,relative_path){             //默认图片
                var times=obj.getAttribute("data-times")?obj.getAttribute("data-times")-0:0;
                if(times<=2){
                    var _key=obj.getAttribute("data-key")?obj.getAttribute("data-key"):"general";
                    var _src=ulb.def.img[_key] || ulb.def.img["general"];
                    if(arguments.length>1){
                        _src=relative_path+_src;
                    }
                    obj.src=ulb.def.img_href+_src;
                    times++;
                    obj.setAttribute("data-times",times);
                }
            },
            stopBubble:function(ev){            // 阻止事件冒泡
                var e=ev || window.event;
                if(e && e.stopPropagation){
                    e.stopPropagation();
                }else{
                    window.event.cancelBubble=true;
                }
                return false;
            },
            cutStr:function(str,len){                   //截取字符串
                if(typeof str==="string" && len>0){
                    if(str.length>len){
                        str=str.substr(0,len)+"...";
                    }
                }
                return str;
            },
            cutByWidth:function(str,wid,fontSize){               //通过宽度截取字符串
                var a=ulb.fn,nstr="";
                if(typeof str==="string" && wid>0){
                    var nfs=fontSize!==undefined?fontSize:14;
                    nstr=str,limit_val=wid,is_length=false;
                    recursionFunc(nstr);
                    function recursionFunc(keys){
                        var nw=a.textSize({
                            "fontSize":nfs
                        },keys);
                        if(nw>limit_val){
                            is_length=true;
                            var nkey=keys.substr(0,keys.length-1);
                            arguments.callee(nkey);
                        }else{
                            if(is_length===true){
                               nstr=keys+"..."; 
                            }else{
                                nstr=keys;
                            }
                            return keys;
                        }
                    }
                }
                return nstr;
            },
            textSize:function(cssList,text) {               // 通过元素获取文字宽高
                var a=ulb.fn;
                var span = document.createElement("span");
                var result = {};
                result.width = span.offsetWidth;
                result.height = span.offsetWidth; 
                span.style.visibility = "hidden";
                span.style.cssText="font-size:14px;line-height:1em;display:inline;padding:0;margin:0;border:none;letter-spacing:0px";
                span.style.fontSize=cssList["fontsize"]!==undefined?cssList["fontsize"]+"px":"14px";
                span.style.lineHeight=cssList["lineheight"]!==undefined?cssList["lineheight"]:"1em";
                document.body.appendChild(span);
                if (typeof span.textContent != "undefined"){span.textContent = text;}else{span.innerText = text;}
                result.width = span.offsetWidth - result.width;
                result.height = span.offsetHeight - result.height;
                span.parentNode.removeChild(span);
                return result.width;
            },
            getCharacterLen:function(str){      //检测字符长度
                if(typeof str !="string"){
                    throw Error("the type of parameter is not string!");
                };
                var re=/[\u4E00-\u9FA5\uF900-\uFA2D]/g,word_arr=str.match(re);
                var len1=word_arr!=null?word_arr.length:0;
                return str.length+len1;
            },
            isCharacterOver:function(str,max_len){      //检测字符长度
                if(typeof str !="string"){
                    throw Error("the type of parameter is not string!");
                };
                var re=/[\u4E00-\u9FA5\uF900-\uFA2D]/g,word_arr=str.match(re);
                var len1=word_arr!=null?word_arr.length:0,len2=str.length-len1;
                var ml=max_len || 20;
                if(len1*2+len2>ml){
                    return false;
                }
                return true;
            },
            getLocationParameter:function(origin_str){              // 获取浏览器参数
                var url = origin_str?origin_str:location.search; //获取url中"?"符后的字串 
                var theRequest={};
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            },
            getLastUrl:function(str){        //获取面料id
                var tmpHPage = str.split( "/" );
                var thisHPage = tmpHPage[ tmpHPage.length-2];
                if(tmpHPage.length<=6){
                    thisHPage=tmpHPage[ tmpHPage.length-1];
                }
                if(thisHPage.indexOf("?")>0){
                    thisHPage = thisHPage.substring(0,thisHPage.indexOf("?"));
                }
                return thisHPage.split("#")[0];
            },
            /*----------------浏览器存储-----------------*/ 
            getSession:function(session_name){                  //获取本地存储
                var a=ulb.fn;
                if(window.sessionStorage){
                    // 支持sessionStorage
                    var val=sessionStorage.getItem(session_name);
                    if(val==="undefined"){
                        return "undefined";
                    }else if(typeof val === "number"){
                        return val;
                    }else if(val){
                        return JSON.parse(val)?JSON.parse(val):"";
                    }
                }else{
                    // 用cookie
                    return JSON.parse(a.getCookie(session_name))?JSON.parse(a.getCookie(session_name)):"";
                }
            },
            setSession:function(session_name,data){                 // 存储本地
                var a=ulb.fn;
                if(window.sessionStorage){
                    sessionStorage.setItem(session_name,JSON.stringify(data));
                }else{
                    a.setCookie(session_name,JSON.stringify(data),10000);
                }
            },
            delSession:function(session_name){                  // 删除本地存储
                var a=ulb.fn;
                if(window.sessionStorage){
                    if(sessionStorage.getItem(session_name)){
                        sessionStorage.removeItem(session_name);
                    }
                }else{
                    if(a.getCookie(session_name)){
                        a.setCookie(session_name,"",-1);
                    }
                }
            },
            setCookie:function(name,value,Days){        // 设置cookie
                var exp = new Date();
                exp.setTime(exp.getTime() + Days*24*60*60*1000);    //设置过期时间
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
            },
            getCookie:function(name){  //获取cookie
                    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
                    if(arr != null){  
                        return unescape(arr[2]);   
                    }else{  
                        return null;  
                }  
            },
            subAjax:function(options){                  //jquery  ajax封装
                var opt={
                    "url":"",
                    "ctp":"",
                    "data":{},
                    "successFunc":null,
                    "errorFunc":null,
                    "isError":true,
                    "header":null,
                    "code":"code",          //状态字段名称  默认为code
                    "code_value":0,         //请求成功码  默认为0
                    "message":"message"     //请求失败话术字段名  默认为message
                };
                opt["url"]=options["url"]?options["url"]:"";
                opt["data"]=options["data"]?options["data"]:{};
                opt["ctp"]=options["ctp"]?options["ctp"]:"application/json";
                opt["successFunc"]=options["successFunc"]?options["successFunc"]:null;
                opt["errorFunc"]=options["errorFunc"]?options["errorFunc"]:null;
                opt["isError"]=options["isError"]!==undefined?options["isError"]:true;
                opt["code"]=options["code"]?options["code"]:"code";
                opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
                opt["message"]=options["message"]!==undefined?options["message"]:"message";
                if(typeof options["header"]!="undefined"){
                    opt["header"]=options["header"];
                }else{
                    /*这里设置默认头部
                    opt["header"]={
                        
                    };*/
                }
                $.ajax({
                    headers:opt["header"],
                    type: "POST",
                    url: opt["url"],
                    data:opt["data"],
                    timeout: 20000,
                    dataType: "json",
                    contentType:opt["ctp"],
                    success: function(data){
                        if(data[opt["code"]]===opt["code_value"]){
                            if(opt.successFunc && opt.successFunc instanceof Function){
                                opt.successFunc(data);
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc(data);
                            }
                            if(opt["isError"]===true){
                                pop.msg({"txt":data[opt["message"]]},800);
                            }
                        }
                    },
                    error: function(XMLHttpRequest,textStatus,errorThrown){
                        if(opt["isError"]===true){
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                pop.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定","error":opt.errorFunc},opt.errorFunc);
                            }else{
                                pop.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定"});  
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc
                            }
                        }
                    }
                });
            },
            subAjaxGet:function(options){                  //jquery  ajax封装
                var opt={
                    "url":"",
                    "ctp":"",
                    "successFunc":null,
                    "errorFunc":null,
                    "isError":true,
                    "header":null,
                    "code":"code",          //状态字段名称  默认为code
                    "code_value":0,         //请求成功码  默认为0
                    "message":"message"     //请求失败话术字段名  默认为message
                };
                opt["url"]=options["url"]?options["url"]:"";
                opt["ctp"]=options["ctp"]?options["ctp"]:"application/json";
                opt["successFunc"]=options["successFunc"]?options["successFunc"]:null;
                opt["errorFunc"]=options["errorFunc"]?options["errorFunc"]:null;
                opt["isError"]=options["isError"]!==undefined?options["isError"]:true;
                opt["code"]=options["code"]?options["code"]:"code";
                opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
                opt["message"]=options["message"]!==undefined?options["message"]:"message";
                if(typeof options["header"]!="undefined"){
                    opt["header"]=options["header"];
                }else{
                    /*这里设置默认头部
                    opt["header"]={
                        
                    };*/
                }
                $.ajax({
                    headers:opt["header"],
                    type: "GET",
                    url: opt["url"],
                    timeout: 20000,
                    dataType: "json",
                    contentType:opt["ctp"],
                    success: function(data){
                        if(data[opt["code"]]===opt["code_value"]){
                            if(opt.successFunc && opt.successFunc instanceof Function){
                                opt.successFunc(data);
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc(data);
                            }
                            if(opt["isError"]===true){
                                pop.msg({"txt":data[opt["message"]]},800);
                            }
                        }
                    },
                    error: function(XMLHttpRequest,textStatus,errorThrown){
                        if(opt["isError"]===true){
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                pop.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定","error":opt.errorFunc},opt.errorFunc);
                            }else{
                                pop.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定"});  
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc
                            }
                        }
                    }
                });
            }
        }
    }
});