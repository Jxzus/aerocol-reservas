# 🛟 Guía de ayuda — Proyecto final AeroCol

> **Módulo:** Desarrollo Front-End · Semana 15 — Proyecto final
> 🧭 **Complemento del enunciado** `PROYECTO-FINAL.md` — úsala mientras desarrollas F1, F2 y F3

---

## 0️⃣ Antes de empezar

### ¿Qué es esta guía?

Un **"bolsillo de teoría"** para el proyecto final. Reúne en un solo lugar **los conceptos de React que necesitas** para agregar las 3 funcionalidades nuevas a tu app AeroCol, con mini-ejemplos genéricos, preguntas guía, errores comunes y checklist de salida.

### ¿Qué NO es? (léelo 2 veces 😉)

🚫 **No es la solución del proyecto.** No encontrarás aquí "cómo hacer F2 en AeroCol". Encontrarás la **teoría** para que lo resuelvas tú: si un código de esta guía resuelve una funcionalidad entera de golpe, esa pista no está bien usada.

> 💭 **El propósito:** en el enunciado se evalúa tu **razonamiento** (50% código + 50% sustentación). Si copias una solución sin entenderla, la defensa oral te delatará. 😄

### ¿Cómo usarla?

1. Trabaja con el **enunciado abierto** (`PROYECTO-FINAL.md`) y esta guía al lado.
2. Cuando estés en la **Fase 2**, ve a la sección de la funcionalidad que estás resolviendo (F1 🟢, F2 🟡 o F3 🔴).
3. Lee la teoría, **prueba el mini-ejemplo** en tu `App.jsx` o en la consola del navegador, responde las preguntas guía por escrito… y después sí, a tu proyecto.

### 🗺️ Mapa de conceptos

| Funcionalidad | Conceptos que necesitas | Dónde los viste |
|---------------|------------------------|-----------------|
| 🟢 F1 — Formulario de reserva | formulario controlado, estado vs estado derivado, radios, `disabled`, props como funciones | Semanas 10–14 |
| 🟡 F2 — Mis reservas | arrays en estado, inmutabilidad, `localStorage`, `JSON`, ids únicos | Semanas 10–11 |
| 🔴 F3 — Catálogo | `.sort()` sobre copia, `localeCompare`, estado derivado, clase condicional | Semanas 10–14 |

---

## 🟢 La teoría para F1 — Formulario de reserva

**Objetivo:** al hacer clic en una tarjeta de vuelo, aparece un formulario (nombre, pasajeros, clase) que muestra un **total** y permite **reservar**.

### 1. Formulario controlado (`value` + `onChange`)

Un input/select cuyo valor viene del estado de React. El componente es dueño del dato; el input solo lo muestra y avisa.

```jsx
const [nombre, setNombre] = useState('')

<input
  type="text"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  placeholder="Ej. Ana García"
/>
```

> 🧠 **¿Por qué?** Sin `value`, el input guarda su propio valor por dentro y React queda desincronizado (semana 11, Paso 5: select controlado). Un formulario de reserva funciona igual con inputs de texto.

### 2. Estado local vs estado derivado — el total NO es estado

El **total se calcula**, no se guarda. Siempre que algo se pueda calcular desde los datos que ya tienes, **no** le crees un `useState`:

```jsx
const factorClase = 1.6                                  // clase Ejecutiva
const total = vuelo.precio * pasajeros * factorClase     // ← derivado
// ❌ NO: const [total, setTotal] = useState(0)
```

> 🧠 **¿Por qué?** Si guardaras el total en un estado, al cambiar pasajeros tendrías que recordar actualizarlo en otro sitio (y se desincronizaría). Calculado, se actualiza **solo** en cada render. Menos estado = menos bugs (semana 11, Paso 6).

### 3. Radios controladas (`checked`)

Las radios de clase (Económica / Ejecutiva / Primera) también son controladas, pero con `checked` en vez de `value`:

```jsx
const [clase, setClase] = useState('economica')

<input
  type="radio"
  name="clase"
  value="ejecutiva"
  checked={clase === 'ejecutiva'}
  onChange={() => setClase('ejecutiva')}
/>
```

> 🧠 **¿Por qué?** `checked` decide cuál está en círculo. Solo una opción del mismo `name` queda activa; el estado `clase` guarda cuál elegiste.

### 4. Botones − / + con `disabled`

El contador de pasajeros ya lo resolviste en la semana 11 (👥):

```jsx
<button type="button" onClick={() => setPasajeros(pasajeros - 1)} disabled={pasajeros <= 1}>
  −
</button>
<strong>{pasajeros}</strong>
<button type="button" onClick={() => setPasajeros(pasajeros + 1)}>+</button>
```

