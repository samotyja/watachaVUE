import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpotifyLogin from '@/components/SpotifyLogin.vue';
import SpotifyCallback from '@/components/SpotifyCallback.vue';
import BirthDay from '@/views/BirthDay.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: SpotifyLogin
    },
    {
      path: '/callback',
      name: 'Callback',
      component: SpotifyCallback
    },
      {
      path: '/watachaAI',
      name: 'Birthday',
      component: BirthDay
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
