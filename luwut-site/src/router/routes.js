import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home'
import list from '@/pages/list'
import detail from '@/pages/detail'


Vue.use(VueRouter)

const routes=new VueRouter({
	routes:[
		{path:'/',component:home},
		{path:'/home',name:'home',component:home},
		{path:'/list',name:'list',component:list,
			children:[
				{path:'detail',component:detail}
			]
		}
	]
});


export default routes