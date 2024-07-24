<template>
  <div class="row">
    <div class="col-12">
      <input
        id="searchbar"
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
        id="btnrandom"
        type="button"
        class="btn btn-outline-light"
      >
        🎲
      </button>
    </div>

    <div class="col-2 col-lg-1 d-grid">
      <button
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

  <hr class="border border-danger border-3 opacity-75" />

  <div class="row justify-content-md-center">
    <div class="col col-lg-7">
      <table
        style="width: 100%"
        class="table table-dark table-striped"
      >
        <tbody id="list-holder">
          <tr
            v-for="song in songs"
            :key="song.TITLE"
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
import songData from '../assets/data.json';

export default {
  data() {
    return {
      songs: songData,
      filteredSongs: [],
    };
  },
  methods: {
    searchSongs() {
      this.filteredSongs = this.songs;
    },
  },
};
</script>
