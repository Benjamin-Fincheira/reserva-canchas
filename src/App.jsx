import React from "react";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "15px", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>
      <header style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px", marginBottom: "20px", textAlign: "center" }}>
        <h1>Sistema de Reserva de Canchas</h1>
        <p>Bienvenido al portal de reservas</p>
      </header>

      <main>
        <h2>Canchas Disponibles</h2>
        
        {/* Contenedor responsivo tipo Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "15px"
        }}>
          {/* Cancha 1 */}
          <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h3>Cancha 1 - Techada</h3>
            <p><strong>Deporte:</strong> Futbolito</p>
            <p><strong>Precio:</strong> $25.000 / hora</p>
            <button style={{ width: "100%", padding: "8px", cursor: "pointer" }}>Ver Detalle</button>
          </div>

          {/* Cancha 2 */}
          <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h3>Cancha Central - Tenis</h3>
            <p><strong>Deporte:</strong> Tenis</p>
            <p><strong>Precio:</strong> $15.000 / hora</p>
            <button style={{ width: "100%", padding: "8px", cursor: "pointer" }}>Ver Detalle</button>
          </div>
        </div>
      </main>
    </div>
  );
}