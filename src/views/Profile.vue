<script>
import api from '../api';
import ErrorDisplay from '../components/ErrorDisplay.vue';

export default {
  components: {
    ErrorDisplay
  },
  data() {
    return {
      user: {
        id: 0,
        name: '',
        email: '',
        apiKey: ''
      },
      errors: []
    };
  },
  beforeRouteEnter(to, from, next) {
    api.get('/api/profile')
      .then(response => {
        next(vm => {
          vm.user = response.data;
          localStorage.setItem('user', JSON.stringify(vm.user));
        });
      })
      .catch(error => {
        console.log(error);
        next();
      });
  },
  methods: {
    saveProfile() {
      localStorage.setItem('user', JSON.stringify(this.user));
      api.put('/api/profile', this.user)
        .then(response => {
          console.log(response.data);
          console.log(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
        })
        .catch(error => {
          console.log(error.response.data.errors.message);
          this.errors = error.response.data.errors.message;
        });
    },
    goToHome() {
      this.$router.push('/home');
    }
  }
}
</script>

<template>
  <div>
    <h1>Profile</h1>
    <form @submit.prevent="saveProfile">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="user.name">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="user.email">
      <label for="apiKey">API Key:</label>
      <input type="text" id="apiKey" v-model="user.apiKey">
      <button type="submit">Enregistrer</button>
    </form>
    <button @click="goToHome">Retour à l'accueil</button>
    <ErrorDisplay :errors="errors" />
  </div>
</template>

<style scoped>
</style>
