<template>
  <div class="new-game">
    <div v-if="store.game.isStart" class="new-game__start">
      <div class="new-game__img">
        <img src="@/assets/sudoku.jpg" alt="">
      </div>
      <div>
        <Button @click="store.game.isStart = false">Новая игра</Button>
      </div>
    </div>
    <div v-else>
      <h1>Выберите уровень сложности:</h1>
      <Button v-for="btn in difficultyBtns" @click="store.startGame(boardSize, btn)">
        {{ btn.name }}
      </Button>
      <Button @click="store.game.isStart = true">Отмена</Button>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './UI/Button.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()
const boardSize = ref(9)

const difficultyBtns = [
  { name: "Легкий", value: "easy", empty: 2 },
  // { name: "Легкий", value: "easy", empty: 41 },
  { name: "Средний", value: "medium", empty: 49 },
  { name: "Сложный", value: "hard", empty: 57 },
  { name: "Эксперт", value: "expert", empty: 64 }
]
</script>


<style lang="scss" scoped>
.new-game {
  text-align: center;

  &__img {
    max-width: 500px;
    margin: 0 auto;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  h1 {
    color: var(--color-primary);
  }
}
</style>