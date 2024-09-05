<template>
  <div
    class="row align-items-center spotify-bar"
    :class="{ 'spotify-bar--logged': isLoggedIn }"
  >
    <div
      v-if="isLoggedIn"
      class="col-lg-3 col-3 spotify-bar__profile"
    >
      <div class="row align-items-center">
        <div class="col-auto spotify-bar__profile-picture">
          <img
            :src="userAvatar"
            alt="profile-pic"
          />
        </div>
        <div class="col d-none d-lg-block spotify-bar__profile-nickname">
          {{ userName }}
        </div>
      </div>
    </div>
    <div
      v-if="isLoggedIn"
      class="col"
    ></div>
    <div class="col-auto ms-auto d-grid spotify-bar__button">
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="btn btn-danger"
      >
        Wyloguj <PhSpotifyLogo :size="24" />
      </button>
      <button
        v-if="!isLoggedIn"
        @click="login"
        class="btn btn-success"
      >
        Zaloguj <PhSpotifyLogo :size="24" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.spotify-bar {
  height: 60px;
  margin: 0 0 20px 0;
  background-color: rgb(17, 16, 16) !important;
}

.spotify-bar--logged {
  position: sticky;
  top: 0;
  z-index: 1;
  opacity: 95%;
}

.spotify-bar__profile-picture {
  padding-left: 0px;
}

.spotify-bar__profile-picture > img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.spotify-bar__profile-nickname {
  padding-left: 0px;
  color: #fff;
  text-align: left;
  font-size: 1.2rem;
}

.spotify-bar__button {
  padding-right: 0px;
}
</style>

<script setup>
import axios from 'axios';
import router from '@/router';
import { PhSpotifyLogo } from '@phosphor-icons/vue';
import { onMounted, watch, ref } from 'vue';

const props = defineProps({
  isLoggedIn: Boolean,
});

const userAvatar = ref('');
const userName = ref('');

const login = async () => {
  try {
    // const response = await axios.get('https://api.watacha.live/login');
    const response = await axios.get('http://localhost:3000/login');
    window.location.href = response.data.loginUrl;
  } catch (error) {
    console.error('Error getting login URL:', error);
  }
};

const logout = async () => {
  try {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_expires_in');
    localStorage.removeItem('spotify_token_expiration');
    localStorage.removeItem('spotify_user');
    localStorage.removeItem('spotify_avatar');

    router.go(0);
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
  }
};

const loadUserData = () => {
  if (!props.isLoggedIn) {
    userAvatar.value = localStorage.getItem('spotify_avatar');
    userName.value = localStorage.getItem('spotify_user');
  }
};

onMounted(loadUserData);
</script>
