<template>
  <div class="practice">
<!--    <table border="1">-->
<!--      <tr v-for="(row, index) in num" :key="index">-->
<!--        <td v-for="(col, i) in row" :key="i">-->
<!--          {{ col }}x{{ row }} = {{ col * row }}-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->
    <el-button type="primary" @click="getlist">上一个视频</el-button>
    <video loop autoplay controls width="1500" height="800" :src="url" type="video/webm" >
      Download
      <a :href="url">MP4</a>
      video.
    </video>
    <el-button type="primary" @click="getlist">下一个视频</el-button>
  </div>
</template>

<script setup>
import { searchGril } from '@/api'
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
import { successmessage } from '@/utils/message.js'
const store = useStore();
const router = useRouter();
const route = useRoute();
const num = ref(9)
const url = ref('')
const getlist = async () => {
  const res = await searchGril({wpon:'json'})
  if(res.result === 200) {
    url.value = res.mp4
  }
}
onMounted(() => {
  getlist()
})
const obj = ref({
  label: "测试数据111",
  type: 3,
  name: "str10",
  value: "测试数据111,1111"
})
for(let i in obj.value) {
  if(i === 'value') {
    // console.log(obj.value[i])
  }
}
var a= '客户地址15903509849,1598';
var b = a.includes(',');
console.log(a.split(',')); // ["1","2","3"]
</script>

<style scoped>
.practice{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}
</style>
