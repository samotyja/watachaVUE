<template>
  <div
    class="container"
    @scroll="handleScroll"
  >
    <br />
    <div class="row text-center">
      <div class="col">
        <img
          src="./components/icons/title.png"
          class="img-fluid"
          alt=""
        />
      </div>
    </div>
    <br />
    <RouterView> </RouterView>
    <button
      @click="goToTop"
      id="goToTopBtn"
      title="Przejdź na górę strony"
      v-show="showTopButton"
    >
      ↑
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTopButton: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showTopButton = window.scrollY > 100;
    },
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
