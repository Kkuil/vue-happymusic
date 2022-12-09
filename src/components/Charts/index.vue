<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'

import { TopList } from '@/api/toplist'

import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const top_list = reactive([])

async function GetTopList() {
    return await TopList()
}

onMounted(async () => {
    const data = await GetTopList()
    top_list.push(...data.list.slice(0, 5))
})

</script>

<template>
    <CoverRow :title="lang.home.charts" :list="top_list" imgProp="coverImgUrl" navigatePage="apple"
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'explore' }" :isRadius="false" :isShowPlayButton="true"
        :isTextCenter="true" />
</template>


<style>

</style>