<script setup>
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import Courses from '@/components/Courses.vue'

const rootStore = useRootStore()
rootStore.getAssignedCourses()

const { assignedCourses } = storeToRefs(rootStore)

</script>
<template>
  <v-container>
    <div class="title">
      <h1>Назначенные курсы</h1>
    </div>
    <Courses :courseData="assignedCourses"/>
  </v-container>
</template>

<style lang="sass" scoped>
.title h1
  padding: 15px 0
</style>
