import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../../src/views/Auth.vue'
import User from '../../src/views/user/User.vue'
import Home from '../../src/views/user/Home.vue'
import ChangeProfile from '../../src/views/user/ChangeProfile.vue'
import FriendList from '../../src/views/user/FriendList.vue'
import authGuard from './guards/authGuard.js'
import Guest from '../../src/views/user/Guest.vue'


const routes = [
  {
    name: 'AuthPage',
    path: '/',
    component: Auth
  },
  {
    name: 'User',
    path: '/user/:id',
    component: User,
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
      {
        name: 'Guest',
        path: 'friend/:friendId',
        component: Guest,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router


