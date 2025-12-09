<template>
  <div class="page">
    <h1>📝 TODO List</h1>
    
    <!-- VueUse: useNow pre timestamp -->
    <p style="color: gray; font-size: 12px;">{{ formatDate(now) }}</p>
    
    <!-- formular na pridanie -->
    <div class="add-form">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Napíš úlohu a stlač Enter..."
        ref="inputRef"
      >
      <button @click="addTodo">Pridať</button>
    </div>
    
    <!-- statistiky -->
    <div class="stats">
      <span>Celkom: {{ todos.length }}</span>
      <span>Hotové: {{ completedCount }}</span>
      <span>Ostáva: {{ remainingCount }}</span>
    </div>
    
    <!-- filter -->
    <div class="filter">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Všetky</button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Aktívne</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Hotové</button>
    </div>
    
    <!-- zoznam -->
    <div class="todo-list">
      <div v-if="filteredTodos.length === 0" class="empty">
        {{ filter === 'all' ? 'Žiadne úlohy' : 'Žiadne ' + (filter === 'active' ? 'aktívne' : 'hotové') + ' úlohy' }}
      </div>
      
      <div 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.done }"
      >
        <input 
          type="checkbox" 
          v-model="todo.done"
          @change="saveTodos"
        >
        
        <span class="todo-text">{{ todo.text }}</span>
        
        <span class="todo-time">{{ formatTime(todo.created) }}</span>
        
        <button @click="deleteTodo(todo.id)" class="delete-btn">🗑️</button>
      </div>
    </div>
    
    <!-- tlacidla -->
    <div class="actions" v-if="todos.length > 0">
      <button @click="clearCompleted" v-if="completedCount > 0">
        Vymazať hotové ({{ completedCount }})
      </button>
      <button @click="clearAll" class="danger">
        Vymazať všetko
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage, useNow, useFocus } from '@vueuse/core'

// VueUse: localStorage (automaticky uklada)
const todos = useLocalStorage('todos', [])

// VueUse: aktualny cas
const now = useNow()

// VueUse: focus na input
const inputRef = ref(null)
useFocus(inputRef, { initialValue: true })

// formular
const newTodo = ref('')
const filter = ref('all')

// pridanie todo
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      done: false,
      created: new Date().toISOString()
    })
    newTodo.value = ''
  }
}

// vymazanie
const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

// vymazanie hotovych
const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.done)
}

// vymazanie vsetkych
const clearAll = () => {
  if (confirm('Naozaj vymazať všetky úlohy?')) {
    todos.value = []
  }
}

// ulozenie (kvoli checkboxom)
const saveTodos = () => {
  // nic, useLocalStorage uklada automaticky
}

// computed hodnoty
const completedCount = computed(() => 
  todos.value.filter(t => t.done).length
)

const remainingCount = computed(() => 
  todos.value.filter(t => !t.done).length
)

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.done)
  if (filter.value === 'completed') return todos.value.filter(t => t.done)
  return todos.value
})

// formatovanie
const formatDate = (date) => {
  return date.toLocaleDateString('sk-SK', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (iso) => {
  const date = new Date(iso)
  return date.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
}

.add-form {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.add-form input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.add-form button {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-form button:hover {
  background: #45a049;
}

.stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 15px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

.stats span {
  font-weight: bold;
}

.filter {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 15px 0;
}

.filter button {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.filter button.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.todo-list {
  margin: 20px 0;
  min-height: 200px;
}

.empty {
  text-align: center;
  color: gray;
  padding: 40px;
  font-style: italic;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 8px;
  background: white;
  transition: all 0.3s;
}

.todo-item:hover {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.todo-item.completed {
  opacity: 0.6;
  background: #f0f0f0;
}

.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: gray;
}

.todo-time {
  font-size: 12px;
  color: gray;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.actions button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background: #f5f5f5;
}

.actions button.danger {
  color: red;
  border-color: red;
}

.actions button.danger:hover {
  background: #fee;
}
</style>
