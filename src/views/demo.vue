<template>
    <div class="demo">
        <el-input v-model="L" type="number" placeholder="Please input" />
        <el-input v-model="E" type="number" placeholder="Please input" />
        <el-input v-model="D" type="number" placeholder="Please input" />
        <el-input v-model="total" disabled placeholder="Please input" />

        <div class="main_anin">
            <progress :max="max" :value="V"></progress>
            <div v-for="(item, index) in mergeList" :key="index">
                <div>
                    <span :style="{ 'color': item.status ? item.color : '#ababab' }">{{ item.answerName }}</span>
                    <span :style="{ 'color': item.status ? item.color : 'black' }">:&nbsp;{{ item.randomNumber
                        }}&nbsp;道试题&nbsp;&nbsp;-&#45;&#45;&#45;&#45;</span>
                    <span v-if="item.status">
                        <img class="is-loading " style="width: 30px;height: 30px;" src="./images/sandglass.svg"
                            mode="" /><span class="contentstatus">组卷中</span>
                    </span>
                    <span v-else>
                        <img class="is-complete contentStatus" style="width: 30px;height: 30px;"
                            src="./images/affirmatory.svg" mode="" /><span class="contentStatus">已完成</span>
                    </span>
                    <el-button type="primary" @click="submit">过渡</el-button>
                </div>
            </div>
        </div>

        <el-select v-model="va" class="m-2" placeholder="Select" @change="selet">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <div class="main_small" :class="{ lineactive: lineactive }">

        </div>
        <div :class="active == true ? 'main_small' : 'main-small'">

        </div>
        <!-- <div class="audio-player">
            <div><el-button type="primary" @click="showDialog">dialog测试</el-button>{{ showdialog }}</div>
            <AudioPlayer :audioUrl="music" :isPauseTtsAudio="false"></AudioPlayer>
        </div>
        <div id="waveform"></div>
        <div id="wave-timeline"></div>
        <div id="wave-minimap"></div>
        <div class="audio-btn">
            <el-button @click="Play" type="primary" :icon="audio ? VideoPause : VideoPlay">{{ audio ? '暂停' : '播放'
            }}</el-button>
        </div>

        <div class="audio-Player">
            <div class="audio-Player-box">
                <audio :src="music" controls class="audio4" @play="play" @pause="pause" @seeking="seeking"
                    controlsList="noplaybackrate"></audio>
            </div>
        </div>
        <child v-model="showdialog" /> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, toRefs, nextTick } from 'vue'
// 使用SM2加密
import { sm2, sm3, sm4 } from 'sm-crypto'
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.js'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.js'
import { VideoPause, VideoPlay } from '@element-plus/icons-vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import AudioPlayer from "./audioPlayer.vue";
import music from '../assets/Wrecking Ball-Frankmusik.320.mp3'
import child from '@/components/child.vue'
const store = useStore();
const router = useRouter();
const route = useRoute();

const showdialog = ref(false)
const showDialog = () => {
    showdialog.value = true
}

const { query } = toRefs(route)
// console.log(query)
// console.log(route.params.id)
// console.log(history.state.id)
// console.log(route.query.id)
const URL = ref('')
const L = ref(0)
const E = ref(0)
const D = ref(0)
const total = ref(0)
const nums = ref(0)
const va = ref('')
const options = ref([
    {
        label: "视频",
        value: 1
    },
    {
        label: "音频",
        value: 2
    },
    {
        label: "文档",
        value: 3
    },
    {
        label: "游戏",
        value: 4
    }
])
const selet = (v) => {
    // console.log(v);
    router.push({ path: "/demoone", query: { id: v } })
}
const arr = ref([
    {
        answerName: "判断题",
        randomNumber: 6
    },
    {
        answerName: "解答题",
        randomNumber: 6
    },
    {
        answerName: "选择题",
        randomNumber: 6
    },
    {
        answerName: "问答题",
        randomNumber: 6
    }
])
watch([L, E, D], (newValue, oldValue) => {
    const num = newValue[0] * newValue[1] * newValue[2]
    total.value = num <= 50 ? '漩涡鸣人' : num <= 150 ? '宇智波佐助' : num <= 150 ? '宇智波鼬' : num <= 300 ? '宇智波斑' : '迈特凯'
    nums.value = num + ''
    // console.log(nums.value)
})
const mergeList = computed(() => {
    if (arr.value) {
        arr.value.map(item => {
            item.status = true
            item.color = '#1b8fe8'
            return item
        })
    }
    return arr.value
})
const max = ref(100)
const V = ref(0)
const times = ref(null)
const time = async () => {
    times.value = (mergeList.value.length * 6000) / 3000
    const timer = setInterval(() => {
        if (times.value > 1) {
            times.value--
            let tim
            tim = 100 / times.value
            V.value = Number(tim.toFixed(2))
        } else {
            clearInterval(timer)
        }
    }, 1000)
    for (let i = 0; i < mergeList.value.length; i++) {
        await new Promise((res, rej) => {
            const timer = setTimeout(() => {
                res(i)
            }, 2000)
        }).then(res => {
            mergeList.value[res].status = false
        })
    }
}
// 前端生成随机ID
const vueID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
onMounted(() => {
    time()
    vueID()
    // console.log(vueID())
    // 前端生成随机ID
    var uuid = new Date().getTime() + '-' + Math.random().toString(36).substr(2);
    // console.log(uuid);

})
const active = ref(true)
const lineactive = ref(false)
const submit = () => {
    active.value = !active.value
    lineactive.value = !lineactive.value
}

