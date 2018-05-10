'use strict';
import Vue from 'vue';
import routes from '@/router/routes';
import header from '@/components/header';
import footer from '@/components/footer';
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false;

new Vue({
	el: '.js-app-box',
	router:routes,
	data(){
		return {
			is_loaded:true
		}
	},
	components:{
		'header-template':header,
		'footer-template':footer
	},
	created : function(){
		this.is_loaded = false
		console.log(' It work! ')
	}
})
