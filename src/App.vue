<template>
  <div
    class="container"
    @scroll="handleScroll"
  >
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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showTopButton = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  showTopButton.value = window.scrollY > 100;
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
