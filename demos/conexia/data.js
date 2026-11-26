// ── Conexia Web — Datos mock ──
const DATA = {
  comunidades: [
    { id:1, referencia:'Residencial Alcalá', estructura:'3 portales · 40 viviendas', nombre:'C/ Alcalá 142', vecinos:48, incidencias:2, ultima:'Hace 2h', estado:'atencion' },
    { id:2, referencia:'Edificio Serrano', estructura:'2 portales · 26 viviendas', nombre:'C/ Serrano 88', vecinos:32, incidencias:2, ultima:'Hace 5h', estado:'atencion' },
    { id:3, referencia:'Residencial Brasil', estructura:'1 portal · 20 viviendas', nombre:'Av. Brasil 7', vecinos:24, incidencias:1, ultima:'Hace 1 día', estado:'normal' },
    { id:4, referencia:'Urbanización La Moraleja', estructura:'4 portales · 48 viviendas', nombre:'Urb. La Moraleja 4', vecinos:62, incidencias:1, ultima:'Hace 2 días', estado:'ok' },
    { id:5, referencia:'Finca Mayor', estructura:'1 portal · 14 viviendas', nombre:'C/ Mayor 33', vecinos:18, incidencias:0, ultima:'Hace 20 min', estado:'ok' },
    { id:6, referencia:'Edificio Goya', estructura:'2 portales · 30 viviendas', nombre:'C/ Goya 15', vecinos:36, incidencias:0, ultima:'Hace 3 días', estado:'ok' },
    { id:7, referencia:'Residencial Castellana', estructura:'3 portales · 46 viviendas', nombre:'Av. Castellana 200', vecinos:55, incidencias:0, ultima:'Hace 1 día', estado:'ok' },
    { id:8, referencia:'Finca Velázquez', estructura:'1 portal · 22 viviendas', nombre:'C/ Velázquez 44', vecinos:28, incidencias:0, ultima:'Hace 4 días', estado:'ok' },
  ],

  incidencias: [
    { id:'2847', titulo:'Fuga agua portal', comunidad:'C/ Alcalá 142', urgencia:'alta', estado:'progreso', asignado:'Fontanería Ruiz', fecha:'16 abr' },
    { id:'2851', titulo:'Ascensor parado', comunidad:'C/ Serrano 88', urgencia:'alta', estado:'abierta', asignado:null, fecha:'18 abr' },
    { id:'2831', titulo:'Luz garaje nivel -1', comunidad:'Av. Brasil 7', urgencia:'media', estado:'abierta', asignado:null, fecha:'13 abr' },
    { id:'2845', titulo:'Puerta garaje no cierra', comunidad:'C/ Serrano 88', urgencia:'media', estado:'progreso', asignado:'Cerrajería López', fecha:'15 abr' },
    { id:'2820', titulo:'Puerta zona común', comunidad:'C/ Alcalá 142', urgencia:'baja', estado:'abierta', asignado:null, fecha:'10 abr' },
    { id:'2799', titulo:'Ascensor planta 4', comunidad:'C/ Mayor 33', urgencia:'alta', estado:'resuelta', asignado:'Otis', fecha:'4 abr' },
    { id:'2810', titulo:'Filtración techo garaje', comunidad:'Urb. La Moraleja 4', urgencia:'media', estado:'abierta', asignado:null, fecha:'8 abr' },
  ],

  documentos: [
    { id: 'DOC-026', titulo: 'Acta de la junta ordinaria', comunidadId: 1, tipo: 'Acta', fecha: '16 abr 2026', resumen: 'Acuerdos sobre el presupuesto anual, la renovación del mantenimiento del ascensor y el seguimiento de la fuga en el portal.', contenido: 'La junta aprueba el presupuesto anual y encarga a la administración solicitar dos ofertas para el mantenimiento del ascensor. Se acuerda informar a los vecinos cuando se confirme la fecha de reparación de la fuga.', firmaId: 'F-026' },
    { id: 'DOC-027', titulo: 'Acuerdo de derrama para la cubierta', comunidadId: 2, tipo: 'Acuerdo', fecha: '15 abr 2026', resumen: 'Reparto de la aportación extraordinaria y calendario de pagos para reparar la cubierta.', contenido: 'Se aprueba una aportación extraordinaria de 320 € por vivienda en dos cuotas de 160 €, con vencimiento en mayo y junio. La administración coordinará el inicio de los trabajos con la empresa adjudicataria.', firmaId: 'F-027' },
    { id: 'DOC-028', titulo: 'Presupuesto ordinario 2026', comunidadId: 3, tipo: 'Presupuesto', fecha: '10 abr 2026', resumen: 'Previsión de ingresos y gastos ordinarios del ejercicio.', contenido: 'Presupuesto anual de 18.400 €: limpieza, 5.400 €; mantenimiento, 6.800 €; suministros, 3.200 €; seguro y administración, 3.000 €.' },
    { id: 'DOC-029', titulo: 'Normas de uso de la piscina', comunidadId: 4, tipo: 'Normativa', fecha: '8 abr 2026', resumen: 'Horarios, acceso de invitados y normas de convivencia en verano.', contenido: 'Horario de 10:00 a 21:00. Los menores de 12 años deben estar acompañados. Cada vivienda puede acceder con dos invitados y debe dejar libre la zona de paso.' },
    { id: 'DOC-030', titulo: 'Certificado de revisión del ascensor', comunidadId: 5, tipo: 'Certificado', fecha: '4 abr 2026', resumen: 'Registro de la revisión tras el cierre de la incidencia INC-2799.', contenido: 'Se comprueban la nivelación, el cierre de puertas y la comunicación de emergencia. El ascensor vuelve al servicio tras verificar su funcionamiento.' },
    { id: 'DOC-031', titulo: 'Aviso de corte de agua', comunidadId: 1, tipo: 'Aviso', fecha: '18 abr 2026', resumen: 'Interrupción prevista para intervenir en la instalación del portal.', contenido: 'El suministro del portal 1 se interrumpirá el lunes 20 de abril de 10:00 a 12:00. Si los trabajos terminan antes, se avisará al restablecer el servicio.' },
  ],

  firmas: [
    {
      id: 'F-026', titulo: 'Acta de la junta ordinaria', comunidadId: 1, limite: '22 abr 2026',
      participantes: [
        ['Ana García', '1.º A', '16 abr'], ['Luis Ortega', '1.º B', '17 abr'], ['Marta Ruiz', '2.º A', '18 abr'],
        ['Elena Martín', '2.º B'], ['Pablo Navarro', '3.º A'], ['Carmen Gil', '3.º B'], ['Lucía Romero', '4.º A'], ['Daniel Vega', '4.º B'],
      ],
    },
    {
      id: 'F-027', titulo: 'Acuerdo de derrama para la cubierta', comunidadId: 2, limite: '25 abr 2026',
      participantes: [
        ['Miguel Torres', '1.º A', '15 abr'], ['Nuria Blanco', '1.º B', '15 abr'], ['Irene Sanz', '2.º A', '16 abr'],
        ['Hugo León', '2.º B', '16 abr'], ['Sara Cano', '3.º A', '17 abr'], ['Javier Mora', '3.º B', '18 abr'],
        ['Clara Vidal', '4.º A'], ['Álvaro Ríos', '4.º B'], ['Eva Molina', '5.º A'], ['Diego Rubio', '5.º B'],
      ],
    },
  ],

  actividad: [
    { texto:'Ana G. abrió incidencia en C/ Mayor 33', tiempo:'Hace 20 min', tipo:'inc' },
    { texto:'Pedro M. firmó el acta (Av. Brasil 7)', tiempo:'Hace 1h', tipo:'firma' },
    { texto:'Técnico Otis cerró INC-2799', tiempo:'Hace 3h', tipo:'ok' },
    { texto:'Nuevo vecino registrado en C/ Goya 15', tiempo:'Hace 5h', tipo:'user' },
    { texto:'Aviso corte agua publicado en C/ Alcalá 142', tiempo:'Hace 6h', tipo:'aviso' },
  ]
};

function signatureCounts(firma) {
  const total = firma.participantes.length;
  const signed = firma.participantes.filter(([, , date]) => date).length;
  return { total, signed, pending: total - signed };
}

function communityName(id) {
  return DATA.comunidades.find(community => community.id === id)?.nombre || '';
}
