import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProfileView from "@/views/ProfileView.vue";

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
      component: ProfileView,
    }
  ],
})

export default router
