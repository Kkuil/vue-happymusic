<script setup>
import { ref, onBeforeMount, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'

import { SingerDetails } from '@/api/singer'
import { SingerFansCount } from '@/api/singer';

import { useLangStore } from '@/stores/settings'

import CoverTop from '@/EncapComponents/CoverTop/index.vue'
import LatestPublish from '@/components/LatestPublish/index.vue'
import HotSongs from '@/components/HotSongs/index.vue'
import SingerMvs from '@/components/SingerMvs/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $route = useRoute()
const singer_details = reactive({})

async function initial() {
    const singer_id = $route.query.id
    const { data } = await GetSingerDetails(singer_id)
    const { data: { fansCnt } } = await GetSingerFansCount(singer_id)
    Object.assign(singer_details, data, { fansCnt })
}

// 歌手详情
async function GetSingerDetails(id) {
    return await SingerDetails({ id })
}

async function GetSingerFansCount(id) {
    return await SingerFansCount({ id })
}

watch($route, route => {
    initial()
}, {
    deep: true
})

onBeforeMount(async () => {
    initial()
})

</script>

<template>
    <div id="artist">
        <CoverTop 
            :coverImgUrl="singer_details.artist.cover" 
            :title="singer_details.artist.name" 
            :tags="singer_details.artist.identifyTag" 
            :descriptions="singer_details.artist.briefDesc"
        >
            <template #achievements>
                <span class="achieves">
                    <a href="#songs">{{ singer_details.artist.musicSize }} {{ lang.common.songs }}</a>
                    <b> · </b>
                    <a href="">{{ singer_details.artist.albumSize }} {{ lang.artist.withAlbums }}</a>
                    <b> · </b>
                    <a href="#mvs">{{ singer_details.artist.mvSize }} {{ lang.artist.videos }}</a>
                </span>
                <div>{{ Math.floor(singer_details.fansCnt / 10000) }} {{ lang.artist.fansCnt }}</div>
            </template>
        </CoverTop>
        <LatestPublish :id="$route.query.id"/>
        <div id="songs">
            <HotSongs :id="$route.query.id"/>
        </div>
        <div id="mvs">
            <SingerMvs :id="$route.query.id" id="mvs"/>
        </div>
    </div>
</template>

<style lang="less" scoped>
#artist {
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