<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useLangStore, useAppleListStore } from "@/stores/settings/index.js";
import { byAppleMusic } from "@/utils/staticData.js";

import ByAppleList from '@/components/ByAppleList/index.vue'
import RecommendList from '@/components/RecommendList/index.vue'
import ForYou from '@/components/ForYou/index.vue'
import RecommendArtists from '@/components/RecommendArtists/index.vue'
import LatestAlbums from '@/components/LatestAlbums/index.vue'
import Charts from '@/components/Charts/index.vue'

const langStore = useLangStore();
const appleListStore = useAppleListStore()
const { lang } = storeToRefs(langStore);
const { isShowAppleList } = storeToRefs(appleListStore)
</script>

<template>
    <div id="home">
        <div class="music_content">
            <ByAppleList :title="lang.home.apple" v-show="isShowAppleList"/>
            <RecommendList :title="lang.home.recommendPlaylist" />
            <ForYou />
            <RecommendArtists :title="lang.home.recommendArtist"/>
            <LatestAlbums />
            <Charts />
        </div>
    </div>
</template>

<style lang="less">
#home {
    .music_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }
}
</style>