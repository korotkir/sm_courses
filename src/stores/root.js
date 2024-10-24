import { defineStore } from 'pinia'
import axios from 'axios'
import { ASSIGN_COURSE, GET_ALL_COURSES, GET_ASSIGNED_COURSES } from '@/constants/index.js'

export const useRootStore = defineStore('root',{
  state: () => ({
    assignedCourses: [],
    allCourses: [],
    assignCourseStatus: ''
  }),
  actions: {
    async getAssignedCourses() {
      const data = await axios.get(GET_ASSIGNED_COURSES)
      this.assignedCourses = data?.data?.assignedCourses
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
    }
  }
})