### 5. Props como funciones — la tarjeta avisa que fue elegida

*"Los datos suben, las funciones bajan"* (semana 14, Paso 6). La tarjeta **no puede** guardar la selección: solo puede **avisar** con una función que recibe como prop:

```jsx
// en App: estado seleccionado + función que baja
const [seleccionado, setSeleccionado] = useState(null)
<TarjetaVuelo vuelo={v} onSeleccionar={setSeleccionado} />

// en TarjetaVuelo: solo reporta
<li onClick={() => onSeleccionar?.(vuelo)}>…</li>
```

> 🧠 **¿Por qué?** La selección la necesita `App` (para saber qué vuelo reservar). El estado vive en quien necesita el dato (lifting state up, semana 14).

### ✍️ Preguntas guía (responde y guarda en tu README)

1. ¿Dónde debe vivir el estado del formulario (`nombre`, `pasajeros`, `clase`): dentro del componente nuevo o en `App`? ¿Quién más necesita esos datos?
2. Si el total fuera un estado, ¿qué tendrías que hacer cada vez que cambian los pasajeros?
3. ¿Qué le pasa al formulario si no hay vuelo seleccionado? (pista: renderizado condicional)

### 🐛 Errores comunes de F1

| Error | Síntoma | Pista |
|-------|---------|-------|
| Input sin `value` | El estado y la caja se desincronizan | Agrega `value` + `onChange` |
| Total guardado en `useState` | Cambia pasajeros y el total no se actualiza | Calcúlalo: `precio * pasajeros * factor` |
| Radios sin `checked` | Puedes marcar varias o ninguna queda fija | `checked={clase === 'ejecutiva'}` |
| Botón "Reservar" siempre activo | Se reserva sin nombre | `disabled={nombre.trim() === ''}` |
| Tarjeta no avisa | Clic en tarjeta no hace nada | ¿Le pasaste `onSeleccionar` como función? |

### ✅ Checklist de salida F1

- [ ] El formulario solo aparece si hay vuelo seleccionado
- [ ] Nombre, pasajeros y clase son **controlados** (reaccionan al estado)
- [ ] El total se muestra y se **calcula** (no es un estado) con el factor correcto
- [ ] Botón Reservar deshabilitado sin nombre
- [ ] Respondí las ✍️ preguntas guía por escrito

---

## 🟡 La teoría para F2 — Mis reservas

**Objetivo:** cada reserva se guarda (con `localStorage`), se muestra en una lista, se puede eliminar, y sobrevive a recargar la página.

### 1. Arrays en estado: nunca los mutas

❌ `reservas.push(nueva)` — React no se entera (el array es el mismo).

✅ Siempre entrega un **array nuevo**:

```jsx
const nuevasReservas = [...reservas, nueva]
setReservas(nuevasReservas)
```

✅ Para eliminar, filtra: quedan las que **no** tienen el id que borras:

```jsx
setReservas(reservas.filter((r) => r.id !== idEliminar))
```

> 🧠 **¿Por qué?** React redibuja cuando el estado **cambia de referencia**. Con `push` el array sigue siendo "el mismo"; con `[...]` y `filter` entregas uno nuevo y React re-renderiza (semana 10, taller flying-app).

### 2. `localStorage` guarda strings — ahí entra `JSON`

`localStorage` solo entiende **texto**. Un array de objetos hay que convertirlo:

```js
// guardar
localStorage.setItem('aerocol-reservas', JSON.stringify(misReservas))

// leer
const guardadas = localStorage.getItem('aerocol-reservas')
const reservas = guardadas ? JSON.parse(guardadas) : []
```

Verificado en Node: `JSON.stringify([{id:'a'}])` → `'[{"id":"a"}]'` y `JSON.parse` lo devuelve tal cual. ✅

> 🧠 **¿Por qué?** Sin `JSON.stringify` guardarías `"[object Object]"` y al leer `JSON.parse` lanzaría un error. El `?:` con `[]` como respaldo evita que se rompa la primera vez (aún no hay nada guardado).

### 3. Carga inicial con **función inicializadora**

Para leer `localStorage` solo la **primera vez**, pasa una función a `useState` (se ejecuta una sola vez, no en cada render):

```jsx
function cargarReservas() {
  try {
    const guardadas = localStorage.getItem('aerocol-reservas')
    return guardadas ? JSON.parse(guardadas) : []
  } catch {
    return []
  }
}

const [reservas, setReservas] = useState(cargarReservas)   // nombre sin paréntesis
```

> 🧠 **¿Por qué?** `useState(cargarReservas)` corre la función **una vez** al montar. El `try/catch` protege si el `JSON` guardado está corrupto.

### 4. Id único para cada reserva

