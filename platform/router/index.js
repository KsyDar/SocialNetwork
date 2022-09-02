import { createRouter, createWebHashHistory } from 'vue-router'
import AuthPage from './../../src/views/AuthPage.vue'


const routes = [
    {
        name: 'AuthPage',
        path: '/',
        component: AuthPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router 


