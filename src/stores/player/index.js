import { defineStore } from "pinia";

export const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            play_state: {
                // 是否正在播放
                isPlaying: false,
                /* 
                    0：循环播放
                    1：单曲循环
                    2：随机播放
                */
                play_mode: 0,
                // 播放音量
                volume: 0.5,
                // 播放进度
                progress: 0
            },
            playing_song: {
                id: 666,
                url: '',
                cover: "http://p3.music.126.net/qQ5e7rM-xY6YWJW9_3tR-w==/109951168121859537.jpg",
                song_name: 'Kkuil',
                artist_name: 'G.E.M 邓紫棋',
                song_length: 1594649,
                lyrics: [
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                    '123',
                ]
            },
            will_playlist: []
        }
    },
    actions: {
        // 切换音乐
        switch_music(play_info) {
            Object.assign(this.playing_song, play_info)
        },
        // 添加即将播放音乐
        add_playlist(play_info) {
            this.will_playlist.push(play_info)
        },
        // 删除即将播放音乐
        del_playlist(play_id) {
            this.will_playlist = this.will_playlist.filter(song => song.id != play_id)
        },
        // 改变音量
        change_volume(volume) {
            this.play_state.volume = volume
        },
        // 切换模式
        switch_mode() {
            if(this.play_state.play_mode <= 1) this.play_state.play_mode++
            else this.play_state.play_mode = 0
        },
        play_or_pause(isPlaying) {
            this.play_state.isPlaying = isPlaying
        }
    }
})