import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CourseAssign from '@/pages/CourseAssign.vue'
import CourseInfo from '@/pages/CourseInfo.vue'
import { ROUTER_PATHS } from '@/constants/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHS.HOME,
      name: ROUTER_PATHS.HOME,
      component: Home
    },
    {
      path: ROUTER_PATHS.COURSE_ASSIGN,
      name: ROUTER_PATHS.COURSE_ASSIGN,
      component: CourseAssign
    },
    {
      path: ROUTER_PATHS.COURSE,
      name: ROUTER_PATHS.COURSE,
      component: CourseInfo
    }
  ]
})

export default router
