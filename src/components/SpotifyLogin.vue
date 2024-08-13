<template>
  <button
    @click="login"
    class="btn btn-success"
  >
    Zaloguj przez Spotify
  </button>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const login = async () => {
      try {
        const response = await axios.get('https://api.watacha.live/login');
        window.location.href = response.data.loginUrl;
      } catch (error) {
        console.error('Error getting login URL:', error);
      }
    };

    return { login };
  },
};
</script>
