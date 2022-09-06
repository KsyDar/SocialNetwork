import { createRouter, createWebHashHistory } from 'vue-router'
import AuthPage from './../../src/views/AuthPage.vue'
import UserPage from '../../src/views/userPage/UserPage.vue'
import Home from '../../src/views/userPage/Home.vue'
import ChangeProfile from '../../src/views/userPage/ChangeProfile.vue'
import FriendList from '../../src/views/userPage/FriendList.vue'
import authGuard from './guards/authGuard.js'


const routes = [
    {
        name: 'AuthPage',
        path: '/',
        component: AuthPage
    },
    {
        name: 'UserPage',
        path: '/user/:id',
        component: UserPage,
        props: true,
        beforeEnter: [authGuard],
        children: [
            {
                name: 'Home',
                path: 'home',
                component: Home,
              },
            {
              name: 'ChangeProfile',
              path: 'edit',
              component: ChangeProfile,
            },
            {
              name: 'FriendList',
              path: 'friends',
              component: FriendList,
            },
          ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router 


