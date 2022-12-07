<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'

import LatestAlbums from '@/api/latest_albums.js'

import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const latest_albums = reactive([])

async function GetLatestAlbums() {
    return await LatestAlbums()
}

onMounted(async () => {
    const data = await GetLatestAlbums()
    latest_albums.push(...data.albums.slice(0, 10))
    console.log(data)
})

</script>

<template>
    <CoverRow 
        :title="lang.home.newAlbum" 
        :list="latest_albums" 
        imgProp="picUrl" 
        subName="artist,name"
        navigatePage="apple" 
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: '123' }" 
        :isRadius="false" 
        :isShowPlayButton="true"
    />
</template>


<style>

</style>