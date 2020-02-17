<template>
  <div>
    <RecipeSearch />
    <RecipeList :recipes="recipes"/>
  </div>
</template>

<script>
import RecipeSearch from './RecipeSearch'
import RecipeList from './RecipeList'
import { EventBus } from '../recipe_event_bus'
import * as restApi from '../recipe_model/recipe_rest';

export default {
  name: 'RecipeManager',
  data: function() {
    return {
      recipes: []
    };
  },
  methods: {
    deleteRecipe: function(id) {
      let index = this.recipes.findIndex(rec => rec.id == id);
      if (index != -1) {
        this.recipes.splice(index, 1);
      }
    },
    saveRecipe: function(recipe) {
      let index = this.recipes.findIndex(rec => rec.id == recipe.id);
      if (index != -1) {
        this.recipes[index] = recipe;
      }
    }
  },
  components: {
    RecipeSearch,
    RecipeList
  },
  created: function() {
    EventBus.$on('delete-recipe', id => this.deleteRecipe(id));
    EventBus.$on('save-recipe', recipe => this.saveRecipe(recipe));
  },
  mounted: function() {
    restApi.getAllRecipes()
      .then((recipes) => {
        console.debug(recipes);
        this.recipes = recipes;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
