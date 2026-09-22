import React from "react";

export function Navbar({ totalReservas, onAbrirCarrito }) {// un numero y una funcion
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",//elementos en los extremos
      alignItems: "center",
      padding: "1rem 2rem", //relleno interno
      backgroundColor: "#0f172a",//azul oscuro, barra de navegacion
      color: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.6)"//sombra muy sutil en el inferior de la barra
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>⚽</span>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700", letterSpacing: "-0.025em" }}>
          SportsReserve ⚽
        </h2>
      </div>

      <button
        onClick={onAbrirCarrito}
        style={{
          backgroundColor: "#1e293b",//azul un poco mas claro
          padding: "0.5rem 1rem",
          borderRadius: "9999px",//esquinas redondeadas
          border: "1px solid #334155", //borde fino gris
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.9rem",
          fontWeight: "600",//semi negrita
          color: "white",
          cursor: "pointer",//cambia cursor a mano
        }}
      >
        <span>🛒 Reservas:</span>
        <span style={{
          backgroundColor: "#2563eb",//fondo azul brillante
          color: "white",
          borderRadius: "9999px",
          padding: "0.1rem 0.6rem",
          fontSize: "0.85rem"
        }}>
          {totalReservas}
        </span>
      </button>
    </nav>
  );
}