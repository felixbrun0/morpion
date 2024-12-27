<script>
import api from "@/api/index.js";
import ErrorDisplay from '../components/ErrorDisplay.vue';

export default {
  components: {
    ErrorDisplay
  },
  data() {
    return {
      gameCode: '',
      errors: []
    };
  },
  methods: {
    joinGame() {
      api.patch(`/api/games/${this.gameCode}/join`)
        .then(response => {
          console.log(response);
          this.$router.push({name: 'game', params: {id: response.data.id}});
        })
        .catch(error => {
          console.log(error.response.data.errors.message);
          this.errors = error.response.data.errors.message || 'An error occurred';
        });
    }
  }
};
</script>

<template>
  <div>
    <h1>Join Game</h1>
    <form @submit.prevent="joinGame">
      <label for="gameCode">Game Code:</label>
      <input type="text" id="gameCode" v-model="gameCode">
      <button type="submit">Rejoindre</button>
    </form>
    <ErrorDisplay :errors="errors"/>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
