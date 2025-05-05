import React from "react";
import { useTheme } from "../../context/themeContext";
import nico from "../../assets/photos/nico.jpg";
import moises from "../../assets/photos/moises.jpg";
import fran from "../../assets/photos/fran.jpg";
import wood from "../../assets/photos/wood.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Francisca Flores",
    role: "Diseñadora UI/UX",
    photo: fran},
  {
    id: 2,
    name: "Moisés Palacios",
    role: "Desarrollador Frontend",
    photo: moises,
  },
  {
    id: 3,
    name: "Nicole Arrué",
    role: "Desarrolladora Backend, Product Owner",
    photo: nico},
  {
    id: 3,
    name: "Woodleine Formetus",
    role: "Scrum Master",
    photo: wood},
];

export default function Nosotros() {
  const { colors } = useTheme();

  return (
    <section
      style={{
        backgroundColor: colors.cardBackground,
        color: colors.text,
        padding: "2rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          color: colors.primary,
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Nuestro Equipo
      </h2>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            width: "100%",
            maxWidth: "800px",
          }}
        >

        {teamMembers.map((member) => (
          <div
            key={member.id}
            style={{
              backgroundColor: colors.background,
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.3s ease",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${colors.primary}`,
                width: "120px",
                height: "120px",
                margin: "0 auto 1rem",
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </div>
            <h3 style={{ margin: "0.5rem 0", fontSize: "1.2rem", color: "#01A49E" }}>
              {member.name}
            </h3>
            <p style={{ color: colors.textSecondary }}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

