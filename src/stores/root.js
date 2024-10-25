import { defineStore } from 'pinia'
import axios from 'axios'
import { ASSIGN_COURSE, GET_ALL_COURSES, GET_ASSIGNED_COURSES } from '@/constants/index.js'

export const useRootStore = defineStore('root',{
  state: () => ({
    assignedCourses: [],
    allCourses: [],
    assignCourseStatus: '',
    courseInfo: {}
  }),
  actions: {
    async getAssignedCourses() {
      try {
        const response = await axios.get(GET_ASSIGNED_COURSES)
        const backendCourses = response?.data?.assignedCourses || []
        const localAssigned = JSON.parse(localStorage.getItem('assigned')) || []

        const backendCoursesWithAssign = backendCourses.map(course => ({
          ...course,
          assign: true // Все курсы с бэка считаются назначенными
        }))

        const localCoursesWithAssign = localAssigned.map(course => ({
          ...course,
          assign: true
        }))

        this.assignedCourses = [...backendCoursesWithAssign, ...localCoursesWithAssign]
      } catch (error) {
        console.error('Ошибка при получении назначенных курсов:', error)
      }
    },
    async getAllCourses() {
      const data = await axios.get(GET_ALL_COURSES)
      this.allCourses = data?.data?.courses
    },
    async assignCourse(id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const response = await axios.post(ASSIGN_COURSE, {id}, config)
      this.assignCourseStatus = response.status
    },
    async getCourseInfo(id) {
      // Тут мог быть запрос к API
      await this.getAssignedCourses()
      const assign = this.assignedCourses.find(elem => +elem.id === +id)

      if (!assign) {
        await this.getAllCourses()
        const data = this.allCourses.find(elem => +elem.id === +id)

        if (data) {
          data.assign = false
        }

        this.courseInfo = data
        return
      }

      assign.assign = true
      this.courseInfo = assign
    }
  }
})
