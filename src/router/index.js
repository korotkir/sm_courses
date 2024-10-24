import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CourseAssign from '@/pages/CourseAssign.vue'
import CourseInfo from '@/pages/CourseInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/assign',
      name: 'CourseAssign',
      component: CourseAssign
    },
    {
      path: '/course:rid',
      name: 'CourseInfo',
      component: CourseInfo
    }
  ]
})

export default router
