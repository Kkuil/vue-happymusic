<script setup>
import { ref, onMounted, reactive, defineProps } from "vue";

import { RecommendList } from "@/api/playlist";
import CoverRow from "@/EncapComponents/CoverRow/index.vue";

import { useLangStore } from '@/stores/settings'

const props = defineProps(['title'])
let recommend_list = reactive([])

async function GetRecommendList() {
    return await RecommendList()
}
onMounted(async () => {
    const { result } = await GetRecommendList()
    recommend_list.push(...result.slice(0, 10))
})

</script>

<template>
    <CoverRow :title="props.title" :list="recommend_list" imgProp="picUrl" navigatePage="playlist" uniqueSubName=" "
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'explore', query: { cate: '推荐歌单' } }" :isRadius="false"
        :isShowPlayButton="true">
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
    flex-direction: column;

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
