import api from "../api/api";

export const productoService = {

    getAll: async () => {
        try {    const response = await api.get("/productos/lista")
            return response.data;
        } catch (error) {
            console.log("Hubo un error al obtener los productos", error)
            throw error;
        }
    },


    getByCategory: async(categoria) => {
        try {
            const response = await api.get("/productos/lista");
            console.log("Datos recibidos ", response.data);

            return response.data.filter(
                (producto) =>
                    producto.categoriaDTO && String( producto.categoriaDTO.idCategoriaDTO) === categoria
            );
            
        } catch (error) {
            console.log("Hubo un error al obtener los productos por categoría ", error);
            throw error;
        }
    },


    createProduct: async(datosProducto, imagen) => { 
        try {
            const formData = new FormData();
            const productoDTO = {
                nombreProductoDTO: datosProducto.nombreProductoDTO,
                precioDTO: datosProducto.precioDTO,
                descripcionDTO: datosProducto.descripcionDTO,
                categoriaDTO: {idCategoriaDTO: datosProducto.categoriaDTO},
                cantidadDTO: datosProducto.cantidadDTO,
                empresaDTO: {idEmpresa: datosProducto.empresaDTO},
                imagen: datosProducto.imagen
            };
            
    

            const productoBlob = new Blob([JSON.stringify(productoDTO)],
                {type: "application/json"}
            )

            formData.append("imagen", imagen)
            formData.append("producto", productoBlob)

            const response = await api.post("productos/nuevo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data

        } catch(error) {
            console.log("Error al crear nuevo producto", error)
            throw(error)
        }
    },


    getById: async(id) =>  { 
        try {  const response = await api.get("/productos/producto/${id}")
            return response.data;
            } catch (error) {
                console.log("Error al intentar encontrar el producto por ID", error)
                throw error;
            }
    },


    deleteById: async(id) =>  { 
        try {  const response = await api.delete("/productos/borrar/${id}")
            return response.data;
            } catch (error) {
                console.log("Error al intentar eliminar el producto por ID", error)
                throw error;
            }
    }

 
}