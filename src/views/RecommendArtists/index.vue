<script setup>
import { ref, onActivated, reactive, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { RecommendSingers } from '@/api/singer'
import CoverRow from '@/EncapComponents/CoverRow/index.vue'
import { useLangStore, useAppleListStore } from "@/stores/settings/index.js";
const langStore = useLangStore();
const { lang } = storeToRefs(langStore);

const artists = reactive([])
let isNoMore = ref(false)
let offset = ref(0)

async function loadMore() {
    const old_artist_length = artists.length
    const data = await GetRecommendSingers(offset.value, 30)
    artists.splice(offset.value + 30, 0, ...data.artists)
    nextTick(() => {
        if (old_artist_length == artists.length) isNoMore.value = true
        else offset.value += 30
    })
}

async function GetRecommendSingers(offset, limit) {
    return await RecommendSingers({ offset, limit })
}

onActivated(async () => {
    const data = await GetRecommendSingers(offset.value, 30)
    offset.value += 30
    artists.push(...data.artists)
})

</script>

<template>
    <div id="recommend_artists">
        <CoverRow :title="lang.home.recommendArtist" :list="artists" imgProp="img1v1Url" navigatePage="artist"
            uniqueSubName=" " :isRadius="true" :isShowPlayButton="false" :seeMoreInfo="{ isShowSeeMore: false }"
            :isTextCenter="true">
            <template #name="{ item }">
                <div class="name">
                    <span class="main_name">{{ item.name }}</span>
                </div>
            </template>
        </CoverRow>
        <div class="load_more">
            <div v-show="!isNoMore" class="text" @click="loadMore">加载更多</div>
            <div v-show="isNoMore" class="text">没有更多了</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
#recommend_artists {
    width: 100%;
    color: var(--common_text_color);
    .name {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        .main_name {
            font-size: 1.2vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:hover {
                text-decoration: underline;
            }
        }

    }

    .load_more {
        cursor: pointer;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            cursor: default;
            padding: 10px;
            height: 30px;
            border-radius: 10px;
            background-color: rgba(204, 204, 204, 0.153);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            color: var(--common_text_color);
            opacity: 0.6;

            &:hover {
                transform: scale(1.05);
            }

            &:active {
                transform: scale(0.9);
            }
        }
    }
}
</style>