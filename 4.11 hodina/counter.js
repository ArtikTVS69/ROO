  import { defineComponent } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  
  export const ButtonCounter = defineComponent({
    props: {
        initialCount: {
            type: Number,
            default: 0
        }
    },

    data() {
      return {
        count: this.initialCount
      }
    },
    methods: {
        onButtonClick() {
            this.count++;
            if (this.count % 5 === 0) {
                this.$emit("count-divisible-by-five", this.count);
            }
        }
    },

    template: `<button @click="onButtonClick">Clicked {{ count }} times</button>`,
    })