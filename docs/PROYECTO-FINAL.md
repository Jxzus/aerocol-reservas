# ✈️ Proyecto Final: AeroCol — Reserva tu vuelo

> **Módulo:** Desarrollo Front-End · Semana 15 — Proyecto final
> 👥 **Modalidad:** individual o en parejas (1–2 estudiantes)
> 📅 **Entrega:** jueves **26 de noviembre de 2026 · 5:00 pm**
> 🗣️ **Defensa oral:** última semana de clase (5–7 min + preguntas)

---

## 📖 Introducción

Bienvenido a tu **proyecto final del curso de Desarrollo Front-End** 🎉. Es la oportunidad de demostrar todo lo que aprendiste en el semestre: componentes, props, composición, estado con `useState`, formularios controlados, listas con `.map()`, eventos y comunicación entre componentes.

### 📌 El enunciado en pocas palabras

Partiendo de la **app AeroCol que construiste en la clase pasada** (semana 14 — Tutorial 2: varios componentes), debes convertirla en una **app completa de reserva de vuelos**: buscar un vuelo → elegirlo → reservarlo → ver tus reservas. Nada de empezar de cero: **tu base es la app que ya tienes funcionando**.

### 🔑 Lo más importante del proyecto: 3 funcionalidades nuevas

Sobre esa base, debes **agregar 3 funcionalidades nuevas** — esta es la parte central del proyecto, lo que se evalúa con más peso y lo que debes resolver por completo:

| | Funcionalidad | Qué hace |
|---|---|---|
| 🟢 | **F1 — Formulario de reserva** | Eliges un vuelo y lo reservas con pasajeros, clase y total |
| 🟡 | **F2 — Mis reservas** | Tus reservas se guardan (localStorage) y puedes verlas y eliminarlas |
| 🔴 | **F3 — Catálogo inteligente** | Ordenas los vuelos y ves el detalle del elegido |

Cada una está desglosada en la **Fase 2** con su reto, los conceptos que refuerza, pistas y documentación obligatoria ✍️. Resolverlas es el objetivo central del proyecto — sin las 3 funcionalidades, la base por sí sola no completa el entregable.

### 👥 Cómo se trabaja

- **Individual o en parejas** (máximo 2 estudiantes). Si trabajas en pareja, ambos deben conocer todo el código — la defensa oral es individual. 😉
- Empiezas **desde tu AeroCol de la semana 14**: la estructura de `src/components/`, los datos de `src/data/vuelos.js` y la búsqueda que ya funciona siguen siendo tuyos.
- **No se puede romper lo que ya existe**: la búsqueda por origen y destino, el aviso de ruta sin vuelos y el flujo actual deben seguir funcionando igual.
- Las 3 funcionalidades nuevas están desglosadas en la **Fase 2** con sus retos, pistas y documentación obligatoria.
- Tienes una **📖 Guía de ayuda** que te recuerda la teoría de F1, F2 y F3 (formularios, arrays, `localStorage`, ordenamiento) **sin darte la solución** — tu compañera de estudio durante todo el proyecto.
- Al final debes pasar `npm run lint` y `npm run build` **sin errores** y entregar el link de tu repositorio (ver **Entrega**).

> 🛟 **¿Dónde está la guía?** En **[guia-ayuda-proyecto-final.md](guia-ayuda-proyecto-final.md)** (misma carpeta que este enunciado). Cada sección del proyecto te indicará cuándo consultarla.

El resultado final se revisa con la rúbrica de la siguiente sección.

---

## 🎯 El reto

Convertir tu app **AeroCol** (semana 14) en una **app completa de reserva de vuelos**:

**buscar vuelo → elegirlo → reservarlo → ver tus reservas.**

