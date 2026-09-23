import React, { useState } from "react";

export function CalendarioReserva({ cancha, onClose, onConfirmarReserva, reservasExistentes }) {
  if (!cancha) return null;

  // Generar los próximos 10 días dinámicamente
  const obtenerProximosDias = () => {
    const dias = [];
    const opcionesMes = { month: "long" };
    const opcionesDiaSemana = { weekday: "short" };

    for (let i = 0; i < 10; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);

      const diaNum = fecha.getDate();
      const mes = fecha.toLocaleDateString("es-ES", opcionesMes).toUpperCase();
      const diaNombre = fecha.toLocaleDateString("es-ES", opcionesDiaSemana).toUpperCase().replace(".", "");
      
      const fechaClave = fecha.toISOString().split("T")[0];

      dias.push({
        fechaClave,
        diaNum,
        mes,
        diaNombre,
        textoCompleto: `${diaNombre} ${diaNum} de ${mes.toLowerCase()}`
      });
    }
    return dias;
  };

  const proximosDias = obtenerProximosDias();
  const [diaSeleccionado, setDiaSeleccionado] = useState(proximosDias[0]);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const horarios = [
    "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", 
    "20:00", "21:00", "22:00"
  ];

  // Comprobar si esta cancha ya tiene este día y hora en la lista de ocupadas
  const estaOcupado = (hora) => {
    return reservasExistentes.some(
      (res) => res.id === cancha.id && res.fechaClave === diaSeleccionado.fechaClave && res.hora === hora
    );
  };

  const handleConfirmar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!horaSeleccionada) return;

    onConfirmarReserva({
      ...cancha,
      fechaClave: diaSeleccionado.fechaClave,
      fechaTexto: diaSeleccionado.textoCompleto,
      hora: horaSeleccionada
    });

    onClose();
  };

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
        borderRadius: "20px",
        width: "100%",
        maxWidth: "520px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#15803d", fontWeight: "700", textTransform: "uppercase" }}>
              {cancha.deporte}
            </span>
            <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a", fontWeight: "800" }}>
              {cancha.nombre}
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "#64748b" }}
          >
            ✕
          </button>
        </div>

        <div style={{ textAlign: "center", fontWeight: "800", color: "#1e293b", fontSize: "1rem" }}>
          {diaSeleccionado.mes}
        </div>

        {/* Carrusel de 10 días */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem"
        }}>
          {proximosDias.map((dia) => {
            const esSeleccionado = diaSeleccionado.fechaClave === dia.fechaClave;
            return (
              <button
                type="button"
                key={dia.fechaClave}
                onClick={() => {
                  setDiaSeleccionado(dia);
                  setHoraSeleccionada(null);
                }}
                style={{
                  minWidth: "60px",
                  padding: "0.6rem 0.4rem",
                  borderRadius: "12px",
                  border: esSeleccionado ? "none" : "1px solid #e2e8f0",
                  backgroundColor: esSeleccionado ? "#15803d" : "#ffffff",
                  color: esSeleccionado ? "#ffffff" : "#0f172a",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.2rem",
                  boxShadow: esSeleccionado ? "0 4px 10px rgba(21, 128, 61, 0.35)" : "none"
                }}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: "800" }}>{dia.diaNum}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: "600", opacity: 0.8 }}>{dia.diaNombre}</span>
              </button>
            );
          })}
        </div>

        <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "600" }}>
          Selecciona una hora disponible:
        </span>

        {/* Horarios con estado ocupado tachado */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
          gap: "0.6rem"
        }}>
          {horarios.map((hora) => {
            const ocupado = estaOcupado(hora);
            const esHoraSeleccionada = horaSeleccionada === hora;

            return (
              <button
                type="button"
                key={hora}
                disabled={ocupado}
                onClick={() => setHoraSeleccionada(hora)}
                style={{
                  padding: "0.6rem",
                  borderRadius: "10px",
                  border: esHoraSeleccionada ? "2px solid #15803d" : "1px solid #cbd5e1",
                  backgroundColor: ocupado ? "#f1f5f9" : esHoraSeleccionada ? "#15803d" : "#ffffff",
                  color: ocupado ? "#94a3b8" : esHoraSeleccionada ? "#ffffff" : "#0f172a",
                  fontWeight: esHoraSeleccionada ? "800" : "600",
                  fontSize: "0.9rem",
                  cursor: ocupado ? "not-allowed" : "pointer",
                  textDecoration: ocupado ? "line-through" : "none",
                  boxShadow: esHoraSeleccionada ? "0 2px 8px rgba(21, 128, 61, 0.4)" : "none"
                }}
              >
                {ocupado ? `${hora} 🚫` : hora}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!horaSeleccionada}
          onClick={handleConfirmar}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.85rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: horaSeleccionada ? "#15803d" : "#cbd5e1",
            color: horaSeleccionada ? "#ffffff" : "#64748b",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: horaSeleccionada ? "pointer" : "not-allowed",
            boxShadow: horaSeleccionada ? "0 4px 12px rgba(21, 128, 61, 0.4)" : "none"
          }}
        >
          {horaSeleccionada ? `Confirmar para ${horaSeleccionada} hrs` : "Selecciona una hora"}
        </button>
      </div>
    </div>
  );
}