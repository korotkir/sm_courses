<script setup>
import { computed } from 'vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  }
})

const getStatusColor = computed(() => {
  if (props.course.status === 'Назначен') {return 'text-gray'}
  if (props.course.status === 'В процессе') {return 'text-blue'}
  if (props.course.status === 'Не пройден') {return 'text-red'}
  if (props.course.status === 'Пройден') {return 'text-green'}
})

</script>

<template>
  <v-card class="course-card" outlined>
    <v-card-title class="course-card__title">{{ course.name }}</v-card-title>
    <v-card-subtitle
      :class="['course-card__status', getStatusColor]">
      {{ course.status }}
    </v-card-subtitle>
    <v-card-text class="course-card__text">
      <p>Длительность: <strong>{{ course.duration }} дней</strong></p>
      <p>Текущий балл: <strong>{{ course.score }}</strong></p>
      <p>Процент прохождения: <strong>{{ course.percent }}</strong></p>
    </v-card-text>
    <v-card-actions class="course-card__actions">
      <v-btn @click="$emit('view-course', course.id)" color="primary">
        Перейти
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<style lang="sass" scoped>
.course-card
  margin: 15px 0
  transition: box-shadow 0.3s ease
  &:hover
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2)

.course-card__title
  font-size: 20px
  font-weight: 600
  color: #1976D2

.course-card__status
  font-size: 16px

.course-card__text
  font-size: 14px
  color: #333

.course-card__actions
  justify-content: flex-end
</style>
