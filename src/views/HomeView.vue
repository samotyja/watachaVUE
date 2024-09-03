<template>
  <main>
    <SpotifyLogin v-if="!isLoggedIn" />
    <button
      v-if="isLoggedIn"
      @click="logout"
      class="btn btn-danger"
    >
      Wyloguj
    </button>
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

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import SongSearch from '@/components/SongSearch.vue';
import SongList from '@/components/SongList.vue';
import songData from '@/assets/data.json';
import SpotifyLogin from '@/components/SpotifyLogin.vue';

export default {
  components: {
    SongSearch,
    SongList,
    SpotifyLogin,
  },

  setup() {
    const songs = ref(songData);
    const searchCriteria = ref({});
    let showFileName = ref(false);
    const isLoggedIn = ref(false);
    const router = useRouter();

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

    const logout = async () => {
      try {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_expires_in');

        router.go(0);
      } catch (error) {
        console.error('Błąd podczas wylogowywania:', error);
      }
    };

    return {
      songs,
      searchCriteria,
      updateSearch,
      selectRandomSong,
      toggleFileName,
      showFileName,
      isLoggedIn,
      logout,
    };
  },
};
</script>
