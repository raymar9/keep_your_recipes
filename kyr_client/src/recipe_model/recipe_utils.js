function checkIngredient(ingredient) {
  if (!ingredient || typeof ingredient !== "string") {
    return false;
  }
  if (ingredient.trim().length == 0) {
    return false;
  }
  return true;
}

function checkTag(tag) {
  if (!tag || typeof tag !== "string") {
    return false;
  }
  if (tag.trim().length == 0) {
    return false;
  }
  if (/\s/.test(tag.trim())) {
    return false;
  }
  return true;
}

export {checkIngredient, checkTag};