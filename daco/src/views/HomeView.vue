<template>
  <div class="page">
    <h1>Domov - VueUse Demo</h1>
    <p>Vitaj na hlavnej stranke!</p>
    <p>Aktualna cesta: {{ $route.path }}</p>
    
    <!-- VueUse: useMouse -->
    <h3>Pozicia mysi:</h3>
    <p>X: {{ x }}, Y: {{ y }}</p>
    
    <!-- VueUse: useCounter -->
    <h3>Pocitadlo:</h3>
    <p>Cislo: {{ count }}</p>
    <button @click="inc()">+</button>
    <button @click="dec()">-</button>
    <button @click="reset()">Reset</button>
    
    <br><br>
    <button @click="goToAbout">Chod na About</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useMouse, useCounter } from '@vueuse/core'

// Vue Router
const router = useRouter()
const route = useRoute()

// VueUse: sleduje poziciu mysi
const { x, y } = useMouse()

// VueUse: pocitadlo s funkciami
const { count, inc, dec, reset } = useCounter()

// programove navigovanie
const goToAbout = () => {
  router.push('/about')
}

console.log('Home mounted!')
console.log('Route:', route)
</script>

<style scoped>
.page {
  border: 1px solid gray;
  padding: 20px;
  min-height: 200px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
