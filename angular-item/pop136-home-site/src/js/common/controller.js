/**
 *  author	lut000	
 *	date	2017/07/04
 * 
 * 	controller.js
 **/


!function(){
	var mainController=angular.module("mControllers",["ng"]);

	//主控制器
	mainController.controller("mainController",["$scope","setPageCur",function($scope,setPageCur){
		$scope.setCurClass=setPageCur.setCurClass;
	}]);

	//首页控制器
	mainController.controller("IndexController",["$scope","setPageCur",function($scope,setPageCur){
		//console.log($scope)
		$scope.img_arr=["ICON10.jpg","ICON4.jpg","ICON9.jpg","ICON2.jpg","ICON6.jpg","ICON7.jpg","ICON12.jpg","ICON14.jpg","ICON13.jpg","ICON8.jpg","ICON5.jpg","ICON1.jpg","ICON3.jpg"]
		$scope.style_str="style='margin-left:0'";
		setPageCur.setPos("index");
		
		
	}]);


	//服务控制器
	mainController.controller("ServiceController",["$scope","setPageCur",function($scope,setPageCur){
		setPageCur.setPos("service");
	}]);

	//合作伙伴控制器
	mainController.controller("PartnerController",["$scope","setPageCur",function($scope,setPageCur){
		//设置一级导航样式
		setPageCur.setPos("partner");
		//设置子导航样式
		$scope.showModel=setPageCur.showModel;
		console.log(setPageCur)
	}]);
	mainController.controller("PartnerController.ListController",["$scope","setPageCur",function($scope,setPageCur){
		setPageCur.setModel("list");
		//$scope.showModel=setPageCur.showModel;
	}]);
	mainController.controller("PartnerController.StoryController",["$scope","setPageCur",function($scope,setPageCur){
		setPageCur.setModel("story");
		//$scope.showModel=setPageCur.showModel;
	}]);


	//关于我们
	mainController.controller("AboutController",["$scope","setPageCur",function($scope,setPageCur){
		setPageCur.setPos("about");
	}]);
}();
