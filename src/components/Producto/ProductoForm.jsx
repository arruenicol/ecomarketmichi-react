import React, { useEffect, useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Typography,
    InputLabel,
    FormControl,
    Select,
    Stack,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { productoService } from "../../service/ProductoService";
import { empresaService } from "../../service/EmpresaService";
import { categoriaService } from "../../service/CategoriaService";
import { useTheme } from "../../context/themeContext";

export default function ProductoForm() {
    const [producto, setProducto] = useState({
        nombreProductoDTO: "",
        precioDTO: "",
        descripcionDTO: "",
        categoriaDTO: "",
        cantidadDTO: "",
        empresaDTO: "",
    });
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [empresas, setEmpresas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const { colors } = useTheme();

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const data = await empresaService.getAll();
                setEmpresas(data);
            } catch {
                setError("No se pudieron cargar las empresas.");
            }
        };
        fetchEmpresas();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await categoriaService.getAll();
                setCategorias(data);
            } catch {
                setError("No se pudieron cargar las categorías.");
            }
        };
        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((previo) => ({ ...previo, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const newErrors = {};

        if (!producto.nombreProductoDTO || producto.nombreProductoDTO == " ") newErrors.nombreProductoDTO = "Campo obligatorio";
        if (!producto.precioDTO) {
            newErrors.precioDTO = "Campo obligatorio";
        } else if (parseFloat(producto.precioDTO) <= 0) {
            newErrors.precioDTO = "Ingrese un precio válido";
        }
        if (!producto.descripcionDTO || producto.descripcionDTO == " ") newErrors.descripcionDTO = "Campo obligatorio"
        if (!producto.cantidadDTO) {newErrors.cantidadDTO = "Campo obligatorio";
        } else if (parseFloat(producto.cantidadDTO) <= 0) {
            newErrors.cantidadDTO = "Ingrese una cantidad válida";
        }
        if (!producto.categoriaDTO) newErrors.categoriaDTO = "Seleccione una categoría";
        if (!producto.empresaDTO) newErrors.empresaDTO = "Seleccione una empresa";
        if (!imagen) newErrors.imagen = "Debe subir una imagen";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const datosProducto = {
                ...producto,
                precio: parseFloat(producto.precioDTO),
                cantidad: parseInt(producto.cantidadDTO),
            };
            await productoService.createProduct(datosProducto, imagen);
            navigate("/tienda");
        } catch (error) {
            setError("Error al ingresar los datos del producto: " + error.message);
            console.log(error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    maxWidth: 600,
                    minWidth: 300,
                    mx: "auto",
                    p: 4,
                    my: 5,
                    backgroundColor: colors?.backgroundColor || "#fff",
                    borderRadius: 4,
                    boxShadow: 2,
                    fontFamily: "Roboto, sans-serif",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        color: colors?.primary || "#01A49E",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Agregar Producto
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Nombre del producto"
                            name="nombreProductoDTO"
                            value={producto.nombreProductoDTO}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                            InputProps={{ shrink: true }}
                            error={!!errors.nombreProductoDTO}
                            helperText={errors.nombreProductoDTO}
                        />

                        <TextField
                            label="Descripción"
                            name="descripcionDTO"
                            value={producto.descripcionDTO}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                            InputProps={{ shrink: true }}
                            error={!!errors.descripcionDTO}
                            helperText={errors.descripcionDTO}
                        />

                        <TextField
                            label="Precio"
                            type="number"
                            name="precioDTO"
                            value={producto.precioDTO}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                            InputProps={{ shrink: true }}
                            error={!!errors.precioDTO}
                            helperText={errors.precioDTO}
                            
                        />

                        <TextField
                            label="Cantidad disponible"
                            type="number"
                            name="cantidadDTO"
                            value={producto.cantidadDTO}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                            InputProps={{ shrink: true }}
                            error={!!errors.cantidadDTO}
                            helperText={errors.cantidadDTO}
                        />

                        <FormControl fullWidth variant="standard" error={!!errors.categoriaDTO}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoriaDTO"
                                value={producto.categoriaDTO}
                                onChange={handleChange}
                                sx={{mb:1}}
                                
                            >
                                {categorias.map((categoria) => (
                                    <MenuItem
                                        key={categoria.idCategoriaDTO}
                                        value={categoria.idCategoriaDTO}
                                    >
                                        {categoria.nombreDTO.charAt(0).toUpperCase() +
                                            categoria.nombreDTO.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoriaDTO && (
                                <Typography variant="caption" color="error">{errors.categoriaDTO}</Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth variant="standard" error={!!errors.empresaDTO}>
                            <InputLabel>Empresa</InputLabel>
                            <Select
                                name="empresaDTO"
                                value={producto.empresaDTO}
                                onChange={handleChange}
                                sx={{mb:1}}
                            >
                                {empresas.map((empresa) => (
                                    <MenuItem
                                        key={empresa.idEmpresa}
                                        value={empresa.idEmpresa}
                                    >
                                        {empresa.nombreDTO}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.empresaDTO && (
                                <Typography variant="caption" color="error">{errors.empresaDTO}</Typography>
                            )}
                        </FormControl>


                        
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    borderColor: colors?.primary || "#01A49E",
                                    color: colors?.primary || "#01A49E",
                                    '&:hover': {
                                        backgroundColor: "#e0f7f6",
                                        borderColor: colors?.primary || "#01A49E",
                                    },
                                    borderRadius: "20px",
                                    textTransform: "none",
                                }}
                            >
                                Subir Imagen
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                            {imagen && (
                                <Typography variant="body2" mt={1} color="text.secondary">
                                    Imagen seleccionada: {imagen.name}
                                </Typography>
                            )}
                            {errors.imagen && (
                                <Typography variant="caption" color="error">
                                    {errors.imagen}
                                </Typography>
                            )}
                        

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: colors?.primary || "#01A49E",
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "#018b8a",
                                },
                                borderRadius: "20px",
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </>
    );
}
