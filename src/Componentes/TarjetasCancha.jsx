import React from "react";

export function TarjetaCancha({ cancha, onVerDetalle, onReservar }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column"
    }}>
      <img 
        src={cancha.imagen} 
        alt={cancha.nombre} 
        style={{ width: "100%", height: "180px", objectFit: "cover" }} 
      />
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ margin: "0", color: "#1e293b" }}>{cancha.nombre}</h3>
        <p style={{ margin: "0.2rem 0 0.8rem 0", color: "#64748b", fontSize: "0.9rem" }}>
          Deporte: {cancha.deporte}
        </p>
        
        <p style={{ margin: "0.2rem 0", color: "#334155" }}>
          ${cancha.precioHora.toLocaleString()} / hora
        </p>
        
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", paddingTop: "1rem" }}>
          <button 
            onClick={() => onVerDetalle(cancha)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer" }}
          >
            Ver Detalle
          </button>
          <button 
            onClick={() => onReservar(cancha)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "none", background: "#2563eb", color: "white", fontWeight: "bold", cursor: "pointer" }}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}