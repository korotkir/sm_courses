<script setup>
const props = defineProps({
  name: String,
  click: Function,
})
</script>

<template>
  <v-btn
    class="to-btn text-none text-subtitle-1"
    color="#1976D2"
    size="large"
    variant="flat"
    @click="props.click"
  >
    {{ props.name }}
  </v-btn>
</template>

<style scoped lang="sass">
.to-btn
  height: 100px
</style>
