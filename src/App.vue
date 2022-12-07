<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, onBeforeMount } from 'vue';
import emitter from '@/utils/eventBus'

import { useLangStore, useAppearStore, useAppleListStore } from '@/stores/settings'
import Music from '@/views/index.vue'

const langStore = useLangStore()
const appearStore = useAppearStore()
const appleStore = useAppleListStore()
const { lang } = storeToRefs(langStore)

function initial_config() {
  const settings = localStorage.getItem('settings')
  if (settings) {
    const {
      language,
      appearance,
      preference,
      musicQuality,
      isShowLyrics,
      isShowLyricsBg,
      lyricsFz,
      isShowAppleList,
      isUseNickname,
      isStartReversePlay,
      characteristicPlayBar
    } = JSON.parse(settings)
    langStore.updateLang(language)
    appearStore.updateAppearance(appearance)
    appleStore.updateIsShowAppleList(isShowAppleList)
  } else {
    // 初始化配置
    const settings = {
      language: 'Chinese',
      appearance: 'light',
      preference: 'Chinese',
      musicQuality: '',
      isShowLyrics: '',
      isShowLyricsBg: '',
      lyricsFz: '',
      isShowAppleList: true,
      isUseNickname: '',
      isStartReversePlay: '',
      characteristicPlayBar: ''
    }
    localStorage.setItem('settings', JSON.stringify(settings))
    langStore.updateLang(settings.language)
    appearStore.updateAppearance(settings.appearance)
  }
}

onMounted(async () => {
  window.onresize = e => {
    const screen_width = e.target.innerWidth
    emitter.emit('isCollapse', screen_width <= 850)
  }
  window.onclick = e => {
    emitter.emit('hideMenu')
  }
  // 初始化用户配置
  initial_config()
})
</script>

<template>
  <Music />
</template>