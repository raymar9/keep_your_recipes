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

export default {
  name: 'RecipeManager',
  data: function() {
    return {
      recipes: [
        { id: 0,
          title: "Recipe0",
          tags: ["tag0", "tag1", "tag2"],
          complexity: 1,
          ingredients: ["2x ingredient0", "ingredient1", "ingredient3"],
          preparation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at elit id leo lacinia aliquam. Pellentesque sit amet sem gravida."},
        { id: 1,
          title: "Recipe1",
          tags: ["tag1", "tag2"],
          complexity: 2,
          ingredients: [],
          preparation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis turpis a risus tempor volutpat. Maecenas at lectus et arcu sodales venenatis. Etiam in nibh eu purus faucibus luctus luctus nec enim. Curabitur eget congue augue, at dapibus lorem. In mattis urna felis, ut feugiat ante sodales quis. Praesent nec."},
        { id: 2,
          title: "Recipe2",
          tags: [],
          complexity: 1,
          ingredients: ["2x ingredient0", "ingredient1", "ingredient2","ingredient3"],
          preparation: "Lorem ipsum dolor sit amet."},
        { id: 3,
          title: "Recipe3",
          tags: ["tag0", "tag1", "tag2", "tag3", "tag4"],
          complexity: 3,
          ingredients: ["2x ingredient0"],
          preparation: ""}
      ]
    }
  },
  methods: {
    deleteRecipe: function(id) {
      let index = this.recipes.findIndex(rec => rec.id == id);
      if (index != -1) {
        this.recipes.splice(index, 1);
      }
    },
    saveRecipe: function(recipe) {
      if (recipe.id) {
        // modified recipe
        let index = this.recipes.findIndex(rec => rec.id == recipe.id);
        if (index != -1) {
          this.recipes[index] = recipe;
        }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
