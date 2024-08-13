<template>
  <div>Logowanie do Spotify...</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();

    onMounted(async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        try {
          const response = await axios.post('https://api.watacha.live/get-token', { code });
          localStorage.setItem('spotify_access_token', response.data.access_token);
          localStorage.setItem('spotify_refresh_token', response.data.refresh_token);
          router.push('/');
        } catch (error) {
          console.error('Error getting access token:', error);
          router.push('/login');
        }
      }
    });
  },
};
</script>
