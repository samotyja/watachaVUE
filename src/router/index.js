import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpotifyBar from '@/components/SpotifyBar.vue';
import SpotifyCallback from '@/components/SpotifyCallback.vue';
// import Playlist from '@/views/Playlist.vue';

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
      name: 'login',
      component: SpotifyBar
    },
    {
      path: '/callback',
      name: 'callback',
      component: SpotifyCallback
    },
    //   {
    //   path: '/playlist',
    //   name: 'Callback',
    //   component: Playlist
    // }
  ]
})

export default router
