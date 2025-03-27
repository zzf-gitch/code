import countDown from './countDown.vue'

const UILCOUNT = {
    install (Vue) {
        Vue.component("countDown", countDown)
    }
}

export default UILCOUNT