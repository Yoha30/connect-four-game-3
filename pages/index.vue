<script setup lang="ts">
import Rules from "~/components/rules.vue";
</script>
<script lang="ts">
export default {
  data() {
    return {
      rules: false,
    }
  },
  methods: {
    handleRules() {
        this.rules = true;
    },
    closeModal() {
        this.rules = false;
    },
    goToGame(){
      navigateTo({ path: '/game-screen' })
    }
  },
};
</script>

<template>
  <div class="main duration-1000" :class="{'bg-purple':rules}">
    <Rules @close="closeModal" v-if="rules"/>
    <div v-else class="main-card">
      <!-- Main menu start -->
      <img src="/assets/images/logo.svg">
      <div class="w-10/12">
        <button @click="goToGame" class="btn-yellow w-full">
          <span>Play vs player</span>
          <img src="/assets/images/player-vs-player.svg"/>
        </button>
        <button @click="handleRules" class="btn-white w-full">
          <span>Game rules</span>
        </button>
      </div>
      <!-- Main menu end -->
    </div>
  </div>
</template>

<style scoped>

</style>