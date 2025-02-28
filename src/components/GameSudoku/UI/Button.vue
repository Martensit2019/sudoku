<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.btn {
  margin: 50px auto;
  border: none;
  display: block;
  background-color: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
  font-size: var(--font-size-btn);
  text-transform: uppercase;
  padding: 20px 60px;
  border-radius: 50px;

  &:hover {
    background-color: var(--bg-btn-hover);
  }
}
</style>