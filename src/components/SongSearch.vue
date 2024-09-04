<template>
  <div class="row">
    <div class="col-12">
      <input
        v-model="query"
        @input="searchSongs"
        class="form-control"
        placeholder="Search..."
        type="text"
        name="search"
      />
    </div>
  </div>
  <br />

  <div class="row justify-content-center">
    <div class="col-4 col-lg-3">
      <select
        v-model="type"
        @change="searchSongs"
        class="form-select"
        name="searchtype"
        id="type"
      >
        <option
          value="TITLE"
          selected="selected"
        >
          Song Name
        </option>
        <option value="ARTIST">Artist</option>
      </select>
    </div>

    <div class="col-2 col-lg-1 d-grid">
      <button
        @click="selectRandom"
        id="btnrandom"
        type="button"
        class="btn btn-outline-light"
      >
        🎲
      </button>
    </div>

    <div class="col-2 col-lg-1 d-grid">
      <button
        @click="resetSearch"
        id="btnrefresh"
        type="button"
        class="btn btn-outline-light"
      >
        🔄️
      </button>
    </div>

    <div class="col-4 col-lg-2 d-grid">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          @click="showFileName"
          type="checkbox"
          name="showfile"
          id="btncheck1"
          class="btn-check"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-danger"
          for="btncheck1"
          >File Name</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search', 'showFile', 'selectRandom', 'randomSong', 'showFileName']);

const query = ref('');
const type = ref('TITLE');

const searchSongs = () => {
  emit('search', { query: query.value, type: type.value });
};

const resetSearch = () => {
  query.value = '';
  type.value = 'TITLE';
  searchSongs();
};

const selectRandom = () => {
  emit('randomSong');
};

const showFileName = () => {
  emit('showFileName');
};
</script>
