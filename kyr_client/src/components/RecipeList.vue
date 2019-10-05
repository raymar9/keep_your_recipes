<template>
  <div class="tile is-anchestor">
    <div class="tile is-parent is-vertical">
      <RecipeListItem v-for="recipe in recipes" v-bind:recipe="recipe" v-bind:key="recipe.id">
      </RecipeListItem>
    </div>
  </div>
</template>

<script>
import RecipeListItem from './RecipeListItem'

export default {
  name: "RecipeList",
  props: ["recipes"],
  components: {
    RecipeListItem
  }
}
</script>

<style>

</style>