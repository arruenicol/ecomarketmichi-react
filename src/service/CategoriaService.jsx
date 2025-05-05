import api from "../api/api";

export const categoriaService = {
  getAll: async () => {
    try {
      const response = await api.get("/categorias/lista");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las categorias", error);
      throw error;
    }
  },
};