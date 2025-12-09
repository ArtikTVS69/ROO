<template>
  <div class="about">
    <h1>O mne</h1>
    <p>Toto je stránka About.</p>
    <p>Tu môžeš napísať informácie o sebe alebo o projekte.</p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  text-align: center;
  padding: 40px;
}

h1 {
  color: #35495e;
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  color: #666;
  margin: 10px 0;
}
</style>
