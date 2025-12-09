<template>
  <div class="page">
    <h1>Detail pouzivatela</h1>
    <p><strong>ID:</strong> {{ userId }}</p>
    <p><strong>Cesta:</strong> {{ $route.path }}</p>
    <p><strong>Vsetky params:</strong> {{ JSON.stringify($route.params) }}</p>
    
    <h2>Info</h2>
    <p v-if="user">Pouzivatel: {{ user.name }}</p>
    <p v-else>Pouzivatel nenajdeny</p>
    
    <button @click="$router.push('/users')">Spat na zoznam</button>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  data() {
    return {
      users: [
        { id: 1, name: 'Jano Novak' },
        { id: 2, name: 'Maria Horvath' },
        { id: 3, name: 'Peter Kovac' },
        { id: 4, name: 'Anna Tothova' }
      ]
    }
  },
  computed: {
    // id z url
    userId() {
      return this.$route.params.id
    },
    // najdi usera
    user() {
      return this.users.find(u => u.id == this.userId)
    }
  },
  mounted() {
    console.log('UserDetail mounted, ID:', this.userId)
  }
}
</script>

<style scoped>
.page {
  border: 1px solid gray;
  padding: 20px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
