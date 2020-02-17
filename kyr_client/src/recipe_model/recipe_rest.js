import axios from 'axios';

const axiosInstance = axios.create({
  // default config
  baseURL: 'http://localhost:8081'
});

async function getAllRecipes() {
  try {
    let response = await axiosInstance.get('/recipes');
    console.debug('Received all recipes');
    console.debug(response.data);
    return response.data;
  } catch (err) {
    console.debug(err);
    return [];
  }
}

async function getOneRecipe(id) {
  axiosInstance.get('/recipes/' + id)
    .then((response) => {
      console.debug('received one recipe with id' + id);
      console.debug(response.data);
      return response.data;
    })
    .catch((error) => {
      console.debug(error);
    })
}

export {getAllRecipes, getOneRecipe};