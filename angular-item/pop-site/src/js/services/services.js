/*
	#author		lut000
	#date 		2017/10/23
	#purpose	服务
*/
define(["app"],function(app){
    app.service("mainServices",function(){
    	var self=this;
    	
    	self.setCurClass=function(str,key_name,tclass){					//设置样式
    		var nkey=key_name || "nav_name";
    		
			if(str==this[nkey]){
				
				return tclass!=undefined?tclass:"active-item";
			}
		};
		self.s_version="2017/10/27.5";									//时间戳
    });
});