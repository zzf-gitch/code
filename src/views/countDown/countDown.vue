<template>
    <div class="count-down">
        {{ day }}&nbsp;
        <span>D :&nbsp;</span>
        {{ hour }}&nbsp;
        <span>H :&nbsp;</span>
        {{ min }}&nbsp;
        <span>M :&nbsp;</span>
        {{ sec }}&nbsp;
        <span>S</span>
    </div>
</template>

<script>
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
export default {
    props: {
        //要求必须传入两个时间 开始时间和结束时间
        //当前也可以只传入一个时间，逻辑就不涉及开始倒计时和结束倒计时，可以减少一个判断
        startTime: {
            type: Number,
            require: true
        },
        endTime: {
            type: Number,
            require: true
        }
    },
    setup(props) {
        //倒计时剩几天
        const day = ref('--')
        //倒计时剩几小时
        const hour = ref('--')
        //倒计时剩几分钟
        const min = ref('--')
        //倒计时剩几秒
        const sec = ref('--')
        //判断是否开始倒计时
        const start = ref(false)
        onMounted(() => {
            //页面一进来开始查询是否开始倒计时
            getTimes()
        })
        onBeforeUnmount(() => {
            //页面销毁的时候清除定时器
            window.clearInterval(timer)
        })
        const getTimes = () => {
            const date = new Date().getTime()
            //判断1.如果当前时间小于开始时间 那么意味着活动还没开始 此时的倒计时就是距离活动开始的倒计时
            if (Number(date) <= Number(props.startTime)) {
                //传入定时器的时间也是开始时间
                countDown(props.startTime)
            }
            //判断2.当前时间大于开始时间且小于结束时间 
            //那么意味着活动正在进行 此时的倒计时就是距离活动结束的倒计时
            if (Number(date) > Number(props.startTime) && Number(date) <= Number(props.endTime)) {
                //传入定时器的时间就是结束时间
                countDown(props.endTime)
            }
            //判断3.当前时间大于结束时间 意味着活动已经结束 倒计时也就结束了
            if (Number(date) > Number(props.endTime)) {
                start.value = false
            }
        }

        const countDown = time => {
            //说明活动未开始或者活动正在进行中 开始倒计时
            start.value = true
            let nowTime = new Date().getTime()
            let inputTime = time
            let timer = null
            //如果传进来的时间-当前时间 == 0 说明倒计时结束
            let times = (inputTime - nowTime) / 1000
            timer = setInterval(() => {
                if (times == 0) {
                    //倒计时结束时 不确定是哪个倒计时 所以在执行一遍getTimes()
                    //如果第一次传进来的时间是开始倒计时 那么再次执行getTimes()就会继续传入结束时间，开始结束倒计时
                    //如果第一次传进来的是结束倒计时 那么再次执行getTimes() 就会执行判断3 结束倒计时
                    getTimes()
                    clearInterval(timer)
                    window.clearInterval(timer)
                    timer = null
                    return
                }
                //定时器开始 times倒计时每一秒都要减1
                times--
                //js获取剩余天数
                let d = parseInt(String(times / 60 / 60 / 24))
                d = d < 10 ? '0' + d : d
                //js获取剩余小时
                let h = parseInt(String((times / 60 / 60) % 24))
                h = h < 10 ? '0' + h : h
                //js获取剩余分钟
                let m = parseInt(String((times / 60) % 60))
                m = m < 10 ? '0' + m : m
                //js获取剩余秒
                let s = parseInt(String(times % 60))
                s = s < 10 ? '0' + s : s
                //赋值给当前变量
                day.value = d
                hour.value = h
                min.value = m
                sec.value = s
            }, 1000)
        }
        return { day, hour, min, sec, start }
    }
}
</script>