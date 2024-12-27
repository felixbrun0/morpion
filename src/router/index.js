import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue";
import Join from "../views/Join.vue";
import Game from "@/views/Game.vue";

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
      component: Game,
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
