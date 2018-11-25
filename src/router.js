import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import My from './views/My.vue'
import Management from './views/Management.vue'
import ManagementContest from './views/ManagementContest.vue'
import CreateContest from './views/CreateContest.vue'
import JoinData from './views/JoinData.vue'

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
            path: '/management/create',
            name: 'CreateContest',
            component: CreateContest
        },
        {
            path: '/management/:id',
            name: 'ManagementContest',
            component: ManagementContest,
            props: true
        },
        {
            path: '/joinData/:id',
            name: 'JoinData',
            component: JoinData,
            props: true
        },
    ]
})
