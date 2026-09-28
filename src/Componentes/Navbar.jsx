import React, { useState, useEffect } from "react";

export function Navbar({ totalReservas, onAbrirCarrito }) {
  const [animarBadge, setAnimarBadge] = useState(false);
  useEffect(() => { /*se ejecuta cada vez que 'totalReservas' cambia de valor*/
    if (totalReservas === 0) return; // No animar en la carga inicial
    setAnimarBadge(true);
    const timer = setTimeout(() => {
      setAnimarBadge(false);//vuelve a su tamaño normal
    }, 300); // Duracion en ms
  }, [totalReservas]);

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
        <span className="balon-animado" style={{ fontSize: "1.5rem", display: "inline-block", cursor: "pointer" }}>⚽</span>
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
        <span className="carrito-animado" style={{ display: "inline-block" }}>🛒</span>
        <span>Reservas:</span>
        <span 
          className={animarBadge ? "badge-resalta" : ""}// ? = Si es verdadero,   : = Si no lo es
          style={{
            display: "inline-block",
            backgroundColor: "#15803d",
            color: "white",
            borderRadius: "9999px",
            padding: "0.1rem 0.6rem",
            fontSize: "0.85rem",
            fontWeight: "700",
            transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
        >
          {totalReservas}
        </span>
      </button>
    </nav>
  );
}