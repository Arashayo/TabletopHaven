<template>
  <router-link :to="`/game/${gameId}`" class="router-link">
    <div v-if="loading" class="game-card">
      Loading game details...
    </div>
    <div v-else-if="error" class="game-card">
      Error loading game details: {{ error }}
    </div>
    <div v-else class="game-card">
      <div class="game-image-container">
        <img :src="gameData.image" alt="Game image" class="game-image" />
      </div>
      <div class="title-container">
        <h2 class="game-title" :style="{ fontSize: adjustFontSize(gameData.name) }">{{ gameData.name }}</h2>
        <h3 class="game-year">({{ gameData.year }})</h3>
      </div>
      <div class="rating-players-container">
        <div class="rating">Rating: {{ averageRating !== null ? averageRating.toFixed(1) : 'N/A' }}</div>
        <div class="players">Players: {{ gameData.min_players }} - {{ gameData.max_players }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    gameId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      gameData: {},
      loading: false,
      error: null,
      averageRating: null,
    };
  },
  async created() {
    this.fetchGameData();
  },
  methods: {
    async fetchGameData() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/game/${this.gameId}`);
        this.gameData = response.data;
        this.calculateAverageRating();
        this.error = null;
      } catch (error) {
        console.error("Error fetching game data:", error);
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },

    calculateAverageRating() {
      if (this.gameData.rating && this.gameData.rating.length > 0) {
        const sum = this.gameData.rating.reduce((a, b) => a + b, 0);
        this.averageRating = sum / this.gameData.rating.length;
      } else {
        this.averageRating = null;
      }
    },

    adjustFontSize(title) {
      if (title.length > 23) {
        return '16px';
      }
      
      else if (title.length > 19) {
        return '20px';
      }
      else if (title.length > 16) {
        return '24px';
      }
      return '30px';
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: #FFF;
}

.game-card {
  height: 350px;
  width: 250px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.5);
}

.game-card:hover {
  background-color: #322f46;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.8);
  transform: translateY(-2px);
}

.game-image-container {
    width: 200px;
    height: 200px;
    display: flex;
    padding-top: 2rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.game-card img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
}

.title-container {
  text-align: center;
  margin-top: 10px;
}

.game-title {
    font-size: 30px;
    margin-top: 0.5rem;
    margin-bottom: 2px;
    overflow: hidden; /* Hide any overflow */
    text-overflow: ellipsis; /* Add ellipsis (...) for overflow text */
}

.game-year {
  font-size: 18px;
  margin-top: 0px;
}

.rating-players-container {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
}

.rating,
.players {
  text-align: center;
  font-size: 14px; /* Adjust as needed */
}

.players {
  margin-top: 0px;
  margin-bottom: 2rem;
}

</style>
