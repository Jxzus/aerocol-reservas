import { useState } from 'react'
import { CLASES } from '../data/vuelos.js'

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function FormularioReserva({ vuelo, nombreOrigen, nombreDestino, onReservar, onCancelar }) {
  const [nombre, setNombre] = useState('')
  const [pasajeros, setPasajeros] = useState(1)
  const [clase, setClase] = useState('economica')

  const claseSeleccionada = CLASES.find((c) => c.id === clase) ?? CLASES[0]
  const total = Math.round(vuelo.precio * pasajeros * claseSeleccionada.factor)

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return

    const nuevaReserva = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      vueloId: vuelo.id,
      avion: vuelo.avion,
      hora: vuelo.hora,
      ruta: `${nombreOrigen} → ${nombreDestino}`,
      pasajeros,
      clase,
      claseNombre: claseSeleccionada.nombre,
      factor: claseSeleccionada.factor,
      total,
      fecha: new Date().toLocaleDateString('es-CO'),
    }

    onReservar(nuevaReserva)
    setNombre('')
    setPasajeros(1)
    setClase('economica')
  }

  return (
    <section className="formulario-reserva">
      <div className="formulario-header">
        <h2>🎟️ Reservar {vuelo.avion} · {vuelo.hora}</h2>
        {onCancelar && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
            title="Cerrar selección"
          >
            ✕
          </button>
        )}
      </div>

      <p className="formulario-detalle">
        Ruta: <strong>{nombreOrigen} → {nombreDestino}</strong> | Precio base:{' '}
        <strong>{formatoPrecio(vuelo.precio)}</strong>
      </p>

      <form onSubmit={manejarSubmit}>
        <label className="campo">
          Nombre del pasajero
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Ana García"
          />
        </label>

        <div className="campo">
          <span>👥 Pasajeros</span>
          <div className="contador-pasajeros">
            <button
              type="button"
              onClick={() => setPasajeros((prev) => Math.max(1, prev - 1))}
              disabled={pasajeros <= 1}
            >
              −
            </button>
            <strong>{pasajeros}</strong>
            <button type="button" onClick={() => setPasajeros((prev) => prev + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="campo">
          <span>Clase de viaje</span>
          <div className="grupo-radios">
            {CLASES.map((c) => (
              <label key={c.id} className="radio-label">
                <input
                  type="radio"
                  name="clase"
                  value={c.id}
                  checked={clase === c.id}
                  onChange={() => setClase(c.id)}
                />
                {c.nombre} (×{c.factor})
              </label>
            ))}
          </div>
        </div>

        <div className="formulario-footer">
          <div className="total-box">
            <span>💰 Total:</span>
            <strong>{formatoPrecio(total)}</strong>
          </div>
          <button type="submit" disabled={!nombre.trim()} className="btn-reservar">
            ✅ Reservar
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormularioReserva

