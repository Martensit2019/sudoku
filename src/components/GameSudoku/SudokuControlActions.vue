<template>
  <!-- actionBtns - {{ actionBtns }} -->
  <div class="control-actions">
    <div v-for="(actionBtn, idx) in actionBtns" class="control-actions__btn" :key="idx" @click="handleClick(actionBtn)">
      <div class="control-actions__img">
        <img :src="actionBtn.img" alt="">
      </div>
      <div v-if="actionBtn.hasOwnProperty('isActive')" class="control-actions__note">{{ actionBtn.title }}
        <span>{{ actionBtn.isActive ? 'вкл' : 'выкл' }}</span>
      </div>
      <div v-else-if="actionBtn.action === 'hint'" class="control-actions__note">{{ actionBtn.title }}
        <span>{{ store.game.hints }}</span>
      </div>
      <div v-else>{{ actionBtn.title }}</div>
    </div>
    <div class="control-values"></div>
  </div>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'
import UndoSvg from '@/assets/icons/undo.svg'
import DeleteSvg from '@/assets/icons/delete.svg'
import NoteSvg from '@/assets/icons/note.svg'
import HintSvg from '@/assets/icons/hint.svg'
import type { IActionBtns } from '@/stores/types'

const store = useSudokuStore()

const actionBtns = reactive<IActionBtns[]>([
  // {
  //   img: UndoSvg,
  //   title: 'Отменить',
  //   action: 'undo',
  // },
  {
    img: DeleteSvg,
    title: 'Очистить',
    action: 'clear'
  },
  {
    img: NoteSvg,
    title: 'Заметки',
    action: 'note',
    isActive: false
  },
  {
    img: HintSvg,
    title: 'Подсказка',
    action: 'hint'
  },
])

const handleClick = (actionBtn: IActionBtns) => {
  if(store.game.isPaused) return
  console.log(actionBtn)
  if (actionBtn.action === 'undo') store.undo()
  if (actionBtn.action === 'clear') store.clearCellValue()
  if (actionBtn.action === 'note') {
    const idx = actionBtns.findIndex(btn => btn.action === 'note')
    actionBtns[idx].isActive = !actionBtns[idx].isActive
    store.changeStatusNotes(actionBtns[idx].isActive)
  }
  if (actionBtn.action === 'hint') store.setCellValueByHint()
}
</script>

<style lang="scss" scoped>
.control-actions {
  width: calc(var(--cell-size) * 9 + 20px);
  margin: 2vmin auto .5vmin;
  display: grid;
  grid-template-columns: repeat(3, auto);
  // grid-template-columns: repeat(4, auto);
  gap: var(--gap);

  &__btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 1.5vmin 0;
    border-radius: 1.5vmin;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: var(--bg-btn-hover);
    }
  }

  &__img {
    margin-bottom: 10px;
  }

  &__note {
    span {
      position: absolute;
      top: 1vmin;
      right: 1vmin;
      display: inline-block;
      width: calc(var(--cell-size) / 1.5);
      height: calc(var(--cell-size) / 1.5);
      padding: 0px;
      background-color: var(--color-white);
      border-radius: 50%;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
      font-size: 1.5vmin;
    }
  }

}
</style>