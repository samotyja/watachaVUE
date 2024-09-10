<template>
  <SpotifyBar
    @alert="handleComponentEvent"
    :isLoggedIn="isLoggedIn"
  />
  <div
    class="sticky-alert"
    :class="{ 'sticky-alert--logged': isLoggedIn }"
  >
    <div
      v-if="alert"
      :class="`alert alert-${alert.type} alert-dismissible fade show`"
      role="alert"
    >
      {{ alert.message }}
      <button
        @click="clearAlert"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
  <div class="row text-center">
    <div class="col">
      <img
        src="@/assets/images/title.png"
        class="img-fluid"
        alt=""
      />
    </div>
  </div>
  <br />
  <SongSearch
    @search="updateSearch"
    @randomSong="selectRandomSong"
    @showFileName="toggleFileName"
  />
  <hr class="border border-danger border-3 opacity-75" />
  <SongList
    @alert="handleComponentEvent"
    :songs="songs"
    :searchCriteria="searchCriteria"
    :showFileName="showFileName"
    :isLoggedIn="isLoggedIn"
  />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import SongSearch from '@/components/SongSearch.vue';
import SongList from '@/components/SongList.vue';
import songData from '@/assets/data.json';
import SpotifyBar from '@/components/SpotifyBar.vue';

const songs = ref(songData);
const searchCriteria = ref({});
let showFileName = ref(false);
const isLoggedIn = ref('');
const alert = ref(null);

const checkLoginStatus = () => {
  if (localStorage.getItem('spotify_access_token')) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
};

onBeforeMount(() => {
  checkLoginStatus();
});

const updateSearch = (criteria) => {
  searchCriteria.value = criteria;
};

const toggleFileName = () => {
  showFileName.value = !showFileName.value;
};

const selectRandomSong = () => {
  const randomIndex = Math.floor(Math.random() * songs.value.length);
  searchCriteria.value = {
    query: randomIndex.toString(),
    type: 'INDEX',
  };
};

const handleComponentEvent = (eventData) => {
  alert.value = { message: eventData.message, type: eventData.type };
};

const clearAlert = () => {
  alert.value = null;
};
</script>

<style scoped>
.sticky-alert {
  position: sticky;
  top: 10px;
  z-index: 1010;
}

.sticky-alert--logged {
  position: sticky;
  top: 80px;
}

main {
  height: 100vh;
  overflow-y: auto;
}
</style>
