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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "500px",
        overflow: "hidden",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}>
        <img 
          src={cancha.imagen} 
          alt={cancha.nombre} 
          style={{ width: "100%", height: "200px", objectFit: "cover" }} 
        />
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>{cancha.nombre}</h2>
          <p style={{ margin: "0.5rem 0", color: "#334155" }}><strong>Deporte:</strong> {cancha.deporte}</p>
          <p style={{ margin: "0.5rem 0", color: "#334155" }}><strong>Superficie:</strong> {cancha.superficie}</p>
          <p style={{ margin: "0.5rem 0", color: "#334155" }}><strong>Capacidad:</strong> {cancha.capacidad}</p>
          <p style={{ margin: "0.5rem 0 1.5rem 0", color: "#16a34a", fontSize: "1.2rem", fontWeight: "bold" }}>
            Precio: ${cancha.precioHora.toLocaleString()} / hora
          </p>

          <button 
            onClick={onClose}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}