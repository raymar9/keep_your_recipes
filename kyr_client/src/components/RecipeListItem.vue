<template>
<div class="tile is-child box">
  <p class="title">
    {{ recipe.title }}
  </p>
  <div class="tags are-medium">
    <span class="tag is-rounded" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipeListItem',
  props: ['recipe']
}
</script>

<style>

</style>