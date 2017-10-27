/**
 * author  lut000
 * date    2017/07/04
 **/

require(["jquery","general"],function(jquery,pop){
    $(function(){
        // 判断显示
        var location_obj=pop.fn.getLocationParameter();
        
        
		//点击显示更多
		var more_img_src='src/images/partner/';
		$('.js-more-btn').on('click',function(){
			var data_status=$(this).attr('data-status')*1||0;
			var slide_el=$(this).parent('.more-slide').prev('.js-slide-list');
			
			if(data_status==0){
				$(this).children('img').attr('src',more_img_src+'up1.png');
				$(this).attr('data-status',1).children('span').text('收起');
				slide_el.slideDown(300);
			}else{
				$(this).children('img').attr('src',more_img_src+'down1.png');
				$(this).attr('data-status',0).children('span').text('更多');
				slide_el.slideUp(300);
			}
		})			
		
		$('.js-more-btn').hover(function(){
			var data_status=$(this).attr('data-status')*1||0;
			if(data_status==1){
				$(this).children('img').attr('src',more_img_src+'up2.png');
			}else{
				$(this).children('img').attr('src',more_img_src+'down2.png');
			}
			
		},function(){
			var data_status=$(this).attr('data-status')*1||0;
			if(data_status==1){
				$(this).children('img').attr('src',more_img_src+'up1.png');
			}else{
				$(this).children('img').attr('src',more_img_src+'down1.png');
			}
		})
		
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
        }
        
        //hover-on移入显示
        $('.js-story-list>li').hover(function(){
        	$(this).find('.hover-on').addClass('hover-trans');
        },function(){
        	$(this).find('.hover-on').removeClass('hover-trans');
        })
        
        //hover-on滚动取消冒泡
		$('.js-story-list .hover-on').on('scroll',function(e){
			var ev=e||event;
			if(ev.stopPropagation){
				ev.stopPropagation(); 
			}else{ 
				ev.cancelBubble = true; 
			};
		})
      
    });
});