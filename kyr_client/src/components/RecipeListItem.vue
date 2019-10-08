<template>
<div class="tile is-child box">
  <p class="title" v-on:click="showOverlay(recipe)"><a>{{ recipe.title }}</a></p>
  <div class="tags are-medium">
    <span class="tag is-rounded" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
  </div>
  <RecipeOverlay v-bind:recipe="recipe" v-if="overlayEnabled" v-on:hideOverlay="hideOverlay"/>
</div>
</template>

<script>
import RecipeOverlay from './RecipeOverlay'

export default {
  name: 'RecipeListItem',
  props: ['recipe'],
  data: function () {
    return {overlayEnabled: false};
  },
  methods: {
    showOverlay: function() {
      this.overlayEnabled = true;
    },
    hideOverlay: function() {
      this.overlayEnabled = false;
    }
  },
  components: {
    RecipeOverlay
  }
}
</script>

<style>

</style>