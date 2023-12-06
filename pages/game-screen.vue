<script setup lang="ts">
async function getResult() {
  const {data: result} = await useFetch("https://connect-four-result.vercel.app/result");
  document.querySelector('#player-one-result').innerText = result.value.player1;
  document.querySelector('#player-two-result').innerText = result.value.player2;

}

getResult();
</script>
<script lang="ts">

export default {
  data() {
    return {
      row: [5, 5, 5, 5, 5, 5, 5, 5],
      playerTurn: 1,
      marker: '',
      pieces: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      playerOneResult: 0,
      playerTwoResult: 0,
      gameEnded: false,
      timer: 30,
      playerTimer: null,
    }
  },
  watch: {
    playerTurn(val) {
      if (val == 1) {
        this.marker = `
      <img src="/assets/images/marker-red.svg" class="hidden lg:block absolute -top-14 left-8"/>
        `
      } else {
        this.marker = `
      <img src="/assets/images/marker-yellow.svg" class="hidden lg:block absolute -top-14 left-8"/>
        `
      }
    },
  },
  async mounted() {
    this.interval()
    this.game();
  },
  methods: {
    addPiece(index) {
      if (!this.gameEnded) {
        const col = (index % 7) + 1;
        const counter = document.createElement('span');
        counter.classList.add('game-piece')
        counter.setAttribute('data-player', this.playerTurn);
        let connectPosition = (this.row[col] * 7) + col;
        if (!document.querySelector(`#game-board .circle:nth-child(${connectPosition})`).hasChildNodes()) {
          this.pieces[connectPosition - 1] = this.playerTurn;
          document.querySelector(`#game-board .circle:nth-child(${connectPosition})`).appendChild(counter)
        } else {
          this.row[col]--;
          connectPosition = (this.row[col] * 7) + col;
          this.pieces[connectPosition - 1] = this.playerTurn;
          document.querySelector(`#game-board .circle:nth-child(${connectPosition})`).appendChild(counter)
        }
        this.checkWin();
      }

    },
    winner(player, winCircles) {
      clearInterval(this.playerTimer);
      winCircles.forEach((el) => {
        const winCircleContainer = document.createElement('span');
        const winCircle = document.createElement('span');
        winCircleContainer.appendChild(winCircle);
        winCircleContainer.classList.add('win-circle-container');
        winCircle.classList.add('win-circle');
        document.querySelector(`#game-board .circle:nth-child(${el + 1})`).appendChild(winCircleContainer);
      });
      this.playerOneResult = document.querySelector('#player-one-result').innerText;
      this.playerTwoResult = document.querySelector('#player-two-result').innerText;
      if (player == 1) {
        document.querySelector('.bottom-bg').classList.add('bg-red');
        this.playerOneResult++;
      } else {
        this.playerTwoResult++;
        document.querySelector('.bottom-bg').classList.add('bg-yellow');
      }
      const playerOne = this.playerOneResult;
      const playerTwo = this.playerTwoResult;
      useFetch("https://connect-four-result.vercel.app/result", {
        method: 'POST',
        body: {
          player1: playerOne,
          player2: playerTwo
        },
      })
      document.querySelector('.winner-card').classList.remove('hidden');
      document.querySelector('.player-turn').classList.add('hidden');
    },
    interval() {
      this.playerTimer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          if (this.playerTurn == 1) {
            this.playerTurn = 2;
          } else {
            this.playerTurn = 1
          }
          console.log(this.playerTurn)
          document.querySelector('.player-turn').setAttribute('data-player', this.playerTurn);
          this.timer = 30;
        }
      }, 1000);
    },
    checkWin() {
      this.timer = 30;
      if (this.gameEnded) {
        return false;
      }
      for (let i = 0; i < 42; i++) {
        if (i % 7 < 4 && this.pieces[i] === this.playerTurn && this.pieces[i + 1] === this.playerTurn && this.pieces[i + 2] === this.playerTurn && this.pieces[i + 3] === this.playerTurn) {
          this.winner(this.playerTurn, [i, i + 1, i + 2, i + 3]);
          this.gameEnded = true;
          return false;
        }
        if (i < 21 && this.pieces[i] === this.playerTurn && this.pieces[i + 7] === this.playerTurn && this.pieces[i + 14] === this.playerTurn && this.pieces[i + 21] === this.playerTurn) {
          this.winner(this.playerTurn, [i, i + 7, i + 14, i + 21]);
          this.gameEnded = true;
          return false;
        }
        if (i % 7 < 4 && i < 18 && this.pieces[i] === this.playerTurn && this.pieces[i + 8] === this.playerTurn && this.pieces[i + 16] === this.playerTurn && this.pieces[i + 24] === this.playerTurn) {
          this.winner(this.playerTurn, [i, i + 8, i + 16, i + 24]);
          this.gameEnded = true;
          return false;
        }
        if (i % 7 >= 3 && i < 21 && this.pieces[i] === this.playerTurn && this.pieces[i + 6] === this.playerTurn && this.pieces[i + 12] === this.playerTurn && this.pieces[i + 18] === this.playerTurn) {
          this.winner(this.playerTurn, [i, i + 6, i + 12, i + 18]);
          this.gameEnded = true;
          return false;
        }

      }
      if (this.playerTurn == 1) {
        this.playerTurn = 2;
      } else {
        this.playerTurn = 1
      }
      document.querySelector('#player').innerHTML = this.playerTurn;
      document.querySelector('.player-turn').setAttribute('data-player', this.playerTurn);
    },
    playAgain() {
      document.querySelector('.winner-card').classList.add('hidden');
      document.querySelector('.player-turn').classList.remove('hidden');
      document.querySelectorAll('.circle span').forEach(el => {
        el.remove();
      });
      this.pieces = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      this.row = [5, 5, 5, 5, 5, 5, 5, 5];
      this.gameEnded = false;
      clearInterval(this.playerTimer);
      this.timer = 30;
      this.interval();
      this.game();
      document.querySelector('.bottom-bg').classList.remove('bg-red');
      document.querySelector('.bottom-bg').classList.remove('bg-yellow');
    },
    game() {
      document.querySelectorAll('#game-board .circle').forEach((el, index) => {
        const col = (index % 7) + 1;
        document.querySelector('.player-turn').setAttribute('data-player', this.playerTurn);
        const indicator = document.createElement("span");
        this.marker = `
      <img src="/assets/images/marker-red.svg" class="hidden lg:block absolute -top-14 left-8"/>
        `
        el.addEventListener('mouseover', (event) => {
          indicator.innerHTML = this.marker
          document.querySelector(`#game-board .circle:nth-child(${col})`).appendChild(indicator);
        });
        el.addEventListener('mouseout', (event) => {
          indicator.innerHTML = this.marker
          if (document.querySelector(`#game-board .circle:nth-child(${col})`).hasChildNodes(indicator)) {
            document.querySelector(`#game-board .circle:nth-child(${col})`).removeChild(indicator)
          }
        });
      })
    },
  },
}
</script>

