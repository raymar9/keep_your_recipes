import axios from 'axios';

const axiosInstance = axios.create({
  // default config
  baseURL: 'http://localhost:8081'
});

export async function getAllRecipes() {
  try {
    let response = await axiosInstance.get('/recipes');
    return response.data;
  } catch (err) {
    console.debug(err);
    return [];
  }
}

export async function addNewRecipe(newRecipe) {
  try {
    await axiosInstance.post('/recipes', newRecipe);
  } catch (err) {
    console.debug(err);
  }
}

export async function getRecipe(id) {
  try {
    let response = await axiosInstance.get('/recipes/' + id);
    return response.data;
  } catch (err) {
    console.debug(err);
  }
}

export async function updateRecipe(modifiedRecipe) {
  try {
    await axiosInstance.put('/recipes/' + modifiedRecipe._id, modifiedRecipe);
  } catch (err) {
    console.debug(err);
  }
}

export async function deleteRecipe(id) {
  try {
    await axiosInstance.delete('/recipes/' + id);
  } catch (err) {
    console.debug(err);
  }
}