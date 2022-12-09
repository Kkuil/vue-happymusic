<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'

import { RecommendSingers } from '@/api/singer'
import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const props = defineProps(['title'])
const artists = reactive([])

async function GetRecommendSingers() {
    return await RecommendSingers()
}

onMounted(async () => {
    const data = await GetRecommendSingers()
    console.log(data)
    artists.push(...data.artists)
})

</script>

<template>
    <CoverRow :title="title" :list="artists" imgProp="img1v1Url" navigatePage="artist"
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: '123' }" :isRadius="true" :isShowPlayButton="false"
        :isTextCenter="true" />
</template>

<style lang="less" scoped>
.recommend_artist {

    .content {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;

        .artist {
            width: 19%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .img {
                width: 12vw;
                border-radius: 50%;
            }

            .name {
                font-size: 1.5vw;
                color: var(--common_text_color);
            }
        }
    }
}
</style>