<template>
  <div class="modal-lost">
    <h1>ПОЗДРАВЛЯЕМ !!!</h1>
    <h2>{{ text }}</h2>
    <Button @click="store.startOver">
      Повторить
    </Button>
    <Button @click="store.newGame">
      Новая игра
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from './UI/Button.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()

const mistakesText = computed(() => store.game.mistakes === 1 ? 'одну ошибку' : 'две ошибки')
const text = computed(() => store.game.mistakes ? `Вы допустили всего ${mistakesText.value}` : 'Вы не допустили ни одной ошибки')
</script>

<style lang="scss" scoped>
.modal-lost {
  text-align: center;
  color: var(--color-primary);
}
</style>