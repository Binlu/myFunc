/*
	#author		lut000
	#date 		2017/10/20
	#purpose	directive指令
*/
define(["app"],function(app){
	app.directive('loadscript',function($rootScope) {												//加载js 
		return { 
			restrict: 'EA',
			terminal: true,
			link: function(scope, element, attr) {
				if(attr.ngType=="1"){
					if (attr.ngSrc) { 
						var s = document.createElement('script'); 
						s.src = attr.ngSrc+"?version="+$rootScope.s_version;
						s.type ='text/javascript';
						element[0].appendChild(s);
					}
				}else if(attr.ngType=="2"){
					if (attr.ngStr) { 
						var s = document.createElement('script');
						s.type ='text/javascript';
						s.innerHTML = attr.ngStr;
						element[0].appendChild(s);
					} 
				}
				
			} 
		}; 
	});
	
	app.directive('posdom',function($rootScope) { 													//加载右侧悬浮dom
		return { 
			restrict: 'E',
			replace: true,
			templateUrl:"template-dom/fixed-right.html?t="+$rootScope.ntimes
		}; 
	});
});