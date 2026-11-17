function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaVuelo({ vuelo, esSeleccionado, onSeleccionar }) {
  return (
    <li
      className={`tarjeta ${esSeleccionado ? 'seleccionada' : ''}`}
      onClick={() => onSeleccionar?.(vuelo)}
    >
      <div className="tarjeta-info">
        <strong>🛩️ {vuelo.avion}</strong>
        <span>🕐 {vuelo.hora}</span>
        <b>{formatoPrecio(vuelo.precio)}</b>
      </div>
      <button
        type="button"
        className="btn-elegir"
        onClick={(e) => {
          e.stopPropagation()
          onSeleccionar?.(vuelo)
        }}
      >
        {esSeleccionado ? '✓ Elegido' : 'Elegir'}
      </button>
    </li>
  )
}

export default TarjetaVuelo
