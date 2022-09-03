import { createRouter, createWebHashHistory } from 'vue-router'
import AuthPage from './../../src/views/AuthPage.vue'
import Home from './../../src/views/Home.vue'
import authGuard from './guards/authGuard.js'


const routes = [
    {
        name: 'AuthPage',
        path: '/',
        component: AuthPage
    },
    {
        name: 'Home',
        path: '/home/:id',
        component: Home,
        props: true,
        beforeEnter: [authGuard]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router 


