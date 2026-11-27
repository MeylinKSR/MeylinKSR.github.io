// ── Conexia App — Datos mock ──
const DATA = {
  usuario: { nombre: 'Lucía', vivienda: '3ºB', comunidad: 'C/ Alcalá 142' },

  incidencias: [
    { id: 'INC-2847', titulo: 'Fuga de agua en portal', cat: 'Fontanería', zona: 'Portal · Esc. A', urgencia: 'alta', estado: 'progreso', fecha: 'Hace 2 días',
      timeline: [
        { texto: 'Incidencia recibida', fecha: '16 abr · 10:32', estado: 'done' },
        { texto: 'Revisada por el administrador', fecha: '16 abr · 14:05', estado: 'done' },
        { texto: 'Técnico asignado — Fontanería Ruiz', fecha: '17 abr · 09:18', estado: 'active' },
        { texto: 'Visita programada', fecha: 'Pendiente', estado: 'pending' },
        { texto: 'Resolución confirmada', fecha: 'Pendiente', estado: 'pending' },
      ],
      comentario: 'El fontanero visitará el portal el 19 de abril entre las 9:00 y las 11:00.'
    },
    { id: 'INC-2831', titulo: 'Luz fundida en garaje nivel -1', cat: 'Electricidad', zona: 'Garaje', urgencia: 'media', estado: 'abierta', fecha: 'Hace 5 días',
      timeline: [
        { texto: 'Incidencia recibida', fecha: '13 abr · 18:44', estado: 'done' },
        { texto: 'Pendiente de revisión', fecha: 'En espera', estado: 'active' },
        { texto: 'Técnico asignado', fecha: 'Pendiente', estado: 'pending' },
      ],
      comentario: 'Sin novedades aún. El administrador revisará esta semana.'
    },
    { id: 'INC-2820', titulo: 'Puerta zona comunitaria no cierra', cat: 'Zonas comunes', zona: 'Zonas comunes', urgencia: 'baja', estado: 'abierta', fecha: 'Hace 8 días',
      timeline: [
        { texto: 'Incidencia recibida', fecha: '10 abr · 11:20', estado: 'done' },
        { texto: 'En cola de priorización', fecha: 'Baja prioridad', estado: 'active' },
      ],
      comentario: null
    },
    { id: 'INC-2799', titulo: 'Ascensor parado planta 4', cat: 'Ascensor', zona: 'Ascensor', urgencia: 'alta', estado: 'resuelta', fecha: 'Hace 14 días',
      timeline: [
        { texto: 'Incidencia recibida', fecha: '4 abr · 08:10', estado: 'done' },
        { texto: 'Técnico Otis asignado', fecha: '4 abr · 12:30', estado: 'done' },
        { texto: 'Reparación ejecutada', fecha: '15 abr · 10:00', estado: 'done' },
        { texto: 'Incidencia cerrada', fecha: '15 abr · 11:45', estado: 'done' },
      ],
      comentario: 'Resuelta satisfactoriamente. El ascensor opera con normalidad.'
    },
  ],

  documentos: [
    { id: 1, nombre: 'Acta junta ordinaria 2025', cat: 'comunidad', tipo: 'PDF', fecha: '10 abr 2026', size: '340 KB', visib: 'comunidad', nuevo: true },
    { id: 2, nombre: 'Presupuesto anual 2026', cat: 'comunidad', tipo: 'PDF', fecha: '2 ene 2026', size: '210 KB', visib: 'comunidad', nuevo: false },
    { id: 3, nombre: 'Normas de convivencia', cat: 'comunidad', tipo: 'DOC', fecha: '15 sep 2024', size: '85 KB', visib: 'comunidad', nuevo: false },
    { id: 4, nombre: 'Presupuesto fontanería #2847', cat: 'incidencias', tipo: 'PDF', fecha: '17 abr 2026', size: '95 KB', visib: 'incidencia', nuevo: true },
    { id: 5, nombre: 'Foto fuga portal', cat: 'incidencias', tipo: 'IMG', fecha: '16 abr 2026', size: '2.1 MB', visib: 'incidencia', nuevo: false },
    { id: 6, nombre: 'Certificado energético 3ºB', cat: 'vivienda', tipo: 'PDF', fecha: '3 mar 2023', size: '650 KB', visib: 'privado', nuevo: false },
    { id: 7, nombre: 'Recibo cuota marzo 2026', cat: 'vivienda', tipo: 'PDF', fecha: '1 mar 2026', size: '45 KB', visib: 'privado', nuevo: false },
    { id: 8, nombre: 'Aviso corte agua 22 abr', cat: 'avisos', tipo: 'DOC', fecha: '18 abr 2026', size: '30 KB', visib: 'comunidad', nuevo: true },
    { id: 9, nombre: 'Convocatoria junta mayo', cat: 'avisos', tipo: 'DOC', fecha: '10 abr 2026', size: '28 KB', visib: 'comunidad', nuevo: false },
  ],

  avisos: [
    { id: 1, titulo: 'Corte de agua el 22 de abril', tipo: 'urgente', fecha: 'Hoy · 09:15', texto: 'Se interrumpirá el suministro de agua el 22 de abril de 9:00 a 13:00 para mantenimiento de la red general.' },
    { id: 2, titulo: 'Convocatoria junta mayo', tipo: 'info', fecha: 'Hace 8 días', texto: 'Junta extraordinaria el 15 de mayo a las 19:00. Orden del día: derrama tejado y renovación contrato limpieza.' },
    { id: 3, titulo: 'Obras portal semana próxima', tipo: 'info', fecha: 'Hace 10 días', texto: 'La empresa Pinturas García realizará trabajos de pintura en el portal del 21 al 23 de abril.' },
  ],

  firma_pendiente: {
    titulo: 'Acta junta extraordinaria',
    solicitado_por: 'Carlos Martín (Admin.)',
    fecha_limite: '22 abr 2026',
    firmantes: '8 vecinos · 3 firmados',
    validez: 'eIDAS · Signaturit',
  }
};
