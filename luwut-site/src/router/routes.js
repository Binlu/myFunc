import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes=new VueRouter({
    mode: 'history',
	routes:[
		{path:'/',name:'首页',component:resolve => require(['@/pages/home'],resolve)},
		{path:'/home',name:'首页',component:resolve => require(['@/pages/home'],resolve)},
		{path:'/list',name:'列表',component:resolve => require(['@/pages/list'],resolve),
			children:[
				{path:'detail',name:'详情',component:resolve => require(['@/pages/detail'],resolve)}
			]
        },
        {path:'/news',name:'动态',component:resolve=>require(['@/pages/news'],resolve),
            children:[
                {path:'detail',name:'详情',component:resolve=>require(['@/pages/new_detail'],resolve)}
            ]
        }
	]
});


export default routes