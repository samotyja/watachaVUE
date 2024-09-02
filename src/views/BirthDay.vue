<template>
  <div
    class="birthday-card"
    :style="{ backgroundImage: `url(${backgroundGif})` }"
  >
    <div class="content">
      <h1>{{ birthdayPerson }}, wszystkiego najwatachowszego!</h1>
      <p>{{ birthdayMessage }}</p>
      <button @click="showSurprise">Kliknij tutaj po podwyżkę!</button>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti';

export default {
  name: 'BirthdayLandingPage',
  data() {
    return {
      backgroundGif: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8a%2F7e%2F04%2F8a7e04d3183d62d64e6d7746e3e2678e.gif&f=1&nofb=1&ipt=efc45214767f03f8aabedbe9cdfafa29904e8db5d8c977512cdfc62289f01dcc&ipo=images',
      birthdayPerson: 'LAUKA',
      birthdayMessage: 'DUŻO ZDROWIA, MEDIKINETU (czy to się wzajemnie wyklucza???) GODZIWYCH PIENIDZĘDZY OD BROSA, POWODZONKÓW NA STUDIACH I INNYCH TAKICH, BO ZAJEBISTYCH PRZYJACIÓŁ CHYBA ŻYCZYĆ NIE MUSZĘ 🙂',
    };
  },
  mounted() {
    this.launchConfetti();
  },
  methods: {
    showSurprise() {
      window.open('https://youtu.be/dQw4w9WgXcQ', '_blank');
      this.launchConfetti();
    },
    launchConfetti() {
      const duration = 30 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    },
  },
};
//a kto tutaj w kodzie grzebie??? myślisz że jestes jakiś sprytny???
</script>

<style scoped>
.birthday-card {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 80%;
}

h1 {
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

button {
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff1493;
}
</style>