<template>
  <div class="bg-purple h-screen w-full flex place-items-center flex-col">
    <header class="header">
      <p>
        <span>Menu</span>
      </p>
      <div>
        <img src="/assets/images/logo.svg"/>
      </div>
      <p @click="playAgain">
        <span>Restart</span>
      </p>
    </header>
    <div class="game-content">
      <div class="flex lg:hidden justify-center md:justify-between w-full gap-6">
        <div class="sm-player-card">
          <img src="/assets/images/player-one.svg" class="absolute top-1/2 -left-6 -translate-y-1/2">
          <p class="text-base font-bold ">PLAYER 1</p>
          <p class="text-[2rem] font-bold" id="player-one-result">{{ playerOneResult }}</p>
        </div>
        <div class="sm-player-card">
          <img src="/assets/images/player-two.svg" class="absolute top-1/2 -right-6 -translate-y-1/2">
          <p class="text-base font-bold ">PLAYER 2</p>
          <p class="text-[2rem] font-bold" id="player-one-result">{{ playerTwoResult }}</p>
        </div>
      </div>
      <div class="d-player-card">
        <img src="/assets/images/player-one.svg" class="absolute -top-6 left-1/2 -translate-x-1/2">
        <p class="mt-3 mb-1 text-2xl font-bold ">PLAYER 1</p>
        <p class="text-5xl font-bold" id="player-one-result">{{ playerOneResult }}</p>
      </div>
      <div id="game-board">
        <div @click="addPiece(index)" class="circle" v-for="(cell,index) in 42"></div>
      </div>
      <div class="d-player-card">
        <img src="/assets/images/player-two.svg" class="absolute -top-6 left-1/2 -translate-x-1/2">
        <p class="mt-3 mb-1 text-2xl font-bold ">PLAYER 2</p>
        <p class="text-5xl font-bold" id="player-two-result">{{ playerTwoResult }}</p>
      </div>
      <div class="player-turn">
        <p>PLAYER <span id="player">{{ playerTurn }}</span>’S TURN</p>
        <h1 id="timer">{{ timer }}s</h1>
      </div>
      <div class="winner-card hidden">
        <p>PLAYER <span>{{ playerTurn }}</span></p>
        <h1>WINS</h1>
        <button @click="playAgain()" class="btn-purple hover:btn-red duration-500 w-32 h-10 rounded-full py-2">PLAY
          AGAIN
        </button>
      </div>
    </div>
    <div class="bottom-bg">

    </div>
  </div>
</template>

<style>
:root {
  --topAnimation: calc(600px - 230px);
}
</style>