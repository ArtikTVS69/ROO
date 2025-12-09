import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
        const count = ref(0)

        function increment() {
            count.value++
        }

        function decrement() {
            count.value--
        }

        const username = ref('')
        const password = ref('')

        function login() {
            if (username.value === 'admin' && password.value === 'password') {
                alert('Login successful')
            } else {
                alert('Login failed')
            }
        }

        return { count, increment, decrement, username, password, login } 

        template: `
        <div>
            <button @click="decrement">-</button>
            <span>{{ count }}</span>
            <button @click="increment">+</button>
            <input v-model="username" placeholder="Username" />
            <input v-model="password" type="password" placeholder="Password" />
            <button @click="login">Login</button>
        </div>
        `
        
    }
  }).mount('#app')