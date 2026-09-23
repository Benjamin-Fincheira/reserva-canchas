import React from "react";

export function FiltroCanchas({ 
  deporteSeleccionado = "Todos", 
  setDeporteSeleccionado,
  busqueda = "",
  setBusqueda,
  precioMax,
  setPrecioMax,
  limitePrecioMax = 35000
}) {
  const deportes = ["Todos", "Futbolito", "Tenis", "Pádel"];

  return (
    <div style={{
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      padding: "1.5rem",
      borderRadius: "20px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      margin: "1.5rem 0",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.25rem",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>
             Buscar cancha
          </label>
          <input
            type="text"
            placeholder="Ej: Futbol 7, Tenis..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              padding: "0.65rem 0.9rem",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box",
              backgroundColor: "#ffffff"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>
               Precio máximo por hora:
            </label>
            <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "#15803d" }}>
              ${precioMax.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="15000"
            max={limitePrecioMax}
            step="1000"
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "#15803d" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", textAlign: "center" }}>
          Deporte:
        </span>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {deportes.map((dep) => {
            const activo = deporteSeleccionado === dep;
            return (
              <button
                key={dep}
                type="button"
                onClick={() => setDeporteSeleccionado && setDeporteSeleccionado(dep)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "9999px",
                  border: activo ? "none" : "1px solid #cbd5e1",
                  backgroundColor: activo ? "#15803d" : "#f8fafc",
                  color: activo ? "#ffffff" : "#334155",
                  fontWeight: activo ? "700" : "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: activo ? "0 4px 10px rgba(21, 128, 61, 0.35)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {dep}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}