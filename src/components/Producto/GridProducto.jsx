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
    const categorias = {ropa: "ropa", hogar: "hogar", comida: "comida"};

    // VERIFICACIÓN Y SETEO DE CATEGORÍA 
    useEffect(() => {
        const fetchProducts = async() => {
            try {
                //Verificamos que traiga una categoría al momento de buscar con axios
                if(!categorias[categoria]) 
                    throw new Error('Categoría inválida')
                    const data = await productoService.getByCategory(categorias[categoria]);
                    setProductos(data);
            } catch (error) {
                setError(error);
                console.log(error);
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