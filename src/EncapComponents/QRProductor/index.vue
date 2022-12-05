<script setup>
import QRCode from 'qrcode'
import { ref, onMounted, defineProps, watch } from 'vue'

const props = defineProps({
    qrUrl: {
        type: String,
        required: true
    }
})
let src = ref('')

// 生成base64
const generateQR = async text => {
    try {
        return await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}
setTimeout(async () => {
    src.value = await generateQR(props.qrUrl)
}, 100)
</script>

<template>
    <div id="QR">
        <img :src="src" />
    </div>
</template>

<style lang="less" scoped>

</style>