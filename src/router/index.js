import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "@/views/Profile.vue";
import Join from "@/views/Join.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/games/:id',
      name: 'game',
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    }, {
      path: '/join',
      name: 'join',
      component: Join
    }
  ],
})

export default router