`crypto.randomUUID()` genera un identificador único de 36 caracteres (verificado: siempre devuelve string):

```jsx
const nueva = { id: crypto.randomUUID(), fecha: new Date().toLocaleDateString('es-CO'), … }
```

> 🧠 **¿Por qué?** Es tu `key` en `.map()` y tu "documento" para eliminar con `filter`. Debe ser único; un índice no sirve (semana 10).

### 5. Estado vacío (renderizado condicional)

Si no hay reservas, muestra un mensaje amable en vez de una lista vacía:

```jsx
{reservas.length === 0
  ? <p className="mensaje">Aún no tienes reservas 👀</p>
  : <ul>{/* .map() de reservas */}</ul>}
```

### ✍️ Preguntas guía

1. ¿Qué pasa si usas `push()`? ¿Por qué React no se entera que cambió el array?
2. ¿Por qué hay que convertir el array a texto antes de guardarlo en `localStorage`?
3. ¿En qué momento exacto deberías escribir en `localStorage`: al reservar, al eliminar, o en cada render?

### 🐛 Errores comunes de F2

| Error | Síntoma | Pista |
|-------|---------|-------|
| `push()` directo | La lista no aparece al reservar | Entregar array nuevo: `[...reservas, nueva]` |
| Guardar sin `JSON.stringify` | Guarda `[object Object]` | `localStorage.setItem(…, JSON.stringify(lista))` |
| `JSON.parse` de vacío | Error raro al recargar | Respaldo: `guardadas ? JSON.parse(guardadas) : []` |
| Mismo `id` en reservas | Eliminar borra varias | `crypto.randomUUID()` por reserva |
| No recarga "se pierden" | La lista se vacía al recargar | Leer con función inicializadora al montar |

### ✅ Checklist de salida F2

- [ ] Al reservar, aparece en "Mis reservas" abajo
- [ ] Recargo la página y **las reservas siguen** (localStorage)
- [ ] 🗑️ elimina solo la reserva correcta
- [ ] Sin reservas se ve el estado vacío
- [ ] Respondí las ✍️ preguntas guía por escrito

---

## 🔴 La teoría para F3 — Catálogo inteligente

**Objetivo:** ordenar los vuelos (precio, hora, avión) con un selector, y que la tarjeta elegida se **resalte** y alimente el formulario de F1.

### 1. `.sort()` muta: siempre ordena una **copia**

`sort` modifica el array original. Eso rompería tu orden "original" de verdad. La magia es copiar primero:

```js
const numeros = [3, 1, 2]
const ordenados = [...numeros].sort((a, b) => a - b)
// ordenados → [1, 2, 3]  ·  numeros queda [3, 1, 2] intacto ✅ (verificado en Node)
```

> 🧠 **¿Por qué?** El spread `[...]` crea una copia; sobre ella puedes ordenar sin miedo. Ordenar un array de vuelos es lo mismo: `[...vuelosDeRuta].sort(comparador)`.

### 2. Comparadores

- **Números:** `a.precio - b.precio` → menor a mayor; invertido (`b.precio - a.precio`) → mayor a menor.
- **Texto:** `a.avion.localeCompare(b.avion)` → orden alfabético A–Z (respeta tildes: verificada: `"Bogotá" < "Cartagena" < "Medellín"`). ✅

```js
const porTexto = [...nombres].sort((a, b) => a.localeCompare(b))
```

### 3. Estado derivado: la lista ordenada se calcula

Como con el total de F1: no guardas "la lista ordenada". Guardas **el criterio** (`orden`) y la lista ordenada se calcula en el render:

```jsx
const [orden, setOrden] = useState('precio-asc')

const vuelosOrdenados = [...vuelosDeRuta].sort((a, b) => {
  if (orden === 'precio-desc') return b.precio - a.precio
  if (orden === 'hora') return a.hora.localeCompare(b.hora)
  return a.precio - b.precio
})
```

El `<select>` de "Ordenar por" solo hace `setOrden(valor)`.

### 4. Tarjeta seleccionada (clase condicional)

Combinas el estado de F1 (`seleccionado`) con una clase CSS que se enciende cuando coincide:

```jsx
<li className={seleccionado?.id === vuelo.id ? 'tarjeta seleccionada' : 'tarjeta'}>
```

```css
.tarjeta.seleccionada {
  border-color: #0ea5e9;
  background: #f0f9ff;
}
```

> 🧠 **¿Por qué?** La clase se decide con una condición → el navegador "resalta" la elegida. Es renderizado condicional aplicado a un atributo `className` (semana 10).

### 5. Al cambiar la ruta, limpiar la selección

Si cambias de origen/destino con un vuelo seleccionado, el formulario de F1 mostraría un vuelo que ya no está en la lista. Limpia `seleccionado` cuando cambie la ruta (piensa: ¿dónde?).

