
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    import { ButtonCounter } from './counter.js';
  
createApp({
    components: {
        ButtonCounter,
    },

    data() {
        return {};
    },

    methods: {
        showAlert() {
            alert("Count is divisible by five!");
        }
    }
}).mount('#app')