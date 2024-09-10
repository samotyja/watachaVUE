<template>
  <div class="not-found">
    <div class="row justify-content-center align-items-center">
      <div class="col text-center">
        <img
          class="img-fluid mb-4"
          src="@/assets/images/404.png"
          alt="404"
        />
        <p class="text mb-3">We are sorry, but the page you are looking for does not exist.</p>
        <router-link
          to="/"
          class="btn btn-primary"
          >Return</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.text {
  color: white;
}
</style>