### ✍️ Preguntas guía

1. ¿Qué le pasaría a tu catálogo si ordenaras sin copiar con `[...]`? (¡pruébalo en la consola del navegador!)
2. ¿Dónde vive el estado `orden`: en la tarjeta, en la lista o en `App`? ¿Quién lo necesita?
3. ¿Cómo haces para que al cambiar de ruta la selección anterior desaparezca?

### 🐛 Errores comunes de F3

| Error | Síntoma | Pista |
|-------|---------|-------|
| `.sort()` sin copia | El orden se "traba" al cambiar de criterio | `[...vuelos].sort(...)` |
| Comparador invertido | El orden sale al revés | Menor a mayor: `a.precio - b.precio` |
| Comparar texto con `-` | `NaN` o orden raro | Usa `localeCompare` para strings |
| Selección "arrastrada" | Al cambiar ruta queda un vuelo viejo | Limpia `seleccionado` al cambiar origen/destino |
| Formulario sin vuelo | "Reservar" con nada | El formulario solo si `seleccionado` existe (`&&`) |

### ✅ Checklist de salida F3

- [ ] Cada opción de "Ordenar por" reordena la lista al instante
- [ ] El orden original del catálogo nunca se modifica (copia ✅)
- [ ] La tarjeta elegida se resalta y alimenta el formulario de F1
- [ ] Cambiar de ruta limpia la selección
- [ ] Respondí las ✍️ preguntas guía por escrito

---

## 🗣️ Pre-defensa — practica estas 5 preguntas

La sustentación vale **el 50% de la nota**. Ensaya en voz alta:

1. **¿Dónde vive cada estado de tu app y por qué?** (ruta, selección, formulario, reservas)
2. **¿Por qué el total no es un estado?** ¿Y por qué la lista ordenada tampoco?
3. **¿Qué le pasaría a tus reservas sin `localStorage`?** ¿Y sin inmutabilidad (`[...]`/`filter`)?
4. **¿Por qué ordenas una copia con `[...vuelos].sort()` y no el array original?**
5. **Elige UNA decisión de diseño** que tomaste y cuéntanos qué alternativa descartaste y por qué. (Idealmente algo con trade-off — ese es tu momento estrella ⭐)

---

## 🛠️ Anexo — Git y GitHub de bolsillo

Para la entrega en **2 momentos** del enunciado necesitas lo mínimo de Git:

### Conceptos esenciales

| Concepto | Qué es |
|----------|--------|
| **Repositorio (repo)** | La "carpeta con historial" de tu proyecto; el de GitHub es el remoto |
| **Commit** | Una foto del estado de tu código en un momento dado, con mensaje |
| **Push** | Subir tus commits locales al repo remoto de GitHub |
| **`node_modules/`** | Dependencias locales — **nunca** se sube (pesan muchísimo) |

### El flujo de tus 2 momentos

**Momento 1 — Subir la base:**

```bash
git init                    # convierto mi carpeta en un repo
git add .                   # marco los archivos a incluir
git commit -m "Base AeroCol (semana 14)"
git push -u origin main     # subo a GitHub (te da las instrucciones al crear el repo)
```

**Momento 2 — Subir funcionalidades (una por una opcional):**

```bash
git add .
git commit -m "F1: formulario de reserva"
git push
```

> 🧠 **¿Por qué un commit por funcionalidad?** Dejas evidencia de tu **proceso**: en la defensa puedes enseñar cómo fuiste construyendo cada pieza. Además, si algo se rompe, puedes volver a un commit anterior.

### 🐛 Errores comunes de Git

| Error | Síntoma | Pista |
|-------|---------|-------|
| Subir `node_modules` | Repo lento/gigante | Nunca `git add` la carpeta `node_modules` |
| Push rechazado | "rejected" / "fetch first" | El repo remoto tiene commits que no tienes (¿marcaste *Add a README*?) |
| "Nothing to commit" | El commit no sale | ¿Hiciste `git add .` primero? |
| Repo privado | El docente no lo ve | Debe ser **público** (el enunciado lo exige) |

---

## 🏁 Resumen: el orden recomendado de trabajo

```
1. Fase 1 (enunciado): analiza y dibuja el árbol → docs/
2. 🟢 F1 con esta guía → commit
3. 🟡 F2 con esta guía → commit
4. 🔴 F3 con esta guía → commit
5. Fase 3: checklist manual + npm run lint + npm run build
6. Fase 4: README con tus respuestas ✍️
7. Defensa oral: ensaya las 5 preguntas 🗣️
```

¡Tú puedes! La teoría ya la sabes — esta guía solo te la recuerda. 🚀