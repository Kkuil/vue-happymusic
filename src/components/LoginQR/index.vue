<script setup>
import QRProductor from '@/EncapComponents/QRProductor/index.vue'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings/index.js'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { QRBase64, QRRecursive } from '@/api/login'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
let timer = ref(null)
let qrUrl = ref('')
let qrCodeKey = ref('')

async function GetQR() {
    const { data: { qrurl }, key } = await QRBase64()
    qrCodeKey.value = key
    return qrurl
}

async function GetQRStatus({ key }) {
    const { code } = await QRRecursive({ key })
    console.log(code)
    if (code == 800 || code == 803) {
        clearInterval(timer.value)
        // const { data } = await LoginRefresh()
    }
}

onMounted(async () => {
    qrUrl.value = await GetQR()
    // 扫码状态
    timer.value = setInterval(async () => {
        await GetQRStatus({ key: qrCodeKey.value })
    }, 5000);
})

onUnmounted(() => {
    timer.value && clearInterval(timer.value)
})
</script>

<template>
    <div class="qr_content">
        <QRProductor :qrUrl="qrUrl" />
        <img ref="qrImg" alt="" class="img">
        <span class="text">{{ lang.login.qr_tips }}</span>
    </div>
</template>

<style lang="less" scoped>
.qr_content {
    width: 270px;
    height: 270px;
    background-color: #bbcdff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text {
        margin-top: 15px;
        color: var(--common_text_color);
    }
}
</style>