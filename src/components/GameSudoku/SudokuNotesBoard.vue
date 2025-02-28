<template>
  <div class="board">
    <SudokuNotesCell v-for="note in props.notes" :note="note" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SudokuNotesCell from '@/components/GameSudoku/SudokuNotesCell.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()

// interface ICell {
//   id: string
//   row: number
//   col: number

// }

interface IProps {
  notes: any
}
const props = defineProps<IProps>()

</script>

<style lang="scss" scoped>
.board {
  min-width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  font-size: 2vmin;
  color: #333;
}
</style>