<template>
  <div class="page">
    <h1>Kontakt - VueUse Demo</h1>
    
    <!-- VueUse: useNow -->
    <p>Aktualny cas: {{ formatTime(now) }}</p>
    
    <!-- VueUse: useOnline -->
    <p>Internet status: <strong :style="{ color: isOnline ? 'green' : 'red' }">
      {{ isOnline ? 'Online' : 'Offline' }}
    </strong></p>
    
    <form @submit.prevent="submitForm" v-if="!submitted">
      <label>Meno:</label><br>
      <input v-model="name" placeholder="Tvoje meno" required><br><br>
      
      <label>Email:</label><br>
      <input v-model="email" type="email" placeholder="tvoj@email.sk" required><br><br>
      
      <label>Sprava:</label><br>
      <textarea v-model="message" placeholder="Napíš správu..." required rows="5"></textarea><br><br>
      
      <button type="submit">Odoslat</button>
    </form>
    
    <div v-else>
      <p style="color: green; font-size: 20px;">✓ Sprava odoslana!</p>
      <p>Presmerujeme ta domov za {{ countdown }} sekund...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNow, useOnline, useIntervalFn } from '@vueuse/core'

const router = useRouter()

// VueUse: aktualny cas (aktualizuje sa kazdu sekundu)
const now = useNow()

// VueUse: online/offline status
const isOnline = useOnline()

// formatovanie casu
const formatTime = (date) => {
  return date.toLocaleTimeString('sk-SK')
}

// formular data
const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)
const countdown = ref(3)

const submitForm = () => {
  console.log('Formular odoslany:', { 
    name: name.value, 
    email: email.value, 
    message: message.value 
  })
  
  submitted.value = true
  
  // VueUse: interval namiesto setInterval
  const { pause } = useIntervalFn(() => {
    countdown.value--
    if (countdown.value === 0) {
      pause()
      router.push({ path: '/', query: { from: 'contact' } })
    }
  }, 1000)
}
</script>

<style scoped>
.page {
  border: 1px solid gray;
  padding: 20px;
  max-width: 500px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  padding: 12px 30px;
  cursor: pointer;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  background: darkgreen;
}
</style>
