<script setup lang="ts">

const navs = [
  { to: '/', icon: 'dashboard' }
]

</script>

<template lang="pug">
.container
  .aside
  .main
    RouterView(v-slot="{ Component }")
      Transition
        KeepAlive
          component(:is="Component")
</template>

<style lang="scss" scoped>

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: none;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-10vh);
  opacity: 0;
}
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main {
    position: relative;
    flex: 1;
    width: 0;
    overflow: auto;
  }
}
</style>
