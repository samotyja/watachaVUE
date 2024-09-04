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
            <td
              v-if="showFileName"
              style="width: 10%"
            >
              {{ song.DLC.toUpperCase() }}
            </td>
            <td>
              <button
                @click="playSong(song)"
                class="btn btn-sm btn-primary"
              >
                Play
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import SpotifyWebApi from 'spotify-web-api-js';
import { refreshTokenIfNeeded } from '@/services/refreshTokenIfNeeded';

const props = defineProps({
  songs: Array,
  searchCriteria: Object,
  showFileName: Boolean,
  isLoggedIn: Boolean,
});

const spotifyApi = new SpotifyWebApi();

const filteredSongs = computed(() => {
  if (!props.searchCriteria.query) return props.songs;

  if (props.searchCriteria.type === 'INDEX') {
    const index = parseInt(props.searchCriteria.query);
    return [props.songs[index]];
  }

  return props.songs.filter((song) => song[props.searchCriteria.type].toLowerCase().includes(props.searchCriteria.query.toLowerCase()));
});

const playSong = async (song) => {
  await refreshTokenIfNeeded();
  const accessToken = localStorage.getItem('spotify_access_token');
  spotifyApi.setAccessToken(accessToken);
  const searchResults = await spotifyApi.searchTracks(`${song.ARTIST} ${song.TITLE}`);
  if (searchResults.tracks.items.length > 0) {
    const trackUri = searchResults.tracks.items[0].uri;
    await spotifyApi.play({ uris: [trackUri] });
  }
};

watch(
  () => props.isLoggedIn,
  (newValue) => {
    if (newValue) {
      const accessToken = localStorage.getItem('spotify_access_token');
      spotifyApi.setAccessToken(accessToken);
    }
  }
);
</script>