const wavesurfer = ref(null)
const audio = ref(false)
const init = () => {
    wavesurfer.value = WaveSurfer.create({
        // 需要的容器盒子
        container: '#waveform',
        // 是否出现滚动条
        scrollParent: true,
        // 播放进行时线条颜色
        cursorColor: '#f7bb35',
        // 播放进行时线条宽度
        cursorWidth: 2,
        // 未播放的波纹颜色
        waveColor: '#b210c1',
        // 已播放的波纹颜色
        progressColor: 'blue',
        // 倍速
        audioRate: 1,
        //高度
        height: 500,
        plugins: [
            Timeline.create({
                container: '#wave-timeline',
                height: 20,
            }),
            Minimap.create({
                container: '#wave-minimap', // 缩略图容器id
                waveColor: '#fac428',  //缩略图波形颜色
                progressColor: '#4999ff',  //播放过的波形颜色
                height: 50,    //缩略图高度
                cursorColor: '#91ea85',
                // 播放进行时线条宽度
                cursorWidth: 2,
            }),
        ]
    });
    // 加载音频文件
    wavesurfer.value.load(music);
    //静音audio
    wavesurfer.value.setVolume(0);
    // 拖动wavesurfer进度条时触发
    wavesurfer.value.on('click', function () {
        document.querySelector(".audio4").currentTime = wavesurfer.value.getCurrentTime()
    });
    // 播放完成时
    wavesurfer.value.on('finish', function () {
        document.querySelector(".audio4").currentTime = 0;
        document.querySelector(".audio4").pause();
        // // 停止播放并回到起始点
        wavesurfer.value.stop();
        audio.value = false
    });
}

const Play = () => {
    audio.value = !audio.value
    audio.value ? wavesurfer.value.play() : wavesurfer.value.pause()
}
onMounted(() => {
    // init()
})


// 播放音频
const play = () => {
    wavesurfer.value.play();
}

// 暂停
const pause = () => {
    wavesurfer.value.pause();
}

// 拖动audio进度条时触发
const seeking = () => {
    //使wavesurfer跳到进度条拖动的位置（audio当前时间 - wavesurfer当前时间 = 需要跳转的时间）
    wavesurfer.value.skip(
        document.querySelector(".audio4").currentTime -
        wavesurfer.value.getCurrentTime()
    );
}



// ----------- sm2 --------------------
// 获取密钥对
// publicKey -> 公钥
// privateKey -> 私钥
const { publicKey, privateKey } = sm2.generateKeyPairHex();
const msgString = '15903509849'
const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
// 加密
const PublicKey = 'MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAEC9ehDY3P0fBJO5f5Aw3fVFn6mIdgHFGgglDMCXt1LY6OpOoPLM3BYcIB3hyxH3ZXxugncH+HQOFEvqeVnCa/7A=='
const encryptedData = '04' + sm2.doEncrypt(msgString, `${publicKey}`)
const base64String = btoa(encryptedData)
console.log('国密加密后手机号:', base64String + '----------' + encryptedData);
// 解密
const decodedString = atob(base64String)
const decryptedData = sm2.doDecrypt(encryptedData.slice(2, encryptedData.length), privateKey);
console.log('国密解密后手机号:', decodedString + '----------' + decryptedData);
</script>

<style scoped>
.demo {
    width: 100%;
    height: 100%;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
}

.audio-player {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.audio-btn {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}

.audio-Player {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}

.audio-Player-box {
    width: 300px;
    background: #f1f3f4;
}

.contentStatus {
    color: #5ac725;
}

.contentstatus {
    color: #1b8fe8;
}

.is-loading {
    vertical-align: middle;
    animation: vertical-right 2s ease-in-out infinite;
}

.is-complete {
    vertical-align: middle;
    margin: 3px;
    animation: rotate-cw 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.main_anin {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

@keyframes vertical-right {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(180deg);
    }
}

@keyframes rotate-cw {
    0% {
        transform: translateX(-5px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.main_small {
    width: 200px;
    height: 100%;
    background: gray;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s;
}

.main-small {
    width: 200px;
    height: 100%;
    background: gray;
    position: absolute;
    left: -200px;
    top: 0;
    transition: all 0.5s;
}

.lineactive {
    left: -200px;
}
</style>