<template>
  <main>
    <SongSearch @search="updateSearch" />
    <hr class="border border-danger border-3 opacity-75" />
    <SongList
      :songs="songs"
      :searchCriteria="searchCriteria"
    />
  </main>
</template>

<script>
import { ref } from 'vue';
import SongSearch from '../components/SongSearch.vue';
import SongList from '../components/SongList.vue';
import songData from '../assets/data.json';

export default {
  components: {
    SongSearch,
    SongList,
  },
  setup() {
    const songs = ref(songData);
    const searchCriteria = ref({ query: '', type: 'TITLE' });

    const updateSearch = (criteria) => {
      searchCriteria.value = criteria;
    };

    return {
      songs,
      searchCriteria,
      updateSearch,
    };
  },
};
</script>
