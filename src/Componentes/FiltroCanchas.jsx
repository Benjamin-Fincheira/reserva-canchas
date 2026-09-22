import React from "react";

export function FiltroCanchas({ 
  deporteSeleccionado = "Todos", 
  setDeporteSeleccionado,
  busqueda = "",
  setBusqueda,
  precioMax,
  setPrecioMax,
  limitePrecioMax = 35000
}) {//precios y datos por defectos definidos
  const deportes = ["Todos", "Futbolito", "Tenis", "Pádel"];

  return (
    <div style={{
      backgroundColor: "#ffffff",//blanco
      padding: "1.5rem",
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",//pequeña sombra
      border: "1px solid #e2e8f0",
      margin: "1.5rem 0",
      display: "flex",
      flexDirection: "column",//vertical
      gap: "1.25rem"
    }}>
      {/* Busqueda por Nombre y Rango de Precio */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.25rem",
        alignItems: "center"
      }}>
        {/* Input de Texto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569" }}>
             Buscar cancha
          </label>
          <input
            type="text"
            placeholder="Ej: Futbol 7, Tenis..."//texto antes de escribir
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}//cada vez que cambia algo envia el resultado por setbusqueda
            style={{
              width: "100%",
              padding: "0.65rem 0.9rem",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box"//para no desbordar el contenedor
            }}
          />
        </div>

        {/* Control Deslizante de Precio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569" }}>
               Precio máximo por hora:
            </label>
            <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#16a34a" }}>
              ${precioMax.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="15000"
            max={limitePrecioMax}
            step="1000" //escalones o saltos de 1000 en 1000
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}//al cambiar el valor lo envia por setpreciomax transformado en un numero
            style={{ width: "100%", cursor: "pointer", accentColor: "#2563eb" }}//cambia cursor y acentua el color azul de la barra
          />
        </div>
      </div>

      {/* Botones de Filtro por Deporte */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569", textAlign: "center" }}>
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
                  backgroundColor: activo ? "#2563eb" : "#f8fafc",
                  color: activo ? "#ffffff" : "#475569",
                  fontWeight: activo ? "600" : "500",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: activo ? "0 4px 6px -1px rgba(37, 99, 235, 0.3)" : "none",
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