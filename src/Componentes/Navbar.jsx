import React from "react";

export function Navbar({ totalReservas }) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#1e293b", color: "white" }}>
      <h2>⚽ SportsReserve</h2>
      <div>
        <span>Reservas: {totalReservas}</span>
      </div>
    </nav>
  );
}