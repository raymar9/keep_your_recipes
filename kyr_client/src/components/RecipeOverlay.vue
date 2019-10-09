<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="$emit('hideOverlay')"></div>
    <button class="modal-close is-large" aria-label="close" v-on:click="$emit('hideOverlay')"></button>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ recipe.title }}</p>
        <a class="icon" v-on:click="$emit('editRecipe')"><i class="oi oi-pencil"></i></a>
        <a class="icon" v-on:click="$emit('deleteRecipe')"><i class="oi oi-trash"></i></a>
      </header>
      <section class="modal-card-body">
        <div class="tags are-medium">
          <span class="tag is-rounded" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
        </div>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">{{ ingredient }}</li>
        </ul>
        <p>{{ recipe.preparation }}</p>
      </section>
      <footer class="modal-card-foot">
      </footer>
  </div>
</div>
</template>

<script>
export default {
  name: "RecipeOverlay",
  props: ["recipe"]
}
</script>

<style>
a.icon {
  margin-left: 1em;
}
</style>