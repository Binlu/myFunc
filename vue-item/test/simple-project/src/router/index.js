import Vue from 'vue'
import Router from 'vue-router'

const layout = resolve => require(['@/components/layout'], resolve);
const frist = resolve => require(['@/components/frist'], resolve);
const frist_page = resolve => require(['@/components/frist-page'], resolve);
const second = resolve => require(['@/components/second'], resolve);


Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            component: layout,
            children:[
                {
                    path: '/frist',
                    name:'frist',
                    meta: { requireAuth: true },
                    component:frist,
                    children:[
                        {
                            path:'frist_page',
                            meta: { requireAuth: true },
                            component:frist_page
                        }
                    ]
                },
                {
                    path: '/second',
                    meta: { requireAuth: true },
                    name: 'second',
                    component: second
                }
            ]
        }
    ]
})
