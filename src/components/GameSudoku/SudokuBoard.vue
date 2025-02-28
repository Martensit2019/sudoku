<template>
  <div class="board">
    <div class="board__inner">
      <SudokuCell v-for="(cell, idx) in store.grid" :cell="cell" :key="idx" />
      <div v-if="store.game.isPaused" class="board__paused">
        <div class="board__pause-img" @click="onClick">
          <img :src="SrartSvg" alt="">
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SudokuCell from '@/components/GameSudoku/SudokuCell.vue'
import SrartSvg from '@/assets/icons/start.svg'
import { useSudokuStore } from '@/stores/sudokuStore.ts'
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'resume'): void
}>()

const store = useSudokuStore()



const handleKeydown = (e: KeyboardEvent) => {
  store.handleKeydown(e)
}

const onClick = () => {
  emit('resume')
  
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  justify-content: center;

  &__inner {
    position: relative;
    border: 3px solid var(--color-primary);
    background-color: var(--color-primary);
    display: grid;
    grid-template-columns: repeat(9, auto);
    grid-template-rows: repeat(9, auto);
    gap: 1px;
  }

  &__paused {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
  }

  &__pause-img {
    display: flex;
    width: 33%;
    height: 33%;
    cursor: pointer;
  }
}
</style>