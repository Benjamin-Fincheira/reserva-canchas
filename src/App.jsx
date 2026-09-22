import React, { useState } from "react";
import { Navbar } from "./Componentes/Navbar";
import { FiltroCanchas } from "./Componentes/FiltroCanchas";
import { TarjetaCancha } from "./Componentes/TarjetasCancha";
import { DetalleModal } from "./Componentes/Detalle";
import { Carrito } from "./Componentes/Carrito";
import { CalendarioReserva } from "./Componentes/CalendarioReserva";

const datosIniciales = [
  {
    id: 1,
    nombre: "Cancha Futbol 7 (Sin techo)",
    deporte: "Futbolito",
    precioHora: 25000,
    superficie: "Pasto Sintético",
    capacidad: "14 jugadores",
    imagen: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nombre: "Cancha Futbol 7 (Techada)",
    deporte: "Futbolito",
    precioHora: 30000,
    superficie: "Pasto Sintético",
    capacidad: "14 jugadores",
    imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nombre: "Cancha Futbol 5",
    deporte: "Futbolito",
    precioHora: 22000,
    superficie: "Pasto Sintético Techado",
    capacidad: "10 jugadores",
    imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    nombre: "Cancha Tenis 1",
    deporte: "Tenis",
    precioHora: 18000,
    superficie: "Arcilla",
    capacidad: "2 a 4 jugadores",
    imagen: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    nombre: "Cancha Pádel 1",
    deporte: "Pádel",
    precioHora: 20000,
    superficie: "Césped Sintético con Vidrio Templado",
    capacidad: "2 a 4 jugadores",
    imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80"
  }
];

export function App() {
  const [canchas] = useState(datosIniciales);
  const [deporteSeleccionado, setDeporteSeleccionado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [precioMax, setPrecioMax] = useState(35000);
  const [canchaModal, setCanchaModal] = useState(null);
  const [canchaAReservar, setCanchaAReservar] = useState(null);
  
  // Reservas temporales que están en el carrito
  const [reservas, setReservas] = useState([]);
  
  // Reservas pagadas y confirmadas permanentemente
  const [reservasPagadas, setReservasPagadas] = useState([]);
  
  const [verCarrito, setVerCarrito] = useState(false);

  const agregarReserva = (reservaCompleta) => {
    setReservas((prev) => [...prev, reservaCompleta]);
  };

  const eliminarReserva = (indexAEliminar) => {
    setReservas((prev) => prev.filter((_, index) => index !== indexAEliminar));
  };

  const finalizarReserva = () => {
    if (reservas.length === 0) return;
    
    // Al pagar, pasamos las reservas pendientes a la lista de pagadas
    setReservasPagadas((prev) => [...prev, ...reservas]);
    
    alert("🎉 ¡Pago realizado y reserva confirmada con éxito! Te esperamos.");
    
    // Limpiamos el carrito temporal
    setReservas([]);
    setVerCarrito(false);
  };

  const canchasFiltradas = canchas.filter((cancha) => {
    const coincideDeporte = deporteSeleccionado === "Todos" || cancha.deporte === deporteSeleccionado;
    const coincideBusqueda = cancha.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincidePrecio = cancha.precioHora <= precioMax;

    return coincideDeporte && coincideBusqueda && coincidePrecio;
  });

  // Combinar tanto lo que está en el carrito como lo pagado para bloquear horarios ocupados
  const todasLasReservasOcupadas = [...reservas, ...reservasPagadas];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "3rem" }}>
      <Navbar 
        totalReservas={reservas.length} 
        onAbrirCarrito={() => setVerCarrito(!verCarrito)} 
      />
      
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ textAlign: "center", color: "#0f172a", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "800" }}>
          Reserva tu Cancha
        </h1>
        <p style={{ textAlign: "center", color: "#64748b", margin: "0 0 1.5rem 0", fontSize: "1rem" }}>
          Filtra por precio o deporte y agenda tu espacio en pocos clics
        </p>

        <Carrito 
          verCarrito={verCarrito}
          setVerCarrito={setVerCarrito}
          reservas={reservas}
          eliminarReserva={eliminarReserva}
          finalizarReserva={finalizarReserva}
        />
        
        <FiltroCanchas 
          deporteSeleccionado={deporteSeleccionado} 
          setDeporteSeleccionado={setDeporteSeleccionado}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          precioMax={precioMax}
          setPrecioMax={setPrecioMax}
        />
        
        {canchasFiltradas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            No se encontraron canchas que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.75rem", marginTop: "2rem" }}>
            {canchasFiltradas.map((cancha) => (
              <TarjetaCancha
                key={cancha.id}
                cancha={cancha}
                onVerDetalle={(c) => setCanchaModal(c)}
                onReservar={(c) => setCanchaAReservar(c)}
              />
            ))}
          </div>
        )}

        {/* Modal de Detalle */}
        <DetalleModal cancha={canchaModal} onClose={() => setCanchaModal(null)} />

        {/* Modal para Seleccionar Fecha y Hora */}
        <CalendarioReserva 
          cancha={canchaAReservar}
          onClose={() => setCanchaAReservar(null)}
          onConfirmarReserva={agregarReserva}
          reservasExistentes={todasLasReservasOcupadas}
        />
      </main>
    </div>
  );
}

export default App;