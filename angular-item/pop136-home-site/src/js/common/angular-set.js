/**
 *  author	lut000	
 *	date	2017/07/04
 * 
 * 	app.js
 **/

!function(){
	var app = angular.module('mainApp',["ui.router","mControllers"]);
	app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('index');
		$stateProvider
			.state("index",{
				url:"/index",
				templateUrl:"index.html",
				controller:"IndexController"
			})
			.state("service",{
				url:"/service",
				templateUrl:"service.html",
				controller:"ServiceController"
			})
			.state("partner",{
				url:"/partner",
				templateUrl:"partner.html",
				controller:"PartnerController",
				views:{
					//默认进入后的配置
	                "":{
	                    templateUrl:"partner.html",
	                    controller: function($state,$scope,setPageCur){
	                    	setPageCur.setPos("partner");
	                    	setPageCur.setModel("list");
	                    	$scope.showModel=setPageCur.showModel;
	                        $state.go('partner.list');//默认显示第一个模块
	                    }
	                }
	            }
			})
			.state("partner.list",{
				url:"/list",
				templateUrl:"partner/list.html",
				controller:"PartnerController.ListController"
			})
			.state("partner.story",{
				url:"/story",
				templateUrl:"partner/story.html",
				controller:"PartnerController.StoryController"
			})
			.state("about",{
				url:"/about",
				templateUrl:"about.html",
				controller:"AboutController"
			})
	}]);

	//加入script
	app.directive('loadscript', function() { 
		return { 
			restrict: 'EA',
			terminal: true, 
			link: function(scope, element, attr) { 
				if (attr.ngSrc) { 
					var s = document.createElement('script'); 
					s.src = attr.ngSrc;
					element[0].appendChild(s);
				} 
			} 
		}; 
	});


	/*service服务*/

	app.service("setPageCur",function(){
		var self=this;
		this.str="index";
		this.setPos=function(npos){
			self.str=npos;
		};
		
		this.setCurClass=function(str){
			if(str==self.str){
				return "active-item";
			}
		};
		
		
		this.model="list";
		this.setModel=function(npos){
			self.model=npos;
		};
		
		this.showModel=function(str){
			if(str==self.model){
				return true;
			}else{
				return false;
			}
		};
	});

}();
