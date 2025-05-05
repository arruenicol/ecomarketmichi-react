import api from "../api/api";

export const empresaService = {
  getAll: async () => {
    try {
      const response = await api.get("/empresas/lista");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las empresas", error);
      throw error;
    }
  },
};
