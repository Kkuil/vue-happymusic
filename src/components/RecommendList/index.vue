<script setup>
import { ref, onMounted, reactive, defineProps } from "vue";

import RecommendList from "@/api/recommend_list";
import CoverRow from "@/EncapComponents/CoverRow/index.vue";

import { useLangStore } from '@/stores/settings'

const props = defineProps(['title'])
let recommend_list = reactive([])

async function GetRecommendList() {
    return await RecommendList()
}
onMounted(async () => {
    const { result } = await GetRecommendList()
    console.log(result)
    recommend_list.push(...result)
})

</script>

<template>
    <CoverRow 
        :title="props.title" 
        :list="recommend_list" 
        imgProp="picUrl" 
        navigatePage="playlist" 
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: '123' }" 
        :isRadius="false" 
        :isShowPlayButton="true"
    />
</template>

<style scoped lang="less">
</style>