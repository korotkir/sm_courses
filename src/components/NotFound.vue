<script setup>
import Button from '@/components/Button.vue'
import { ROUTER_PATHS } from '@/constants/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome() {
  router.push(ROUTER_PATHS.HOME)

  if (routeName.value === ROUTER_PATHS.HOME) {
    router.go()
  }
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <Button
      :click="goToHome"
      name="На главную"
    />
  </div>

</template>

<style scoped lang="sass">
.not-found
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 100px

.not-found p
  margin-bottom: 30px
</style>
