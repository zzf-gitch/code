<template>
  <div class="home">
    <div>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="change">
        <el-option v-for="item in arr" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-button type="primary" :loading="loading" @click="search" style="margin-left:10px">搜索</el-button>
    </div>
    <el-input v-model="input" placeholder="请输入" clearable @keyup.enter.native="search"/>
    <div class="main">
      <span v-if="obj.qq">QQ号：{{ obj.qq }}</span>
      <span v-if="obj.phone">手机号：{{ obj.phone }}</span>
      <span v-if="obj.phonediqu">手机号归属地：{{ obj.phonediqu }}</span>
      <span v-if="obj.name">LOLID：{{ obj.name }}</span>
      <span v-if="obj.daqu">所在大区：{{ obj.daqu }}</span>
      <span v-if="obj.qqlm">QQ老密：{{ obj.qqlm }}</span>
      <span v-if="obj.id">微博ID：{{ obj.id }}</span>
    </div>
  </div>
</template>

<script setup>
import { QQsearch, Phonesearch, LOLsearch, LOLnamesearch, qqlmsearch, wbapisearch, wbphonesearch } from '@/api/qq.js'
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
import { successmessage, errormessage } from '@/utils/message.js'
const store = useStore();
const router = useRouter();
const route = useRoute();
const value = ref(1)
const input = ref('')
const loading = ref(false)
const arr = ref([
  {
    id: 1,
    label: 'qq号查询绑定手机'
  },
  {
    id: 2,
    label: '手机号查询绑定qq'
  },
  {
    id: 3,
    label: 'QQ号查询LOL信息'
  },
  {
    id: 4,
    label: 'LOL查询QQ信息'
  },
  {
    id: 5,
    label: 'QQ号查询老密(测试中-随缘关闭)'
  },
  {
    id: 6,
    label: '微博通过ID查手机号'
  },
  {
    id: 7,
    label: '通过手机号查微博ID'
  }
])
const change = () => {
  input.value = ''
  obj.value = {}
}
const obj = ref({})
const search = async () => {
  loading.value = true
  if (value.value == 1) {
    try {
      let params = {
        qq: input.value
      }
      const res = await QQsearch(params)
      // console.log(res);
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else if (value.value == 2) {
    try {
      let params = {
        phone: input.value
      }
      const res = await Phonesearch(params)
      // console.log(res);
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else if (value.value == 3) {
    try {
      let params = {
        qq: input.value
      }
      const res = await LOLsearch(params)
      // console.log(res)
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else if (value.value == 4) {
    try {
      let params = {
        name: input.value
      }
      const res = await LOLnamesearch(params)
      // console.log(res)
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else if (value.value == 5) {
    try {
      let params = {
        qq: input.value
      }
      const res = await qqlmsearch(params)
      // console.log(res)
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else if (value.value == 6) {
    try {
      let params = {
        id: input.value
      }
      const res = await wbapisearch(params)
      // console.log(res)
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let params = {
        phone: input.value
      }
      const res = await wbphonesearch(params)
      // console.log(res)
      obj.value = {}
      if (res.status == 200) {
        obj.value = res
        successmessage('查询成功')
        loading.value = false
      } else {
        errormessage('查询失败，找不到数据')
        loading.value = false
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const Form = reactive({
  id:'1',
  name:'张三'
})
const arrs = ref([{name:'id'},{name:'name'}])
const list = ref([])
const getlist = async () => {
  arrs.value.map(item => {
    for(let i in Form) {
      if(item.name === i) {
        list.value.push({
          value: i==='id' ? Form[i] : '',
          label: i==='name' ? Form[i] : '',
        })
      }
    }
  })
  console.log(list.value)
  // list.value.map(item => {
  //   console.log(item)
  // })
}
onMounted(async() => {
  getlist()
})
</script>

<style scoped>
/* 设备分辨率最小宽度为768px时为PC */
@media only screen and (min-device-width:768px) {
  .home {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url(../assets/HomePC.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .el-input {
    width: 300px;
    margin-top: 10px;
  }

  .main {
    width: 400px;
    height: 500px;
    background-color: rgb(0, 0, 0, 0);
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    font-size: 25px;
    font-weight: 800;
  }
}

/* 设备分辨率最大宽度为768px时为移动端 */
@media only screen and (max-device-width:768px) {
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url(../assets/HomeIOS.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .el-input {
    width: 300px;
    margin-top: 10px;
  }

  .main {
    width: 400px;
    height: 500px;
    background-color: rgb(0, 0, 0, 0);
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    font-size: 25px;
    font-weight: 800;
  }
}
</style>
