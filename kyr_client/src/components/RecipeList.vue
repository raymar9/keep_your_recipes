<template>
  <div class="tile is-anchestor">
    <div class="tile is-parent is-vertical">
      <RecipeListItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @show-overlay="showOverlay"></RecipeListItem>
    </div>
    <RecipeOverlay :recipe="recipeOverlay" v-if="recipeOverlay" @hide-overlay="hideOverlay"/>
  </div>
</template>

<script>
import RecipeListItem from './RecipeListItem'
import RecipeOverlay from './RecipeOverlay'
import { EventBus } from '../recipe_event_bus'

export default {
  name: "RecipeList",
  props: ["recipes"],
  data: function () {
    return {
      recipeOverlay: undefined
    }
  },
  components: {
    RecipeListItem,
    RecipeOverlay
  },
  methods: {
    showOverlay: function(recipe) {
      this.recipeOverlay = recipe;
    },
    hideOverlay: function() {
      this.recipeOverlay = undefined;
    },
    deleteRecipe: function() {
      this.hideOverlay();
    }
  },
  created: function() {
    EventBus.$on('delete-recipe', this.deleteRecipe);
  }
}
</script>

<style>

</style>