function renderDashboard() {
  const abiertas = DATA.incidencias.filter(inc => inc.estado !== 'resuelta');
  const urgentes = abiertas.filter(inc => inc.urgencia === 'alta');
  const sinAsignar = abiertas.filter(inc => !inc.asignado).length;
  const vecinos = DATA.comunidades.reduce((total, comunidad) => total + comunidad.vecinos, 0);
  const metrics = [
    [DATA.comunidades.length, 'Comunidades', 'comunidades'],
    [abiertas.length, 'Incidencias abiertas', 'incidencias'],
    [DATA.firmas.length, 'Firmas pendientes', 'firmas'],
    [vecinos, 'Vecinos'],
  ];

  return `
    <section class="welcome" aria-labelledby="welcome-title">
      <div class="welcome-main">
        <p class="welcome-date">Sábado, 18 de abril · Datos de demostración</p>
        <h1 id="welcome-title">Hola, Carlos</h1>
        <p>Así están tus comunidades hoy.</p>
        <div class="welcome-motif" aria-hidden="true">
          <i class="motif-link link-one"></i>
          <i class="motif-link link-two"></i>
          <i class="motif-link link-three"></i>
          <i class="motif-node node-one"></i>
          <i class="motif-node node-two"></i>
          <i class="motif-node node-three"></i>
          <i class="motif-node node-four"></i>
        </div>
      </div>
      <div class="attention-summary">
        <p><strong>${urgentes.length ? `${urgentes.length} ${urgentes.length === 1 ? 'incidencia urgente' : 'incidencias urgentes'}` : 'Sin incidencias urgentes'}</strong></p>
        <p>${sinAsignar ? `De todas las incidencias abiertas, ${sinAsignar} siguen sin técnico.` : 'Todas las incidencias abiertas tienen técnico.'}</p>
        ${urgentes.length ? '<button class="btn-primary" onclick="showUrgentIncidents()">Revisar incidencias urgentes</button>' : ''}
      </div>
    </section>

    <section class="stats-row" aria-label="Resumen de gestión">
      ${metrics.map(([value, label, view]) => `
        <div class="stat-card">
          <div class="stat-val">${value}</div>
          ${view ? `<button class="text-button stat-lbl" onclick="switchView('${view}')">${label}</button>` : `<span class="stat-lbl">${label}</span>`}
        </div>
      `).join('')}
    </section>
    <div class="two-col dashboard-grid"><div class="dashboard-column">
      <section class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Incidencias urgentes</h2>
          <button class="panel-link" onclick="switchView('incidencias')">Ver incidencias</button>
        </div>
        ${urgentes.map(inc => `
          <div class="overview-row">
            
            <div class="overview-copy"><button class="text-button" onclick="openRecord('incidencias', ${DATA.incidencias.indexOf(inc)})">${escapeText(inc.titulo)}</button><span>${inc.comunidad} · ${inc.asignado || 'Pendiente de técnico'}</span></div>
            <span class="badge ${inc.asignado ? 'badge-amber' : 'badge-red'}">${inc.asignado ? 'En gestión' : 'Sin asignar'}</span>
          </div>
        `).join('') || '<p class="stat-sub">No hay incidencias urgentes abiertas.</p>'}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Tus comunidades</h2>
          <button class="panel-link" onclick="switchView('comunidades')">Ver comunidades</button>
        </div>
        ${DATA.comunidades.slice(0, 5).map(c => `
          <div class="overview-row">
            
            <div class="overview-copy"><button class="text-button" onclick="openRecord('comunidades', ${DATA.comunidades.indexOf(c)})">${escapeText(c.nombre)}</button><span>${c.vecinos} vecinos · ${c.incidencias} incidencias abiertas</span></div>
            <span class="badge ${c.estado === 'atencion' ? 'badge-red' : c.estado === 'normal' ? 'badge-amber' : 'badge-green'}">${c.estado === 'atencion' ? 'Requiere atención' : c.estado === 'normal' ? 'En seguimiento' : 'Al día'}</span>
          </div>
        `).join('')}
      </section>

</div><div class="dashboard-column"><section class="panel activity-panel">
        <div class="panel-head"><h2 class="panel-title">Actividad reciente</h2></div>
        ${DATA.actividad.map(a => `
          <div class="overview-row">
            <span class="activity-marker" aria-hidden="true"></span>
            <div class="overview-copy"><strong>${escapeText(a.texto)}</strong><span>${a.tiempo}</span></div>
          </div>
        `).join('')}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Firmas pendientes</h2>
          <button class="panel-link" onclick="switchView('firmas')">Ver firmas</button>
        </div>
        ${DATA.firmas.map(f => {
          const { signed, total } = signatureCounts(f);
          return `
          <div class="overview-row">
            <span class="tile gold" aria-hidden="true">✓</span>
            <div class="overview-copy"><button class="text-button" onclick="showSignature('${f.id}')">${escapeText(f.titulo)}</button><span>${escapeText(communityName(f.comunidadId))} · Hasta el ${f.limite}</span></div>
            <div class="signature-progress">
              <progress value="${signed}" max="${total}" aria-label="Firmas recibidas"></progress>
              <span>${signed}/${total}</span>
            </div>
          </div>
        `;
        }).join('')}
      </section>
    </div></div>
  `;
}
const incidentStates = { abierta: 'Abierta', progreso: 'En gestión', resuelta: 'Resuelta' };
const urgencyLabels = { alta: 'Alta', media: 'Media', baja: 'Baja' };
const communityStates = { atencion: 'Requiere atención', normal: 'En seguimiento', ok: 'Al día' };

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function renderComunidades() {
  return `
    <section class="view-intro"><h1>Tus comunidades</h1><p>Consulta la estructura, la actividad y las incidencias abiertas de cada finca. Datos de demostración.</p></section>
    <section class="full-panel table-panel table-communities">
      <div class="list-tools">
        <label>Buscar comunidad<input type="search" placeholder="Nombre o dirección de la finca" oninput="filterRecords(this.form)" form="community-filters" name="query"></label>
        <button class="btn-primary" onclick="switchView('nueva-comunidad')">Añadir comunidad</button>
      </div>
      <form id="community-filters" onsubmit="event.preventDefault()"></form>
      <p class="result-count" data-results role="status">${DATA.comunidades.length} comunidades</p>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Listado de comunidades">
        <table class="data-table">
          <thead><tr><th scope="col">Comunidad</th><th scope="col">Vecinos</th><th scope="col">Incidencias abiertas</th><th scope="col">Última actividad</th><th scope="col">Estado</th></tr></thead>
          <tbody>${DATA.comunidades.map((c, index) => `
            <tr data-record data-search="${escapeText([c.nombre, c.direccion, c.referencia].filter(Boolean).join(' '))}">
              <td><button class="text-button" onclick="openRecord('comunidades', ${index})">${escapeText(c.referencia || c.nombre)}</button><small class="record-reference">${escapeText(c.direccion || (c.referencia ? c.nombre : ""))}${c.estructura ? ` · ${escapeText(c.estructura)}` : ""}</small></td>
              <td>${c.vecinos}</td><td>${c.incidencias}</td><td>${c.ultima}</td>
              <td><span class="badge badge-${c.estado === 'atencion' ? 'red' : c.estado === 'normal' ? 'amber' : 'green'}">${communityStates[c.estado]}</span></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`;
}

function renderIncidencias() {
  return `
    <section class="view-intro"><h1>Incidencias</h1><p>Encuentra un aviso, comprueba quién lo lleva y revisa su estado.</p></section>
    <section class="full-panel table-panel table-incidents">
      <form class="list-tools" onchange="filterRecords(this)" onsubmit="event.preventDefault()">
        <label>Buscar incidencia<input name="query" type="search" placeholder="Título, referencia o comunidad" oninput="filterRecords(this.form)"></label>
        <label>Comunidad<select name="community"><option value="">Todas</option>${DATA.comunidades.map(c => `<option>${escapeText(c.nombre)}</option>`).join('')}</select></label>
        <label>Estado<select name="state"><option value="">Todos</option><option value="unresolved">Sin resolver</option>${Object.entries(incidentStates).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}</select></label>
        <label>Urgencia<select name="urgency"><option value="">Todas</option>${Object.entries(urgencyLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}</select></label>
        <button class="btn-outline" type="button" onclick="this.form.reset(); filterRecords(this.form)">Limpiar filtros</button>
      </form>
      <p class="result-count" data-results role="status">${DATA.incidencias.length} incidencias</p>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Listado de incidencias">
        <table class="data-table">
          <thead><tr><th scope="col">Incidencia</th><th scope="col">Comunidad</th><th scope="col">Urgencia</th><th scope="col">Estado</th><th scope="col">Técnico</th><th scope="col">Fecha</th></tr></thead>
          <tbody>${DATA.incidencias.map((inc, index) => `
            <tr data-record data-search="${escapeText(`INC-${inc.id} ${inc.titulo} ${inc.comunidad}`)}" data-community="${escapeText(inc.comunidad)}" data-state="${inc.estado}" data-urgency="${inc.urgencia}">
              <td><button class="text-button" onclick="openRecord('incidencias', ${index})">${escapeText(inc.titulo)}</button><small class="record-reference">INC-${inc.id}</small></td>
              <td>${escapeText(inc.comunidad)}</td>
              <td><span class="badge badge-${inc.urgencia === 'alta' ? 'red' : inc.urgencia === 'media' ? 'amber' : 'gray'}">${urgencyLabels[inc.urgencia]}</span></td>
              <td><span class="badge badge-${inc.estado === 'abierta' ? 'blue' : inc.estado === 'progreso' ? 'amber' : 'green'}">${incidentStates[inc.estado]}</span></td>
              <td>${escapeText(inc.asignado || 'Sin asignar')}</td><td>${inc.fecha}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`;
}

function filterRecords(form) {
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').trim();
  const filters = new FormData(form);
  const query = normalize(filters.get('query') || '');
  const panel = form.closest('.full-panel');
  let visible = 0;
  panel.querySelectorAll('[data-record]').forEach(row => {
    const matchesFilters = ['community', 'state', 'urgency', 'type'].every(key => !filters.get(key) || filters.get(key) === row.dataset[key] || (key === 'state' && filters.get(key) === 'unresolved' && row.dataset.state !== 'resuelta'));
    row.hidden = !matchesFilters || !normalize(row.dataset.search).includes(query);
    if (!row.hidden) visible++;
  });
  panel.querySelector('.table-scroll').hidden = visible === 0;
  panel.querySelector('[data-results]').textContent = visible
    ? `${visible} ${visible === 1 ? 'resultado' : 'resultados'}`
    : 'No hay resultados con la selección actual.';
}

function openRecord(view, index) {
  const record = DATA[view][index];
  const isIncident = view === 'incidencias';
  const details = isIncident
    ? [['Comunidad', record.comunidad], ['Urgencia', urgencyLabels[record.urgencia]], ['Estado', incidentStates[record.estado]], ['Técnico', record.asignado || 'Sin asignar'], ['Fecha', record.fecha]]
    : [['Dirección', record.direccion || record.nombre], ['Estructura', record.estructura || 'Sin especificar'], ['Estado', communityStates[record.estado]], ['Vecinos', record.vecinos], ['Incidencias abiertas', record.incidencias], ['Última actividad', record.ultima]];
  const dialog = document.getElementById('record-dialog');
  dialog.innerHTML = `
    <div class="panel-head"><div><p class="record-reference">${isIncident ? `INC-${record.id}` : 'Comunidad'}</p>
    <h2 id="record-title">${escapeText(record.titulo || record.referencia || record.nombre)}</h2></div>
    <form method="dialog"><button class="btn-outline" autofocus>Cerrar</button></form></div>
    <dl>${details.map(([label, value]) => `<div class="sum-row"><dt>${label}</dt><dd>${escapeText(value)}</dd></div>`).join('')}</dl>
    ${!isIncident && DATA.documentos.some(doc => doc.comunidadId === record.id) ? `<button class="btn-primary" onclick="showCommunityDocuments(${record.id})">Ver documentos de esta finca</button>` : ''}`;
  dialog.showModal();
}
function showUrgentIncidents() {
  switchView('incidencias');
  const form = document.querySelector('.list-tools');
  form.elements.state.value = 'unresolved';
  form.elements.urgency.value = 'alta';
  filterRecords(form);
}
