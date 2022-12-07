<script>
export default {
    setup() {

    }
}
</script>

<template>
    <div class="play_symbol">
        <button class="box">
            <i class="iconfont icon-playfill"></i>
        </button>
    </div>
</template>

<style lang="less" scoped>
.play_symbol {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;

    .box {
        cursor: default;
        width: 3vw;
        height: 3vw;
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
        .iconfont {
            font-size: 2vw;
            color: var(--common_text_color);
        }

        &:hover {
            opacity: 0.8;
        }
        &:active {
            transform: scale(0.9);
        }
    }

    &:hover .box {
        display: flex;
    }
}
</style>