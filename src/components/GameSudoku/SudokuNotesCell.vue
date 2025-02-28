<template>
  <div class="note" :class="[{ 'selected': props.note.isSelected }]">{{ note.value }}</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()

// interface ICell {
//   id: string
//   row: number
//   col: number
//   block: number
//   value: string | null
//   expectedValue: string
//   hasError: boolean
//   isSimilar: boolean
//   isSelected: boolean
//   isHighlighted: boolean
//   isFilled: boolean
//   notes: string[]
// }

interface IProps {
  note: any
}
const props = defineProps<IProps>()


</script>

<style lang="scss" scoped>
.note {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.selected {
    font-weight: 600;
  }
}
</style>