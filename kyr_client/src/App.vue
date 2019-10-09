<template>
  <div id="app">
    <nav class="navbar container"></nav>
    <header class="container title is-1">Keep Your Recipes</header>
    <main class="container">
      <RecipeManager />
    </main>
    <footer class="footer container">Footer</footer>
  </div>
</template>

<script>
import RecipeManager from './components/RecipeManager.vue'

export default {
  name: 'app',
  components: {
    RecipeManager
  }
}
</script>

<style lang="scss">
</style>
