<template>
  <div class="control-values">
    <div v-for="(btn, idx) in store.controlValueBtns" class="control-values-btn" :key="idx"
      @click="store.setCellValue(btn.title)">
      <!-- <div v-for="(btn, idx) in store.controlValueBtns" class="control-values-btn" :key="idx" @click="handleClick(btn)"> -->
      <div class="control-values-btn__title">{{ btn.title }}</div>
      <div class="control-values-btn__remained">{{ btn.remained }}</div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SudokuBoard from '@/components/GameSudoku/SudokuBoard.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()
</script>

<style lang="scss" scoped>
.control-values {
  width: calc(var(--cell-size) * 9 + 20px);
  margin: .5vmin auto;
  display: grid;
  grid-template-columns: repeat(9, auto);
  gap: var(--gap);
}

.control-values-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  padding: 1.5vmin 0;
  border-radius: 1.5vmin;
  cursor: pointer;
  color: var(--color-white);

  &:hover {
    background-color: var(--bg-btn-hover);
  }

  &__title {
    // color: blue;
    font-size: var(--font-size);
    font-weight: 700;
  }

  &__remained {
    font-size: 2vmin;
  }
}
</style>