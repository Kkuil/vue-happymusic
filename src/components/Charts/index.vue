<script setup>
import { ref, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'

import { TopList } from '@/api/toplist'

import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const top_list = reactive([])

async function GetTopList() {
    return await TopList()
}

onMounted(async () => {
    const data = await GetTopList()
    top_list.push(...data.list.slice(0, 5))
})

</script>

<template>
    <CoverRow :title="lang.home.charts" :list="top_list" imgProp="coverImgUrl" navigatePage="playlist" uniqueSubName=" "
        :seeMoreInfo="{ isShowSeeMore: true, navigatePage: 'explore', query: { cate: '排行榜' } }" :isRadius="false"
        :isShowPlayButton="true" :isTextCenter="true">
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