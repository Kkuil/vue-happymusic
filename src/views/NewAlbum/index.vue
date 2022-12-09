<script setup>
import CoverRow from '@/EncapComponents/CoverRow/index.vue'
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'
import { LatestAlbums } from '@/api/album'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const latest_albums = reactive([])

async function GetLatestAlbums() {
    return await LatestAlbums()
}

onMounted(async () => {
    const data = await GetLatestAlbums()
    latest_albums.push(...data.albums)
    console.log(data)
})
</script>

<template>
    <div id="new_album">
        <CoverRow :title="lang.home.newAlbum" :list="latest_albums" imgProp="picUrl" :subName="['artist', 'name']"
            navigatePage="album" :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'newAlbum' }" :isRadius="false"
            :isShowPlayButton="true" />
    </div>
</template>

<style lang="less" scoped>
#new_album {
    width: 100%;
}
</style>