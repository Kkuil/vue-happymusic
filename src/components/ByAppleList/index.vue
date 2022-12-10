<script setup>
import { ref, defineProps } from 'vue'
import { byAppleMusic } from "@/utils/staticData.js";
import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const props = defineProps(['title'])

</script>

<template>
    <CoverRow :title="title" :list="byAppleMusic" imgProp="coverImgUrl" uniqueSubName="By Apple Music"
        navigatePage="apple" :seeMoreInfo="{ isShowSeeMore: false, navigatePage: '123' }" :isRadius="false"
        :isShowPlayButton="true" >
        <template #name="{ item }">
            <div class="text">
                <span class="main_name">{{ item.name }}</span>
                <span class="sub_name">By Apple Music</span>
            </div>
        </template>
    </CoverRow>
</template>

<style scoped lang="less">

.text {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    .main_name,
    .sub_name {
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

    .sub_name {
        font-size: 0.7vw;
        color: rgb(116, 116, 116);

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>