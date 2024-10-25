<script setup>
import Button from '@/components/Button.vue'
import Courses from '@/components/Courses.vue'
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ROUTER_PATHS } from '@/constants/index.js'

const rootStore = useRootStore()

rootStore.getAllCourses()
rootStore.getAssignedCourses()

const { allCourses, assignedCourses } = storeToRefs(rootStore)

const availableCourses = computed(() => {
  return allCourses.value.filter(course =>
    !assignedCourses.value.some(assignedCourse => assignedCourse.id === course.id)
  )
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

function goToHome() {
  router.push(ROUTER_PATHS.HOME)

  if (routeName.value === ROUTER_PATHS.HOME) {
    router.go()
  }
}
</script>

<template>
  <v-container>
    <div class="top-block">
      <div class="title">
        <h1>Список всех курсов</h1>
      </div>
      <Button
        :click="goToHome"
        name="Мои курсы"
      />
    </div>

    <Courses :courseData="availableCourses" :assign="true"/>
  </v-container>
</template>

