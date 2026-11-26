/*
  PROYECTOS DEL PORTFOLIO
  ------------------------------------------------------------
  Para añadir un proyecto nuevo, copia uno de los bloques { ... }
  y cambia sus textos. El orden de esta lista es el orden en la web.

  - slug:       identificador corto, sin espacios ni tildes (va en la URL: #p-slug)
  - featured:   true para que tenga composición propia en la portada
                (de momento solo Spotify y Conexia)
  - discipline: una sola disciplina; sirve para los filtros de la página Proyectos
  - year:       déjalo en "" si no quieres mostrarlo
  - lead:       la pregunta o decisión que abre el caso
  - embed:      enlace de "Publicar en la web" de Power BI (se carga al pulsar)
  - demo:       ruta a una web interactiva propia dentro de /demos
  - pending:    notas internas de lo que falta. Ya no se muestran en la web.
*/
window.PROJECTS = [
  {
    slug: "spotify-tendencias",
    featured: true,
    title: "Tendencias de Spotify 2023–2025",
    kicker: "Informe interactivo en Power BI",
    discipline: "Datos y BI",
    year: "",
    tools: ["Power BI", "Marcadores", "Visuales personalizados"],
    summary:
      "Un informe de nueve páginas que cruza los rankings de Spotify, global y de España, de 2023 a 2025.",
    lead: {
      label: "Pregunta de análisis",
      text: "¿Qué canciones y artistas lideraron Spotify entre 2023 y 2025, en el mundo y en España?",
    },
    cover: "assets/img/spotify-cover.webp",
    coverAlt: "Portada del informe de tendencias de Spotify en Power BI.",
    embed:
      "https://app.powerbi.com/view?r=eyJrIjoiMmQ5Y2ViMzItZjVhZi00ZDUyLWIzMDctY2EyYTIwNGZmNDgwIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=ba59c7f6a372d3d3be10",
    role: "Modelo de datos y diseño del informe",
    facts: [
      ["4", "rankings: Top Diario y Top Semanal, global y España"],
      ["3", "años comparados con un calendario común"],
      ["9", "páginas, de la portada a la metodología"],
    ],
    sections: [
      {
        h: "Los datos",
        p: [
          "El modelo une los rankings Top Diario y Top Semanal, global y de España, con una tabla de los artistas más escuchados por mes, una de canciones más reproducidas y un calendario común para comparar periodos.",
        ],
      },
      {
        h: "Cómo se recorre",
        list: [
          "Una portada y una página por año: 2023, 2024 y 2025.",
          "Páginas de detalle para 2024 y 2025, con un selector visual por portada de álbum.",
          "Un corte semanal con el Top 5 global.",
          "Una página de fuentes y metodología.",
        ],
      },
      {
        h: "Qué se puede ver",
        list: [
          "Top 4 de artistas por reproducciones de la muestra.",
          "Reproducciones acumuladas por mes de lanzamiento: columnas para el total y una línea para la media por registro.",
          "Días con más oyentes.",
          "Rasgos de audio de cada canción: alegría, energía, si es bailable o instrumental.",
        ],
      },
    ],
    gallery: [],
    pending: ["Año en que lo hiciste y si fue para una asignatura o por tu cuenta."],
  },
  {
    slug: "ventas-vinos",
    bi: true,
    title: "Análisis comercial de una empresa de vinos",
    kicker: "Caso de estudio de Business Intelligence",
    discipline: "Datos y BI",
    year: "",
    tools: ["Power BI", "Power Query", "DAX"],
    summary:
      "De dos Excel a un informe en Power BI: preparación de datos, modelo dimensional, nueve medidas DAX y un análisis de 162.083 ventas.",
    meta: "Caso de estudio de Business Intelligence con Power BI: Power Query, modelo dimensional, medidas DAX e inteligencia temporal sobre 162.083 ventas de vino.",
    cover: "assets/img/vinos-cover.webp",
    coverAlt: "Portada del informe de ventas de vinos de una bodega.",
    embed:
      "https://app.powerbi.com/view?r=eyJrIjoiOGE3MGQ4NjItNzc3Yi00NjEwLWJhY2EtNzgwMmVjNjA5MDljIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=0a5e76b44031ca11d015",
    demoLabel: "Recorre el informe: usa los filtros y cambia de página. Se carga desde Power BI.",
    role: "Datos, modelo, DAX e informe",
    sections: [],
    gallery: [],
    pending: ["Año en que se hizo."],
  },
  {
    slug: "conexia",
    featured: true,
    title: "Conexia",
    kicker: "Panel para administración de fincas",
    discipline: "Producto",
    year: "",
    tools: ["HTML, CSS y JavaScript", "Diseño de interfaz"],
    summary:
      "Un panel web para quien administra varias comunidades de vecinos: incidencias, comunicaciones, documentos y firmas en un mismo sitio.",
    lead: {
      label: "Decisión de diseño",
      text: "Al abrir el panel, lo primero es qué incidencia urgente atender.",
    },
    cover: "assets/img/conexia-cover.webp",
    coverAlt: "Panel general de Conexia con incidencias urgentes, cifras de la cartera y actividad reciente.",
    notes: [
      { x: 68.4, y: 14.6, t: "Aviso de urgentes", d: "2 incidencias urgentes y cuántas siguen sin técnico, con un único botón para revisarlas." },
      { x: 25.5, y: 35.5, t: "La cartera en cifras", d: "Comunidades, incidencias abiertas y firmas pendientes. Cada cifra lleva a su listado." },
      { x: 42, y: 54, t: "Estado de cada caso", d: "«En gestión» o «Sin asignar» junto a cada incidencia, para ver qué falta sin entrar." },
      { x: 84, y: 91, t: "Firmas en curso", d: "Cada acta muestra cuántos vecinos han firmado (3 de 8) y la fecha límite." },
    ],
    demo: "demos/conexia/index.html",
    demoLabel: "Entra en comunidades, incidencias o firmas. Todos los nombres y datos son de demostración.",
    role: "Diseño y prototipo",
    sections: [
      {
        h: "El reto",
        p: [
          "Quien administra fincas lleva muchas comunidades a la vez. Tiene que saber qué es urgente sin abrir cada una: un ascensor parado, una fuga, un acta sin firmar.",
        ],
      },
      {
        h: "Cómo se organiza",
        p: ["El panel general resume y prioriza. Desde ahí se entra a cada módulo:"],
        list: [
          "Comunidades, con su estado: requiere atención, en seguimiento o al día.",
          "Incidencias, con urgencia, estado y técnico asignado.",
          "Comunicaciones y documentos.",
          "Seguimiento de firmas: quién ha firmado y a quién le falta.",
        ],
      },
    ],
    gallery: [
      ["assets/img/conexia-firmas.webp", "Seguimiento de firmas de un acta, filtrado por vecinos pendientes."],
      ["assets/img/conexia-tablas.webp", "Vista de tablas del panel."],
    ],
    pending: ["Contexto: asignatura, encargo o proyecto propio, y año."],
  },
  {
    slug: "sentimix",
    title: "Sentimix",
    kicker: "Experiencia inmersiva en Madrid",
    discipline: "Innovación",
    year: "",
    tools: ["Modelo de negocio", "Web con maqueta 3D"],
    summary:
      "Un espacio para viajar a otro país con los cinco sentidos, pensado sobre todo para centros educativos. La edición de ejemplo es Japón.",
    cover: "assets/img/sentimix-cover.webp",
    coverAlt: "Portada de la web de Sentimix con un templo japonés entre cerezos.",
    demo: "demos/sentimix/index.html",
    demoLabel: "Gira la maqueta 3D, cambia de estación y simula el precio para un grupo.",
    role: "Proyecto académico",
    sections: [
      {
        h: "La propuesta",
        p: [
          "Sentimix es una experiencia para descubrir otras culturas a través de sus paisajes, sonidos, aromas, texturas y sabores, sin salir de Madrid. El local se recorre en cinco estaciones, una por sentido, y el destino cambia cada semestre.",
        ],
      },
      {
        h: "Para quién",
        p: [
          "El público principal son los centros de Secundaria y Bachillerato: una salida que conecta geografía, historia y diversidad cultural. También hay modalidades para público general y eventos privados.",
        ],
        list: [
          "Antes de la visita, el profesorado conecta el destino con lo que trabaja en clase.",
          "Durante la visita, el equipo acompaña al grupo por las cinco estaciones.",
          "De vuelta al aula, el grupo comparte lo que ha descubierto.",
        ],
      },
      {
        h: "La web",
        p: [
          "Incluye una maqueta 3D del local, un plano por zonas, un recorrido guiado y un simulador de precio para grupos de hasta 25 personas: 10 € por persona para centros educativos y 15 € para el resto. La simulación no hace pagos ni reservas reales.",
        ],
      },
    ],
    gallery: [
      ["assets/img/sentimix-maqueta.webp", "Maqueta 3D del local con las cinco estaciones."],
      ["assets/img/sentimix-sala-3.webp", "Recreación de la estación del olfato."],
      ["assets/img/sentimix-sala-5.webp", "Recreación de la estación del gusto."],
    ],
    pending: ["Tu papel concreto en el equipo, la asignatura y el año."],
  },
  {
    slug: "sermas-citas",
    bpm: true,
    title: "Rediseño del proceso de gestión de citas médicas del SERMAS",
    kicker: "Ingeniería de Procesos de Negocio · URJC",
    discipline: "Procesos",
    year: "2024–2025",
    tools: ["BPMN 2.0", "Business Model Canvas", "e3value", "Process Landscape"],
    meta: "Caso de estudio BPM: análisis del proceso de citas médicas del SERMAS con Canvas, e3value y Process Landscape, modelos BPMN AS-IS y TO-BE y cuatro mejoras propuestas.",
    summary:
      "Ciclo BPM completo sobre la gestión de citas en atención primaria: del Canvas y el e3value a los modelos AS-IS y TO-BE, con cuatro mejoras y cómo medirlas.",
    cover: "assets/img/sermas-cover.webp",
    coverAlt: "Portada de la web del proyecto de gestión de citas médicas.",
    demo: "demos/sermas/index.html",
    demoLabel: "Compara el proceso actual con el propuesto y prueba la simulación de la lista de espera.",
    role: "Trabajo en grupo",
    sections: [
      {
        h: "El problema",
        p: [
          "La cita conecta al paciente con el sistema del SERMAS, el personal administrativo y el sanitario. En el análisis encontramos cuatro problemas:",
        ],
        list: [
          "Demoras y saturación de los canales.",
          "Dificultades de acceso digital.",
          "Poca flexibilidad para cambiar o cancelar una cita.",
          "Huecos de agenda que pueden quedar sin cubrir.",
        ],
      },
      {
        h: "Método",
        p: [
          "Identificación y análisis con modelo Canvas, e3value y mapa de procesos; descubrimiento del proceso actual en BPMN (AS-IS) y rediseño (TO-BE).",
        ],
      },
      {
        h: "El rediseño",
        list: [
          "Mensaje y devolución de llamada, para descongestionar el teléfono.",
          "Franja horaria recomendada al pedir cita.",
          "Aviso automático a la lista de espera cuando se libera un hueco.",
        ],
      },
      {
        h: "Cómo medirlo",
        p: [
          "Un cuadro de mando con tres indicadores: tiempo medio desde la solicitud hasta la confirmación, porcentaje de cancelaciones y huecos cubiertos gracias a la lista de espera. Se completa con alertas operativas y una encuesta tras la cita.",
        ],
      },
    ],
    gallery: [
      ["assets/img/sermas-bpmn.webp", "Proceso actual (AS-IS) en BPMN."],
      ["assets/img/sermas-canvas.webp", "Modelo Canvas del servicio."],
      ["assets/img/sermas-e3value.webp", "Modelo e3value: intercambios de valor entre actores."],
    ],
    pending: ["Año y tu parte dentro del grupo."],
  },
  {
    slug: "emoi",
    title: "Emoi",
    kicker: "App Android",
    discipline: "Producto",
    year: "",
    tools: ["Kotlin", "Android Studio"],
    summary:
      "Un diario emocional: registras cómo te sientes cada día, añades una nota si quieres y ves el resumen de tu semana.",
    cover: "assets/img/emoi-icon.webp",
    coverAlt: "Logotipo de la app Emoi.",
    coverFit: "contain",
    demo: "demos/emoi/index.html",
    demoLabel: "Recreación web de la app: elige cómo te sientes y mira cómo se guarda tu historial.",
    role: "Diseño y desarrollo",
    sections: [
      {
        h: "Qué hace",
        list: [
          "Pregunta «¿Cómo te sientes hoy?» y guarda el estado de ánimo con una nota opcional.",
          "Resume los últimos 7 días.",
          "Muestra el historial y permite borrar un registro o todo, siempre con confirmación.",
          "Tiene modo oscuro.",
        ],
      },
      {
        h: "Cómo está hecha",
        p: [
          "Es una app nativa en Kotlin. Los registros se guardan en el propio móvil y la parte de almacenamiento tiene sus propias pruebas automáticas. La versión actual es la 2.0.",
        ],
      },
    ],
    gallery: [],
    pending: ["2 o 3 capturas de la app en el móvil.", "Contexto (asignatura o proyecto personal) y año."],
  },
];
