<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { AlbumDetails } from '@/api/album'
import { useRoute } from 'vue-router'

import { useLangStore } from '@/stores/settings'

import CoverTop from '@/EncapComponents/CoverTop/index.vue'
import SongList from '@/components/SongList/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $route = useRoute()
const album_details = reactive({})

async function GetAlbumDetails(id) {
    return await AlbumDetails({ id })
}

const publish_time = computed(() => {
    var now = new Date(parseInt(album_details.album.publishTime))
    return now.getFullYear()
})

const sum_minutes = computed(() => {
    let time = 0
    album_details.songs.forEach(s => {
        time += s.dt
    })
    return new Date(parseInt(time)).getMinutes()
})

onBeforeMount(async () => {
    const data = await GetAlbumDetails($route.query.id)
    Object.assign(album_details, data)
    console.log(data)
})
</script>

<template>
    <div id="album">
        <CoverTop :coverImgUrl="album_details.album.picUrl" :title="album_details.album.name"
            :artistName="album_details.album.artist.name" :tags="album_details.album.awardTags"
            :descriptions="album_details.album.description">
            <template #achievements>
                <span class="achieves">
                    <a href="">{{ publish_time }}</a>
                    <b> · </b>
                    <a href="">{{ album_details.album.size }} {{ lang.common.songs }}</a>
                    <b> · </b>
                    <a href="">{{ sum_minutes }} {{ lang.common.minutes }}</a>
                </span>
            </template>
        </CoverTop>
        <SongList
            :song_info="{ 
                songs: album_details.songs, 
                company: album_details.album.company, 
                publish_time: album_details.album.publishTime 
            }" />
    </div>
</template>

<style lang="less" scoped>
#album {
    width: 100%;

    .achieves {
        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>