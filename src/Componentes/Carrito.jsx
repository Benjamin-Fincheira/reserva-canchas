import React from "react";

export function Carrito({ verCarrito, setVerCarrito, reservas, eliminarReserva, finalizarReserva }) {
  if (!verCarrito) return null;

  const totalReservas = reservas.reduce((acc, c) => acc + c.precioHora, 0);

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
        maxWidth: "500px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: "hidden"
      }}>
        {/* Encabezado */}
        <div style={{
          padding: "1.25rem",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "700" }}>
            🛒 Tus Reservas ({reservas.length})
          </h3>
          <button 
            type="button"
            onClick={() => setVerCarrito(false)}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "1.25rem",
              cursor: "pointer",
              padding: "0.2rem 0.5rem"
            }}
          >
            ✕
          </button>
        </div>

        {/* Lista de reservas */}
        <div style={{ padding: "1.25rem", overflowY: "auto", flexGrow: 1 }}>
          {reservas.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b", margin: "2rem 0" }}>
              No tienes reservas guardadas en este momento.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {reservas.map((cancha, index) => (
                <div 
                  key={`${cancha.id}-${cancha.fechaClave}-${cancha.hora}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem",
                    borderRadius: "10px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <img 
                      src={cancha.imagen} 
                      alt={cancha.nombre} 
                      style={{ width: "55px", height: "55px", borderRadius: "8px", objectFit: "cover" }} 
                    />
                    <div>
                      <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", color: "#0f172a" }}>
                        {cancha.nombre}
                      </h4>
                      <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.8rem", color: "#2563eb", fontWeight: "600" }}>
                        📅 {cancha.fechaTexto} - ⏰ {cancha.hora} hrs
                      </p>
                      <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "700" }}>
                        ${cancha.precioHora.toLocaleString()} / hora
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarReserva(index)}//index: posicion numerica desde 0
                    style={{
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      padding: "0.4rem 0.75rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con Pago */}
        {reservas.length > 0 && (
          <div style={{
            padding: "1.25rem",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Total a Pagar:</span>
              <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800", color: "#0f172a" }}>
                ${totalReservas.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={finalizarReserva}
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "0.6rem 1.25rem",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
               Pagar y Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}