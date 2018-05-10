'use strict';


let def={
	init:function(){
		this.setDefaultHeight();
		this.bindFn();
	},

	setDefaultHeight:function(){
		let oh=document.documentElement.clientHeight;
		let header=document.querySelector("header");
		let footer=document.querySelector("footer");
		let content=document.querySelector(".js-main-section");
		console.log(oh,header.offsetHeight,footer.offsetHeight,content.offsetHeight)
		if(oh>header.offsetHeight+footer.offsetHeight+content.offsetHeight){
			this.content_style.height=oh-header.offsetHeight-footer.offsetHeight+'px';
		}
	},


	bindFn:function(){
		window.addEventListener('resize',this.resizeFn,false);
	},

	resizeFn:function(e){
		this.setDefaultHeight();
	},

};

export default def;