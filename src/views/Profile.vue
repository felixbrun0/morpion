<script>
import api from '../api';

export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
      },
      errors: []
    };
  },
  beforeRouteEnter(to, from, next) {
    api.get('/api/profile')
      .then(response => {
        next(vm => {
          vm.user = response.data;
        });
      })
      .catch(error => {
        console.log(error);
        next();
      });
  },
  methods: {
    saveProfile() {
      api.put('/api/profile', this.user)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
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
      <button type="submit">Enregistrer</button>
    </form>
    <button @click="goToHome">Retour à l'accueil</button>
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
