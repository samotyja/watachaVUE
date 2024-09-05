<template>
  <div>Logowanie do Spotify...</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

const router = useRouter();
const spotifyApi = new SpotifyWebApi();

onMounted(async () => {
  const code = new URLSearchParams(window.location.search).get('code');
  if (code) {
    try {
      // const response = await axios.post('https://api.watacha.live/get-token', { code });
      const response = await axios.post('http://localhost:3000/get-token', { code });

      localStorage.setItem('spotify_access_token', response.data.access_token);
      localStorage.setItem('spotify_refresh_token', response.data.refresh_token);
      localStorage.setItem('spotify_token_expiration', Date.now() + response.data.expires_in * 1000);
      try {
        spotifyApi.setAccessToken(response.data.access_token);
        const userInfo = await spotifyApi.getMe();
        localStorage.setItem('spotify_user', userInfo.display_name);
        localStorage.setItem('spotify_avatar', userInfo.images[0].url);
        router.push('/');
      } catch (error) {
        console.error('Error getting user data:', error);
        router.push('/login');
      }
    } catch (error) {
      console.error('Error getting access token:', error);
      router.push('/login');
    }
  }
});
</script>
