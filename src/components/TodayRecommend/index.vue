<script>
import PlayButton from '@/EncapComponents/PlayButton/index.vue'
export default {
    components: {
        PlayButton
    },
    setup(props, ctx) {
        const { attrs: { bgi } } = ctx
        return {
            bgi
        }
    }
}
</script>

<template>
    <div class="today_recommend">
        <img :src="bgi" class="img"/>
        <div class="text">
            <span>每</span>
            <span>日</span>
            <span>推</span>
            <span>荐</span>
        </div>
        <PlayButton />
    </div>
</template>

<style scoped lang="less">
.today_recommend {
    position: relative;
    overflow: hidden;
    .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        animation: moveUp 38s infinite alternate;
    }
    .text {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        width: 10vw;
        height: 10vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        span {
            width: 46%;
            height: 20px;
            font-weight: bolder;
            font-size: 2.8vw;
            color: var(--common_text_color);
        }
    }
    @keyframes moveUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-50%);
        }
    }
}
</style>