<template>
  <div class="modal">
    <div class="modal__inner">
      <slot />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background-color: #fff;
    min-width: 300px;
    padding: 20px;
    border-radius: 20px;
  }
}
</style>