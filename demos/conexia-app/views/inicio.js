// ── Vista: Inicio ──
function renderInicio() {
  const el = document.getElementById('content-inicio');
  const abiertas = DATA.incidencias.filter(i => i.estado !== 'resuelta' && i.estado !== 'cerrada').length;
  const enGestion = DATA.incidencias.filter(i => i.estado === 'progreso').length;
  const docsNuevos = DATA.documentos.filter(d => d.nuevo).length;

  el.innerHTML = `
    <div style="margin-bottom:14px;">
      <div style="font-size:15px;font-weight:600;color:var(--text-primary);">Hola, ${DATA.usuario.nombre} 👋</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${DATA.usuario.vivienda} · ${DATA.usuario.comunidad}</div>
    </div>

    ${DATA.firma_pendiente ? `
    <div class="card" style="border:2px solid var(--blue);margin-bottom:14px;" onclick="showSubview('firma')">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:36px;height:36px;border-radius:8px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="#185FA5" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);">Firma pendiente</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${DATA.firma_pendiente.titulo}</div>
        </div>
        <div style="font-size:11px;color:var(--red);font-weight:600;">Hoy</div>
      </div>
    </div>` : ''}

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-val" style="${abiertas > 0 ? 'color:var(--red)' : ''}">${abiertas}</div>
        <div class="stat-lbl">Incidencias abiertas</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" style="color:var(--amber)">${enGestion}</div>
        <div class="stat-lbl">En gestión</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">${docsNuevos}</div>
        <div class="stat-lbl">Docs nuevos</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">${DATA.avisos.length}</div>
        <div class="stat-lbl">Avisos activos</div>
      </div>
    </div>

    <div class="section-label">Últimas incidencias</div>
    ${DATA.incidencias.slice(0,3).map(inc => `
      <div class="card" onclick="switchTabAndDetail('incidencias', '${inc.id}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${inc.titulo}</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:3px;">${inc.id} · ${inc.fecha}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
            ${badgeEstado(inc.estado)}
            <div style="display:flex;align-items:center;gap:4px;"><div class="urg-dot urg-${inc.urgencia}"></div><span style="font-size:10px;color:var(--text-tertiary);">${capitalize(inc.urgencia)}</span></div>
          </div>
        </div>
      </div>
    `).join('')}

    <div class="section-label">Avisos recientes</div>
    ${DATA.avisos.slice(0,2).map(av => `
      <div class="card">
        <div style="display:flex;gap:8px;align-items:flex-start;">
          <div style="width:8px;height:8px;border-radius:50%;margin-top:4px;flex-shrink:0;background:${av.tipo==='urgente'?'var(--red)':'var(--blue)'}"></div>
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${av.titulo}</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:3px;line-height:1.4;">${av.texto.substring(0,80)}…</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px;">${av.fecha}</div>
          </div>
        </div>
      </div>
    `).join('')}
  `;
}
