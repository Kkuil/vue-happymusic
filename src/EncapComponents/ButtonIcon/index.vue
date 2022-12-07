<script>

export default {
    setup() {

    }
}
</script>

<template>
    <button class="button">
        <slot name="icon" class="icon"></slot>
    </button>
</template>


<style lang="less" scoped>
.button {
    width: 3vw;
    height: 3vw;

    &:active {
        transform: scale(0.9);
    }

    .icon {
        font-size: 2.8vw;
    }
}
</style>