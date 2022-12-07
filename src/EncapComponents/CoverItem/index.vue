<script>
import PlayButton from '@/EncapComponents/PlayButton/index.vue'
export default {
    components: {
        PlayButton
    },
    setup(props, ctx) {
        const { attrs: { img_url, main_name, sub_name } } = ctx
        return {
            img_url,
            main_name,
            sub_name
        }
    }
}
</script>

<template>
    <div class="cover_item">
        <div class="cover" :style="`background-image: url(${img_url});`">
            <PlayButton />
        </div>
        <div class="text">
            <a class="main_name">{{ main_name }}</a>
            <span class="sub_name">{{ sub_name }}</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.cover_item {
    margin-top: 10px;
    margin-bottom: 3vh;
    width: 18%;
    height: 18vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .cover {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 80%;
        border-radius: 15px;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        &:hover {
            filter: drop-shadow(16px 16px 20px);
        }
    }

    .text {
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: column;

        .main_name {
            cursor: pointer;
            font-size: 1.2vw;
            font-weight: bolder;
            text-overflow: ellipsis;
            line-clamp: 2;
            white-space: break-spaces;
            color: var(--common_text_color);

            &:hover {
                text-decoration: underline;
            }
        }

        .sub_name {
            font-size: 1vw;
            color: var(--common_text_color);
        }
    }
}
</style>