<script>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

export default {
    setup(props, ctx) {
        const playStore = usePlayerStore()
        const { play_state } = storeToRefs(playStore)
        return {
            play_state,
            playStore
        }
    },
    methods: {
        playOrPause() {
            this.playStore.play_or_pause(!this.play_state.isPlaying)
        }
    }
}
</script>

<template>
    <div class="center">
        <i title="上一首" class="iconfont icon-shangyishou pre_song"></i>
        <i title="播放" class="iconfont pause_song" :class="`${play_state.isPlaying ? 'icon-pause' : 'icon-play_fill'}`"
            @click="playOrPause"></i>
        <i title="下一首" class="iconfont icon-xiayishou next_song"></i>
    </div>
</template>


<style lang="less" scoped>
.center {
    color: var(--common_text_color);

    i {
        cursor: pointer;
    }

    .iconfont {
        font-size: 25px;
        padding: 5px;
        border-radius: 5px;

        &:hover {
            background-color: rgba(204, 204, 204, 0.187);
        }
    }

    .pause_song {
        font-size: 28px;
    }
}
</style>