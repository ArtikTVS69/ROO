<template>
  <div class="page">
    <h1>O aplikacii - VueUse Demo</h1>
    <p>Toto je jednoducha demo aplikacia s Vue Router.</p>
    <p>Query parametre: {{ $route.query }}</p>
    
    <!-- VueUse: useLocalStorage -->
    <h3>LocalStorage:</h3>
    <input v-model="meno" placeholder="Tvoje meno">
    <p>Ulozene meno: {{ meno }}</p>
    
    <!-- VueUse: useToggle -->
    <h3>Toggle:</h3>
    <p>Stav: {{ zapnute ? 'Zapnute' : 'Vypnute' }}</p>
    <button @click="toggle()">Prepni</button>
    
    <br><br>
    <button @click="addQuery">Pridaj query</button>
    <button @click="goBack">Spat</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useLocalStorage, useToggle } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

// ulozi meno do pc
const meno = useLocalStorage('user-meno', '')

// prepinac zapnute/vypnute
const [zapnute, toggle] = useToggle()

const addQuery = () => {
  router.push({ path: '/about', query: { test: 'hodnota', cislo: 123 } })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page {
  border: 1px solid gray;
  padding: 20px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
}
</style>
