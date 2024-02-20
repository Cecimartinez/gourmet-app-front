import { baseURL, setBasicHeaders } from ".";

export default {
  getRecipes: async () => { // Modificado para no requerir ningún parámetro
    try {
      console.log("entrando a getRecipes")
      const data = await fetch(
        `${baseURL}recipes/` // Endpoint para obtener todas las recetas
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  addCampoRecipe: async (payload: {
    name: string;
    otrosDatos: string;
    recipeId: string;
  }) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/createCampoRecipe`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: setBasicHeaders(),
        }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCampoRecipe: async (payload: {
    recipeId: string;
    campoRecipeId: string;
    name?: string;
    otrosDatos?: string;
  }) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/updateCampoRecipeByRecipeId`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: setBasicHeaders(),
        }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteCampoRecipe: async (payload: {
    recipeId: string;
    campoRecipeId: string;
  }) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/deleteCampoRecipeByRecipeId`,
        {
          method: "DELETE",
          body: JSON.stringify(payload),
          headers: setBasicHeaders(),
        }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export const Medicines = {
  getMedicinesByIdPersona: async (idPersona) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/getMedicamentoByIdPersona/${idPersona}`
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteMedicine: async (idMedicine) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/deleteMedicamento/${idMedicine}`,
        { method: "DELETE" }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addMedicine: async (
    payload: {
      name: string;
      startDate: string;
      hours: string;
      otherDetails?: string;
      photo?: string;
    },
    userId: string
  ) => {
    try {
      const body = { ...payload, personaId: userId };
      const data = await fetch(`${baseURL}recipe/createMedicamento`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: setBasicHeaders(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateMedicineById: async (updateMedicineDto) => {
    try {
      const data = await fetch(
        `${baseURL}recipe/updateMedicamentoById/${updateMedicineDto._id}`,
        {
          method: "POST",
          body: JSON.stringify(updateMedicineDto),
          headers: setBasicHeaders(),
        }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
