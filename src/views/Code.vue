<template>
  <div class="home">
    <div>
      <el-select v-model="chinaValue" class="m-2" placeholder="Select" size="large" @change="change">
        <el-option v-for="item in chinaarr" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>

      <!-- <el-select v-if="chinaValue == 1" v-model="classValue" class="m-2" placeholder="Select" size="large"
        style="margin-left:20px">
        <el-option v-for="item in classarr" :key="item.id" :label="item.label" :value="item.id" />
      </el-select> -->

      <el-button :loading="Loading" type="primary" style="margin-left:20px;width:80px;height: 40px;" @click="Search">翻译</el-button>
      <el-button :loading="loading" type="primary" style="margin-left:20px;width:80px;height: 40px;" @click="reset">清空</el-button>
      <el-button :loading="loading" type="primary" style="margin-left:20px;width:80px;height: 40px;" @click="demos(1)">跳转</el-button>

      <div style="width:1000px;height:300px;display:flex;align-items: center;justify-content: center;margin-top: 30px;">
        <el-form-item style="flex:1;height: 300px;">
          <el-input style="height:100%" v-model="ruleForm.chinadesc" type="textarea" placeholder="请输入你要翻译的文字" @keyup.enter.native="Search"/>
        </el-form-item>
        <el-form-item style="flex:1;height: 300px;margin-left: 20px;">
          <el-input style="height:100%" id="copy" v-model="ruleForm.englishdesc" type="textarea" />
          <i class="iconfont icon-shouqifuzhi" :class="{ active: lineactive }" title="复制" @click="copy"
            @mouseenter="mouseenter" @mouseleave="mouseleave"></i>
        </el-form-item>
      </div>
    </div>

    <!-- <div class="imgfull">
      <img class="fullimg" src="@/assets/preview.jpg" alt="">
    </div> -->
  </div>
</template>

<script setup>
import { search } from '@/api'
import md5 from 'md5'
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
const { push } = useRouter();
const route = useRoute();
const ruleForm = reactive({
  chinadesc: "",
  englishdesc: ""
})
const Loading = ref(false)
const loading = ref(false)
const chinaValue = ref(1)
const chinaarr = ref([
  {
    name: "编程专用-中文 » 英语",
    id: 1
  },
  {
    name: "编程专用-英文 » 中文",
    id: 2
  }
])
const classValue = ref(1)
const classarr = ref([
  {
    label: "小驼峰",
    id: 1
  },
  {
    label: "大驼峰",
    id: 2
  },
  {
    label: "常量",
    id: 3
  },
  {
    label: "class类名",
    id: 4
  }
])
const searchKey = ref('A3H33gCd9A1Gi27NBV8V')
const appid = ref('20221220001502964')
const salt = new Date().getTime()
const Search = async () => {
  Loading.value = true
  if (chinaValue.value == 1) {
    let str = appid.value + ruleForm.chinadesc + salt + searchKey.value
    let sign = md5(str)
    let params = {
      q: ruleForm.chinadesc,
      from: 'zh',
      to: 'en',
      appid: appid.value,
      salt: salt,
      sign: sign
    }
    const res = await search(params)
    if(res) {
      console.log(res.trans_result);
      Loading.value = false
      res.trans_result.forEach(item => {
        console.log(item.dst);
        ruleForm.englishdesc = item.dst
      })
      console.log(demo(80));
    }
  } else {
    let str = appid.value + ruleForm.chinadesc + salt + searchKey.value
    let sign = md5(str)
    let params = {
      q: ruleForm.chinadesc,
      from: 'en',
      to: 'zh',
      appid: appid.value,
      salt: salt,
      sign: sign
    }
    const res = await search(params)
    if(res) {
      console.log(res.trans_result);
      Loading.value = false
      res.trans_result.forEach(item => {
        console.log(item.dst);
        ruleForm.englishdesc = item.dst
      })
    }
  }
}
const demos = (id) => {
  // const paths = `/demo/${id}`
  // push(paths)
  // push({name:'demo',state:{id:id}})
  push({name:"qq",query:{id:id}})
}
const reset = () => {
  loading.value = true
  ruleForm.chinadesc = ''
  ruleForm.englishdesc = ''
  loading.value = false
}
// nohup npm run serve >code.log 2>&1 & exit nginx执行翻译项目命令
const demo = (v = 0) => {
  let x = v + 20
  return x
}

// 复制
const copy = () => {
  let input = document.getElementById('copy')
  //选中input标签内容
  input.select()
  //执行复制
  document.execCommand('copy')
  successmessage("已复制到粘贴板")
}

const lineactive = ref(false)
const mouseenter = () => {
  lineactive.value = true
}
const mouseleave = () => {
  lineactive.value = false
}

const change = () => {
  ruleForm.englishdesc = ''
  ruleForm.chinadesc = ''
}

onMounted(() => {
  let obj={
    "北京市": 150,
    "安徽省": 145,
    "上海市": 86,
    "四川省": 46,
    "陕西省": 42,
    "湖北省": 41,
    "台湾省": 40,
  }
  function convertToArray(objct) {
    return Object.keys(objct).map(key => ({name:key,number:objct[key]}));
  }
  let arr=convertToArray(obj);
  console.log(arr)    // [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
})
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:url(../assets/preview.jpg)
}

.el-textarea /deep/ .el-textarea__inner {
  height: 100% !important;
  font-size: 20px;
  font-weight: 600;
}

.imgfull {
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  z-index: -1;
}

.fullimg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon-shouqifuzhi {
  position: absolute;
  font-size: 25px;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
}

.active {
  color: #feaf00;
}
</style>