```
┌──────────────────────────────────────────┐
│  ✈️ AeroCol — Tu vuelo en un clic        │
│                                          │
│  Origen [Medellín ▾] → Destino [Bogotá ▾]│
│  Ordenar por [Precio: menor a mayor ▾]   │
│                                          │
│  🛫 1 vuelo · Medellín → Bogotá          │
│  ┌────────────────────────────────────┐  │
│  │ ATR 72 · 09:05 · $ 260.000  [Ver]  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  🎟️ Reservar ATR 72 · 09:05             │
│  Nombre del pasajero [Ana García]        │
│  👥 Pasajeros  [−] 2 [+]                │
│  ● Económica   ○ Ejecutiva   ○ Primera  │
│  💰 Total: $ 832.000       [✅ Reservar] │
│                                          │
│  🎫 Mis reservas (1)                     │
│  ┌────────────────────────────────────┐  │
│  │ Ana García · 2 pasajeros ·          │  │
│  │ Ejecutiva · Vuelo v4 · $ 832.000 🗑️ │  │
│  └────────────────────────────────────┘  │
│                                          │
│  © 2026 AeroCol — vuelos de práctica     │
└──────────────────────────────────────────┘
```

> ⚠️ Estos valores corresponden a: vuelo **v4** (ATR 72, MDE → BOG, `$ 260.000`), **2 pasajeros** en clase **Ejecutiva** (×1.6): `260.000 × 2 × 1.6 = $ 832.000`.

### 📊 Rúbrica de la nota del proyecto final

| Criterio | Peso |
|----------|------|
| **💻 Código funcionando** (F1 + F2 + F3) | 50% |
| **🗣️ Sustentación oral** (demo + preguntas) | 50% |

El bloque de **código (50%)** se desglosa así:

| Criterio (dentro del código) | Peso |
|------------------------------|------|
| Funcionalidades funcionando (F1 + F2 + F3) | 20% |
| Documentación de conceptos (por qué usas cada cosa) | 15% |
| Verificación y calidad (nada se rompe, lint/build, limpieza) | 10% |
| Estructura de componentes (bien separados, props limpias) | 5% |
| **Subtotal del código** | **50%** |

> 💡 En resumen: la mitad de tu nota es **el código que funciona** (y cómo lo documentas), y la otra mitad es **cómo lo sustentas** en la defensa oral.

---

## 🧰 Pre requisitos

- Tu app **AeroCol** de la semana 14 funcionando (`npm run dev`).
- Conocer el **árbol de componentes** que ya tienes:

```
                        App  (estado: origen, destino)
                     /    |        \          \
              <Header> <SelectorRuta> <ListaVuelos>  <Footer>
                       /          \         |
              <SelectCiudad> <SelectCiudad>  <TarjetaVuelo> ×N
              (origen)       (destino)      (una por vuelo)
```

- Datos en `src/data/vuelos.js`: `CIUDADES` (6) y `VUELOS` (6, con `id`, `origen`, `destino`, `avion`, `hora`, `precio`).

---

## 🧩 Fase 1 — Analiza tu app (sin código)

Antes de programar, entiende lo que tienes y planea lo nuevo.

### 1️⃣ Responde por escrito

1. ¿Dónde viven hoy los estados `origen` y `destino`? ¿Por qué ahí y no en `SelectCiudad`?
2. `ListaVuelos` recibe `vuelos`, `nombreOrigen`, `nombreDestino`… ¿qué más necesitará recibir para que una tarjeta sea **seleccionable**?
3. ¿Qué datos necesita guardar una **reserva**? (propón la forma: `{ id, nombre, vuelo, pasajeros, clase, total, fecha }`)
4. ¿Dónde crees que debe vivir el estado de las **reservas** y por qué?

### 2️⃣ Dibuja el árbol futuro

Agrega al árbol anterior las piezas nuevas que vas a crear (por ejemplo):

```
                        App
            ┌───────────┼──────────────┐
      <SelectorRuta> <ListaVuelos> <MisReservas>
                       │               │
                 <TarjetaVuelo>   (eliminar)
                       │
               <FormularioReserva>
```

Dibuja el tuyo con todas las piezas y sus props. 📝

### 3️⃣ Entrega de la Fase 1

Un documento breve (Markdown) con tus respuestas + el árbol. Súbelo a tu repo (`docs/`).

