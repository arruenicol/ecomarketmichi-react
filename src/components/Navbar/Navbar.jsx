import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import "./Navbar.css";
import { useTheme } from "../../context/themeContext";
import { categoriaService } from "../../service/CategoriaService";

export default function Navbar() {
  const { darkMode, toggleTheme, colors } = useTheme();
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoriaService.getAll();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSelect = (e) => {
    const categoriaId = e.target.value;
    if (categoriaId) {
      navigate(`/tienda/${categoriaId}`);
      console.log(typeof categoriaId)
    }
  };

  return (
    <div className="navbar"
      style={{
        backgroundColor: colors.background,
        boxShadow: darkMode
          ? "0 2px 4px rgba(0, 0, 0, 0.3)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
        <div className="nav-logo">
          <img src={logo} alt="logo" />
        </div>

      <ul className="nav-menu">
        <Link to="/tienda" style={{ color: colors.text, textDecoration: "none" }}>
          <li style={{ color: colors.text }}>Inicio</li>
        </Link>

        <Link to="/proceso" style={{ color: colors.text, textDecoration: "none" }}>
          <li style={{ color: colors.text }}>Ayuda</li>
        </Link>

        {/* Dropdown */}
        <select className="nav-select" onChange={handleSelect} style={{ backgroundColor: colors.background, color: colors.text }}>
          <option value="">Categorías</option>
          {categorias.map((cat) => (
            <option key={cat.idCategoriaDTO} value={cat.idCategoriaDTO}>
              {cat.nombreDTO.charAt(0).toUpperCase() + cat.nombreDTO.slice(1)}            </option>
          ))}
        </select>


      </ul>

      <div className="nav-login-cart">
        <button style={{ borderColor: colors.primary }}>Log In</button>
        <button
          onClick={toggleTheme}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.text,
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
