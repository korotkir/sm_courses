<script setup>
import { computed, defineProps, watch, ref } from 'vue'

const props = defineProps({
  assignedCourses: Array,
  selectedStatus: String,
  selectedDuration: String,
  searchQuery: String,
  courseCounter: Number
})

const emit = defineEmits(['update:selectedStatus', 'update:selectedDuration', 'update:searchQuery'])

const statusOptions = computed(() => {
  if (Array.isArray(props.assignedCourses)) {
    const statuses = props.assignedCourses.map((elem) => elem.status)
    console.log(['Все', ...new Set(statuses)])
    return ['Все', ...new Set(statuses)]
  }
  return []
})

const durationOptions = [
  'Все',
  'Неделя или меньше',
  'До месяца',
  'Больше месяца'
]

</script>

<template>
  <v-card class="filters" outlined>
    <div class="filters__block">
      <div class="filter__selects">
        <v-select
          class="filter__status"
          label="Статус"
          density="compact"
          :modelValue="selectedStatus"
          @update:modelValue="(value) => emit('update:selectedStatus', value)"
          :items="statusOptions"
        ></v-select>
        <v-select
          class="filter__duration"
          label="Длительность"
          density="compact"
          :modelValue="selectedDuration"
          @update:modelValue="(value) => emit('update:selectedDuration', value)"
          :items="durationOptions"
        ></v-select>
      </div>
      <div class="filter__search">
        <v-text-field
          dense
          label="Поиск"
          :modelValue="searchQuery"
          @update:modelValue="(value) => emit('update:searchQuery', value)"
        ></v-text-field>
      </div>
    </div>
    <div class="filter__count">
      <span><b>Всего: {{ courseCounter }}</b></span>
    </div>
  </v-card>

</template>

<style lang="sass" scoped>
.filters
  padding: 30px
  display: flex
  flex-direction: column

.filters__block
  width: 100%
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-between
  align-items: center

.filter__selects
  display: flex
  flex-direction: row
  align-items: center

.filter__status,
.filter__duration
  margin-top: 15px
  padding-right: 20px
  width: 200px

.filter__search > div
  width: 300px

.filter__count
  display: flex
  justify-content: end

</style>
