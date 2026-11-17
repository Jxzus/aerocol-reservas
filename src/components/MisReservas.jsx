function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function MisReservas({ reservas, onEliminar }) {
  return (
    <section className="mis-reservas">
      <h2>🎫 Mis reservas ({reservas.length})</h2>

      {reservas.length === 0 ? (
        <p className="mensaje">Aún no tienes reservas 👀</p>
      ) : (
        <ul className="lista-reservas">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="tarjeta-reserva">
              <div className="reserva-cabecera">
                <strong>👤 {reserva.nombre}</strong>
                <span className="reserva-fecha">📅 {reserva.fecha}</span>
              </div>

              <div className="reserva-detalles">
                <span>
                  👥 {reserva.pasajeros} pasajero{reserva.pasajeros !== 1 ? 's' : ''} · Clase {reserva.claseNombre}
                </span>
                <span>
                  🛩️ Vuelo {reserva.vueloId} ({reserva.avion}) · {reserva.ruta}
                </span>
              </div>

              <div className="reserva-pie">
                <b className="reserva-total">{formatoPrecio(reserva.total)}</b>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => onEliminar(reserva.id)}
                  title="Eliminar reserva"
                  aria-label={`Eliminar reserva de ${reserva.nombre}`}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default MisReservas

