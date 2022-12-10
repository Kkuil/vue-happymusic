<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'

import { LatestAlbums } from '@/api/album'

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
    <CoverRow :title="lang.home.newAlbum" :list="latest_albums" imgProp="picUrl" :subName="['artist', 'name']"
        navigatePage="album" :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'newAlbum' }" :isRadius="false"
        :isShowPlayButton="true">
        <template #name="{ item }">
            <div class="text">
                <span class="main_name">{{ item.name }}</span>
                <span class="sub_name">{{ item.artist.name }}</span>
            </div>
        </template>
    </CoverRow>
</template>
<style lang="less" scoped>
.text {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    .main_name {
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .main_name,
    .sub_name {
        font-size: 1.2vw;
        color: var(--common_text_color);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
            text-decoration: underline;
        }
    }
    
    .sub_name {
        font-size: 0.7vw;
        color: rgb(116, 116, 116);
    }

}
</style>