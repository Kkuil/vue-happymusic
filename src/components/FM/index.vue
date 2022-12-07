<script>
export default {
    setup(props, ctx) {
        const { FMImg } = ctx
        return {
            FMImg
        }
    }
}
</script>
<template>
    <div class="FM">
        <img :src="FMImg" class="img" />
    </div>
</template>


<style lang="less" scoped>
.FM {
    display: flex;
    align-items: center;
    padding: 0 10px;
    .img {
        width: 10vw;
        height: 10vw;

    }
}
</style>