import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpotifyBar from '@/components/SpotifyBar.vue';
import SpotifyCallback from '@/views/SpotifyCallback.vue';
import NotFound from '@/views/NotFound.vue'
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
      path: '/callback',
      name: 'callback',
      component: SpotifyCallback
    },
    //   {
    //   path: '/playlist',
    //   name: 'Callback',
    //   component: Playlist
    // }
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
