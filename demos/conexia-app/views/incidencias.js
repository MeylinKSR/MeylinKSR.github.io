// ── Vista: Incidencias ──
let incFilter = 'todas';
let incDetalle = null;

function renderIncidencias() {
  if (incDetalle) { renderDetalleIncidencia(incDetalle); return; }
  const el = document.getElementById('content-incidencias');
  const filtradas = DATA.incidencias.filter(i => incFilter === 'todas' || i.estado === incFilter);

  el.innerHTML = `
    <div class="stats-grid" style="grid-template-columns:repeat(2,1fr);">
      <div class="stat-card"><div class="stat-val">${DATA.incidencias.filter(i=>i.estado!=='resuelta').length}</div><div class="stat-lbl">Abiertas</div></div>
      <div class="stat-card"><div class="stat-val">${DATA.incidencias.filter(i=>i.estado==='resuelta').length}</div><div class="stat-lbl">Resueltas</div></div>
    </div>
    <div class="chips">
      ${['todas','abierta','progreso','resuelta'].map(f=>`
        <div class="chip ${incFilter===f?'active':''}" onclick="setIncFilter('${f}')">${labelFiltro(f)}</div>
      `).join('')}
    </div>
    ${filtradas.length === 0 ? '<div style="text-align:center;padding:40px 0;color:var(--text-tertiary);font-size:13px;">No hay incidencias en este estado</div>' : ''}
    ${filtradas.map(inc => `
      <div class="card" onclick="openIncDetalle('${inc.id}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;">
          <span style="font-size:11px;color:var(--text-tertiary);">${inc.id}</span>
          ${badgeEstado(inc.estado)}
        </div>
        <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">${inc.titulo}</div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px;color:var(--text-secondary);">
          <span style="display:flex;align-items:center;gap:4px;"><div class="urg-dot urg-${inc.urgencia}"></div>${capitalize(inc.urgencia)}</span>
          <span>${inc.zona}</span>
          <span>${inc.fecha}</span>
        </div>
      </div>
    `).join('')}
  `;
}

function setIncFilter(f) {
  incFilter = f;
  renderIncidencias();
}

function openIncDetalle(id) {
  incDetalle = DATA.incidencias.find(i => i.id === id);
  renderIncidencias();
}

function renderDetalleIncidencia(inc) {
  const el = document.getElementById('content-incidencias');
  el.innerHTML = `
    <div style="margin-bottom:4px;">
      <button style="font-size:13px;color:var(--blue-dark);background:none;border:none;cursor:pointer;padding:0;" onclick="closeIncDetalle()">← Volver</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
      <div>
        <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:2px;">${inc.id}</div>
        <div style="font-size:16px;font-weight:600;color:var(--text-primary);">${inc.titulo}</div>
      </div>
      ${badgeEstado(inc.estado)}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
      <div style="font-size:12px;color:var(--text-secondary);">Categoría<br><span style="color:var(--text-primary);font-weight:600;">${inc.cat}</span></div>
      <div style="font-size:12px;color:var(--text-secondary);">Zona<br><span style="color:var(--text-primary);font-weight:600;">${inc.zona}</span></div>
      <div style="font-size:12px;color:var(--text-secondary);">Urgencia<br><span style="color:var(--text-primary);font-weight:600;">${capitalize(inc.urgencia)}</span></div>
      <div style="font-size:12px;color:var(--text-secondary);">Apertura<br><span style="color:var(--text-primary);font-weight:600;">${inc.fecha}</span></div>
    </div>
    <div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">Seguimiento</div>
    <div class="card" style="padding:10px 12px;">
      ${inc.timeline.map(t => `
        <div class="timeline-row">
          <div class="tl-dot tl-${t.estado}"></div>
          <div>
            <div class="tl-text" style="${t.estado==='pending'?'color:var(--text-tertiary)':''}">${t.texto}</div>
            <div class="tl-date">${t.fecha}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ${inc.comentario ? `
      <div style="border-left:2px solid var(--blue);padding:10px 12px;font-size:13px;color:var(--text-secondary);line-height:1.5;margin-top:10px;background:var(--blue-light);border-radius:0 var(--radius-md) var(--radius-md) 0;">
        ${inc.comentario}
      </div>
    ` : ''}
  `;
}

function closeIncDetalle() {
  incDetalle = null;
  renderIncidencias();
}

function labelFiltro(f) {
  return { todas:'Todas', abierta:'Abiertas', progreso:'En gestión', resuelta:'Resueltas' }[f] || f;
}
