<template>
  <div class="home-container">
    <div class="titre-home-group">
      <h1>Bienvenue sur le jeu de Morpion</h1>
      <h4>Se joue à 3 (on a révolutionner le morpion les frères)</h4>
    </div>
    <div class="button-group">
      <button @click="createGame">Nouvelle Partie</button>
      <button @click="goTo('profile')">Mon Profil</button>
      <button @click="goTo('join')">Rejoindre une Partie</button>
    </div>
  </div>
</template>

<script>
import api from "../api/index.js";
export default {
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
    createGame() {
      api.post("/api/games").then((response) => {
        console.log(response);
        this.$router.push({ name: "game", params: { id: response.data.id } });
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.titre-home-group {
  margin-bottom: 20px;
  text-align: center;
}
.button-group {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
