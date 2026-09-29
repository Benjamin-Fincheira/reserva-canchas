import React, { useState } from "react";

export function CalendarioReserva({ cancha, onClose, onConfirmarReserva, reservasExistentes }) {
  if (!cancha) return null;//no imprime nada si no hay canchas seleccionada
  const obtenerProximosDias = () => {
    const dias = [];
    const opcionesMes = { month: "long" };//nombre mes completo
    const opcionesDiaSemana = { weekday: "short" };//abreviado de dia de semana, Lunes=LUN

    for (let i = 0; i < 10; i++) {
      const fecha = new Date();//obtiene fecha actual
      fecha.setDate(fecha.getDate() + i);
      const diaNum = fecha.getDate();//numero dia de mes
      const mes = fecha.toLocaleDateString("es-ES", opcionesMes).toUpperCase();//convierte mes a español y en mayus
      const diaNombre = fecha.toLocaleDateString("es-ES", opcionesDiaSemana).toUpperCase().replace(".", "");//convierte dia a españo, mayus, quita punto en abreviacion: mie.
    
      const offset = fecha.getTimezoneOffset() * 60000;//calcula dif. en miliseg. entre hora local de pc y UCT
      const fechaClave = new Date(fecha.getTime() - offset).toISOString().split("T")[0];//la resta y escribe la fecha en formato YYYY-MM-DD

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
  const [diaSeleccionado, setDiaSeleccionado] = useState(proximosDias[0]);//inicia arreglo en dia 0: hoy
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const horarios = [
    "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", 
    "20:00", "21:00", "22:00"
  ];

  // Comprobar compatibilidad convirtiendo los IDs a números
  const estaOcupado = (hora) => {
    return reservasExistentes.some((res) => {//devuelve true si alguna reserva cumple todas las condiciones:
      const coincideCancha = Number(res.id) === Number(cancha.id) || Number(res.canchaId) === Number(cancha.id);
      const coincideFecha = res.fechaClave === diaSeleccionado.fechaClave || res.fecha === diaSeleccionado.fechaClave;
      return coincideCancha && coincideFecha && res.hora === hora;
    });
  };

  const handleConfirmar = (e) => {
    e.preventDefault();
    e.stopPropagation();//por preventividad, evitan que el evento de confirmacion se propage al resto de la pagina

    if (!horaSeleccionada) return;
    onConfirmarReserva({
      ...cancha,
      fechaClave: diaSeleccionado.fechaClave,
      fechaTexto: diaSeleccionado.textoCompleto,
      hora: horaSeleccionada
    });//agrega nueva reserva
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(15, 23, 42, 0.6)",//fondo semi transparente
      backdropFilter: "blur(4px)",//desenfoque
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,//ventana por sobre otros elementos
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",//bordes redondeados
        width: "100%",
        maxWidth: "520px",
        maxHeight: "90vh",//si el contenido supera el 90% del alto de la tarjeta
        overflowY: "auto", // se activa una barra de navegacion vertical automatica
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem" //separacion entre elementos
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
        </div> {/* Mes de dia seleccionado */}
        {/* Carrusel de 10 dias */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",//barra de desplazamiento horizontal
          paddingBottom: "0.5rem"
        }}>
          {proximosDias.map((dia) => {//recorre los 10 dias creando un boton para cada dia
            const esSeleccionado = diaSeleccionado.fechaClave === dia.fechaClave;
            return (
              <button
                type="button"
                key={dia.fechaClave}//cada dia de los 10
                onClick={() => {
                  setDiaSeleccionado(dia);//al seleccionar un dia
                  setHoraSeleccionada(null);//desmarca la hora si es que habia una marcada previamente
                }}
                style={{
                  minWidth: "60px",
                  padding: "0.6rem 0.4rem",
                  borderRadius: "12px",//esquinas redondeadas
                  border: esSeleccionado ? "none" : "1px solid #e2e8f0",//quitar borde al seleccionar
                  backgroundColor: esSeleccionado ? "#15803d" : "#ffffff",// poner fondo verde al seleccionar
                  color: esSeleccionado ? "#ffffff" : "#0f172a",//letras en blanco al seleccionar
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.2rem",
                  boxShadow: esSeleccionado ? "0 4px 10px rgba(21, 128, 61, 0.35)" : "none"//aplicar sombra inferior suave al seleccionar
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

        {/* Reservas en estado ocupado tachadas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",//organiza botones en columna y se adaptan al tamaño de pantalla
          gap: "0.6rem"
        }}>
          {horarios.map((hora) => {//recorre arreglo separando cada registro como "hora"
            const ocupado = estaOcupado(hora);
            const esHoraSeleccionada = horaSeleccionada === hora;//hora selecciona es igual a la hora de ese boton, entonces se guarda
            return (
              <button
                type="button"
                key={hora}
                disabled={ocupado}//si esta ocupado desactiva el boton para que no se pueda clickear
                onClick={() => setHoraSeleccionada(hora)}
                style={{
                  padding: "0.6rem",
                  borderRadius: "10px",//bordes redondeados
                  border: esHoraSeleccionada ? "2px solid #15803d" : "1px solid #cbd5e1",
                  backgroundColor: ocupado ? "#f1f5f9" : esHoraSeleccionada ? "#15803d" : "#ffffff",//ocupado fondo gris, seleccionado verde y sin seleccionar blanco
                  color: ocupado ? "#94a3b8" : esHoraSeleccionada ? "#ffffff" : "#0f172a",//ocupado texto gris, seleccionado blanco y sin seleccionar oscuro
                  fontWeight: esHoraSeleccionada ? "800" : "600",
                  fontSize: "0.9rem",
                  cursor: ocupado ? "not-allowed" : "pointer",//si esta ocupado muestra icono de prohibido en el cursor
                  textDecoration: ocupado ? "line-through" : "none",//linea que cruza la hora si esta reservada
                  boxShadow: esHoraSeleccionada ? "0 2px 8px rgba(21, 128, 61, 0.4)" : "none"
                }}
              >
                {ocupado ? `${hora} 🚫` : hora}
              </button>//si esta ocupada añade el emoji a la celda del boton
            );
          })}
        </div>
        <button
          type="button"
          disabled={!horaSeleccionada}//boton desactivado hasta que se seleccione una hora
          onClick={handleConfirmar}
          style={{
            marginTop: "1rem",//margen superior
            width: "100%",
            padding: "0.85rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: horaSeleccionada ? "#15803d" : "#cbd5e1",//si se selecciona una hora se pinta de verde
            color: horaSeleccionada ? "#ffffff" : "#64748b",// si se selecciona una hora letras de blanco
            fontWeight: "700",
            fontSize: "1rem",
            cursor: horaSeleccionada ? "pointer" : "not-allowed",//si no hay hora seleccionada, cursor de prohibido
            boxShadow: horaSeleccionada ? "0 4px 12px rgba(21, 128, 61, 0.4)" : "none"//agregar sombra al seleccionar una hora
          }}
        >
          {horaSeleccionada ? `Confirmar para ${horaSeleccionada} hrs` : "Selecciona una hora"}
        </button>
      </div>
    </div>
  );
}