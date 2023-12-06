<script  lang="ts">
export default {
  methods:{
    closeModal(){
      this.$emit('close');
    }
  }
};
</script>

<template>
  <div class="card w-11/12 md:w-[30rem]">
    <p class="title">rules</p>
    <div class="content">
      <div>
        <p class="content-title">Objective</p>
        <span class="content-description">Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</span>
      </div>
      <div>
        <p class="content-title">HOW TO PLAY</p>
        <ul class="list">
          <li><span>1</span> <span>Red goes first in the first game.</span></li>
          <li><span>2</span> <span>Players must alternate turns, and only one disc can be dropped in each turn. </span></li>
          <li><span>3</span> <span>The game ends when there is a 4-in-a-row or a stalemate.</span></li>
          <li><span>4</span> <span>The starter of the previous game goes second on the next game.</span></li>
        </ul>
      </div>
      <img src="/assets/images/icon-check.svg" class="check-btn" @click="closeModal()"/>
    </div>
  </div>
</template>

<style scoped>

</style>