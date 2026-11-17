import { useState } from 'react'
import './App.css'
import { CIUDADES, VUELOS } from './data/vuelos.js'
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'
import MisReservas from './components/MisReservas.jsx'
import Footer from './components/Footer.jsx'

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function cargarReservas() {
  try {
    const guardadas = localStorage.getItem('aerocol-reservas')
    return guardadas ? JSON.parse(guardadas) : []
  } catch {
    return []
  }
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null)
  const [reservas, setReservas] = useState(cargarReservas)

  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)

  const vuelosFiltrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []

  const manejarOrigen = (codigo) => {
    setOrigen(codigo)
    setVueloSeleccionado(null)
    if (codigo === destino) setDestino('')
  }

  const manejarDestino = (codigo) => {
    setDestino(codigo)
    setVueloSeleccionado(null)
  }

  const intercambiar = () => {
    setOrigen(destino)
    setDestino(origen)
    setVueloSeleccionado(null)
  }

  const agregarReserva = (nueva) => {
    const actualizadas = [...reservas, nueva]
    setReservas(actualizadas)
    localStorage.setItem('aerocol-reservas', JSON.stringify(actualizadas))
  }

  const eliminarReserva = (id) => {
    const actualizadas = reservas.filter((r) => r.id !== id)
    setReservas(actualizadas)
    localStorage.setItem('aerocol-reservas', JSON.stringify(actualizadas))
  }

  return (
    <main>
      <Header aerolinea="AeroCol" eslogan="Tu vuelo en un clic" />

      <section className="selector">
        <h2>✈️ Busca tu vuelo</h2>

        <SelectorRuta
          origen={origen}
          destino={destino}
          ciudades={CIUDADES}
          ciudadesDestino={ciudadesDestino}
          onOrigen={manejarOrigen}
          onDestino={manejarDestino}
        />

        <button type="button" onClick={intercambiar} disabled={!origen || !destino}>
          🔄 Intercambiar
        </button>
      </section>

      {!origen || !destino ? (
        <p className="mensaje">Elige origen y destino para buscar vuelos 🛫</p>
      ) : vuelosFiltrados.length === 0 ? (
        <p className="mensaje">No hay vuelos para esa ruta 🙃</p>
      ) : (
        <ListaVuelos
          vuelos={vuelosFiltrados}
          nombreOrigen={nombreCiudad(origen)}
          nombreDestino={nombreCiudad(destino)}
          vueloSeleccionado={vueloSeleccionado}
          onSeleccionarVuelo={setVueloSeleccionado}
        />
      )}

      {vueloSeleccionado && (
        <FormularioReserva
          vuelo={vueloSeleccionado}
          nombreOrigen={nombreCiudad(origen)}
          nombreDestino={nombreCiudad(destino)}
          onReservar={agregarReserva}
          onCancelar={() => setVueloSeleccionado(null)}
        />
      )}

      <MisReservas reservas={reservas} onEliminar={eliminarReserva} />

      <Footer anio={2026} />
    </main>
  )
}

export default App
