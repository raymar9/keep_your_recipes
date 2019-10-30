<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('hide-overlay')"></div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('hide-overlay')"></button>

    <div class="modal-card" v-if="!showEditMode">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ recipe.title }}</p>
        <a class="icon" @click="toggleEditMode(true)"><i class="oi oi-pencil"></i></a>
        <a class="icon" @click="toggleDeletionConfirmation(true)"><i class="oi oi-trash"></i></a>
        <a class="icon" @click="$emit('delete-recipe', recipe.id)" v-if="showDeletionConfirmation"><i class="oi oi-check"></i></a>
        <a class="icon" @click="toggleDeletionConfirmation(false)" v-if="showDeletionConfirmation"><i class="oi oi-x"></i></a>
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
      <footer class="modal-card-foot"></footer>
    </div>

    <div class="modal-card" v-else>
      <header class="modal-card-head">
        <input class="modal-card-title" v-model="modifiedRecipe.title" placeholder="modifiedRecipe.title">
        <a class="icon" @click="toggleEditMode(false)"><i class="oi oi-x"></i></a>
      </header>
      <section class="modal-card-body">
        <div class="tags are-medium">
          <span class="tag is-rounded" v-for="tag in modifiedRecipe.tags" :key="tag.id">{{ tag }}
            <span class="icon is-small"><i class="oi oi-x"></i></span>
          </span>
          <span class="tag is-rounded"><input v-model="newTag" placeholder="Add new tag..."><span class="icon is-small" @click="addTag"><i class="oi oi-plus"></i></span></span>
        </div>
        <ul>
          <li v-for="ingredient in modifiedRecipe.ingredients" :key="ingredient.id">{{ ingredient }}</li>
        </ul>
        <p>{{ modifiedRecipe.preparation }}</p>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>

  </div>
</template>

<script>
export default {
  name: "RecipeOverlay",
  props: ["recipe"],
  data: function() {
    return {
      showDeletionConfirmation: false,
      showEditMode: false,
      modifiedRecipe: Object.assign({}, this.recipe),
      newTag: undefined
    }
  },
  methods: {
    toggleDeletionConfirmation: function(state) {
      this.showDeletionConfirmation = state;
    },
    toggleEditMode: function(state) {
      this.showEditMode = state;
    },
    addTag: function() {
      this.modifiedRecipe.tags.push(this.newTag);
    }
  }
}
</script>

<style>
header a.icon {
  margin-left: 1rem;
}
span.tag span.icon {
  padding-left: 1.5rem;
  padding-right: 1rem;
}
</style>