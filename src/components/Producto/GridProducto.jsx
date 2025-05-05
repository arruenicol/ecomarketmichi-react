//Simulación de cómo recibiremos los productos del backend
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/themeContext";//Hook personalizado, que utiliza el contexto de modo oscuro
import ProductCard from "./ProductoCard";
import { productoService } from "../../service/ProductoService";


export default function GridProducto({ categoria }) {


    const { colors } = useTheme();   //Usamos los colores del tema oscuro
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // CATEGORIAS DISPONIBLES
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            let data;
            if (categoria) {
              data = await productoService.getByCategory(categoria);
            } else {
              data = await productoService.getAll();
            }
            setProductos(data);
          } catch (error) {
            setError(error);
            console.error(error);
          } finally {
            setCargando(false);
          }
        };
      
        fetchProducts();
      }, [categoria]);
      


    // MENSAJE DE CARGA AL CAMBIAR CATEGORÍA
    if(cargando) 
        return (<div style={{textAlign:'center', padding:'2rem' }}>Cargando...</div>)


    // RENDERIZADO
    return (
        <>
        <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "2rem" 
        }}>
            {productos.map((producto) => (
                <ProductCard key={producto.idProductoDTO} producto={producto} colors={colors} />
            ))}
      </div>
        </>
    )
}