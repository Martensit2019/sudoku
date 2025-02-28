<template>
  <div v-if="store.game.isPaused" class="cell"></div>
  <div v-else class="cell"
    :class="[{ 'selected': props.cell.isSelected, 'highlighted': props.cell.isHighlighted, 'similar': props.cell.isSimilar, 'error': props.cell.hasError, 'filled': props.cell.isFilled }]"
    @click="handleClick">
    <SudokuNotesBoard v-if="props.cell.notes.length && !props.cell.isFilled" :notes="props.cell.notesGrid" />
    <div v-else>
      {{ cell.value }}
    </div>

  </div>

</template>

<script setup lang="ts">
import SudokuNotesBoard from '@/components/GameSudoku/SudokuNotesBoard.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()

interface ICell {
  id: string
  row: number
  col: number
  block: number
  value: string | null
  expectedValue: string
  hasError: boolean
  isSimilar: boolean
  isSelected: boolean
  isHighlighted: boolean
  isFilled: boolean
  notes: string[]
  notesGrid: any
}

interface IProps {
  cell: ICell
}
const props = defineProps<IProps>()

const handleClick = () => {
  // console.log('handleClick', props.cell)
  store.setSelectedCell(props.cell)

}

</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: var(--color-white);
  font-size: var(--font-size-cell);
  cursor: pointer;
}

.cell:not(.filled) {
  color: var(--color-primary);

  &.selected,
  &.similar {
    color: var(--color-white);
    // & > .board >.note {
    //   color: red;
    // }
  }
}

.highlighted {
  background-color: rgb(234, 234, 245);
}

.similar {
  background: var(--bg-btn-hover);
  color: var(--color-white);
}

.cell:not(.filled).error {
  color: rgb(242, 61, 48);
}

.selected {
  background-color: rgb(173 133 255);
}

.cell:nth-child(3),
.cell:nth-child(6) {
  margin-right: 2px;
}

.cell:nth-child(19),
.cell:nth-child(46) {
  margin-bottom: 2px;
}
</style>