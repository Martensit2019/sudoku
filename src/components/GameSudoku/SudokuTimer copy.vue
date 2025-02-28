<template>
     <!-- <div class="timer">
      <div>{{ formatTime(timeElapsed) }}</div> -->
      <!-- <button v-if="state ==='stopped'" @click="start">start</button> -->
      <!-- <img v-if="state ==='stopped'" :src="SrartSvg" alt="" @click="start"> -->
      <!-- <button v-if="state ==='running'" @click="pause">pause</button> -->
      <!-- <button v-if="state ==='running' || state === 'paused'" @click="restart">restart</button> -->
       <!-- <div style="display: flex; margin-left: 10px;">
        <div style="border: 1px solid green; width: calc(var(--cell-size) * .7);"  @click="start">
        <img  :src="SrartSvg" alt="">
       </div>
       <div style="border: 1px solid green; width: calc(var(--cell-size) * .7);">
        <img  :src="PauseSvg" alt="" @click="pause">
       </div>
       </div>
     </div> -->
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import SrartSvg from '@/assets/icons/start.svg'
// import PauseSvg from '@/assets/icons/pause.svg'

// const state = ref<'stopped' | 'running' | 'paused'>('stopped')
// const timeElapsed = ref<number>(0)
// const interval = ref<number | undefined>(undefined)

// const start = () => {
//   state.value = 'running'
//   interval.value = setInterval(()=> {
//     timeElapsed.value++
//   }, 500)
// }

// const pause = () =>{
//   state.value = 'paused'
//   clearInterval(interval.value)
//   interval.value = undefined
// }
// const restart = () =>{
//   timeElapsed.value = 0
//   if(interval.value !== undefined){
//   clearInterval(interval.value)
//   interval.value = undefined
//   start()
//   }
// }

// const formatTime = (elapsedTime) => {
//   const minutes = `0${Math.floor(elapsedTime /60)}`.slice(-2)
//   const seconds = `0${elapsedTime %60}`.slice(-2)
//   return `${minutes}: ${seconds}`
// }
</script>

<style lang="scss" scoped>
// .timer {
//   display: flex;
//   align-items: center;
//   img {
//       width: 100%;
//       object-fit: contain;
//     }
// }
</style>
