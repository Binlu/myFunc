/*
	#author		lut000
	#date 		2017/10/20
	#purpose	控制器
*/
define(["app","general"],function(app,pop){
	//配置全局属性
	var ntimes=(new Date()).getTime();
	app.run(function($rootScope,mainServices){
	    $rootScope.s_version=mainServices.s_version;
	    $rootScope.ntimes=ntimes;
	});
	//首页控制器
	
	app.controller("viewController",["$scope","$rootScope",function($scope,$rootScope){
		$scope.pos_arr=[];
		$scope.$on("setPos",function(e,data){
			$scope.pos_arr=data;
		});
		//常见问题
		$scope.$on("faq_id",function(e,id){
			$scope.faq_href="pop-help/content_"+id+".tpl.html";
		});
    }])
    app.controller("homeController",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    	
    	$http.get("src/js/data/home-json.js?t="+ntimes).success(function(data){
    		$scope.img_arr=data.img_arr;
    	});
    }])
    //产品服务
    .controller("serviceController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    //合作伙伴
    .controller("partnerController",["$scope","$rootScope","$state",function($scope,$rootScope,$state){
    	var current_state=$state.current;
    	if(current_state.name=="partner"){
    		$state.go("partner.list");
    	}
    }])
    .controller("partnerController.listController",["$scope","$rootScope","$state",function($scope,$rootScope,$state){
    }])
    .controller("partnerController.storyController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    //关于POP
    .controller("aboutController",["$scope","$rootScope","$state",function($scope,$rootScope,$state){
    	var current_state=$state.current;
    	if(current_state.name=="about"){
    		$state.go("about.1");
    	}
    }])
    .controller("aboutController.introductionController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("aboutController.cultureController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("aboutController.honoursController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("aboutController.newsController",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    	$http.get("src/js/data/news-json.js?t="+ntimes).success(function(data){
    		$scope.news_list=data.new_list;
    	});
    }])
    .controller("viewController.newsDetailController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("aboutController.photosController",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    	$scope.npage=1;
    	$scope.page_size=20;
    	$scope.ntimes=ntimes;
    	$scope.start_num=0;
    	$scope.photos_arr=[];
    	$http.get("src/js/data/photos-list-json.js?t="+ntimes).success(function(data){
    		$scope.photos_len=data.photos_list.length;
    		$scope.total_page=Math.ceil($scope.photos_len/$scope.page_size);
    		require(["laypage"],function(laypage){
    			// 分页
                laypage({
                    cont:$(".js-page-controller").eq(0),
                    pages:$scope.total_page,
                    curr:$scope.npage,
                    groups:3,
                    skin:"#f40",
                    first:"首页",
                    last:"尾页",
                    prev:"上一页",
                    next:"下一页",
                    skip:true,
                    hash:"position",
                    jump:function(ndata,first){
                    	$scope.photos_arr=data.photos_list.slice((ndata.curr-1)*$scope.page_size,ndata.curr*$scope.page_size);
                    	$scope.start_num=(ndata.curr-1)*$scope.page_size;
                    	$scope.npage=ndata.curr;
                    	$scope.$apply();
                    	
                    }
                });
    		})
    		
    		
    	});
    }])
    .controller("viewController.photosDeatailController",["$scope","$rootScope","$location",function($scope,$rootScope,$location){
    	var pos_arr=[
 		    {
 				"txt":"关于POP",
 				"is_children":true,
 				"href":"index.html#/about/1"
 			},
 			{
 				"txt":"企业相册",
 				"is_children":true,
 				"href":"index.html#/about/6"
 			},
 			{
 				"txt":"相册详情",
 				"is_children":false,
 				"href":""
 			}
 		];
 		$scope.$emit('setPos',pos_arr);
 		//数据
 		var href_obj=$location.search();
 		$scope.npage=1;
    	$scope.page_size=20;
    	$scope.ntimes=ntimes;
    	$scope.photos_arr=[];
    	
    	require(["about/photo-json/"+href_obj["act"],"laypage"],function(data,laypage){
    		// 分页    		
    		$scope.photos_len=data.length;
    		$scope.total_page=Math.ceil($scope.photos_len/$scope.page_size);
    		var re=/^http:\/\/[^\/]+\//;
    		var photos_arr=data.map(function(value,index,arr){
    			value.big="src/images/"+value.big.replace(re,"");
    			value.small="src/images/"+value.small.replace(re,"");
    			return value
    		});
            laypage({
                cont:$(".js-page-controller").eq(0),
                pages:$scope.total_page,
                curr:$scope.npage,
                groups:3,
                skin:"#f40",
                first:"首页",
                last:"尾页",
                prev:"上一页",
                next:"下一页",
                skip:true,
                hash:"position",
                jump:function(ndata,first){
                	$scope.photos_arr=photos_arr.slice((ndata.curr-1)*$scope.page_size,ndata.curr*$scope.page_size);
                	$scope.npage=ndata.curr;
                	$scope.$apply();
                	
                }
            });
    	});
    	
    	var show_pic_box=$(".js-show-pic-box");
    	var show_pic_bg=$(".js-bg");
    	var show_pic=$(".js-show-pic");
    	$scope.big_src="";
    	$scope.show_index=0;
    	
    	var ww=document.documentElement.clientWidth;
        var wh=document.documentElement.clientHeight;
    	
    	$scope.showBigImg=function(data){											//查看大图

    		$scope.show_index=data.$index;
    		$scope.big_src=data.item.big;

    		
    		show_pic.on("load",function(){
                var ow=this.width;
                var oh=this.height;
                var nh=Math.floor(ww*0.8*oh/ow);
                if(nh>wh*0.8){
                    $(this).css({"width":"auto","margin-top":0.1*wh+"px","height":wh*0.8+"px"});
                }else{
                    $(this).css({"width":"80%","height":"auto","margin-top":(wh-nh)/2+"px"});
                }
                show_pic_box.fadeIn(200);
        		
            });
    		show_pic_bg.fadeIn(400);
    		
    		if($scope.show_index<=0){
    			$(".js-prev-btn").hide();
    		}else if($scope.show_index>=$scope.photos_arr.length-1){
    			$(".js-next-btn").hide();
    		}
    	};

    	$scope.toImgShow=function(obj,type){												//切换图片
    		if(type==1){
    			if($scope.show_index<=1){
    				$(".js-prev-btn").hide();
    			}else{
    				$(".js-prev-btn").show();
    				$(".js-next-btn").show();
    			}
    			$scope.show_index--;
    		}else if(type==2){
    			if($scope.show_index>=$scope.photos_arr.length-2){
    				$(".js-next-btn").hide();
    			}else{
    				$(".js-prev-btn").show();
    				$(".js-next-btn").show();
    			}
    			$scope.show_index++;
    		}
    		$scope.big_src=$scope.photos_arr[$scope.show_index].big;
    	};
    	
    	$(".js-close-btn").on("click",function(){
    		show_pic_box.fadeOut(200);
    		show_pic_bg.fadeOut(400);
    	});
    }])
    .controller("aboutController.recruitController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    //联系我们
    .controller("contactController",["$scope","$rootScope","$state",function($scope,$rootScope,$state){
    	var current_state=$state.current;
    	if(current_state.name=="contact"){
    		$state.go("contact.site");
    	}
    }])
    .controller("contactController.siteController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("contactController.cooperationController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    .controller("contactController.advertisementController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    //会员中心
    
    .controller("memberController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    
    
    //登录注册
    .controller("loginController",["$scope","$rootScope",function($scope,$rootScope){
    	
    }])
    
    //常见问题
    .controller("viewController.faqController",["$scope","$rootScope","$location",function($scope,$rootScope,$location){
		var pos_arr=[
 		    {
 				"txt":"首页",
 				"is_children":true,
 				"href":"index.html#/home"
 			},
 			{
 				"txt":"常见问题",
 				"is_children":false,
 				"href":""
 			}
 		];
 		
 		$scope.$emit('setPos',pos_arr);
 		var id=$location.search().id || 11;
 		$scope.$emit('faq_id',id);
 								
 		$rootScope.$on('$locationChangeSuccess', function(evt,current,previous) {									//监听location变化
 			var id=$location.search().id || 11;
 	 		$scope.$emit('faq_id',id);
        });
	}])
});