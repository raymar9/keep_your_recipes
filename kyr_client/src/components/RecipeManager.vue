<template>
  <div>
    <RecipeSearch />
    <RecipeList v-bind:recipes="recipes" />
  </div>
</template>

<script>
import RecipeSearch from './RecipeSearch'
import RecipeList from './RecipeList'
export default {
  name: 'RecipeManager',
  data() {
    return {
      recipes: [
        { id: 0,
          title: "Recipe0",
          tags: ["tag0", "tag1", "tag2"],
          complexity: 1},
        { id: 1,
          title: "Recipe1",
          tags: ["tag1", "tag2"],
          complexity: 2},
        { id: 2,
          title: "Recipe2",
          tags: [],
          complexity: 1},
        { id: 3,
          title: "Recipe3",
          tags: ["tag0", "tag1", "tag2", "tag3", "tag4"],
          complexity: 3}
      ]
    }
  },
  components: {
    RecipeSearch,
    RecipeList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
