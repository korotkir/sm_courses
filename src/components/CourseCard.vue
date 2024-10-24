<script setup>
import { computed, ref } from 'vue'
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ROUTER_PATHS } from '@/constants/index.js'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  textButton: {
    type: String,
    default: 'Открыть'
  }
})

const getStatusColor = computed(() => {
  if (props.course.status === 'Назначен') {return 'text-gray'}
  if (props.course.status === 'В процессе') {return 'text-blue'}
  if (props.course.status === 'Не пройден') {return 'text-red'}
  if (props.course.status === 'Пройден') {return 'text-green'}
})

const rootStore = useRootStore()

const { assignCourseStatus } = storeToRefs(rootStore)

const isButtonDisabled = ref(false)

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

async function assignCourse() {
  // Запрос, если 200 редирект иначе алерт что произошла ошибка
  await rootStore.assignCourse(props.course.id)

  if (assignCourseStatus.value === 200) {
    console.log('Курс с Id: ' + props.course.id + '. Статус ' + assignCourseStatus.value)
    isButtonDisabled.value = true

    router.push({
      name: ROUTER_PATHS.COURSE,
      params: { rid: props.course.id }
    })

  } else {
    alert("Произошла ошибка. Попробуйте позже.")
  }
}

</script>

<template>
  <v-card class="course-card" outlined>
    <v-card-title class="course-card__title">{{ course.name }}</v-card-title>
    <v-card-subtitle
      :class="['course-card__status', getStatusColor]">
      {{ course.status }}
    </v-card-subtitle>
    <v-card-text class="course-card__text">
      <p v-if="course.duration">Длительность: <strong>{{ course.duration }} дней</strong></p>
      <p v-if="course.score">Текущий балл: <strong>{{ course.score }}</strong></p>
      <p v-if="course.percent">Процент прохождения: <strong>{{ course.percent }}</strong></p>
    </v-card-text>
    <v-card-actions class="course-card__actions">
      <v-btn
        @click="assignCourse"
        :disabled="isButtonDisabled"
        color="primary"
      >
        {{ props.textButton }}
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
