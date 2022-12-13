<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'

import { Search } from '@/api/search'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $route = useRoute()
const $router = useRouter()
const mapInfo = {
    1: {
        title: lang.value.searchType.single,
        content_prop: 'songs'
    },
    10: {
        title: lang.value.searchType.album,
        content_prop: 'albums'
    },
    100: {
        title: lang.value.searchType.singer,
        content_prop: 'artists'
    },
    1000: {
        title: lang.value.searchType.playlist,
        content_prop: 'playlists'
    },
    1002: {
        title: lang.value.searchType.user,
        content_prop: 'userprofiles'
    },
    1004: {
        title: lang.value.searchType.mv,
        content_prop: 'mvs'
    },
    1006: {
        title: lang.value.searchType.lyrics,
        content_prop: 'songs'
    },
    1009: {
        title: lang.value.searchType.radio,
        content_prop: 'djRadios'
    },
    1014: {
        title: lang.value.searchType.video,
        content_prop: 'videos'
    },
    1018: {
        title: lang.value.searchType.comprehension,
        content_prop: 'result'
    },
    2000: {
        title: lang.value.searchType.audio,
        content_prop: 'audios'
    },
}
const search_info = reactive({
    type: 1,
    content: []
})

watch($route, async route => {
    const { query: { keywords, type = 1 } } = route
    const data = await Search({
        keywords,
        type
    })
    Object.assign(search_info, { content: data.result[mapInfo[type].content_prop], type })
}, {
    immediate: true
})
</script>

<template>
    <div id="search">
        <div class="title">
            <h1>{{ mapInfo[search_info.type].title }}</h1>
        </div>
        <div class="content">
            <div v-for="item in search_info.content" :key="item.id" class="item">
                {{ item.id }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
#search {
    color: var(--common_text_color);
}
</style>