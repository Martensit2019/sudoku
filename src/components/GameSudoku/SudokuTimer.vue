<template>
  <div class="timer">
    <div style="width: calc(var(--cell-size) * 1.1); padding-left: auto;">{{ formatTime(timeElapsed) }}</div>
    <!-- <button v-if="state ==='stopped'" @click="start">start</button> -->
    <!-- <img v-if="state ==='stopped'" :src="SrartSvg" alt="" @click="start"> -->
    <!-- <button v-if="state ==='running'" @click="pause">pause</button> -->
    <!-- <button v-if="state ==='running' || state === 'paused'" @click="restart">restart</button> -->
    <div style="display: flex;">
      <div v-if="state ==='paused'" style=" width: calc(var(--cell-size) * .7); cursor: pointer;" @click="start">
        <img :src="SrartSvg" alt="">
      </div>
      <div v-if="state ==='running'" style="width: calc(var(--cell-size) * .7); cursor: pointer;">
        <img :src="PauseSvg" alt="" @click="pause">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SrartSvg from '@/assets/icons/start.svg'
import PauseSvg from '@/assets/icons/pause.svg'
import { useSudokuStore } from '@/stores/sudokuStore.ts'

const store = useSudokuStore()

const state = ref<'stopped' | 'running' | 'paused'>('stopped')
const timeElapsed = ref<number>(0)
const interval = ref<number | undefined>(undefined)

const start = () => {
  state.value = 'running'
  interval.value = setInterval(() => {
    timeElapsed.value++
  }, 1000)
  store.game.isPaused = false
}

const pause = () => {
  state.value = 'paused'
  clearInterval(interval.value)
  interval.value = undefined
  store.game.isPaused = true
}
const restart = () => {
  timeElapsed.value = 0
  if (interval.value !== undefined) {
    clearInterval(interval.value)
    interval.value = undefined
    start()
  }
}

const formatTime = (elapsedTime: number) => {
  const minutes = `0${Math.floor(elapsedTime / 60)}`.slice(-2)
  const seconds = `0${elapsedTime % 60}`.slice(-2)
  return `${minutes} : ${seconds}`
}

onMounted(() => {
  start()
})

defineExpose({start})
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  align-items: center;

  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
