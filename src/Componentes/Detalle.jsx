import React from "react";

export function DetalleModal({ cancha, onClose }) {
  if (!cancha) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "480px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}>
        <div style={{ position: "relative", height: "220px" }}>
          <img 
            src={cancha.imagen} 
            alt={cancha.nombre} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <span style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.8rem",
            fontWeight: "600"
          }}>
            {cancha.deporte}
          </span>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ margin: "0 0 1rem 0", color: "#0f172a", fontSize: "1.35rem" }}>{cancha.nombre}</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem", color: "#334155", fontSize: "0.95rem" }}>
            <p style={{ margin: 0 }}><strong> Superficie: </strong> {cancha.superficie}</p>
            <p style={{ margin: 0 }}><strong> Capacidad: </strong> {cancha.capacidad}</p>
            <p style={{ margin: 0 }}><strong> Valor: </strong> <span style={{ color: "#16a34a", fontWeight: "700" }}>${cancha.precioHora.toLocaleString()} / hora</span></p>
          </div>

          <button 
            onClick={onClose}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "white",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
}