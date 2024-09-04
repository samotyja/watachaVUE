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

<script setup>
import { ref } from 'vue';
import { createPlaylistFromJson } from '@/services/playlistCreator';
import songData from '@/assets/data.json';

const isCreating = ref(false);
const progress = ref(0);
const jsonData = songData;

const createPlaylist = async () => {
  isCreating.value = true;
  progress.value = 0;
  try {
    await createPlaylistFromJson(jsonData, (current, total) => {
      progress.value = Math.round((current / total) * 100);
    });
    console.log('Playlist creation completed');
  } catch (error) {
    console.error('Error creating playlist', error);
  } finally {
    isCreating.value = false;
  }
};
</script>