---

## 🧩 Fase 2 — Implementa las 3 funcionalidades

### 🟢 F1 — Formulario de reserva

**Reto:** al hacer clic en una tarjeta de vuelo, se selecciona (se resalta) y aparece un **formulario de reserva** con:

- **Nombre del pasajero** (input de texto)
- **Cantidad de pasajeros** (botones − / +, mínimo 1)
- **Clase** (radios): Económica ×1 · Ejecutiva ×1.6 · Primera ×2.4
- **Total** = `precio × pasajeros × factor` (se actualiza al instante)
- Botón **✅ Reservar** (deshabilitado si el nombre está vacío)

**🧠 Conceptos que refuerza:** formulario controlado (`value` + `onChange`), estado derivado (el total se *calcula*, no se guarda), renderizado condicional (el formulario solo aparece si hay vuelo seleccionado), eventos (`onClick`, `onChange`).

> 🛟 **Guía de ayuda → F1:** consulta la sección **🟢 La teoría para F1** de la **[guía de ayuda](guia-ayuda-proyecto-final.md)** (formulario controlado, estado vs derivado, radios, props como funciones) antes de codificar.

**📌 Pistas:**

- El estado del formulario (`nombre`, `pasajeros`, `clase`) puede vivir **dentro de un componente nuevo** `FormularioReserva` — es local, nadie más lo necesita.
- `CLASES` puede ser un array en `data/vuelos.js`: `{ id, nombre, factor }`. El factor se busca con `.find()`.
- Para que una tarjeta sea clicable, `TarjetaVuelo` necesita una prop nueva tipo función (p. ej. `onSeleccionar`) — recuerda: *los datos suben, las funciones bajan*. ⬆️⬇️

**✍️ Documenta (obligatorio):**

1. ¿Dónde viven los estados del formulario y por qué?
2. ¿Por qué el **total no es un `useState`** más?
3. ¿Qué prop le agregaste a `TarjetaVuelo` y para qué?

---

### 🟡 F2 — Mis reservas (persistencia con `localStorage`)

**Reto:** al presionar **Reservar**, la reserva se guarda y aparece abajo en **"🎫 Mis reservas"**:

- Muestra: nombre, vuelo (id), pasajeros, clase, total y fecha.
- Botón **🗑️** para eliminar cada reserva.
- **Estado vacío:** si no hay reservas, mostrar "Aún no tienes reservas 👀".
- **Persistencia:** si el usuario **recarga la página, las reservas siguen ahí** (usando `localStorage`).

**🧠 Conceptos que refuerza:** arrays en estado, **inmutabilidad** (`[...prev]`, `filter`), `.map()` + `key`, persistencia con `JSON.parse` / `JSON.stringify`, componente `MisReservas` con props (datos + función).

> 🛟 **Guía de ayuda → F2:** consulta la sección **🟡 La teoría para F2** de la **[guía de ayuda](guia-ayuda-proyecto-final.md)** (arrays inmutables, `localStorage`, función inicializadora, ids únicos) antes de codificar.

**📌 Pistas:**

- `localStorage` guarda **strings**: usa `JSON.stringify` al guardar y `JSON.parse` al leer.
- Para cargar al inicio puedes inicializar el estado con una **función inicializadora**: `useState(cargarReservas)` — recuerda el truco con la flecha de la semana 11.
- Nunca hagas `reservas.push(...)` ❌ — crea un array nuevo: `[...reservas, nueva]` ✅.
- Para eliminar: `reservas.filter((r) => r.id !== id)`.
- El `id` de cada reserva debe ser único: `crypto.randomUUID()` es perfecto.

**✍️ Documenta (obligatorio):**

1. ¿Por qué no mutar el array directamente con `push`?
2. ¿Qué le pasa a tus reservas si recargas la página sin `localStorage`? 🙃
3. ¿Dónde pones la lógica de guardar y por qué?

---

### 🔴 F3 — Catálogo inteligente: ordenar + detalle

