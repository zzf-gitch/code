import { createRouter, createWebHistory , createWebHashHistory } from 'vue-router'
import Code from '../views/Code.vue'
import Demo from '../views/demo.vue'
const demoone = () => import('../views/demoone.vue')
const practice = () => import('../views/practice.vue')
const qq = () => import('../views/qq.vue')
const face = () => import('../views/face.vue')

const routes = [
  {
    path: '/',
    name: 'Code',
    component: Code
  },
  {
    path: '/demo',
    // path: '/demo/:id',
    name: 'demo',
    component: Demo
  },
  {
    path: '/demoone',
    name: 'demoone',
    component: demoone
  },
  {
    path: '/practice',
    name: 'practice',
    component: practice
  },
  {
    path: '/qq',
    name: 'qq',
    component: qq
  },
  {
    path: '/face',
    name: 'face',
    component: face
  },
  {
    path: '/iframe',
    children: [
      // 内嵌页面
      {
        path: '/iframe/website',
        component: () => import('@/views/IframeWrapper.vue'),
        props: {
          url: 'https://element-plus.org/zh-CN/'
        }
      },
      // 外链跳转
      {
        path: '/iframe/license',
        redirect: () => {
          window.open('https://eleadmin.com')
          return { path: '/' } // 处理浏览器安全限制
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 路由守卫处理
router.beforeEach((to) => {
  // 检测 meta 中的外部链接标识
  if (to.meta.isExternal) {
    window.open(to.meta.externalUrl)
    return false // 取消导航
  }
  
  // 或通过路径检测
  if (to.path.startsWith('http')) {
    window.open(to.path)
    return false
  }
})

export default router
