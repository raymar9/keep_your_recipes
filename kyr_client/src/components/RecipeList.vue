<template>
  <div class="tile is-anchestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child box" v-bind:key="recipe.id" v-for="recipe in recipes">
        <p class="title">
          {{ recipe.title }}
        </p>
        <div class="tags are-medium">
          <span class="tag is-rounded" v-for="tag in recipe.tags" :key="tag.id">{{ tag }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  props: ["recipes"],
  methods: {
    getColorClass(number) {
      switch (number) {
        case 3:
          return "red";
        case 2:
          return "yellow";
        default:
          return "green";
      }
    }
  }
}
</script>

<style>

</style>