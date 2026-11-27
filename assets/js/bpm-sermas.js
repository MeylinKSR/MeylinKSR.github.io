/*
  CASO DE ESTUDIO BPM · Gestión de citas médicas del SERMAS
  ------------------------------------------------------------
  Contenido comprobado con la memoria, la presentación, el enunciado y los
  archivos BPMN originales (assets/bpmn/). Los identificadores de las
  actividades son los reales de los XML.
  No se publica la memoria en PDF: contiene datos personales.
*/
window.BPM_CASES = window.BPM_CASES || {};
window.BPM_CASES["sermas-citas"] = {
  eyebrow: "Caso de estudio · Ingeniería de procesos",
  title: "Rediseño del proceso de gestión de citas médicas del SERMAS",
  sub: "Aplicación del ciclo de vida BPM para analizar y optimizar un servicio público sanitario.",
  meta: [
    ["Asignatura", "Ingeniería de Procesos de Negocio"],
    ["Grado", "Ciencia, Gestión e Ingeniería de Servicios · URJC"],
    ["Curso", "2024–2025"],
    ["Formato", "Trabajo en grupo"],
    ["Métodos", "BPM, BPMN, Business Model Canvas, e3value, Process Landscape"],
  ],
  disclaimer: "Es una propuesta académica de análisis y rediseño. No es una consultoría para el SERMAS ni algo implantado en el sistema sanitario: no teníamos acceso a la ejecución real del proceso ni a datos internos, y el enunciado permitía trabajar con suposiciones justificadas.",

  /* Ciclo BPM: índice del caso */
  cycle: [
    { n: "Identificación", go: "smIdent", d: "Ver qué procesos tiene la organización y elegir cuál mejorar." },
    { n: "Descubrimiento", go: "smAsis", d: "Representar cómo funciona hoy el proceso elegido: el modelo AS-IS." },
    { n: "Análisis", go: "smAnalisis", d: "Detectar dónde se pierde tiempo, dinero o calidad, y qué se podría medir." },
    { n: "Rediseño", go: "smRediseno", d: "Proponer mejoras y dibujar cómo quedaría el proceso: el modelo TO-BE." },
    { n: "Implementación", go: "smImpl", d: "Describir qué tendría que cambiar en la organización y en la tecnología." },
    { n: "Monitorización", go: "smKpi", d: "Definir cómo comprobar si las mejoras funcionan, y volver a empezar." },
  ],
  cycleIntro: "BPM (Business Process Management) sirve para entender, gestionar y mejorar los procesos de forma continua: la monitorización alimenta una nueva identificación. Cada fase lleva a su parte del caso.",

  rail: [
    ["smClave", "En corto"], ["smReto", "El reto"], ["smOrg", "La organización"], ["smIdent", "Identificación"], ["smAsis", "AS-IS"],
    ["smAnalisis", "Análisis"], ["smRediseno", "Rediseño"], ["smSim", "Probar las mejoras"], ["smImpl", "Implementación"],
    ["smKpi", "Monitorización"], ["smYo", "Resultado"],
  ],

  reto: {
    why: ["Es el primer contacto de la ciudadanía con el sistema sanitario.", "Se usa con mucha frecuencia y en gran volumen.", "Influye directamente en la experiencia del paciente."],
    issues: ["Tiempos de espera largos, sobre todo en atención primaria.", "Canales saturados en horas punta (teléfono y web).", "Poca flexibilidad para cambiar o cancelar una cita.", "Barreras de acceso digital para algunos colectivos.", "Descoordinación entre sistemas de distintos centros."],
    issuesNote: "Son los problemas que planteamos al empezar, a partir de información pública y suposiciones. No son un diagnóstico oficial del SERMAS.",
    brief: "La práctica pedía elegir una organización real con cierta complejidad (al menos un actor además de la organización y sus clientes) y recorrer el ciclo BPM completo: memoria, modelos BPMN originales y una exposición de 10 minutos.",
  },

  /* Business Model Canvas (contenido de la figura original) */
  canvas: {
    img: "assets/img/sermas/canvas.webp",
    blocks: [
      { a: "kp", n: "Asociaciones clave", q: "¿Con quién colabora?", i: ["Ministerio de Sanidad", "Farmacias", "Consejería de Sanidad", "Proveedores de material sanitario y tecnológico"] },
      { a: "ka", n: "Actividades clave", q: "¿Qué tiene que hacer bien?", i: ["Atender a los pacientes", "Hacer diagnósticos", "Tratar a las personas enfermas", "Gestionar emergencias médicas"] },
      { a: "kr", n: "Recursos clave", q: "¿Qué necesita para hacerlo?", i: ["Personal sanitario y administrativo", "Instalaciones médicas y equipamiento tecnológico", "Medicamentos"] },
      { a: "vp", n: "Propuesta de valor", q: "¿Qué ofrece?", i: ["Atención médica universal, gratuita y de calidad, lo más cercana posible a la población"] },
      { a: "cr", n: "Relación con los clientes", q: "¿Cómo se relaciona con ellos?", i: ["Atención en consulta", "Atención telefónica", "Comunicaciones digitales"] },
      { a: "ch", n: "Canales", q: "¿Por dónde llega?", i: ["Centros de salud", "Hospitales", "Web y app del SERMAS", "Atención telefónica"] },
      { a: "cs", n: "Segmentos de clientes", q: "¿A quién sirve?", i: ["La población residente en la Comunidad de Madrid, de todas las edades, condiciones y situaciones sociales"] },
      { a: "co", n: "Estructura de costes", q: "¿En qué gasta?", i: ["Mantenimiento de la web y la app", "Oficinas (alquiler, agua, luz, internet)", "Salarios del personal", "Compras de tecnología y medicamentos"] },
      { a: "rs", n: "Fuentes de ingresos", q: "¿Cómo se financia?", i: ["Dinero público (impuestos)"] },
    ],
  },

  /* e3value: representación simplificada de la figura original */
  e3: {
    img: "assets/img/sermas/e3value.webp",
    actors: [
      { id: "pac", n: "Pacientes", k: "Segmento de mercado", x: 300, y: 20, d: "Inician el intercambio al pedir cita." },
      { id: "ser", n: "SERMAS", k: "Actor", x: 300, y: 190, d: "Dos actividades de valor: atención sanitaria y gestión de citas." },
      { id: "sis", n: "Sistema SERMAS", k: "Actor", x: 590, y: 190, d: "Provee y mantiene la plataforma. En el texto de la memoria se describe como una empresa especializada externa." },
      { id: "adm", n: "Personal administrativo", k: "Actor", x: 110, y: 360 },
      { id: "san", n: "Personal sanitario", k: "Actor", x: 490, y: 360 },
    ],
    ex: [
      { a: "pac", b: "ser", ab: "Información personal", ba: "Atención médica" },
      { a: "ser", b: "sis", ab: "Pago por plataforma", ba: "Plataforma tecnológica" },
      { a: "adm", b: "ser", ab: "Servicios laborales", ba: "Salario" },
      { a: "san", b: "ser", ab: "Servicios laborales", ba: "Salario" },
    ],
    note: "Versión simplificada para explorarla. Es nuestra conceptualización académica, no una auditoría de contratos o pagos reales.",
  },
  orgCompare: [["Canvas", "Cómo funciona la organización en conjunto: qué ofrece, a quién, con qué recursos y cómo se financia."], ["e3value", "Qué se intercambian los participantes del servicio de citas: quién da qué y qué recibe a cambio."]],

  /* Arquitectura de procesos (nombres del texto de la memoria) */
  landscape: {
    imgs: [["assets/img/sermas/landscape-1.webp", "Arquitectura de procesos (versión 1)"], ["assets/img/sermas/landscape-2.webp", "Arquitectura de procesos (versión 2)"]],
    levels: [
      { n: "Gestión y administración", d: "Marcan la dirección, el cumplimiento legal y la relación con otras entidades.", p: ["Planificación estratégica sanitaria", "Gestión presupuestaria y financiera", "Relaciones institucionales", "Cumplimiento normativo y legal", "Gestión de riesgos y calidad asistencial", "Comunicación institucional y campañas públicas"] },
      { n: "Core", d: "Generan valor directamente para los pacientes.", p: ["Atención médica primaria", "Atención especializada y hospitalaria", "Urgencias y emergencias", "Atención domiciliaria", "Programas de salud pública", "Gestión de citas médicas"], sel: "Gestión de citas médicas" },
      { n: "Soporte", d: "Hacen que todo funcione, aunque no generen valor directo.", p: ["Gestión de personal sanitario y administrativo", "Gestión de infraestructuras", "Tecnologías de la información y comunicaciones", "Gestión logística", "Gestión económica y contable", "Formación y desarrollo del personal"] },
    ],
    chain: ["Petición de la cita", "Confirmación de la cita", "Registro de la cita"],
    chainTo: ["Atención médica primaria", "Atención especializada y hospitalaria"],
    chainNote: "Así lo dibujamos en la segunda versión de la arquitectura: la gestión de citas se descompone en petición, confirmación y registro, y la confirmación da paso a la atención primaria o a la especializada.",
    why: ["Es el primer punto de contacto con el sistema y condiciona el acceso a la atención.", "Intervienen varios actores: paciente, personal administrativo y sanitario, sistemas del SERMAS y canales como la app, la web o el teléfono.", "Es muy repetitivo y de alto volumen, así que cualquier mejora se nota en todo el sistema."],
  },

  ficha: [
    ["Nombre", "Gestión de cita médica"],
    ["Objetivo", "Facilitar al ciudadano el acceso a la atención médica con la reserva de una cita."],
    ["Evento inicial", "El ciudadano solicita una cita (app, web, teléfono o en persona)."],
    ["Evento final", "Confirmación de la cita en el sistema y comunicación al paciente (correo, SMS…)."],
    ["Entradas", "Solicitud de cita · identificación del paciente · disponibilidad de agenda"],
    ["Salidas", "Cita asignada o justificación de no disponibilidad"],
    ["Actores", "Paciente · personal administrativo · personal sanitario · sistemas TIC del SERMAS"],
    ["Puntos críticos", "Demoras · saturación · cancelaciones · sobrecarga de agendas · barreras digitales · fallos informáticos"],
    ["KPI", "Tiempo medio de asignación · ratio de cancelaciones · nivel de satisfacción"],
  ],
  fichaScope: "La ficha cubre el proceso completo, con todos sus canales. Los modelos BPMN se centran en dos recorridos: la web o la app y el teléfono.",

  /* BPMN */
  bpmn: {
    files: { asis: "assets/bpmn/cita-medica-as-is.bpmn", tobe: "assets/bpmn/cita-medica-to-be.bpmn" },
    counts: [
      ["Pools", 2, 2], ["Carriles", 3, 3], ["Tareas", 31, 38], ["Compuertas exclusivas", 6, 9], ["Compuertas paralelas", 0, 1],
      ["Eventos de inicio", 1, 1], ["Eventos intermedios", 11, 12], ["Eventos de fin", 3, 4],
      ["Flujos de secuencia", 42, 57], ["Flujos de mensaje", 17, 18], ["Almacenes de datos", 2, 2],
    ],
    countsNote: "Contados directamente en los XML. Más tareas o compuertas no significa por sí mismo más o menos eficiencia: el TO-BE añade caminos para situaciones que el AS-IS no contemplaba.",
    asisText: [
      "El proceso empieza cuando el paciente detecta una necesidad médica y elige cómo pedir la cita: por la web o la app, o por teléfono.",
      "El modelo tiene dos pools: el paciente y el centro médico, que se divide en tres carriles (sistema SERMAS, personal administrativo y personal sanitario). Por la web, el sistema autentica al paciente, muestra la disponibilidad, bloquea el turno y envía la confirmación. Por teléfono, el personal administrativo toma los datos, consulta la agenda y registra la cita.",
      "El AS-IS ya incluye un recordatorio automático 24 horas antes de la cita y la posibilidad de cancelarla.",
    ],
    els: {"asis": {"Gateway_0p3k7lv": ["Elegir", "exclusiveGateway", "Paciente"], "StartEvent_16zsksa": ["Necesidad médica detectada", "startEvent", "Paciente"], "Activity_1m1nh35": ["Seleccionar tipo de cita", "task", "Paciente"], "Gateway_04w2g06": ["", "exclusiveGateway", "Paciente"], "Gateway_0we7qxu": ["", "exclusiveGateway", "Paciente"], "Activity_1nv0r9g": ["Llamar por teléfono", "task", "Paciente"], "Gateway_06eo0vs": ["Cancelar", "exclusiveGateway", "Paciente"], "Activity_0gsz1eg": ["Solicitar cancelación de cita", "task", "Paciente"], "Activity_0s1ux30": ["Aceptar cita", "task", "Paciente"], "Event_1euptrh": ["Cancelación enviada", "intermediateThrowEvent·message", "Paciente"], "Event_1bo4mlj": ["Recordatorio recibido", "intermediateCatchEvent·message", "Paciente"], "Gateway_158674i": ["Cancelar", "exclusiveGateway", "Paciente"], "Activity_0dz0r5y": ["Rechazar", "task", "Paciente"], "Event_1hycbpc": ["Cita confirmada", "endEvent", "Paciente"], "Activity_1vi6smi": ["Aceptar", "task", "Paciente"], "Event_1tlp0yr": ["Cancelación enviada", "intermediateThrowEvent·message", "Paciente"], "Activity_0r083dg": ["Preguntar disponibilidad", "task", "Paciente"], "Activity_13lfa36": ["Mirar disponibilidad", "task", "Paciente"], "Activity_0z8m0fe": ["Seleccionar fecha y hora", "task", "Paciente"], "Activity_1m9ouwl": ["Acceder página web o app", "task", "Paciente"], "Activity_0sg53jx": ["Autentificar usuario", "task", "Paciente"], "Activity_1oqq7pw": ["Confirmar cita", "task", "Paciente"], "Activity_1dvz9jq": ["Comunicar elección de cita", "task", "Paciente"], "Event_0lwnf4y": ["Cita confirmada", "intermediateThrowEvent·message", "Paciente"], "Gateway_1n3q44n": ["Autentificar", "exclusiveGateway", "Sistema sermas"], "Activity_1jb0ght": ["Comunicar error", "task", "Sistema sermas"], "Event_0fxvkfy": ["Acceso denegado", "endEvent·message", "Sistema sermas"], "Activity_0p1re4e": ["Dar acceso al sistema", "task", "Sistema sermas"], "Event_0cntqb5": ["Confirmación de cita recibida", "intermediateCatchEvent·message", "Sistema sermas"], "Activity_00gdubd": ["Enviar confirmación", "task", "Sistema sermas"], "Activity_0tesgzk": ["Programar recordatorio", "task", "Sistema sermas"], "Event_068l0d4": ["Confirmación enviada", "intermediateThrowEvent·message", "Sistema sermas"], "Event_15idift": ["24 horas antes de la cita", "intermediateCatchEvent·timer", "Sistema sermas"], "Activity_06atj9l": ["Enviar recordatorio", "task", "Sistema sermas"], "Event_1nxwzn0": ["Recordatorio enviado", "intermediateThrowEvent·message", "Sistema sermas"], "Activity_1sks2bo": ["Cancelar cita del paciente", "task", "Sistema sermas"], "Event_063wdjt": ["Confirmación de cancelación enviada", "endEvent·message", "Sistema sermas"], "Activity_048p8cr": ["Atender llamada", "task", "Personal administrativo"], "Event_02aya9r": ["Solicitud de disponibilidad recibida", "intermediateCatchEvent·message", "Sistema sermas"], "Activity_0o9xbtz": ["Gestionar autenticación", "task", "Sistema sermas"], "Activity_1hiaczp": ["Validar identidad y acceso", "task", "Sistema sermas"], "Activity_0sa9hln": ["Preguntar el tipo de cita", "task", "Personal administrativo"], "Event_139w0yl": ["Solicitud de disponibilidad recibida", "intermediateCatchEvent·message", "Personal administrativo"], "Activity_0uaocs4": ["Consultar disponiblidad", "task", "Sistema sermas"], "Activity_019jtas": ["Mostrar citas disponibles", "task", "Sistema sermas"], "Activity_1t1v5vp": ["Comunicar citas disponibles", "task", "Personal administrativo"], "Activity_09c5wmr": ["Consultar disponibilidad", "task", "Personal administrativo"], "Event_1ghqveb": ["Elección de cita recibida", "intermediateCatchEvent·message", "Personal administrativo"], "Activity_1awg0n7": ["Confirmar cita asignada", "task", "Personal administrativo"], "Activity_0n7e7pc": ["Registrar cita en el sistema", "task", "Personal administrativo"], "DataStoreReference_1yw49tq": ["Disponibilidad médica", "dataStoreReference", "Centro médico"], "DataStoreReference_1ygkq0t": ["Disponibilidad médica", "dataStoreReference", "Centro médico"], "Activity_0pgsvst": ["Bloquear turno del paciente", "task", "Sistema sermas"], "Activity_06unvjf": ["Tomar datos del paciente", "task", "Personal administrativo"]}, "tobe": {"Gateway_0p3k7lv": ["Elegir", "exclusiveGateway", "Paciente"], "StartEvent_16zsksa": ["Necesidad médica detectada", "startEvent", "Paciente"], "Gateway_04w2g06": ["", "exclusiveGateway", "Paciente"], "Gateway_0we7qxu": ["", "exclusiveGateway", "Paciente"], "Activity_1nv0r9g": ["Llamar por teléfono", "task", "Paciente"], "Gateway_06eo0vs": ["Cancelar", "exclusiveGateway", "Paciente"], "Activity_0gsz1eg": ["Solicitar cancelación de cita", "task", "Paciente"], "Activity_0s1ux30": ["Aceptar cita", "task", "Paciente"], "Event_1euptrh": ["Cancelación enviada", "intermediateThrowEvent·message", "Paciente"], "Event_1bo4mlj": ["Recordatorio recibido", "intermediateCatchEvent·message", "Paciente"], "Gateway_158674i": ["Cancelar", "exclusiveGateway", "Paciente"], "Activity_0dz0r5y": ["Rechazar", "task", "Paciente"], "Event_1hycbpc": ["Cita confirmada", "endEvent", "Paciente"], "Activity_1vi6smi": ["Aceptar", "task", "Paciente"], "Event_1tlp0yr": ["Cancelación enviada", "intermediateThrowEvent·message", "Paciente"], "Activity_0r083dg": ["Preguntar disponibilidad", "task", "Paciente"], "Activity_13lfa36": ["Mirar disponibilidad", "task", "Paciente"], "Activity_0z8m0fe": ["Seleccionar fecha y hora", "task", "Paciente"], "Activity_1m9ouwl": ["Acceder página web o app", "task", "Paciente"], "Activity_0sg53jx": ["Autentificar usuario", "task", "Paciente"], "Activity_1oqq7pw": ["Confirmar cita", "task", "Paciente"], "Activity_1dvz9jq": ["Comunicar elección de cita", "task", "Paciente"], "Event_0lwnf4y": ["Cita confirmada", "intermediateThrowEvent·message", "Paciente"], "Activity_1m1nh35": ["Seleccionar tipo de cita", "task", "Paciente"], "Event_0cntqb5": ["Confirmación de cita recibida", "intermediateCatchEvent·message", "Sistema sermas"], "Activity_00gdubd": ["Enviar confirmación", "task", "Sistema sermas"], "Activity_0tesgzk": ["Programar recordatorio", "task", "Sistema sermas"], "Event_068l0d4": ["Confirmación enviada", "intermediateThrowEvent·message", "Sistema sermas"], "Event_15idift": ["24 horas antes de la cita", "intermediateCatchEvent·timer", "Sistema sermas"], "Activity_06atj9l": ["Enviar recordatorio automático", "task", "Sistema sermas"], "Event_1nxwzn0": ["Recordatorio enviado", "intermediateThrowEvent·message", "Sistema sermas"], "Activity_1sks2bo": ["Cancelar cita del paciente", "task", "Sistema sermas"], "Activity_019jtas": ["Mostrar citas disponibles", "task", "Sistema sermas"], "Activity_1t1v5vp": ["Comunicar citas disponibles", "task", "Personal administrativo"], "Activity_1awg0n7": ["Confirmar cita asignada", "task", "Personal administrativo"], "Activity_0n7e7pc": ["Registrar cita en el sistema", "task", "Personal administrativo"], "DataStoreReference_1ygkq0t": ["Disponibilidad médica", "dataStoreReference", "Centro médico"], "Activity_0pgsvst": ["Bloquear turno del paciente", "task", "Sistema sermas"], "Activity_06unvjf": ["Tomar datos del paciente", "task", "Personal administrativo"], "Activity_048p8cr": ["Atender llamada", "task", "Personal administrativo"], "Gateway_07c43xs": ["Atender", "exclusiveGateway", "Personal administrativo"], "Activity_003k6d8": ["Reproducir mensaje automático", "task", "Personal administrativo"], "Activity_0yl6st3": ["Registrar número", "task", "Personal administrativo"], "Activity_0bx6vf6": ["Devolver llamada", "task", "Personal administrativo"], "Gateway_1q2mpr2": ["", "exclusiveGateway", "Personal administrativo"], "Event_063wdjt": ["Confirmación de cancelación enviada", "intermediateThrowEvent·message", "Sistema sermas"], "Activity_1hc2f1v": ["Observar lista de espera", "task", "Sistema sermas"], "Gateway_0hl6sqc": ["", "exclusiveGateway", "Sistema sermas"], "Activity_0srkxir": ["Notificar hueco disponible", "task", "Sistema sermas"], "Activity_1lap94h": ["Dejar hueco libre", "task", "Sistema sermas"], "Event_17xc72b": ["Enviar notificación", "endEvent·message", "Sistema sermas"], "Event_14pqoxg": ["", "endEvent", "Sistema sermas"], "Event_1ghqveb": ["Elección de cita recibida", "intermediateCatchEvent·message", "Personal administrativo"], "Activity_0o9xbtz": ["Gestionar autenticación", "task", "Sistema sermas"], "Activity_1hiaczp": ["Validar identidad y acceso", "task", "Sistema sermas"], "Gateway_1n3q44n": ["Autentificar", "exclusiveGateway", "Sistema sermas"], "Activity_1jb0ght": ["Comunicar error", "task", "Sistema sermas"], "Event_0fxvkfy": ["Acceso denegado", "endEvent·message", "Sistema sermas"], "Activity_0p1re4e": ["Dar acceso al sistema", "task", "Sistema sermas"], "Activity_0sa9hln": ["Preguntar el tipo de cita", "task", "Personal administrativo"], "Event_139w0yl": ["Solicitud de disponibilidad recibida", "intermediateCatchEvent·message", "Personal administrativo"], "Event_02aya9r": ["Solicitud de disponibilidad recibida", "intermediateCatchEvent·message", "Sistema sermas"], "Activity_0uaocs4": ["Consultar disponiblidad", "task", "Sistema sermas"], "DataStoreReference_1yw49tq": ["Disponibilidad médica", "dataStoreReference", "Centro médico"], "Activity_09c5wmr": ["Consultar disponibilidad", "task", "Personal administrativo"], "Activity_0xspzkc": ["Analizar franja habitual del paciente", "task", "Sistema sermas"], "Gateway_0kojpba": ["", "parallelGateway", "Sistema sermas"]}},
  },

  /* Análisis: cinco dimensiones */
  analysis: [
    { n: "Tiempo", prob: "Varios actores y pasos que dependen tanto de personas como de sistemas; validaciones manuales y espera por disponibilidad de agenda.", who: "Paciente · personal administrativo", opp: "Más uso de la web y la app, con verificación automática e integración con la agenda.", kpi: "Tiempo medio de asignación" },
    { n: "Costes", prob: "Carga administrativa en tareas repetitivas: comprobar datos, asignar consultas y atender el teléfono.", who: "Personal administrativo", opp: "Automatizar tareas administrativas con autogestión del paciente y autenticación segura.", kpi: "Llamadas no atendidas y recuperadas" },
    { n: "Experiencia del paciente", prob: "Esperas, canales muy demandados como el teléfono y poco seguimiento individual.", who: "Paciente", opp: "Confirmación al momento, recordatorios, elegir horarios preferidos e informar del estado de la solicitud.", kpi: "Satisfacción del paciente" },
    { n: "Flexibilidad", prob: "La gestión manual de la agenda se adapta mal a cancelaciones, exceso de citas o ausencias imprevistas.", who: "Sistema SERMAS · personal administrativo", opp: "Reajustes automáticos según la disponibilidad y cancelación sencilla por canales digitales.", kpi: "Tasa de cancelaciones · tasa de reasignación" },
    { n: "Indicadores", prob: "Sin indicadores no se puede saber si un cambio funciona.", who: "Responsables del servicio", opp: "Medir desde la solicitud hasta la confirmación, entender los motivos de cancelación y preguntar al paciente después del servicio.", kpi: "Los tres de la ficha del proceso" },
  ],
  analysisNote: "Son suposiciones razonadas, como pedía el enunciado. No hay valores numéricos porque no teníamos acceso a la ejecución real.",

  /* Rediseño: cuatro mejoras (IDs reales de los XML) */
  improvements: [
    { n: "Mensaje automático", t: "Reproducción de mensaje automático",
      prob: "El paciente llama cuando el personal administrativo no puede atenderle.",
      prop: "Si la llamada no se puede atender, se reproduce un mensaje que avisa de que no hay disponibilidad en ese momento y sugiere intentarlo más tarde o usar la web.",
      ben: "Mejor comunicación y una alternativa para el paciente.",
      who: ["Paciente", "Personal administrativo"], kpi: ["Llamadas no atendidas"],
      asis: ["Activity_048p8cr", "Activity_06unvjf", "Activity_0sa9hln"],
      tobe: ["Activity_048p8cr", "Gateway_07c43xs", "Activity_003k6d8", "Activity_06unvjf"],
      added: ["Gateway_07c43xs", "Activity_003k6d8"] },
    { n: "Devolución de llamada", t: "Devolución de llamada",
      prob: "Una llamada no atendida obliga al paciente a volver a intentarlo.",
      prop: "Tras el mensaje se registra el número y, cuando el personal administrativo queda libre, devuelve la llamada y tramita la cita como siempre.",
      ben: "Recuperar solicitudes no atendidas sin que el paciente tenga que insistir.",
      who: ["Paciente", "Personal administrativo"], kpi: ["Llamadas recuperadas", "Tiempo medio de devolución"],
      asis: ["Activity_048p8cr", "Activity_06unvjf", "Activity_0sa9hln"],
      tobe: ["Activity_003k6d8", "Activity_0yl6st3", "Activity_0bx6vf6", "Gateway_1q2mpr2", "Activity_06unvjf"],
      added: ["Activity_0yl6st3", "Activity_0bx6vf6", "Gateway_1q2mpr2"] },
    { n: "Recomendación horaria", t: "Recomendación de cita por franja horaria",
      prob: "Para elegir hora, el paciente tiene que revisar muchas opciones de disponibilidad.",
      prop: "El sistema analiza en qué franjas suele pedir cita el paciente, según su historial, y le recomienda huecos disponibles en esas horas. Es una ayuda: el resto de opciones siguen ahí.",
      ben: "Elegir horario con menos esfuerzo.",
      who: ["Paciente", "Sistema SERMAS", "Personal administrativo"], kpi: ["Aceptación de recomendaciones", "Tiempo medio de asignación"],
      asis: ["Event_02aya9r", "Activity_0uaocs4", "Activity_019jtas", "Event_139w0yl", "Activity_09c5wmr", "Activity_1t1v5vp"],
      tobe: ["Activity_0uaocs4", "Activity_09c5wmr", "Activity_0xspzkc", "Gateway_0kojpba", "Activity_019jtas", "Activity_1t1v5vp"],
      added: ["Activity_0xspzkc", "Gateway_0kojpba"] },
    { n: "Reasignación de canceladas", t: "Reasignación automática de citas canceladas",
      prob: "Cuando alguien cancela, el hueco puede quedarse vacío.",
      prop: "Tras la cancelación, el sistema mira la lista de espera. Si hay alguien, avisa al primero de que hay un hueco nuevo; si no, el hueco queda libre. El aviso no confirma una cita: cómo se acepta y se confirma habría que definirlo en una implantación real.",
      ben: "Aprovechar mejor la agenda y dar opciones a quien está esperando.",
      who: ["Sistema SERMAS", "Pacientes en lista de espera"], kpi: ["Tasa de reasignación", "Aceptación de huecos notificados"],
      asis: ["Activity_1sks2bo", "Event_063wdjt"],
      tobe: ["Activity_1sks2bo", "Event_063wdjt", "Activity_1hc2f1v", "Gateway_0hl6sqc", "Activity_0srkxir", "Activity_1lap94h", "Event_17xc72b", "Event_14pqoxg"],
      added: ["Activity_1hc2f1v", "Gateway_0hl6sqc", "Activity_0srkxir", "Activity_1lap94h", "Event_17xc72b", "Event_14pqoxg"] },
  ],

  /* Implementación (memoria) */
  impl: {
    org: [
      ["Ajuste de procesos y roles", "El personal administrativo combina tareas automatizadas con la gestión manual de excepciones, como ayudar a quien tiene dificultades digitales o devolver llamadas.", [1, 2]],
      ["Formación tecnológica", "Uso del sistema de citas, interpretación de las notificaciones y ayuda al paciente en trámites digitales.", [1, 2, 3, 4]],
      ["Protocolo de seguimiento", "Evaluar indicadores como el tiempo medio de asignación, el uso de las recomendaciones horarias o las cancelaciones evitadas.", [3, 4]],
      ["Gestión del cambio", "Comunicación interna, pruebas piloto y vías de feedback para una transición sin sobresaltos.", [1, 2, 3, 4]],
    ],
    tech: [
      ["Sistema de recomendación de horarios", "Analiza el historial para sugerir franjas al pedir cita por la web o la app.", [3]],
      ["Respuestas telefónicas automáticas", "Detecta que no hay personal disponible y reproduce un mensaje informativo.", [1]],
      ["Módulo de reasignación de canceladas", "Revisa la lista de espera tras una cancelación y avisa a los interesados.", [4]],
      ["Alertas y confirmaciones multicanal", "SMS o correo para confirmar, recordar y reprogramar citas.", []],
    ],
    techNote: "El registro de números para devolver llamadas aparece en el modelo TO-BE, pero la memoria no lo detalla como requisito tecnológico aparte.",
    later: ["Protección de datos personales y sanitarios", "Accesibilidad digital", "Integración con los sistemas existentes", "Fiabilidad de las comunicaciones", "Gestión de las preferencias del paciente", "Equidad en la asignación de citas", "Mantener canales alternativos al digital", "Validación con pruebas piloto"],
  },

  /* Monitorización */
  monitor: [
    ["Dashboards", "Tiempo medio para obtener cita, porcentaje de cancelaciones y de citas reasignadas, saturación por horas o días."],
    ["Alertas automáticas", "Avisos cuando se acumulan citas sin atender o los tiempos de espera son excesivos."],
    ["Encuestas de satisfacción", "Después de la cita, por la app o por correo: facilidad del proceso, satisfacción y confianza."],
    ["Revisiones periódicas", "Mensuales o trimestrales, para revisar datos y tendencias y proponer nuevas mejoras."],
  ],
  monitorOwner: "Además, una persona responsable coordina el seguimiento, canaliza las alertas y se asegura de que la app, la web y el teléfono estén conectados al mismo sistema de monitorización.",

  kpis: [
    { n: "Tiempo medio de asignación", src: "ficha", q: "Cuánto se tarda, de media, desde que se pide una cita hasta que se confirma.",
      f: "Σ (confirmación − solicitud) ÷ solicitudes confirmadas", data: "Fecha y hora de cada solicitud y de su confirmación, por canal.", imp: [3, 1, 2], dec: "Detectar canales o centros donde la asignación se alarga.", lim: "Solo cuenta solicitudes confirmadas: las que nunca se confirman hay que seguirlas aparte." },
    { n: "Tasa de cancelaciones", src: "ficha", q: "Qué parte de las citas reservadas acaba cancelándose.",
      f: "Citas canceladas ÷ citas reservadas × 100", data: "Citas reservadas y canceladas en el mismo periodo, con el motivo si se conoce.", imp: [4], dec: "Entender los motivos y prevenir cancelaciones tardías.", lim: "Conviene fijar el periodo por la fecha de la cita, no por la de la cancelación." },
    { n: "Satisfacción del paciente", src: "ficha", q: "Cómo valora el paciente el proceso de pedir cita.",
      f: "Por definir: escala y método de cálculo", data: "Respuestas a una encuesta tras la cita (app o correo).", imp: [1, 2, 3, 4], dec: "Ver si las mejoras se perciben y dónde hay fricción.", lim: "Las encuestas voluntarias pueden no representar a todos los perfiles." },
    { n: "Tasa de reasignación", src: "presentación", q: "Qué parte de los huecos liberados por cancelaciones vuelve a ocuparse.",
      f: "Huecos reasignados ÷ huecos cancelados elegibles × 100", data: "Huecos liberados, si había lista de espera y si se volvieron a ocupar.", imp: [4], dec: "Saber si el aviso a la lista de espera sirve para algo.", lim: "Hay que definir qué hueco es elegible (por ejemplo, con margen suficiente antes de la cita)." },
    { n: "Saturación de agenda", src: "presentación", q: "Qué parte de los turnos disponibles está ocupada.",
      f: "Turnos ocupados ÷ turnos disponibles para asignar × 100", data: "Turnos ofertados y ocupados, por centro, día y franja.", imp: [3], dec: "Ver en qué horas o días falta capacidad.", lim: "Una saturación alta puede deberse a falta de oferta y no solo a mucha demanda." },
    { n: "Llamadas no atendidas", src: "ampliación", q: "Qué parte de las llamadas no se puede atender en el momento.", f: "Llamadas no atendidas ÷ llamadas recibidas × 100", data: "Registro de llamadas entrantes y su resultado.", imp: [1], dec: "Dimensionar el personal en las horas de más llamadas.", lim: "Una misma persona puede llamar varias veces." },
    { n: "Llamadas recuperadas", src: "ampliación", q: "Cuántas llamadas no atendidas acaban con una devolución de llamada.", f: "Llamadas devueltas ÷ números registrados × 100", data: "Números registrados y devoluciones realizadas.", imp: [2], dec: "Comprobar si la devolución de llamada cubre lo que no se atiende.", lim: "Habría que medir también si la devolución termina en cita." },
    { n: "Tiempo medio de devolución", src: "ampliación", q: "Cuánto tarda, de media, en devolverse una llamada.", f: "Σ (devolución − registro) ÷ llamadas devueltas", data: "Hora del registro del número y de la devolución.", imp: [2], dec: "Fijar un plazo razonable de devolución.", lim: "No incluye las llamadas que nunca se devuelven." },
    { n: "Aceptación de recomendaciones", src: "ampliación", q: "Cuántas veces el paciente elige una de las horas recomendadas.", f: "Citas en franja recomendada ÷ citas por web o app con recomendación × 100", data: "Si se mostró recomendación y qué hueco se eligió.", imp: [3], dec: "Ajustar o retirar la recomendación si no ayuda.", lim: "Elegir otra hora no significa que la recomendación fuera mala." },
    { n: "Aceptación de huecos notificados", src: "ampliación", q: "Cuántos avisos de hueco libre terminan en una cita aceptada.", f: "Huecos aceptados ÷ avisos enviados × 100", data: "Avisos enviados a la lista de espera y respuesta de cada paciente.", imp: [4], dec: "Decidir el plazo de respuesta antes de avisar al siguiente.", lim: "Depende de cómo se defina la aceptación, que el modelo no detalla." },
  ],
  kpiNote: "No hay cifras: el proyecto no medía nada. Los tres primeros indicadores vienen de la ficha del proceso; los dos siguientes, del dashboard de la presentación; el resto los añado ahora para conectar cada mejora con una medida.",

  /* Resultados, participación y aprendizajes */
  deliverables: ["Análisis de la organización", "Business Model Canvas", "Modelo e3value", "Arquitectura de procesos", "Ficha del proceso", "BPMN AS-IS", "Análisis de mejoras", "BPMN TO-BE", "Cuatro propuestas de rediseño", "Plan de implementación", "Propuesta de monitorización"],
  aims: ["Comunicar mejor con el paciente cuando no se le puede atender.", "Recuperar las llamadas no atendidas.", "Adaptar la elección de cita a las franjas habituales.", "Aprovechar los huecos que deja una cancelación.", "Medir de forma continua la calidad del proceso."],
  resultNote: "El resultado es una propuesta documentada, no una mejora medida. Los beneficios son esperados y habría que validarlos implantando y midiendo.",
  me: "Dentro del trabajo en grupo, participé en el modelo de valor e3value. Junto a una compañera, me encargué de modelar en BPMN el proceso actual (AS-IS) y el proceso propuesto (TO-BE) de gestión de citas médicas.",
  clave: {
    intro: "Un trabajo académico de gestión de procesos (BPM): analizamos cómo se piden las citas médicas en el SERMAS y propusimos cuatro mejoras modeladas en BPMN.",
    ex: ["Una persona cancela su cita.", "La propuesta consulta la lista de espera.", "Avisa a la primera persona de que hay un hueco disponible.", "Esa persona decide si lo acepta: el aviso todavía no confirma la cita."],
    exNote: "Es una propuesta académica modelada en BPMN, no un servicio en funcionamiento ni conectado con sistemas sanitarios reales.",
  },
  learned: [
    "Un modelo BPMN obliga a decidir quién hace cada cosa: dibujar los carriles saca a la luz esperas y traspasos que en una descripción pasan desapercibidos.",
    "Una mejora pequeña (un mensaje, una devolución de llamada) puede tocar varios actores a la vez.",
    "Sin un indicador definido de antemano, una mejora es solo una buena intención.",
  ],
};
