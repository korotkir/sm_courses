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
    <div class="top-block">
      <div class="title">
        <h1>Назначенные курсы</h1>
      </div>
      <v-btn
        class="to-btn text-none text-subtitle-1"
        color="#1976D2"
        size="large"
        variant="flat"
      >
        Назначить курсы
      </v-btn>
    </div>

    <Courses :courseData="assignedCourses"/>
  </v-container>
</template>

<style lang="sass" scoped>
.top-block
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding-bottom: 30px

.to-btn
  height: 100px

.title h1
  padding: 15px 0
</style>
