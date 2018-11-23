import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import My from './views/My.vue'
import Management from './views/Management.vue'
import ManagementContest from './views/ManagementContest.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/my',
            name: 'My',
            component: My
        },
        {
            path: '/management',
            name: 'Management',
            component: Management
        },
        {
            path: '/management/:id',
            name: 'ManagementContest',
            component: ManagementContest,
            props: true
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
