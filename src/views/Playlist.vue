<template>
  <div>
    <button
      @click="createPlaylist"
      :disabled="isCreating"
    >
      Create Playlist
    </button>
    <p v-if="isCreating">Progress: {{ progress }}%</p>
  </div>
</template>

<script>
import { createPlaylistFromJson } from '@/services/playlistCreator';
import songData from '@/assets/data.json';

export default {
  data() {
    return {
      isCreating: false,
      progress: 0,
      jsonData: songData,
    };
  },
  methods: {
    async createPlaylist() {
      this.isCreating = true;
      this.progress = 0;
      try {
        await createPlaylistFromJson(this.jsonData, (current, total) => {
          this.progress = Math.round((current / total) * 100);
        });
        console.log('Playlist creation completed');
      } catch (error) {
        console.error('Error creating playlist', error);
      } finally {
        this.isCreating = false;
      }
    },
  },
};
</script>
