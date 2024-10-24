import { defineStore } from 'pinia'
import axios from "axios"
import { GET_ASSIGNED_COURSES } from '@/constants/index.js'

export const useRootStore = defineStore('root',{
  state: () => ({
    assignedCourses: []
  }),
  actions: {
    async getAssignedCourses() {
      const data = await axios.get(GET_ASSIGNED_COURSES)
      this.assignedCourses = data?.data?.assignedCourses
    },

  }
})
