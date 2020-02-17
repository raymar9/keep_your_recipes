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
      let index = this.recipes.findIndex(rec => rec._id == id);
      if (index != -1) {
        this.recipes.splice(index, 1);
        restApi.deleteRecipe(id);
      }
    },
    saveRecipe: function(recipe) {
      let index = this.recipes.findIndex(rec => rec._id == recipe._id);
      console.debug(index);
      if (index != -1) {
        this.recipes[index] = recipe;
        restApi.updateRecipe(recipe);
      } else {
        this.recipes.push(recipe);
        restApi.addNewRecipe(recipe);
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
