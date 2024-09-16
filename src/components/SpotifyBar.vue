<template>
  <div
    class="spotify-bar mb-4"
    :class="{ 'spotify-bar--logged': isLoggedIn }"
  >
    <div class="container-fluid h-100">
      <div class="row align-items-center h-100">
        <div
          v-if="isLoggedIn"
          class="col-auto p-0 d-flex align-items-center spotify-bar__profile"
        >
          <div class="spotify-bar__profile-picture">
            <img
              :src="userAvatar"
              alt="profile-pic"
            />
          </div>
          <div class="d-none d-md-block ms-2 spotify-bar__profile-nickname">
            {{ userName }}
          </div>
        </div>

        <div class="col d-flex justify-content-center align-items-center">
          <div
            v-if="isLoggedIn"
            class="me-3 text-truncate spotify-bar__song-title text-wrap"
          >
            {{ songTitle }}
          </div>
          <button
            v-if="isLoggedIn && isConnected"
            class="btn btn btn-info"
            @click="togglePlay"
          >
            <PhPlay
              v-if="isPaused == true"
              :size="20"
              color="#f7f7f7"
            />
            <PhPause
              v-else-if="isPaused == false"
              :size="20"
              color="#f7f7f7"
            />
          </button>
          <button
            v-else
            class="btn btn btn-success"
            @click="reconnect"
          >
            <PhPlugs :size="20" />
          </button>
        </div>

        <div class="col-auto p-0 d-flex justify-content-end spotify-bar__button">
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="btn btn btn-danger"
          >
            <span class="d-inline">Logout</span> <PhSpotifyLogo :size="20" />
          </button>
          <button
            v-if="!isLoggedIn"
            @click="login"
            class="btn btn btn-success"
          >
            <span class="d-inline">Log in</span> <PhSpotifyLogo :size="20" />
          </button>
        </div>
      </div>
    </div>

    <div class="spotify-bar__progress">
      <div class="spotify-bar__progress-bar"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import router from '@/router';
import { PhSpotifyLogo, PhPlay, PhPause, PhPlugs } from '@phosphor-icons/vue';
import { onMounted, ref } from 'vue';
import { refreshTokenIfNeeded } from '@/services/refreshTokenIfNeeded';

const emit = defineEmits(['alert', 'clearAlert']);

const props = defineProps({
  isLoggedIn: Boolean,
});

let script;
let userAvatar;
let userName;
let deviceId;
const isConnected = ref();
const player = ref();
const progress = ref(0);
const songTitle = ref('Not playing now 😭');
const isPaused = ref(true);

onMounted(() => {
  try {
    loadUserData();
    if (props.isLoggedIn) {
      loadSpotifySDK();
      initializePlayer();
    }
  } catch (error) {
    console.error('Failed to load Spotify SDK durning mounting', error);
  }
});

const login = async () => {
  try {
    // const response = await axios.get('https://api.watacha.live/login');
    const response = await axios.get('http://localhost:3000/login');
    window.location.href = response.data.loginUrl;
  } catch (error) {
    console.error('Error getting login URL:', error);
  }
};

const logout = () => {
  try {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_expires_in');
    localStorage.removeItem('spotify_token_expiration');
    localStorage.removeItem('spotify_user');
    localStorage.removeItem('spotify_avatar');
    router.go(0);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const loadUserData = () => {
  if (props.isLoggedIn) {
    userAvatar = localStorage.getItem('spotify_avatar');
    userName = localStorage.getItem('spotify_user');
  }
};

const loadSpotifySDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Spotify) {
      resolve();
      return;
    }

    script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Fail load Spotify SDK'));
    };
    document.body.appendChild(script);
  });
};

const initializePlayer = async () => {
  try {
    await refreshTokenIfNeeded();
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem('spotify_access_token');
      songTitle.value = 'Connecting to player...';
      player.value = new Spotify.Player({
        name: 'Watacha.live WEB Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.2,
      });

      player.value.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        deviceId = device_id;
        isConnected.value = true;
        await changeDevice(deviceId);
      });

      player.value.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.value.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.value.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.value.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      player.value.addListener('player_state_changed', ({ paused, position, duration, track_window: { current_track } }) => {
        isPaused.value = paused;
        updateProgressBar(position, duration);
        if (current_track) {
          songTitle.value = current_track.artists[0].name + ' - ' + current_track.name;
          emit('clearAlert');
        } else {
          songTitle.value = 'Not playing now 😭';
          emit('alert', { message: 'The connection to the player has been lost, or the spotify device has been changed?', type: 'danger' });
          player.value.disconnect();
          isConnected.value = false;
        }
      });

      setInterval(async () => {
        if (!isPaused.value) {
          const state = await player.value.getCurrentState();
          const { position, duration } = state;
          updateProgressBar(position, duration);
        }
        console.log(player.value);
      }, 1000);
      player.value.connect();
    };
  } catch (error) {
    console.error('Getting ready the SDK error:', error);
  }
};

const changeDevice = async (deviceId) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_ids: [deviceId],
      }),
    });
    console.log('Playback transferred successfully');
  } catch (error) {
    console.error('Error transferring playback:', error);
  }
};

const updateProgressBar = (position, duration) => {
  progress.value = (position / duration) * 100;
  progress.value = Math.floor(progress.value);
  progress.value = progress.value + '%';
};

const togglePlay = async () => {
  try {
    await player.value.togglePlay().then(() => {
      // console.log('Toggled playback!');
    });
  } catch (error) {
    console.error('Player toggle error:', error);
  }
};

const reconnect = async () => {
  try {
    songTitle.value = 'Connecting to player...';
    player.value.connect();
  } catch (error) {
    console.error('Reconnection error:', error);
    songTitle.value = 'Reconnection error';
  }
};
</script>

<style scoped>
.spotify-bar {
  height: 60px;
  background-color: rgb(17, 16, 16) !important;
}

.spotify-bar--logged {
  position: sticky;
  top: 0;
  z-index: 1020;
  opacity: 95%;
}

.spotify-bar__profile-picture > img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.spotify-bar__profile-nickname {
  color: #fff;
  text-align: left;
  font-size: 1.2rem;
}

.spotify-bar__song-title {
  color: #fff;
  font-size: 0.9rem;
  max-width: 200px;
  max-height: 40px;
}

.spotify-bar__button {
  padding-right: 0px;
}

.spotify-bar__progress {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  background-color: grey;
}

.spotify-bar__progress-bar {
  height: 10px;
  background-color: #dc3545;
  width: v-bind(progress);
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
</style>
