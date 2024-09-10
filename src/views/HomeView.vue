<template>
  <main>
    <SpotifyBar :isLoggedIn="isLoggedIn" />
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
      :songs="songs"
      :searchCriteria="searchCriteria"
      :showFileName="showFileName"
      :isLoggedIn="isLoggedIn"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import SongSearch from '@/components/SongSearch.vue';
import SongList from '@/components/SongList.vue';
import songData from '@/assets/data.json';
import SpotifyBar from '@/components/SpotifyBar.vue';

const songs = ref(songData);
const searchCriteria = ref({});
let showFileName = ref(false);
const isLoggedIn = ref('');

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
</script>
