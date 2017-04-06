/*
* # date						2016-11-17
* # author						lut and all
* # content						Useful some common methods
* # edition						development 1.2
*/
!function(g){
	"use strict";
	var sharp={
		/*----------------------module1 dom operation---------------------*/
		getEle:function(str,op){											//获取元素
			var opar=document;
			var a=this;
			if(arguments.length>1 && typeof op =="object"){
				opar=op;
			}
			if(str && typeof str =="string"){
				var re1=/^\..+/;
				var re2=/^#.+/;
				if(re1.test(str)){
					if(document.querySelectorAll){

						return opar.querySelectorAll(str);
					}else{
						return a.getByClass(opar,str.slice(1));
					}
				}else if(re2.test(str)){
					if(document.querySelector){
						return opar.querySelector(str);
					}else{
						return opar.getElementById(str.slice(1));
					}
				}else{
					if(document.querySelectorAll){
						return opar.querySelectorAll(str);
					}else{
						return opar.getElementsByTagName(str);
					}
				}
			}else{
				return null;
			}
		},
		getByClass:function(oParent,sClass){					// 获取class
			var aResult=[];
			if(arguments.length!=0 && arguments.length>1){
				var opar=null;
				if(typeof oParent =="object" && oParent.nodeName!="undefined"){
					opar=oParent;
				}else{
					opar=document;
				}
				var aEle=opar.getElementsByTagName("*");
				if(document.querySelectorAll){
					aResult=opar.querySelectorAll("."+sClass);
				}else{
					for(var i=0,tt=aEle.length;i<tt;i++){
						if(aEle[i].className.indexOf(sClass)!=-1){
							var arr_class=aEle[i].className.split(" ");
							for(var j=0,len=arr_class.length;j<len;j++){
								if(arr_class[j]==sClass){
									aResult.push(aEle[i]);
								}
							}
						}
					}
				}
			}
			return aResult;
		},
		getStyle: function(obj,name){					// 获取样式----------ie7需要单独处理
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		},
		getNextEle: function(obj){					// 获取下一个兄弟元素
		    if(obj.nextSibling!="undefined"){
		        if(obj.nextSibling.nodeType==1){
		            return obj.nextSibling;
		            
		        }else{
		            return arguments.callee(obj.nextSibling);
		        }
		    }else{
		        return null
		    }
		},
		addEvent: function(obj,type,func){					// 事件绑定
			// obj==目标对象，type==事件,func==绑定的函数
			if(obj.addEventListener){
				obj.addEventListener(type,func,false);
			}else if(obj.attachEvent){
				// ie
				obj.attachEvent("on"+type,func);
			}else{
				obj.on[type]=func;
			}
		},
		removeEvent: function(obj,type,func){					// 取消事件绑定		
			if(obj.removeEventListener){
				obj.removeEventListener(type,func,false);
			}
			else if(obj.detachEvent){
				obj.detachEvent("on"+type,func);
			}else{
				obj.on[type]=null;
			}
		},
		stopBubble: function(ev){					// 阻止事件冒泡
			var e=ev || window.event;
			if(e && e.stopPropagation){
				e.stopPropagation();
			}else{
				window.event.cancelBubble=true;
			}
			return false;
		},
		stopDefault: function(ev){					// 阻止浏览器默认事件
			var e=ev || window.event;
			if(e && e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue=false;
			}
			return false;
		},
		/*------------------------module2 bom operation----------------------*/
		getLocationParameter:function(){              // 获取浏览器参数
	        var url = location.search; //获取url中"?"符后的字串 
	        var theRequest ={};
	        if (url.indexOf("?") != -1) {
	            var str = url.substr(1),strs = str.split("&"),arr=[];
	            for (var i = 0; i < strs.length; i++) {
	            	arr=strs[i].split("=");
	                theRequest[arr[0]] = unescape(arr[1]);
	            }
	        }
	        return theRequest;
	    },
	    isWeiXin:function(){            // 判断微信浏览器
	        var ua = window.navigator.userAgent.toLowerCase();
	        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	            return true;
	        }else{
	            return false;
	        }
	    },
	    client:function(){
			var engine={					//呈现引擎
				ie:0,
				gecko:0,
				webkit:0,
				khtml:0,
				opera:0,
				ver:null
			};
			var browser={					//浏览器
				ie:0,
				firefox:0,
				safari:0,
				konq:0,
				opera:0,
				chrome:0,
				ver:null
			};
			var system={					//平台设备、系统
				win:false,
				mac:false,
				x11:false,

				iphone:false,
				ipod:false,
				ipad:false,
				ios:false,
				android:false,
				nokiaN:false,
				winMobile:false,

				wii:null,
				ps:null
			};
			var ua=navigator.userAgent;
			// 检测浏览器及呈现引擎
			if(window.opera){
				engine.ver=browser.ver=window.opera.version();
				engine.opera=browser.opera=parseFloat(engine.ver);
			}else if(/AppleWebKit\/(\S+)/.test(ua)){
				engine.ver=RegExp["$1"];
				engine.webkit=parseFloat(engine.ver);
				//safari or chrome
				if(/Chrome\/(\S+)/.test(ua)){
					browser.ver=RegExp["$1"];
					browser.chrome=parseFloat(browser.ver);
				}else if(/Version\/(\S+)/.test(ua)){
					browser.ver=RegExp["$1"];
					browser.safari=parseFloat(browser.ver);
				}else{
					// 近似判断
					var safariVersion=1;
					if(engine.webkit<100){
						safariVersion=1;
					}else if(engine.webkit<312){
						safariVersion=1.2;
					}else if(engine.webkit<412){
						safariVersion=1.3;
					}else{
						safariVersion=2;
					}
					browser.safari=browser.ver=safariVersion;
				}
			}else if(/KHTML\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
				engine.ver=browser.ver=RegExp["$1"];
				engine.khtml=browser.konq=parseFloat(engine.ver);
			}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
				engine.ver=RegExp["$1"];
				engine.gecko=parseFloat(engine.ver);

				//is firefox
				if(/Firefox\/(\S+)/.test(ua)){
					browser.ver=RegExp["$1"];
					browser.firefox=parseFloat(browser.ver);
				}
			}else if(/MSIE ([^;]+)/.test(ua)){
				engine.ver=browser.ver=RegExp["$1"];
				engine.ie=browser.ie=parseFloat(engine.ver);
			}
			browser.ie=engine.ie;
			browser.opera=engine.opera;

			// 检测平台
			var p=navigator.platform;
			system.win=p.indexOf("Win")==0;
			system.mac=p.indexOf("Mac")==0;
			system.x11=(p=="X11") || (p.indexOf("Linux")==0);
			// 检测windows操作系统
			if(system.win===true){
				if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
					if(RegExp["$1"]=="NT"){
						switch(RegExp["$2"]){
							case "5.0":
								system.win="2000";
								break;
							case "5.1":
								system.win="XP";
								break;
							case "6.0":
								system.win="Vista";
								break;
							case "6.1":
								system.win="win7";
								break;
							default:
								system.win="NT";
								break;
						}
					}else if(RegExp["$1"]=="9x"){
						system.win="ME";
					}else{
						system.win=RegExp["$1"];
					}
				}
			}
			system.iphone=ua.indexOf("iPhone")>-1;
			system.ipod=ua.indexOf("iPod")>-1;
			system.ipad=ua.indexOf("iPad")>-1;
			system.nokiaN=ua.indexOf("nokiaN")>-1;

			// windows mobile
			if(system.win=="CE"){
				system.winMobile=system.win;
			}else if(system.win=="Ph"){
				if(/Windows Phone OS (\d+.\d+)/.test(ua)){
					system.win="Phone";
					system.winMobile=parseFloat(RegExp["$1"]);
				}
			}
			//检测ios版本
			if(system.mac && ua.indexOf("Mobile")>-1){
				if(/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)){
					system.ios=parseFloat(RegExp.$1.replace("_","."));
				}else{
					system.ios=2;
				}
			}
			// 检测Android
			if(/Android (\d+\.\d+)/.test(ua)){
				system.android=parseFloat(RegExp.$1);
			}

			//游戏系统
			system.wii=ua.indexOf("Wii")>-1;
			system.ps=/playstation/i.test(ua);
			return {
				engine:engine,
				browser:browser,
				system:system
			}
		},
		/*------------------------module3 string/number/array/object operation----------------------*/
	    cutStr:function(str,len){                   //截取字符串
	        if(typeof str==="string" && len>0){
	            if(str.length>len){
	                str=str.substr(0,len)+"...";
	            }
	        }
	        return str;
	    },
	    fk:16,					//字体大小 1rem=16px
	    cutByWidth:function(str,wid,fontSize){               //通过宽度截取字符串
	        var a=this,nstr="";
	        if(typeof str==="string" && wid>0){
	            var nfs=fontSize!==undefined?fontSize*a.fk:14,
	            nstr=str,limit_val=wid,is_length=false;
	            var recursionFunc=function(keys){
	            	var arg=arguments;
	                var nw=a.textSize({
	                    "fontSize":nfs
	                },keys);
	                if(nw>limit_val*a.fk){
	                    is_length=true;
	                    var nkey=keys.substr(0,keys.length-1);
	                    recursionFunc(nkey);
	                }else{
	                    if(is_length===true){
	                       nstr=keys+"..."; 
	                    }else{
	                        nstr=keys;
	                    }
	                    return keys;
	                }
	            }
	            recursionFunc(nstr);
	        }
	        return nstr;
	    },
	    textSize:function(cssList,text) {               // 通过元素获取文字宽高
	        var a=this;
	        var span = document.createElement("span");
	        var result = {};
	        result.width = span.offsetWidth;
	        result.height = span.offsetWidth; 
	        span.style.visibility = "hidden";
	        span.style.cssText="font-size:14px;line-height:1em;display:inline;padding:0;margin:0;border:none;letter-spacing:0px";
	        span.style.fontSize=cssList["fontsize"]!==undefined?cssList["fontsize"]+"px":"14px";
	        span.style.lineHeight=cssList["lineheight"]!==undefined?cssList["lineheight"]:"1em";
	        document.body.appendChild(span);
	        if (typeof span.textContent != "undefined")
	            span.textContent = text;
	        else span.innerText = text;
	        result.width = span.offsetWidth - result.width;
	        result.height = span.offsetHeight - result.height;
	        span.parentNode.removeChild(span);
	        return result.width;
	    },
		retainNum:function(tar,n){
			var m=n?n:0;
			if(typeof tar =="number"){
				return tar.toFixed(m);
			}else if(typeof tar =="string"){
				var num=parseFloat(tar);
				return num.toFixed(m);
			}else if(typeof tar =="object"){
				return tar;
			}else{
				return null;
			}
		},
		checkLen: function(chars){					// 获得字符串的字符长度（汉字占两个）
			var sum = 0; 
			for (var i=0; i<chars.length; i++){ 
			    var c = chars.charCodeAt(i); 
			    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){ 
			    	sum++; 
			    }else{     
			    	sum+=2; 
			    } 
			}
			return sum;
		},
		toEven:function(num){						//数字补零
	        if(parseInt(num)<10){
	            num="0"+num;
	        }
	        return num;
	    },
		toThousands: function(num) {					//数字逗号隔开
		    var state="";
		    if(num.indexOf("-")!=-1){
		        state="-";
		        num=num.split("-")[1];
		    }
		    num=num.toString();
		    var arr=num.split(".");
		    var num1=arr[0]?arr[0]:0;
		    var num2=arr[1]?arr[1]:"";
		    var result = '', counter = 0,return_str='';
		    num1 = (num1 || 0).toString();
		    for (var i = num1.length - 1; i >= 0; i--) {
		        counter++;
		        result = num1.charAt(i) + result;
		        if (!(counter % 3) && i != 0) { result = ',' + result; }
		    }
		    if(num2==""){
		        return_str=result;
		    }else{
		        return_str=result+"."+num2;
		    }
		    return state+return_str;
		},
		getSelectedContent:function(obj){				//获取选择的文本
			if(typeof obj.selectionStart =="number"){
                return obj.value.substring(obj.selectionStart,obj.selectionEnd);
            }else if(document.selection){
                return document.selection.createRange().text;
            }
		},
		deepClone:function(obj){                    //深度克隆对象
	        var result,a=this;
	        if(typeof obj ==="object"){
	        	result=(obj instanceof Array)?[]:{};
	            for(var key in obj){
	                result[key]=a.deepClone(obj[key]);
	            }
	        }else if(typeof obj ==="function"){
	        	result=function(){
	        		obj.call(this,null);
	        	};
	        	result.prototype=new obj;
	        }else{
	            result=obj;
	        }
	        return result;
	    },
	    isAvailable:function(obj){				//数据是否可用
	    	if(obj==="" || obj===null || obj===undefined){
	    		return false;
	    	}else{
	    		if(typeof obj === "number" && obj.toString()==="NaN"){
	    			return false;
	    		}else{
	    			return true;
	    		}	    		
	    	}
	    },
		/*--------------module4 storage--------------*/
		getSto:function(sto_name){                  //获取本地存储
            var a=this;
            if(window.localStorage){
                // 支持localStorage
                var val=localStorage.getItem(sto_name);
                if(val==="undefined"){
                	return "undefined";
                }else if(typeof val === "number"){
                	return val;
                }else if(val){
                	return JSON.parse(val)?JSON.parse(val):"";
                }
            }else{
                // 用cookie
                return decodeURIComponent(a.getCookie(sto_name))?decodeURIComponent(a.getCookie(sto_name)):"";
            }
        },
        setSto:function(sto_name,data){                 // 存储本地
        	var a=this;
            if(window.localStorage){
                localStorage.setItem(sto_name,JSON.stringify(data));
            }else{
                a.setCookie(sto_name,JSON.stringify(data),10000);
            }
        },
        delSto:function(sto_name){                  // 删除本地存储
        	var a=this;
            if(window.localStorage){
                if(localStorage.getItem(sto_name)){
                    localStorage.removeItem(sto_name);
                }
            }else{
                if(a.getCookie(sto_name)){
                    a.setCookie(sto_name,"",-1);
                }
            }

        },
		setCookie:function(name,value,Days){			// 设置cookie
		    var exp = new Date();
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);    //设置过期时间
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";       //设置name=属性名称,expires=过期时间，path=路径   domain=域名  路劲、域名、名称必须一样才能清楚cookie
		},
		getCookie:function(name){			//读取cookies
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg)){
		        return (arr[2]);
		    }else{
		        return null;
		    }
		},
		/*------------------module5 Built object----------------------*/
		getTimeObj:function(str){
			var t=null,o_times={};
			if(str && typeof str =="string"){
				try{
					t=new Date(str.replace("-","/"));
				}catch(e){
					t=new Date();
				}
			}else{
				t=new Date();
			}
			o_times.year=t.getFullYear();
			o_times.month=t.getMonth()+1;
			o_times.date=t.getDate();
			o_times.hours=t.getHours();
			o_times.minutes=t.getMinutes();
			o_times.seconds=t.getSeconds();
			return o_times;
		},
		setNowTime:function(){
			var a=this;
			var b=a.getTimeObj();
			return b.year+"/"+a.toEven(b.month)+"/"+a.toEven(b.date)+" "+a.toEven(b.hours)+":"+a.toEven(b.minutes)+":"+a.toEven(b.seconds);
		},
		/*------------------module6 regExp----------------------*/
		re:{				//正则
			rhtml:/<[^<]+>/g,
			remail:/[^\u4E00-\u9FA5\uF900-\uFA2D]+@[a-zA-Z]+\.[a-zA-Z]/i,
			rmobile:/^1[1-9]{1}[0-9]{9}$/,			//china mobile
			rid:/^\d{17}(\d|[a-zA-Z]){1}$/,			//china ID
			c_word:/[\u4E00-\u9FA5\uF900-\uFA2D]/,				//Chinese 
			number:/\d/g,				// isNumber
			rbank:/^(\d{4})\d*(\d{4})$/,				//bankcard hide number
		},
		/*------------------modulem request----------------------*/
		ajaxFunc:function(options){                //ajax原生
	        var xhr=null;
	        try{
	            xhr=new XMLHttpRequest();
	        }catch(e){
	            xhr=new ActiveXObject('Microsoft.XMLHTTP');
	        }
	        if(xhr===null){
	            console.log("你的浏览器版本不支持XHR");
	            return false;
	        }else{
	            // 配置信息
	            var opt={
	                "header":{},            //头部     
	                "method":"POST",        //请求方式
	                "async":true,           //异步/同步请求
	                "url":"",               //请求接口
	                "data":{},              //请求数据
	                "success":null,         //成功回调
	                "error":null,           //失败回调
	                "code":"code",          //状态字段名称  默认为code
	                "code_value":0,         //请求成功码  默认为0
	                "message":"message"     //请求失败话术字段名  默认为message
	            };
	            var default_header={
	                // "hash":"",
	                // "access-token":"",
	                // "app-name":"uliaow-app"
	            }
	            opt["header"]=options["header"]?options["header"]:default_header;
	            opt["method"]=options["method"]?options["method"]:"POST";
	            opt["async"]=options["async"]?options["async"]:true;
	            opt["url"]=options["url"]?options["url"]:"";
	            opt["data"]=options["data"]?JSON.stringify(options["data"]):{};         //数据处理
	            opt["success"]=options["success"]?options["success"]:null;
	            opt["error"]=options["error"]?options["error"]:null;
	            opt["code"]=options["code"]?options["code"]:"code";
	            opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
	            opt["message"]=options["message"]!==undefined?options["message"]:"message";

	            if(opt["url"]===""){console.log("url is undefined");return false;}
	            // 监听事件
	            xhr.onreadystatechange=function(){
	                if(xhr.readyState==4){
	                    if((xhr.status>=200 && xhr.status<300) || xhr.status===304){
	                        //console.log(xhr.responseText);
	                        var data=xhr.responseText;
	                        data=JSON.parse(data);
	                        if(data[opt["code"]]===opt["code_value"]){
	                            if(opt.success && opt.success instanceof Function){
	                                opt.success(data);
	                            }else{
	                                console.log("XMLHttpRequest is seccess");
	                            }
	                        }else{
	                            if(opt.errorFunc && opt.errorFunc instanceof Function){
	                                opt.errorFunc(data);
	                            }
	                        }
	                    }else{
	                        //console.log(xhr.status);
	                        var data=xhr.responseText;
	                        data=JSON.parse(data);
	                        if(opt.errorFunc && opt.errorFunc instanceof Function){
	                            opt.errorFunc(data);
	                        }
	                    }
	                }
	            }
	            xhr.open(opt["method"],opt["url"],opt["async"]);            //发送请求
	            for(var key in opt["header"]){
	                xhr.setRequestHeader(key,opt["header"][key]);         //设置头部
	            }
	            if(opt["method"]==="POST") xhr.send(opt["data"]);else xhr.send();       //发送数据
	        }
	    },
		/*------------------moduln code quality--------------------*/
		getSpeed:function(func,arr){				// 检查函数运行速度
		    var t=0;
		    var start=0,end=0;
		    for(var i=0;i<5;i++){
		        start=new Date();
		        start=start.getTime();
		        for(var j=0;j<10000;j++){
		            func.apply(null,arr);
		        }
		        end=new Date();
		        end=end.getTime();
		        t+=(end-start);
		    }
		    console.log("用时:"+t/5+"ms");
		}
	};
	//bind window
	g.sp=sharp;
}(window);
/*----------数组方法扩充-----------*/
Array.prototype.deletion = function(){					// 数组去重
	var n = {},r=[]; //n为has表，r为临时数组
	//遍历当前数组
	for(var i = 0,len=this.length;i < len; i++){
		if (!n[this[i]]) {
			//如果hash表中没有当前项
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
};
Array.prototype.insertSort=function(){						// 插入排序   小-----》大   性能最优
	var j,key;
    for(var i=0,len=this.length;i < len; i++){ 
         j = i; key = this[j]; 
        while(--j > -1){ 
            if(this[j] > key){ 
                this[j+1] = this[j];
            }else{ break;} 
        }
        this[j+1] = key; 
    }
};