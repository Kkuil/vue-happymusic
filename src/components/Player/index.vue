<script setup>

</script>

<template>
    <div id="player">
        123
    </div>
</template>

<style lang="less" scoped>
#player {
    z-index: 100;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 64px;
    padding: 0 10vw;
    backdrop-filter: var(--nav_player_bd-f);
    display: flex;
    justify-content: space-between;

    >div {
        cursor: pointer;
        flex: 33.33%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: var(--nor_fz);
        color: var(--common_text_color);
    }
}
</style>