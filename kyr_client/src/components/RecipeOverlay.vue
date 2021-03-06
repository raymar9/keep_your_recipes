<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('hide-overlay')"></div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('hide-overlay')"></button>

    <div class="modal-card" v-if="!showEditMode">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ currentRecipe.title }}</p>
        <p> {{ currentRecipe._id}} </p>
        <a class="icon" @click="toggleEditMode(true)"><i class="oi oi-pencil"></i></a>
        <a class="icon" @click="toggleDeletionConfirmation(true)"><i class="oi oi-trash"></i></a>
        <a class="icon" @click="deleteRecipe" v-if="showDeletionConfirmation"><i class="oi oi-check"></i></a>
        <a class="icon" @click="toggleDeletionConfirmation(false)" v-if="showDeletionConfirmation"><i class="oi oi-x"></i></a>
      </header>
      <section class="modal-card-body">
        <div class="tags are-medium">
          <span class="tag is-rounded" v-for="tag in currentRecipe.tags" :key="tag.id">{{ tag }}</span>
        </div>
        <ul class="ingredients">
          <li v-for="ingredient in currentRecipe.ingredients" :key="ingredient.id">{{ ingredient }}</li>
        </ul>
        <p class="preparation">{{ currentRecipe.preparation }}</p>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>

    <div class="modal-card" v-else>
      <header class="modal-card-head">
        <input class="modal-card-title" v-model="currentRecipe.title" placeholder="currentRecipe.title">
        <a class="icon" @click="toggleEditMode(false)"><i class="oi oi-x"></i></a>
      </header>
      <section class="modal-card-body">
        <div class="tags are-medium">
          <span class="tag is-rounded" v-for="(tag, index) in currentRecipe.tags" :key="tag.id">{{ tag }}
            <span class="icon is-small" @click="removeTag(index)"><i class="oi oi-x"></i></span>
          </span>
          <span class="tag is-rounded"><input v-model="newTag" placeholder="Add new tag...">
          <span class="icon is-small" @click="addTag"><i class="oi oi-plus"></i></span></span>
        </div>
        <ul class="ingredients">
          <li class="ingredient" v-for="(ingredient, index) in currentRecipe.ingredients" :key="ingredient.id">
            <span class="icon is-small" @click="removeIngredient(index)"><i class="oi oi-x"></i></span>
            {{ ingredient }}
          </li>
          <li class="ingredient"><input v-model="newIngredient" placeholder="Add new ingredient...">
          <span class="icon is-small" @click="addIngredient"><i class="oi oi-plus"></i></span></li>
        </ul>
        <textarea class="preparation" v-model="currentRecipe.preparation"></textarea>
      </section>
      <footer class="modal-card-foot"><button class="button" @click="saveChanges">Save</button></footer>
    </div>

  </div>
</template>

<script>
import { checkIngredient, checkTag } from "../recipe_model/recipe_utils"
import { EventBus } from "../recipe_event_bus"

export default {
  name: "RecipeOverlay",
  props: ["recipe"],
  data: function() {
    return {
      showDeletionConfirmation: false,
      showEditMode: false,
      currentRecipe: JSON.parse(JSON.stringify(this.recipe)),
      newTag: undefined,
      newIngredient: undefined
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
      if (checkTag(this.newTag)) {
        this.currentRecipe.tags.push(this.newTag.trim());
        this.newTag = undefined;
      }
    },
    removeTag: function(tagId) {
      console.log(tagId);
      this.currentRecipe.tags.splice(tagId, 1);
    },
    addIngredient: function() {
      if (checkIngredient(this.newIngredient)) {
        this.currentRecipe.ingredients.push(this.newIngredient.trim());
        this.newIngredient = undefined;
      }
    },
    removeIngredient: function(ingredientId) {
      this.currentRecipe.ingredients.splice(ingredientId, 1);
    },
    saveChanges: function() {
      this.toggleEditMode(false);
      EventBus.$emit('save-recipe', this.currentRecipe);
    },
    deleteRecipe: function() {
      EventBus.$emit('delete-recipe', this.recipe._id);
    }
  }
}
</script>

<style scoped>
header a.icon {
  margin-left: 1rem;
}
span.tag span.icon {
  padding-left: 1.5rem;
  padding-right: 1rem;
}
ul.ingredients {
  margin-top: 1rem;
}
li.ingredient span.icon {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
textarea.preparation, p.preparation{
  margin-top: 1rem;
  width: 100%;
  height: 6rem;
}
</style>