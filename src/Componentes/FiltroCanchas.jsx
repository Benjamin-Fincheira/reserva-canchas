import React from "react";

export function FiltroCanchas({ setDeporteSeleccionado }) {
  const deportes = ["Todos", "Futbolito", "Tenis", "Pádel"];

  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", margin: "1rem 0" }}>
      {deportes.map((dep) => (
        <button key={dep} onClick={() => setDeporteSeleccionado(dep)}>
          {dep}
        </button>
      ))}
    </div>
  );
}