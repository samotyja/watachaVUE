<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-7">
      <table
        style="width: 100%"
        class="table table-dark table-striped"
      >
        <tbody id="list-holder">
          <tr
            v-for="(song, index) in filteredSongs"
            :key="index"
          >
            <td style="width: 70%">{{ song.ARTIST }} - {{ song.TITLE }}</td>
            <td style="width: 20%">{{ song.GAME.toUpperCase() }}</td>
            <!-- <td
              v-if="showFileName"
              style="width: 10%"
            >
              {{ song.DLC.toUpperCase() }}
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    songs: Array,
    searchCriteria: Object,
  },
  setup(props) {
    const filteredSongs = computed(() => {
      if (!props.searchCriteria.query) return props.songs;

      if (props.searchCriteria.type === 'INDEX') {
        const index = parseInt(props.searchCriteria.query);
        return [props.songs[index]];
      }

      return props.songs.filter((song) => song[props.searchCriteria.type].toLowerCase().includes(props.searchCriteria.query.toLowerCase()));
    });

    return {
      filteredSongs,
    };
  },
};
</script>
