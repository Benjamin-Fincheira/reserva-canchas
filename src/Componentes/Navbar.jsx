import React from "react";

export function Navbar({ totalReservas, onAbrirCarrito }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "rgba(15, 23, 42, 0.92)",
      backdropFilter: "blur(10px)",
      color: "white",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>⚽</span>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800", letterSpacing: "-0.025em" }}>
          SportsReserve
        </h2>
      </div>

      <button
        onClick={onAbrirCarrito}
        style={{
          backgroundColor: "#1e293b",
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          border: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.9rem",
          fontWeight: "600",
          color: "white",
          cursor: "pointer"
        }}
      >
        <span>🛒 Reservas:</span>
        <span style={{
          backgroundColor: "#15803d",
          color: "white",
          borderRadius: "9999px",
          padding: "0.1rem 0.6rem",
          fontSize: "0.85rem",
          fontWeight: "700"
        }}>
          {totalReservas}
        </span>
      </button>
    </nav>
  );
}