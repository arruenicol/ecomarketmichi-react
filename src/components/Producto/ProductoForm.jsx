import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { productoService } from "../../service/ProductoService";
import { useTheme } from "../../context/themeContext";

export default function ProductoForm(){

    // HOOKS 
    const [producto, setProducto] = useState({
        nombreProductoDTO: "",
        precioDTO: "",
        categoriaDTO: "",
        cantidadDTO: "",
    });

    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {colors} = useTheme();
   
    // Creación de funciones que manejan cambios y submit del formulario a través de evento submit y onChange
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProducto((previo) => ({...previo, [name]:value}))
    }

    // Creación de métodos para manejar el campo del formulario que recibe la imagen y este la toma del evento 
    const handleImageChange = (e) => {
        setImagen(e.target.files[0])
    }

    // HANDLESUBMIT
    const handleSubmit = async(e) => { 
        e.preventDefault(); // Con este método prevenimos que se recargue la página (comportamiento por defecto de los formularios)
        setError("");
    

        // Validamos antes de retomar elementos del formulario
        if(!producto || !producto.precioDTO || !producto.categoriaDTO || !producto.cantidadDTO || !imagen) {
            setError("Todos los campos deben completarse, incluyendo la imagen")
            return; 
        }

        // PARSER PARA PREPARAR DATOS A ENVIAR AL SERVIDOR
        try { 
            const datosProducto = {
                ...producto,
                precio: parseInt(producto.precioDTO),
                cantidad: parseFloat(producto.cantidadDTO),
            }
            // Ahora ya enviamos los datos al backend con productoService()
            await productoService.createProduct(datosProducto, imagen)

            navigate("/tienda")  // navigate sirve para redireccionar sin cargar toda la págiana. Si se crea un nuevo producto luego lleva hasta la página inicial en este caso.
        
        } catch(error) {
        setError("Error al ingresar los datos del producto", error.message);
        console.log(error);
        }
    };
     

    return (
        <>
            <div>
                <div>
                    <div>

                        <form onSubmit = {handleSubmit}>
                            {/* Nombre del producto para enviar al backend */}
                            <label> Nombre: </label>
                            <input  type="text"
                                    name="nombreProductoDTO"
                                    value={producto.nombreProductoDTO}
                                    onChange={handleChange}
                                    required
                            />
                            {/* Precio del producto para enviar al backend */}
                            <label> Precio: </label>
                            <input  type="number"
                                    name="precio"
                                    value={producto.precioDTO}
                                    onChange={handleChange}
                                    required
                            />
                            {/* Cantidad del producto para enviar al backend */}
                            <label> Cantidad:</label>
                            <input  type="number"
                                    name="cantidadDTO"
                                    value={producto.cantidadDTO}
                                    onChange={handleChange}
                                    required
                            />
                            {/* Categoría del producto para enviar al backend */}
                            <label> Categoría:</label>
                            <select name="cantidad"
                                    value={producto.categoriaDTO}
                                    onChange={handleChange}
                                    required
                            >
                                <option value={1}> Ropa </option>
                                <option value={2}> Hogar </option>
                                <option value={3}> Comida </option>
                            </select>
                           
                            {/* Imágen del producto para enviar al backend */}
                            <label> Imágen: </label>
                            <input  type="file"
                                    accept="image/"
                                    onChange={handleImageChange}
                                    required
                            />
                            <button type='submit'>
                                Enviar
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )

}