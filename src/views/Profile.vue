<script>
import api from '../api';

export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
      },
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
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="user.name">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="user.email">
      <button type="submit" @click="saveProfile">Enregistrer</button>
    </form>
    <button @click="goToHome">Retour à l'accueil</button>
  </div>
</template>

<style scoped>
</style>
