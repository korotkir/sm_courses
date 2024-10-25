<script setup>
import CourseFilters from '@/components/CourseFilters.vue'
import CourseCard from '@/components/CourseCard.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  courseData: Array,
  assign: Boolean
})

const selectedStatus = ref('Все')
const selectedDuration = ref('Все')
const searchQuery = ref('')

const includeStatus = computed(() => {
  return props.courseData.filter(el => el.hasOwnProperty('status')).length
})

const filteredByStatus = computed(() => {
  return props.courseData.filter(course => {
    let statusMatch;

    if (includeStatus === 0) {
      statusMatch = 0
    } else {
      statusMatch = selectedStatus.value === 'Все' || course.status === selectedStatus.value
    }

    let durationMatch = true
    if (selectedDuration.value === 'Неделя или меньше') {
      durationMatch = course.duration <= 7
    } else if (selectedDuration.value === 'От недели до месяца') {
      durationMatch = course.duration >= 8 && course.duration <= 30
    } else if (selectedDuration.value === 'Больше месяца') {
      durationMatch = course.duration > 30
    }

    const searchMatch = course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return statusMatch && durationMatch && searchMatch
  })
})

const courseCounter = computed(() => {
  return filteredByStatus.value.length
})
</script>

<template>
  <CourseFilters
    :status="!!includeStatus"
    :assignedCourses="props.courseData"
    :courseCounter="courseCounter"
    v-model:selectedStatus="selectedStatus"
    v-model:selectedDuration="selectedDuration"
    v-model:searchQuery="searchQuery"
  />
  <div class="course-wrapper">
    <div v-if="courseCounter === 0"  class="empty">
      <h2>Не найдено элементов по вашим условиям!</h2>
    </div>
    <CourseCard
      v-else
      v-for="course in filteredByStatus"
      :key="course.id"
      :course="course"
      :assign="assign"
    />
  </div>
</template>

<style scoped lang="sass">
.empty
  display: flex
  justify-content: center
  padding-top: 150px
</style>
