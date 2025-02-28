<template>
  <div class="sudoku-info">
    <div>
      <span>Уровень:</span> {{ store.game.difficulty.name }}
    </div>
    <div>
     <span>Ошибки:</span>  {{ store.game.mistakes }}/{{ store.game.maxMistakes }}
    </div>
    <div>
      <SudokuTimer ref="refSudokuTimer" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'
import SudokuTimer from './SudokuTimer.vue'
const store = useSudokuStore()

const refSudokuTimer = ref<HTMLDivElement | null>(null)

const resume = () => {
  if(refSudokuTimer.value === null) return  
  refSudokuTimer.value.start()
  
}

defineExpose({resume})

</script>

<style lang="scss" scoped>
.sudoku-info {
  color: var(--color-primary);
  width: calc(var(--cell-size)* 9 + 20px);

  // border: 1px solid red;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: 700;
  }
}
</style>