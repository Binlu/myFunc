'use strict';
import Vue from 'vue';
import routes from '@/router/routes';
import header from '@/components/header';
import footer from '@/components/footer';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';

// 共用
import common from '@/assets/js/common/common';


Vue.config.productionTip = false;

new Vue({
    el: '.js-app-box',
    
	router:routes,
	data(){
		return {
			content_style:{
				height:'400px'
			},
			is_loaded:true
		}
	},
	components:{
		'header-template':header,
		'footer-template':footer
	},
	mounted: function () {
		this.is_loaded = false;
	  	this.init();
	},
	methods:common
})
