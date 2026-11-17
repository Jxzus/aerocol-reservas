# ✈️ AeroCol — Reserva tu Vuelo

> **Módulo:** Desarrollo Front-End · Semana 15 — Proyecto Final  
> **App:** AeroCol  
> **Tecnologías:** React 19, Vite, JavaScript, CSS3, HTML5  

---

## 📖 Descripción del Proyecto

**AeroCol** es una aplicación web interactiva de búsqueda y reserva de vuelos nacionales en Colombia. Permite a los usuarios seleccionar origen y destino con validación de rutas, ordenar vuelos por precio, hora o avión, seleccionar un vuelo para ver sus detalles en tiempo real y reservarlo configurando pasajeros y clase de viaje (con cálculo automático del total), almacenando las reservas de manera persistente en `localStorage`.

---

## 🌳 Árbol de Componentes

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
              └───────────────> <FormularioReserva> (condicional si hay selección)
                                (vuelo, nombreOrigen, nombreDestino,
                                 onReservar, onCancelar)
                                [Estado local: nombre, pasajeros, clase]
              │
           <Footer>
            (anio)
```

---

## ✍️ Documentación de Conceptos (F1, F2 y F3)

### 🟢 F1 — Formulario de Reserva

1. **¿Dónde viven los estados del formulario y por qué?**  
   Los estados del formulario (`nombre`, `pasajeros`, `clase`) viven dentro del componente `FormularioReserva` como estado local (`useState`). Viven allí porque son datos provisionales que solo le interesan al formulario mientras el usuario está diligenciando la compra. Ningún otro componente externo necesita saber cuántos pasajeros o qué clase se está digitando en ese momento. Cuando el usuario hace clic en "Reservar", el objeto consolidado sube a `App` a través de la función prop `onReservar`.

2. **¿Por qué el total no es un `useState` más?**  
   Porque el total es un **estado derivado**. Se puede calcular de manera determinista e instantánea a partir de valores que ya existen: `vuelo.precio * pasajeros * clase.factor`. Si se almacenara en un `useState`, se duplicaría la fuente de la verdad y habría riesgo de desincronización (por ejemplo, cambiar pasajeros y olvidar actualizar el total). Calculándolo directamente en el cuerpo del componente, React garantiza que siempre esté sincronizado en cada render sin estado adicional.

3. **¿Qué prop le agregaste a `TarjetaVuelo` y para qué?**  
   Se le agregaron dos props:
   - `onSeleccionar`: Una función callback que `TarjetaVuelo` ejecuta al recibir un clic, permitiendo que la tarjeta le avise al componente padre `App` cuál vuelo fue elegido (*los datos suben, las funciones bajan*).
   - `esSeleccionado`: Un booleano que indica si este vuelo coincide con `vueloSeleccionado.id`, para aplicar condicionalmente la clase CSS `.seleccionada` y resaltar visualmente la tarjeta.

---

### 🟡 F2 — Mis Reservas (Persistencia con `localStorage`)

1. **¿Por qué no mutar el array directamente con `push`?**  
   En React el estado debe ser inmutable. React detecta cambios comparando referencias en memoria (`Object.is` o `prev !== next`). Si hacemos `reservas.push(nueva)`, la referencia del arreglo sigue siendo exactamente la misma, por lo que React asume que nada ha cambiado y no vuelve a renderizar la interfaz. Al usar `[...reservas, nueva]`, se crea una nueva referencia en memoria que dispara el re-renderizado inmediato.

2. **¿Qué le pasa a tus reservas si recargas la página sin `localStorage`?**  
   El estado de React vive únicamente en la memoria RAM del navegador. Si no existiera `localStorage`, al recargar la página (`F5`), el ciclo de vida de la aplicación se reiniciaría por completo y el arreglo de reservas volvería a su valor inicial vacío (`[]`), perdiendo todas las reservas realizadas por el usuario.

3. **¿Dónde pones la lógica de guardar y por qué?**  
   La lógica de lectura y escritura vive en `App`:
   - **Lectura:** Se realiza al inicio mediante una **función inicializadora** en `useState(cargarReservas)`. Esto asegura que `localStorage.getItem` se invoque una sola vez durante el montaje y no en cada render.
   - **Escritura:** Se realiza dentro de los manejadores `agregarReserva` y `eliminarReserva` inmediatamente después de actualizar el estado, serializando con `JSON.stringify`. Vive en `App` porque es allí donde reside el estado global de las reservas.

---

### 🔴 F3 — Catálogo Inteligente: Ordenar + Detalle

1. **¿Por qué hay que ordenar una copia del array y no el original?**  
   Porque el método nativo de JavaScript `.sort()` muta (modifica) el array sobre el cual se ejecuta directamente. Si hiciéramos `vuelos.sort(...)`, alteraríamos permanentemente el orden de los datos fuente. Al crear primero una copia superficial con el operador spread `[...vuelosFiltrados].sort(...)`, el array original permanece inalterado y predecible.

2. **¿Qué pasó con el orden al cambiar de ruta? ¿Se mantiene?**  
   Sí, el orden se mantiene. El estado `orden` reside en `App` y no depende de la ruta. Cuando el usuario cambia de origen o destino, `vuelosFiltrados` recalcula la nueva ruta y la función de ordenación vuelve a aplicar el criterio que ya estaba seleccionado (`orden`), manteniendo la preferencia del usuario intacta.

3. **¿Cómo le avisa la tarjeta a `App` que fue seleccionada?**  
   Mediante una prop de tipo función enviada desde `App` hacia abajo: `App` le pasa `setVueloSeleccionado` a `ListaVuelos`, y ésta se la delega a cada `TarjetaVuelo` como `onSeleccionar`. Cuando el usuario hace clic en la tarjeta o en el botón "Elegir", se invoca `onSeleccionar(vuelo)`, pasando el objeto del vuelo hacia arriba hasta llegar a `App`.

---

## 💡 Decisión de Diseño Clave

**Decisión:** Separar el estado local del formulario (`FormularioReserva`) del estado global de la aplicación (`App`), y mantener la selección de vuelo en `App`.  
**Por qué se tomó:**  
Si hubiéramos subido los campos del formulario (`nombre`, `pasajeros`, `clase`) a `App`, cada pulsación de tecla provocaría un re-render innecesario de toda la aplicación (incluyendo selectores, listas y tarjetas). Al encapsular estos datos en `FormularioReserva`, solo el formulario se redibuja mientras se escribe. Al mismo tiempo, mantener `vueloSeleccionado` en `App` permite coordinar la selección en `ListaVuelos` (resaltando la tarjeta activa) y renderizar el formulario solo cuando hay un vuelo elegido, además de limpiar la selección automáticamente al cambiar de ruta para evitar inconsistencias.

---

## 🚀 Cómo Ejecutar la Aplicación

1. **Instalar dependencias** (solo la primera vez):
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Validar calidad de código y compilación**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 📁 Documentación del Proyecto

Toda la documentación y análisis complementarios se encuentran centralizados en la carpeta [`docs/`](./docs/):
- [docs/PROYECTO-FINAL.md](./docs/PROYECTO-FINAL.md): Enunciado y rúbrica oficial de la Semana 15.
- [docs/guia-ayuda-proyecto-final.md](./docs/guia-ayuda-proyecto-final.md): Guía teórica y preparación de la defensa oral.
- [docs/fase1-analisis.md](./docs/fase1-analisis.md): Análisis de arquitectura, respuestas de la Fase 1 y diagrama de flujo.
