import React from "react";

export function TarjetaCancha({ cancha, onVerDetalle, onReservar }) {
  return (
    <div style={{
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      <div style={{ position: "relative", height: "190px" }}>
        <img 
          src={cancha.imagen} 
          alt={cancha.nombre} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
        <span style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(4px)",
          color: "#ffffff",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "700"
        }}>
          {cancha.deporte}
        </span>
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0f172a", fontSize: "1.1rem", fontWeight: "800" }}>
          {cancha.nombre}
        </h3>
        
        <p style={{ margin: "0 0 1.25rem 0", color: "#15803d", fontSize: "1.15rem", fontWeight: "800" }}>
          ${cancha.precioHora.toLocaleString()} <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "400" }}>/ hora</span>
        </p>
        
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}> 
          <button 
            onClick={() => onVerDetalle(cancha)}
            className="btn-detalles-animado"
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#334155",
              fontWeight: "600",
              fontSize: "0.875rem",
              cursor: "pointer"
            }}
          >
            Ver Detalles
          </button>
          <button 
            onClick={() => onReservar(cancha)}
            className="btn-reservar-animado"
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#15803d",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.875rem",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(21, 128, 61, 0.3)"
  }}
>
  Reservar
</button>

        </div>
      </div>
    </div>
  );
}