**Reto 1 — Ordenar:** agrega un control **"Ordenar por"** (un `<select>`) con:

- Precio: menor a mayor · Precio: mayor a menor
- Hora de salida · Avión (A–Z)

La lista de vuelos se reordena al instante según la opción elegida.

**Reto 2 — Detalle:** al seleccionar una tarjeta, el formulario de F1 muestra el vuelo como "detalle" (avión, hora, precio). La tarjeta seleccionada se **resalta** visualmente.

**🧠 Conceptos que refuerza:** arrays y **copia con spread** (`[...vuelos]`), `.sort()` con comparadores, estado derivado (la lista ordenada se calcula), estado para el orden, composición.

> 🛟 **Guía de ayuda → F3:** consulta la sección **🔴 La teoría para F3** de la **[guía de ayuda](guia-ayuda-proyecto-final.md)** (`.sort()` sobre copia, `localeCompare`, clase condicional) antes de codificar.

**📌 Pistas:**

- **¡Cuidado!** `.sort()` modifica el array original. Siempre ordena una **copia**: `[...vuelos].sort(...)`.
- Comparadores numéricos: `a.precio - b.precio`. Texto: `a.avion.localeCompare(b.avion)`.
- El estado `orden` vive en `App` (junto a `origen`/`destino`) — es el dato que necesita la lista.
- "Tarjeta seleccionada": estado `seleccionado` en `App` + una clase CSS condicional (`seleccionada`).

**✍️ Documenta (obligatorio):**

1. ¿Por qué hay que ordenar una **copia** del array y no el original?
2. ¿Qué pasó con el orden al cambiar de ruta? ¿Se mantiene? (debería: el estado `orden` persiste)
3. ¿Cómo le avisa la tarjeta a `App` que fue seleccionada?

---

## 🧩 Fase 3 — Verifica que todo funciona

### ✅ Checklist manual (probá en el navegador)

- [ ] Buscar ruta sigue funcionando (p. ej. Medellín → Bogotá aparece 1 vuelo)
- [ ] El **destino nunca lista el origen** elegido
- [ ] F1: cambiar pasajeros o clase **actualiza el total al instante** (`260.000 × 2 × 1.6 = 832.000`)
- [ ] F1: sin nombre, botón Reservar **deshabilitado**
- [ ] F2: al reservar, aparece en **Mis reservas** con su fecha
- [ ] F2: **recargar la página → las reservas siguen**
- [ ] F2: 🗑️ elimina la reserva; sin reservas, se ve el estado vacío
- [ ] F3: cada opción de "Ordenar por" **reordena** la lista
- [ ] Cambiar de ruta no rompe ni el orden ni lo anterior

### ✅ Criterio de aceptación obligatorio

En tu terminal, **sin errores**:

```bash
npm run lint
npm run build
```

> 🚫 **No es obligatorio** refactorizar lo que ya funciona (Header, Footer, SelectorRuta, SelectCiudad). Usa la estructura de componentes de la semana 14 tal como está, y agrega lo nuevo encima.

---

## 🧩 Fase 4 — Documenta el proyecto

Crea o actualiza tu **README.md** con una sección **"Proyecto Final"** que incluya:

1. Qué hace la app (2–3 líneas) y el árbol de componentes.
2. Las **respuestas ✍️** de las tres funcionalidades (F1, F2, F3).
3. Cómo correr la app: `npm install` (solo la primera vez) y `npm run dev`.
4. Un párrafo con tu **decisión de diseño** más importante y por qué la tomaste.

---

## 🚀 Entrega (GitHub)

Cada estudiante/pareja entrega el **link de su repo** con la app completa. La entrega se hace en **2 momentos**: primero se sube el código base de AeroCol (lo desarrollado en clase), y luego se agregan las 3 funcionalidades nuevas.

### 🗂️ Momento 1 — Crea el repo y sube la base de AeroCol

