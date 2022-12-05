<script setup>
import Music from '@/views/index.vue'
import { onMounted, onBeforeMount } from 'vue';
import emitter from '@/utils/eventBus'
onMounted(async () => {
  window.onresize = e => {
    const screen_width = e.target.innerWidth
    emitter.emit('isCollapse', screen_width <= 850)
  }
  window.onclick = e => {
    emitter.emit('hideMenu')
  }
})
</script>

<template>
  <Music />
</template>