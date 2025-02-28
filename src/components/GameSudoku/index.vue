<template>
  <div class="wrapper">
    <div v-if="store.game.hasBegun">
      <!-- stack - {{ store.stack }} -->
      <SudokuInfo ref="refSudokuInfo" />
      <SudokuBoard @resume="resume" />
      <SudokuControlActions />
      <SudokuControlValues />
      <SudokuModal v-if="store.game.results === 'won'">
        <SudokuModalWon />
      </SudokuModal>
      <SudokuModal v-if="store.game.results === 'lost'">
        <SudokuModalLost />
      </SudokuModal>
    </div>
    <div v-else>
      <SudokuNewGame />
    </div>

  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue'

import SudokuInfo from '@/components/GameSudoku/SudokuInfo.vue'
import SudokuNewGame from '@/components/GameSudoku/SudokuNewGame.vue'
import SudokuBoard from '@/components/GameSudoku/SudokuBoard.vue'
import SudokuControlActions from '@/components/GameSudoku/SudokuControlActions.vue'
import SudokuControlValues from '@/components/GameSudoku/SudokuControlValues.vue'
import { useSudokuStore } from '@/stores/sudokuStore.ts'
import SudokuModal from './UI/Modal.vue'
import SudokuModalWon from './SudokuModalWon.vue'
import SudokuModalLost from './SudokuModalLost.vue'
const store = useSudokuStore()

const refSudokuInfo = ref<any>(null)


const boardSize = ref(9)
const difficulty = ref(30)

const resume = () => {
  if(refSudokuInfo.value === null) return  
  refSudokuInfo.value.resume()  
}

</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>