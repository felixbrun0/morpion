<template>
  <div>
    <h1>Game</h1>
    <div v-if="game">
      <p>Game ID: {{ game.id }}</p>
      <p>Game Code: {{ game.code }}</p>
      <p>Player: {{ user.name }}</p>
      <p v-if="!game.opponent">Waiting for an opponent...</p>
      <p v-else>Opponent: {{ game.opponent.name }}</p>
      <p>Next Player: {{ game.next_player_id === user.id ? 'You' : 'Opponent' }}</p>
      <div v-if="!game.winner">
        <div class="grid">
          <div v-for="(row, rowIndex) in 3" :key="rowIndex" class="row">
            <div :id="'r'+(rowIndex+1)+'c'+(colIndex+1)" v-for="(col, colIndex) in 3" :key="colIndex" class="cell" @click="play(rowIndex + 1, colIndex + 1)">
              {{ game['r'+(rowIndex+1)+'c'+(colIndex+1)] === 1 ? 'X' : game['r'+(rowIndex+1)+'c'+(colIndex+1)] === 2 ? 'O' : '' }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="game.winner">
        <p>Game Over</p>
        <p v-if="game.winner_id">Winner: {{ game.winner_id === user.id ? 'You' : game.opponent.name }}</p>
        <button @click="goToHome">Return to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      game: null,
      user: JSON.parse(localStorage.getItem('user')),
      error: null
    };
  },
  beforeRouteEnter(to, from, next) {
    api.get(`/api/games/${to.params.id}`).then((response) => {
      next((vm) => {
        vm.game = response.data;
        vm.waitForOpponentMove();
      });
    });
  },
  methods: {
    play(row, col) {
      this.error = null;
      api.patch(`/api/games/${this.game.id}/play/${row}/${col}`)
        .then(response => {
          this.game = response.data;
        })
        .catch(error => {
          this.error = error.response?.data?.message || 'An error occurred';
        });
    },
    waitForOpponentMove() {
      const ws = new WebSocket("wss://morpion-api.edu.netlor.fr/websockets");
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: "connect",
            game_id: this.game.id,
            player_id: this.user.id,
          })
        );
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.error = "WebSocket connection failed.";
      };
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("WebSocket message:", message);
        switch (message.action) {
          case "opponent-join":
            this.game.opponent = message.opponent;
            api.get(`/api/games/${this.game.id}`).then((response) => {
              this.game = response.data;
            });
            break;
          case "opponent-play":
            api.get(`/api/games/${this.game.id}`).then((response) => {
              console.log(response.data);
              this.game = response.data;
            });
            break;
          case "opponent-quit":
            this.game.opponent = null;
            break;
        }
      };
      this.ws = ws;
    },
    goToHome() {
      if (this.ws) {
        this.ws.close();
      }
      this.$router.push('/home');
    }
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.row {
  display: contents;
}
.cell {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
