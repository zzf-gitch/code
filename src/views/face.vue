<template>
    <div class="face">
        <video id="video" width="300" height="500" src="../assets/video.mp4" controls @ended="videoEnded"></video>
        <canvas id="canvas" width="300" height="500"></canvas>
        <div class="demo" @click="test">
            <el-button @click="ScrollTop" type="primary">ScrollTop</el-button>
            <!-- <vue3ScrollSeamless class="scroll-wrap" :classOptions="classOptions" :dataList="list">
                
            </vue3ScrollSeamless> -->
            <div class="ui" ref="Scroll" @click.stop>
                <ul class="ui-wrap">
                    <li class="li-item" v-for="(item, i) of list" :key="i">
                        <p>{{ item.title }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive } from "vue";
import { vue3ScrollSeamless } from "vue3-scroll-seamless";
import * as facejs from "face-api.js";
import mosaic from "../assets/mosaic.png";
const init = () => {
    Promise.all([
        facejs.nets.tinyFaceDetector.loadFromUri("/modules"), // 加载模型 用于检测人脸
        facejs.nets.ssdMobilenetv1.loadFromUri("/modules"), // 加载模型 用于检测68个面部关键点
    ]).then((res) => {
        entryFaces();
    });
};

const timer = ref(null);

const entryFaces = () => {
    const video = document.getElementById("video");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    video.addEventListener("play", () => {
        const displaySize = { width: video.width, height: video.height };
        facejs.matchDimensions(canvas, displaySize);
        const mosaicImage = new Image();
        mosaicImage.src = mosaic;
        mosaicImage.onload = () => {
            timer.value = setInterval(async () => {
                const detections = await facejs.detectAllFaces(video);
                const resizedDetections = facejs.resizeResults(detections, displaySize);
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                resizedDetections.forEach((detection) => {
                    ctx?.drawImage(
                        mosaicImage,
                        detection.box.x,
                        detection.box.y,
                        detection.box.width,
                        detection.box.height
                    );
                });
            }, 100);
        };
    });
};

const videoEnded = () => {
    clearInterval(timer.value);
};

onMounted(() => {
    init();
});

const list = reactive([
    {
        title: "水调歌头·明月几时有",
    },
    {
        title: "苏轼 〔宋代〕",
    },
    {
        title: "明月几时有？把酒问青天。",
    },
    {
        title: "不知天上宫阙，今夕是何年。",
    },
    {
        title: "我欲乘风归去，又恐琼楼玉宇，高处不胜寒",
    },
    {
        title: "起舞弄清影，何似在人间。",
    },
    {
        title: "转朱阁，低绮户，照无眠。",
    },
    {
        title: "不应有恨，何事长向别时圆？",
    },
    {
        title: "人有悲欢离合，月有阴晴圆缺，此事古难全。",
    },
    {
        title: "但愿人长久，千里共婵娟。",
    },
    {
        title: "水调歌头·明月几时有",
    },
    {
        title: "苏轼 〔宋代〕",
    },
    {
        title: "明月几时有？把酒问青天。",
    },
    {
        title: "不知天上宫阙，今夕是何年。",
    },
    {
        title: "我欲乘风归去，又恐琼楼玉宇，高处不胜寒",
    },
    {
        title: "起舞弄清影，何似在人间。",
    },
    {
        title: "转朱阁，低绮户，照无眠。",
    },
    {
        title: "不应有恨，何事长向别时圆？",
    },
    {
        title: "人有悲欢离合，月有阴晴圆缺，此事古难全。",
    },
    {
        title: "但愿人长久，千里共婵娟。",
    },
]);

const classOptions = {
    limitMoveNum: 6,
};

const Scroll = ref(null)
const ScrollTop = () => {
    Scroll.value.scrollTo({
        top: 0,
        behavior: 'smooth', // 使用平滑滚动
    });
}

const test = () => {
    console.log('test');
    
}
</script>

<style scoped>
.face {
    width: 100%;
    height: 100%;
}

.demo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.scroll-wrap {
    height: 400px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
}

.ui {
    width: auto;
    height: 200px;
    overflow: scroll;
}

.ui-wrap {
    list-style: none;
    padding: 0;
    margin: 0 auto;
}

.li-item {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
}
</style>