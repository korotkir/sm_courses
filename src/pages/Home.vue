<script setup>
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import Courses from '@/components/Courses.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import Button from '@/components/Button.vue'
import { ROUTER_PATHS } from '@/constants/index.js'

const rootStore = useRootStore()
rootStore.getAssignedCourses()

const { assignedCourses } = storeToRefs(rootStore)

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

function goToCourses() {
  router.push(ROUTER_PATHS.COURSE_ASSIGN)

  if (routeName.value === ROUTER_PATHS.COURSE_ASSIGN) {
    router.go()
  }
}

</script>
<template>
  <v-container>
    <div class="top-block">
      <div class="title">
        <h1>Назначенные курсы</h1>
      </div>
      <Button
        :click="goToCourses"
        name="Все курсы"
      />
    </div>

    <Courses :courseData="assignedCourses" textButton="Посмотреть"/>
  </v-container>
</template>

<style lang="sass" scoped>

</style>
