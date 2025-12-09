<template>
  <div class="page">
    <h1>Pouzivatelia</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <!-- link na detail -->
        <router-link :to="'/users/' + user.id">
          {{ user.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UsersView',
  data() {
    return {
      users: [
        { id: 1, name: 'Jano Novak' },
        { id: 2, name: 'Maria Horvath' },
        { id: 3, name: 'Peter Kovac' },
        { id: 4, name: 'Anna Tothova' }
      ]
    }
  }
}
</script>

<style scoped>
.page {
  border: 1px solid gray;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f0f0f0;
  margin: 10px 0;
  padding: 15px;
}

li a {
  color: blue;
  text-decoration: underline;
  font-size: 18px;
}
</style>
