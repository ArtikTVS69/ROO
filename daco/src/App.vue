<template>
  <div id="app">
    <!-- jednoducha navigacia -->
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/todo">TODO List</RouterLink>
    </nav>

    <!-- tu sa zobrazi aktualna stranka -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* minimalisticky styl */
body {
  margin: 0;
  font-family: Arial;
}

#app {
  padding: 20px;
}

nav {
  background: lightgray;
  padding: 15px;
  margin-bottom: 20px;
}

nav a {
  margin-right: 20px;
  padding: 8px 15px;
  text-decoration: none;
  color: black;
}

nav a.router-link-active {
  background: blue;
  color: white;
  border-radius: 4px;
}
</style>
