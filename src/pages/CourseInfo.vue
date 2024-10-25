<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, computed } from 'vue'
import { ROUTER_PATHS } from '@/constants/index.js'
import NotFound from '@/components/NotFound.vue'

// Получаем состояние и параметры маршрута
const rootStore = useRootStore()
const { assignCourseStatus } = storeToRefs(rootStore)
const route = useRoute()
const router = useRouter()  // Для работы с навигацией
const courseId = route.params.rid

// Получаем реактивные данные курса
const { courseInfo } = storeToRefs(rootStore)

// Функция для расчета даты завершения
const calculateDueDate = (duration) => {
  const currentDate = new Date()
  const dueDate = new Date(currentDate.getTime())
  dueDate.setDate(dueDate.getDate() + duration)
  return dueDate.toLocaleDateString()
}

const isAssigned = computed(() => courseInfo.value.assign)


// Загружаем данные о курсе при монтировании компонента
onMounted(async() => {
  await rootStore.getCourseInfo(courseId)

})

// Функция для возврата на предыдущую страницу
const goBack = () => {
  router.back()  // Возвращаемся на предыдущую страницу
}

async function assignCourse() {
  // Отправляем запрос на назначение курса
  await rootStore.assignCourse(courseId)

  // Проверяем статус ответа
  if (assignCourseStatus.value === 200) {

    const assignDate = new Date();
    const formattedAssignDate = `${String(assignDate.getDate()).padStart(2, '0')}.${String(assignDate.getMonth() + 1).padStart(2, '0')}.${assignDate.getFullYear()}`;

    // Рассчитываем дату завершения курса
    const dueDate = new Date(assignDate);
    dueDate.setDate(dueDate.getDate() + +courseInfo.value.duration);
    const formattedDueDate = `${String(dueDate.getDate()).padStart(2, '0')}.${String(dueDate.getMonth() + 1).padStart(2, '0')}.${dueDate.getFullYear()}`;

    // Обновляем courseInfo локально для немедленного отображения
    courseInfo.value = {
      ...courseInfo.value,
      assign: true,
      assignDate: formattedAssignDate,
      dueDate: formattedDueDate,
      status: 'Назначен',
      percent: 0,
      score: 0
    }

    // Сохраняем обновленный курс в localStorage
    const assignedCourses = JSON.parse(localStorage.getItem('assigned')) || []
    if (!assignedCourses.some(course => course.id === courseInfo.value.id)) {
      assignedCourses.push(courseInfo.value);
      localStorage.setItem('assigned', JSON.stringify(assignedCourses));
    }

  } else {
    alert("Произошла ошибка. Попробуйте позже.")
  }
}

const showAlert = () => {
  alert("Запуск курса")
}


</script>

<template>
  <v-container v-if="courseInfo" class="mt-10">
    <v-card class="course" outlined>

      <!-- Верхняя строка с кнопкой и заголовком -->
      <v-row align="center">
        <v-col cols="2" class="text-left">
          <!-- Кнопка "Вернуться назад" -->
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="8" class="text-center">
          <!-- Заголовок курса -->
          <v-card-title class="text-h4 font-weight-bold">{{ courseInfo.name }}</v-card-title>
        </v-col>

        <!-- Пустая колонка для выравнивания -->
        <v-col cols="2">
          <label v-if="courseInfo.assign">Курс назначен</label>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-text class="course__info">
        <v-row>
          <v-col cols="12" md="6">
            <strong>Дата назначения:</strong> {{ courseInfo.assignDate || "-" }}
          </v-col>

          <v-col cols="12" md="6">
            <strong>Дата необходимого завершения:</strong> {{ courseInfo.dueDate || "-" }}
          </v-col>

          <v-col cols="12" md="6">
            <strong>Максимальный балл:</strong> {{ courseInfo.maxScore || 'Не указано' }}
          </v-col>

          <v-col cols="12" md="6">
            <strong>Текущий балл:</strong> {{ typeof +courseInfo.score !== "number" ? "-" : courseInfo.score }}
          </v-col>

          <v-col cols="12" md="6">
            <strong>Процент прохождения курса:</strong> {{ courseInfo.percent || "-" }}%
          </v-col>

          <v-col cols="12" md="6">
            <strong>Длительность обучения:</strong> {{ courseInfo.duration || 'Не указано' }} дней
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Кнопка "Назначить/Запустить" -->
      <v-card-actions class="justify-center">
        <v-btn v-if="courseInfo.assign" color="primary" @click="showAlert">Запустить</v-btn>
        <v-btn v-else color="primary" @click="assignCourse">Назначить</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <NotFound v-else />
</template>

<style lang="sass" scoped>
.course
  padding: 20px
  background-color: #fafafa
  border-radius: 8px

.course__info
  margin-top: 20px

.v-card-title
  padding-bottom: 16px

v-row
  padding: 10px 0
</style>
