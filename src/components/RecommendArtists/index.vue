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
    <CoverRow :title="title" :list="artists" imgProp="img1v1Url" navigatePage="artist" uniqueSubName=" "
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'recommendArtists' }" :isRadius="true"
        :isShowPlayButton="false">
        <template #name="{ item }">
            <div class="text">
                <span class="main_name">{{ item.name }}</span>
            </div>
        </template>
    </CoverRow>
</template>

<style lang="less" scoped>
.text {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .main_name {
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .main_name {
        font-size: 1.2vw;
        color: var(--common_text_color);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover {
            text-decoration: underline;
        }
    }

}
</style>