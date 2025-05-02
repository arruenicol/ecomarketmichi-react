import React from "react";
import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../context/themeContext";


export default function Hombre() {
    const { colors } = useTheme();

    return (
        <>  
        <section
            style={{
                backgroundColor: colors.background,
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column"
            }}>

            {/* RENDERIZADO HTML*/}
            <div
                style={{
                    padding: "2rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >   
                <h1
                    style={{
                        color: colors.primary,
                        textAlign: "center",
                        marginBottom: "2rem"
                    }}
                >Aquí esta la prenda que tanto estabas buscando!</h1>
                <GridProducto categoria="ropa"/>
            </div>

        </section>
            
        </>
    )
}