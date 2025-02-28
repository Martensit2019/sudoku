<template>
  <div class="modal-lost">
    <h1>ИГРА ОКОНЧЕНА</h1>
    <h2>Вы допустили {{ store.game.maxMistakes }} ошибки<br />
      и&nbsp;проиграли игру</h2>
    <Button @click="store.startOver">
      Второй шанс
    </Button>
    <Button @click="store.newGame">
      Новая игра
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './UI/Button.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()
</script>

<style lang="scss" scoped>
.modal-lost {
  text-align: center;
  color: var(--color-primary);
}
</style>