1. **Crear el repositorio:** en GitHub → *New repository* (botón **+** → *New repository*), nómbralo `aerocol-reservas` y selecciona **Public** (debe ser **público** para que el docente pueda verlo sin permisos). **No** marques *Add a README* ni *.gitignore* (para evitar conflictos al subir tu proyecto).

2. **Subir la base de clase:** tu app AeroCol de la semana 14, tal como quedó en clase. Sube todo el proyecto **excepto** `node_modules/`:
   - Podrás **subirla arrastrando**: GitHub → *Add file → Upload files* → arrastra los archivos de tu carpeta (sin `node_modules/`) → *Commit changes*.
   - O con **Git (recomendado)**: una vez creado el repo, desde tu carpeta del proyecto:

     ```bash
     git init
     git add .
     git commit -m "Base AeroCol (semana 14)"
     git push -u origin main
     ```

3. **Verifica:** en tu repo aparecen `src/App.jsx`, `src/components/`, `src/data/vuelos.js` y `index.html` — sin `node_modules/`.

> ✅ **Hito 1 cumplido:** tu repo tiene la base AeroCol funcionando. A partir de aquí trabajas sobre este código (localmente) y le vas agregando las 3 funcionalidades.

### ✨ Momento 2 — Agrega las 3 funcionalidades

Sobre la base ya subida, desarrolla la **Fase 2** del proyecto (F1 → F2 → F3) en tu copia local. Puedes subir cada funcionalidad terminada como un commit aparte (buena práctica), por ejemplo:

```bash
git add .
git commit -m "F1: formulario de reserva"
git push
```

Al completar las tres:

```bash
git add .
git commit -m "F2: mis reservas + F3: catálogo inteligente"
git push
```

> 💡 Subir por partes no es obligatorio, pero deja evidencia de **tu proceso** — y en la defensa oral puedes mostrar cómo fuiste construyendo cada funcionalidad paso a paso. 😉

### ✅ Antes de entregar

- [ ] `npm run lint` y `npm run build` pasan **sin errores**
- [ ] En el repo están: `src/App.jsx`, `src/components/`, `src/data/vuelos.js`, `README.md`
- [ ] Las 3 funcionalidades funcionan en tu copia local (`npm run dev`)
- [ ] Comparte el **link** del repo en el campo de entrega de la plataforma

> ⚠️ **Fecha límite: jueves 26 de noviembre de 2026 · 5:00 pm.**

---

## 🗣️ Defensa oral (5–7 min + preguntas)

> ⚠️ La sustentación vale **el 50% de la nota** (ver la rúbrica). No es un trámite: es la mitad de tu proyecto.
> 🛟 **Preparación:** la sección **🗣️ Pre-defensa** de la **[guía de ayuda](guia-ayuda-proyecto-final.md)** tiene las 5 preguntas para practicar, con sus respuestas esperadas de argumentación.

En la última clase harás una **demo corta de tu app** y responderás preguntas. Prepara:

1. Enseñar el flujo completo: buscar → reservar → ver mis reservas → recargar.
2. Explicar **dónde vive cada estado** y por qué (puntos de la Fase 1).
3. Explicar **una** decisión de diseño que tomaste y su alternativa descartada.

Posibles preguntas:
- ¿Por qué el total se calcula y no se guarda en un estado?
- ¿Qué le pasa al array de reservas si nunca usáramos inmutabilidad?
- ¿Qué tendrías que cambiar si mañana agregamos "fecha del viaje"?
- Falló algo en la demo… ¿Dónde buscarías el error? (muestra tu proceso 😉)

---

## 🏁 Resumen de entregables

| # | Entregable | Dónde |
|---|------------|-------|
| 1 | Fase 1: análisis + árbol | `docs/` en tu repo |
| 2 | Código: F1 + F2 + F3 | `src/` |
| 3 | README con documentación ✍️ | `README.md` |
| 4 | Link del repo + defensa oral | plataforma + clase |

¡Mucha suerte! Este proyecto usa **todo lo que aprendiste en el curso** — y el día de la defensa vas a darte cuenta de cuánto sabes. 🎉