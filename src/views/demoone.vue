<template>
    <div class="demoone">
        <el-radio-group v-model="radio">
            <el-radio :label="1">视频</el-radio>
            <el-radio :label="2">音频</el-radio>
            <el-radio :label="3">文档</el-radio>
            <el-radio :label="4">游戏</el-radio>
        </el-radio-group>

        <div class="rect" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" v-drag></div>
        <div class="box_main" v-drag>
            <img class="img" src="../assets/阿备.jpg" alt="">
            <div class="id"><span>NO.51</span></div>
            <div class="bottom"><span>刘备</span><span>仁德义枪</span></div>
            <div class="main_img">
                <img src="../assets/51.png" alt="">
                <span class="span" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="style"
                    @click="upd(item, index)">编辑英雄</span>
                <div class="line" :class="{ lineactive: lineactive }"></div>
                <el-button type="danger" @click="del(item, index)">删除英雄</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    nextTick,
    reactive,
    onMounted,
    watch,
    computed,
    onUnmounted,
    onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const radio = ref()
radio.value = Number(route.query.id)
const mousedown = () => {
    console.log('鼠标按下');
}
const mousemove = () => {
    console.log('鼠标移动');
}
const mouseup = () => {
    console.log('鼠标抬起');
}
window.onbeforeunload = function () {
    console.log('页面刷新之前触发');
}

window.onunload = function () {
    console.log('页面刷新完成触发');
}
const lineactive = ref(false)
const style = ref('')
const mouseenter = () => {
    lineactive.value = true
    style.value = 'color:#000a48'
}
const mouseleave = () => {
    lineactive.value = false
    style.value = 'color:white'
}
onMounted(() => {
    // window.addEventListener('load',() => {
    //     alert('页面刷新中')
    // })
})
</script>

<style scoped>
.demoone {
    width: 100%;
    height: 100%;
}

.rect {
    width: 100px;
    height: 100px;
    background-color: peru;
    position: absolute;
    mix-blend-mode: screen;
    cursor: pointer;
    background: url('../assets/zzf.png') no-repeat;
    background-size: 100% 100%;
}

.box_main {
    width: 180px;
    height: 300px;
    margin-top: 1rem;
    margin-left: 15px;
    position: relative;
    word-break: break-all;
    word-wrap: break-word;
    box-shadow: 0px 5px 10px 5px black;
    cursor: pointer;
    transition: all 0.35s;
}

.box_main:hover {
    transition: all 0.35s;
    box-shadow: 0 10px 30px 5px black;
    transform: translateY(-10px);
    background-color: black;
}

.img {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.id {
    position: absolute;
    z-index: 1;
    color: white;
    margin: 15px;
    font-size: 16px;
    font-weight: 800;
}

.bottom {
    position: absolute;
    z-index: 1;
    color: white;
    bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    pointer-events: none;
    box-sizing: border-box;
}

@keyframes line {
    33% {
        transform: translateY(-10px);
    }

    75% {
        transform: translateY(5px);
    }

    100% {
        transform: translateY(0px)
    }
}

.box_main:hover .id {
    animation: line 0.5s 0.2s;
}

.box_main:hover .bottom {
    animation: line 0.5s 0.2s;
}

.main_img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    backdrop-filter: blur(10px);
    transition: all 0.5s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.main_img img {
    border-radius: 50%;
}

.box_main:hover .main_img {
    opacity: 1;
    transition: all 0.5s 0.5s
}

.span {
    color: white;
    font-size: 25px;
    font-weight: 800;
}

.line {
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}

.lineactive {
    width: 150px !important;
    background-color: skyblue;
    transition: all 0.5s 0.35s;
}

.el-button {
    margin-top: 10px;
}
</style>