<template>
  <button
    @click="login"
    class="btn btn-success"
  >
    Zaloguj przez Spotify
  </button>
</template>

<script setup>
import axios from 'axios';

const login = async () => {
  try {
    // const response = await axios.get('https://api.watacha.live/login');
    const response = await axios.get('http://localhost:3000/login');
    window.location.href = response.data.loginUrl;
  } catch (error) {
    console.error('Error getting login URL:', error);
  }
};
</script>
