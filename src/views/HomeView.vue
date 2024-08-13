<template>
  <main>
    <SpotifyLogin v-if="!isLoggedIn" />
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
    />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import SongSearch from '../components/SongSearch.vue';
import SongList from '../components/SongList.vue';
import songData from '../assets/data.json';
import SpotifyLogin from '../components/SpotifyLogin.vue';

export default {
  components: {
    SongSearch,
    SongList,
    SpotifyLogin,
  },

  setup() {
    const songs = ref(songData);
    const searchCriteria = ref({ query: '', type: 'TITLE' });
    let showFileName = ref(false);
    const isLoggedIn = ref(false);

    onMounted(() => {
      isLoggedIn.value = !!localStorage.getItem('spotify_access_token');
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

    return {
      songs,
      searchCriteria,
      updateSearch,
      selectRandomSong,
      toggleFileName,
      showFileName,
      isLoggedIn,
    };
  },
};
</script>
