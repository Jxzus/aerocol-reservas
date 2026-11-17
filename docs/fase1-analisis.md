# ✈️ Fase 1 — Análisis y Arquitectura del Proyecto Final: AeroCol

> **Módulo:** Desarrollo Front-End · Semana 15 — Proyecto Final  
> **Estudiantes:** Juan F. y Jesús Andrés Pérez  
> **Proyecto:** AeroCol — Reserva de Vuelos  

---

## 1️⃣ Respuestas al Análisis Preliminar

### 1. ¿Dónde viven hoy los estados `origen` y `destino`? ¿Por qué ahí y no en `SelectCiudad`?
Los estados `origen` y `destino` viven en el componente principal `App` (aplicando el patrón **Lifting State Up**).  
**¿Por qué ahí y no en `SelectCiudad`?**  
Porque `SelectCiudad` es un componente puramente presentacional y reutilizable que no tiene conocimiento del negocio ni de otros componentes. `App` es el ancestro común que necesita ambos valores para:
- Calcular qué ciudades mostrar en el selector de destino (excluyendo el origen).
- Filtrar la lista de vuelos del catálogo (`VUELOS`).
- Validar si la ruta está completa o si no hay vuelos disponibles.
- Gestionar la función de intercambio y reseteo de selección.

Si el estado viviera dentro de `SelectCiudad`, la información quedaría aislada y `App` no podría coordinar la búsqueda ni alimentar a `ListaVuelos`.

---

### 2. `ListaVuelos` recibe `vuelos`, `nombreOrigen`, `nombreDestino`… ¿qué más necesitará recibir para que una tarjeta sea seleccionable?
Para que una tarjeta sea seleccionable y la selección se comunique al resto de la aplicación, `ListaVuelos` necesita recibir:
1. `vueloSeleccionado`: El vuelo actualmente seleccionado (o su `id`) para saber cuál tarjeta debe resaltarse visualmente con la clase `.seleccionada`.
2. `onSeleccionarVuelo`: Una función callback (prop-función) que `ListaVuelos` delegará en cada `TarjetaVuelo`. Al hacer clic en una tarjeta, se ejecuta esta función pasando el vuelo elegido hacia `App` (*los datos suben, las funciones bajan*).

---

### 3. ¿Qué datos necesita guardar una reserva?
La estructura de datos para cada reserva es un objeto con la siguiente forma:

```js
{
  id: "3c52a0a2-9fb4-4a27-a169-1c9f2b84cf82", // Generado con crypto.randomUUID()
  nombre: "Ana García",                        // String del input controlado
  vueloId: "v4",                              // ID del vuelo seleccionado
  avion: "ATR 72",                            // Detalle del avión
  ruta: "Medellín → Bogotá",                   // Origen y destino legibles
  hora: "09:05",                              // Hora de salida
  pasajeros: 2,                               // Número entero (mínimo 1)
  clase: "ejecutiva",                         // Identificador de la clase
  claseNombre: "Ejecutiva",                   // Nombre legible de la clase
  factor: 1.6,                                // Factor multiplicador de clase
  total: 832000,                              // Calculado: precio * pasajeros * factor
  fecha: "16/11/2026"                         // Fecha en formato local es-CO
}
```

---

### 4. ¿Dónde crees que debe vivir el estado de las reservas y por qué?
El estado de las **reservas** (`reservas`, `setReservas`) debe vivir en `App`.  
**¿Por qué?**  
Porque `App` es el puente de comunicación entre:
1. `FormularioReserva` (el emisor): donde el usuario ingresa sus datos y confirma la creación de una nueva reserva mediante una función `onReservar`.
2. `MisReservas` (el receptor): donde se despliega el listado de reservas activas, su conteo y el botón para eliminar (`onEliminar`).

Además, en `App` se centraliza la sincronización con `localStorage` tanto en la inicialización (mediante función inicializadora en `useState`) como al agregar o eliminar elementos de forma inmutable.

---

## 2️⃣ Árbol de Componentes Futuro

```
                                      App  
                      [Estado: origen, destino, orden, 
                       vueloSeleccionado, reservas]
              ┌───────────────┼───────────────┬─────────────────┐
              │               │               │                 │
           <Header>     <SelectorRuta>   <ListaVuelos>      <MisReservas>
        (aerolinea,    (origen, destino, (vuelos, ruta,    (reservas,
         eslogan)       ciudades,         vueloSeleccionado,onEliminar)
                        onOrigen,         onSeleccionarVuelo)
                        onDestino)            │
                        /        \      <TarjetaVuelo> ×N
             <SelectCiudad>   <SelectCiudad>  (vuelo, esSeleccionado,
                (origen)         (destino)     onSeleccionar)
              │
              └───────────────> <FormularioReserva> (solo si hay vuelo seleccionado)
                                (vuelo, nombreOrigen, nombreDestino, onReservar)
                                [Estado local: nombre, pasajeros, clase]
              │
           <Footer>
            (anio)
```

### Flujo de datos y eventos:
1. **Ruta y Orden**: El usuario escoge origen, destino y criterio de ordenación. `App` filtra y ordena la lista de vuelos derivados.
2. **Selección**: El usuario hace clic en una `<TarjetaVuelo>`. Ésta invoca `onSeleccionar(vuelo)`, subiendo la información a `App`, la cual actualiza `vueloSeleccionado`.
3. **Formulario**: Al existir un vuelo seleccionado, se renderiza condicionalmente `<FormularioReserva>`. Éste maneja su estado local (`nombre`, `pasajeros`, `clase`), calcula en tiempo real el `total` derivado y, al hacer submit, envía la reserva completa hacia `App` mediante `onReservar(nuevaReserva)`.
4. **Persistencia y Visualización**: `App` recibe la nueva reserva, la añade inmutablemente al estado `reservas` y la guarda en `localStorage`. Inmediatamente `<MisReservas>` se actualiza y la dibuja. Si el usuario presiona el botón 🗑️, `onEliminar(id)` sube a `App`, filtrando el array y actualizando `localStorage`.

