<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/post">Post</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}

nav {
  background-color: #333;
  padding: 20px;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #555;
}

nav a.router-link-active {
  background-color: #42b983;
}
</style>