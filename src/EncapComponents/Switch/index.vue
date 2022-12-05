<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['switch'])
let isOn = ref(false)

function turn() {
    isOn.value = !isOn.value
    emits('switch', isOn.value)
}
</script>

<template>
    <div id="switch" @click="turn" :style="`${isOn ? ' background-color: var(--switch_bg_color);' : ''}`">
        <div class="slide_block" :style="`${isOn ? 'left: 2.7vw;' : 'left: 5px'}`"></div>
    </div>
</template>

<style scoped lang="less">
#switch {
    position: relative;
    width: 5vw;
    height: 35px;
    border-radius: 10px;
    background-color: var(--secondary_bg_color);

    .slide_block {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2vw;
        height: 80%;
        border-radius: 10px;
        background-color: #fff;
    }
}
</style>