import React, { useState } from "react";
import { Navbar } from "./Componentes/Navbar";
import { FiltroCanchas } from "./Componentes/FiltroCanchas";
import { TarjetaCancha } from "./Componentes/TarjetasCancha";
import { DetalleModal } from "./Componentes/Detalle";

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
  const [deporteSeleccionado, setDeporteSeleccionado] = useState("Todos"); //filtro,inicia en todos
  const [canchaModal, setCanchaModal] = useState(null); //inicia vacio, indica detalle
  const [reservas, setReservas] = useState([]); // crea arreglo vacio de reservas

  const agregarReserva = (cancha) => {
    setReservas([...reservas, cancha]);//recibe nueva reserva , y la añade junto a una copia del estado anterior de reservas
  }; // ...  para "desempacar" arreglo

  const canchasFiltradas = canchas.filter((cancha) => // => separa parametros de funcion 
    deporteSeleccionado === "Todos" || cancha.deporte === deporteSeleccionado // || = or
  ); // Si se seleciona "todos" devuelve todas las cnahas, sino solo las que coincidan con el deporte seleccionado

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "2rem" }}>
      <Navbar totalReservas={reservas.length} />
      
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem" }}>
        <h1 style={{ textAlign: "center", color: "#0f172a", marginBottom: "1rem" }}>Reserva de Canchas</h1>
        
        <FiltroCanchas setDeporteSeleccionado={setDeporteSeleccionado} />
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {canchasFiltradas.map((cancha) => (
            <TarjetaCancha
              key={cancha.id}
              cancha={cancha}
              onVerDetalle={(c) => setCanchaModal(c)} // c representa cancha seleccionada, => crea funcion en "espera"
              onReservar={agregarReserva}
            />
          ))}
        </div>

        <DetalleModal cancha={canchaModal} onClose={() => setCanchaModal(null)} />
      </main>
    </div>
  );
}

export default App;