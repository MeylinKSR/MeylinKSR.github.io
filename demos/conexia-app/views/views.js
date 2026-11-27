// ── Vista: Documentos ──
let docFilter = 'todos';

function renderDocumentos() {
  const el = document.getElementById('content-documentos');
  const filtrados = DATA.documentos.filter(d => docFilter === 'todos' || d.cat === docFilter);
  const visibLabel = { comunidad:'Comunidad', incidencia:'Incidencia', privado:'Solo yo' };
  const visibClass = { comunidad:'badge-blue', incidencia:'badge-amber', privado:'badge-gray' };
  const iconClass = { PDF:'icon-pdf', DOC:'icon-doc', IMG:'icon-img', XLS:'icon-xls' };

  el.innerHTML = `
    <div class="chips">
      ${['todos','comunidad','incidencias','vivienda','avisos'].map(f=>`
        <div class="chip ${docFilter===f?'active':''}" onclick="setDocFilter('${f}')">${capitalize(f)}</div>
      `).join('')}
    </div>
    ${filtrados.map(d => `
      <div class="card" style="display:flex;align-items:center;gap:10px;padding:10px 12px;">
        <div class="doc-icon ${iconClass[d.tipo]||'icon-doc'}">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.3"/><path d="M14 2v6h6M16 13H8M16 17H8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.nombre}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px;">${d.tipo} · ${d.size} · ${d.fecha}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
          <span class="badge ${visibClass[d.visib]}">${visibLabel[d.visib]}</span>
          ${d.nuevo ? '<div style="width:7px;height:7px;border-radius:50%;background:var(--blue);"></div>' : ''}
        </div>
      </div>
    `).join('')}
    ${filtrados.length === 0 ? '<div style="text-align:center;padding:40px 0;color:var(--text-tertiary);font-size:13px;">No hay documentos en esta categoría</div>' : ''}
  `;
}

function setDocFilter(f) { docFilter = f; renderDocumentos(); }

// ── Vista: Avisos ──
function renderAvisos() {
  const el = document.getElementById('content-avisos');
  el.innerHTML = DATA.avisos.map(av => `
    <div class="card">
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <div style="width:8px;height:8px;border-radius:50%;margin-top:5px;flex-shrink:0;background:${av.tipo==='urgente'?'var(--red)':'var(--blue)'}"></div>
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span style="font-size:13px;font-weight:600;color:var(--text-primary);">${av.titulo}</span>
            ${av.tipo==='urgente'?'<span class="badge badge-red">Urgente</span>':'<span class="badge badge-blue">Info</span>'}
          </div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">${av.texto}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:6px;">${av.fecha}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Vista: Nueva incidencia ──
let incStep = 1;
let incData = { cat: '', urgencia: '' };

function renderNuevaIncidencia() {
  const el = document.getElementById('content-nueva-incidencia');
  const cats = ['Fontanería','Electricidad','Limpieza','Zonas comunes','Ascensor','Seguridad','Otro'];

  el.innerHTML = `
    <div class="progress-segs">
      ${[1,2,3,4].map(i=>`<div class="seg ${i<=incStep?'done':''}"></div>`).join('')}
    </div>
    <div id="inc-step-content"></div>
  `;

  const sc = document.getElementById('inc-step-content');

  if (incStep === 1) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 1 de 4</div>
      <div style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">¿Qué ha pasado?</div>
      <div class="field"><label>Categoría</label>
        <div class="chips" style="flex-wrap:wrap;">
          ${cats.map(c=>`<div class="chip ${incData.cat===c?'active':''}" onclick="selectIncCat('${c}')">${c}</div>`).join('')}
        </div>
      </div>
      <div class="field"><label>Título breve</label><input type="text" id="inc-titulo" placeholder="Ej: Fuga de agua en portal" value="${incData.titulo||''}"/></div>
      <div class="field"><label>Descripción</label><textarea id="inc-desc" placeholder="Describe qué has visto, cuándo ocurrió...">${incData.desc||''}</textarea></div>
      <button class="btn-primary" onclick="nextIncStep()">Continuar →</button>
    `;
  } else if (incStep === 2) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 2 de 4</div>
      <div style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">Ubicación y urgencia</div>
      <div class="field"><label>Zona afectada</label>
        <select id="inc-zona">
          <option>Selecciona…</option>
          <option>Portal / entrada</option><option>Escalera</option><option>Ascensor</option>
          <option>Garaje</option><option>Piscina / jardín</option><option>Mi vivienda</option>
        </select>
      </div>
      <div class="field"><label>Planta / piso (opcional)</label><input type="text" placeholder="Ej: 3ª planta, escalera B"/></div>
      <div class="field"><label>Nivel de urgencia</label>
        <div style="display:flex;gap:8px;">
          ${['baja','media','alta'].map(u=>`
            <div onclick="selectIncUrg('${u}')" style="flex:1;padding:9px;text-align:center;border-radius:8px;font-size:12px;cursor:pointer;border:0.5px solid var(--gray-border-strong);background:${incData.urgencia===u?urgBg(u):'#fff'};color:${incData.urgencia===u?urgText(u):'var(--text-secondary)'};">${capitalize(u)}</div>
          `).join('')}
        </div>
      </div>
      <button class="btn-primary" onclick="nextIncStep()">Continuar →</button>
      <button class="btn-secondary" onclick="prevIncStep()">← Atrás</button>
    `;
  } else if (incStep === 3) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 3 de 4</div>
      <div style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">Fotos y preferencias</div>
      <div class="field"><label>Adjunta fotos o vídeo (opcional)</label>
        <div class="upload-zone">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style="margin:0 auto 6px;display:block;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="var(--text-tertiary)" stroke-width="1.3" stroke-linecap="round"/></svg>
          Toca para subir imagen o vídeo<br><span style="font-size:11px;">JPG, PNG, MP4 · máx. 20 MB</span>
        </div>
      </div>
      <div class="field"><label>Notificaciones</label>
        <div class="toggle-row"><div><div style="font-size:13px;">Recibir actualizaciones</div><div style="font-size:11px;color:var(--text-tertiary);">Push cuando cambie el estado</div></div><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
        <div class="toggle-row"><div><div style="font-size:13px;">Incidencia anónima</div><div style="font-size:11px;color:var(--text-tertiary);">El administrador no verá tu nombre</div></div><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
      </div>
      <button class="btn-primary" onclick="nextIncStep()">Continuar →</button>
      <button class="btn-secondary" onclick="prevIncStep()">← Atrás</button>
    `;
  } else if (incStep === 4) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 4 de 4</div>
      <div style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">Confirma y envía</div>
      <div style="background:var(--gray-bg);border-radius:var(--radius-md);padding:12px 14px;margin-bottom:14px;">
        ${[['Categoría',incData.cat||'—'],['Título',incData.titulo||'—'],['Urgencia',capitalize(incData.urgencia)||'—'],['Fotos','0 archivos'],['Notificaciones','Push activado']].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:0.5px solid var(--gray-border);font-size:13px;"><span style="color:var(--text-secondary);">${k}</span><span style="font-weight:600;">${v}</span></div>
        `).join('')}
      </div>
      <div style="font-size:12px;color:var(--text-tertiary);line-height:1.5;margin-bottom:4px;">Al enviar aceptas que el administrador gestione esta incidencia.</div>
      <button class="btn-primary" onclick="enviarIncidencia()">Enviar incidencia</button>
      <button class="btn-secondary" onclick="prevIncStep()">← Atrás</button>
    `;
  }
}

function selectIncCat(c) { incData.cat = c; renderNuevaIncidencia(); }
function selectIncUrg(u) { incData.urgencia = u; renderNuevaIncidencia(); }
function urgBg(u) { return {baja:'var(--green-light)',media:'var(--amber-light)',alta:'var(--red-light)'}[u]; }
function urgText(u) { return {baja:'var(--green-text)',media:'var(--amber-text)',alta:'var(--red-text)'}[u]; }

function nextIncStep() {
  if (incStep < 4) { incStep++; renderNuevaIncidencia(); } 
}
function prevIncStep() {
  if (incStep > 1) { incStep--; renderNuevaIncidencia(); }
}

function enviarIncidencia() {
  const el = document.getElementById('content-nueva-incidencia');
  el.innerHTML = `
    <div class="success-wrap">
      <div class="success-circle"><svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="var(--green-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="font-size:17px;font-weight:600;margin-bottom:8px;">Incidencia enviada</div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px;">Número de seguimiento</div>
      <div style="font-size:22px;font-weight:600;color:var(--blue-dark);margin-bottom:16px;">#INC-2852</div>
      <button class="btn-primary" style="max-width:280px;margin:0 auto;" onclick="goBackAndRefresh()">Ver mis incidencias</button>
    </div>
  `;
}

function goBackAndRefresh() {
  incStep = 1;
  incData = {};
  goBack();
  switchTab('incidencias', document.querySelectorAll('.nav-item')[1]);
}

// ── Vista: Firma ──
let firmaStep = 1;
let firmaCtx, firmaDrawing = false;

function renderFirma() {
  const el = document.getElementById('content-firma');
  const f = DATA.firma_pendiente;

  el.innerHTML = `
    <div class="progress-segs">
      ${[1,2,3,4].map(i=>`<div class="seg ${i<=firmaStep?'done':''}"></div>`).join('')}
    </div>
    <div id="firma-step-content"></div>
  `;

  const sc = document.getElementById('firma-step-content');

  if (firmaStep === 1) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 1 de 4</div>
      <div style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">Documento pendiente de firma</div>
      <div class="card" style="border:2px solid var(--blue);margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:38px;height:38px;border-radius:8px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke="var(--blue-dark)" stroke-width="1.3"/><path d="M8 8h8M8 12h8M8 16h5" stroke="var(--blue-dark)" stroke-width="1.3" stroke-linecap="round"/></svg></div>
          <div><div style="font-size:14px;font-weight:600;">${f.titulo}</div><div style="font-size:12px;color:var(--text-secondary);">Solicitud de firma · Administrador</div></div>
        </div>
        ${[['Solicitado por',f.solicitado_por],['Fecha límite',f.fecha_limite],['Firmantes',f.firmantes],['Validez',f.validez]].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--gray-border);font-size:13px;"><span style="color:var(--text-secondary);">${k}</span><span style="font-weight:600;">${v}</span></div>
        `).join('')}
      </div>
      <button class="btn-primary" onclick="nextFirmaStep()">Leer documento →</button>
      <button class="btn-secondary" style="border-color:var(--red);color:var(--red);" onclick="goBack()">Rechazar firma</button>
    `;
  } else if (firmaStep === 2) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 2 de 4</div>
      <div style="font-size:18px;font-weight:600;margin-bottom:16px;">Revisa el documento</div>
      <div style="background:var(--gray-bg);border-radius:var(--radius-md);border:0.5px solid var(--gray-border-strong);padding:14px;margin-bottom:14px;">
        <div style="font-size:13px;font-weight:600;margin-bottom:10px;">${f.titulo} · 15 abr 2026</div>
        ${[1,1,0.8,0.6,1,0.8,0.6,1,0.7].map(w=>`<div style="height:8px;border-radius:2px;background:var(--gray-border);margin-bottom:5px;width:${w*100}%;"></div>`).join('')}
        <div style="border:1px dashed var(--blue);border-radius:var(--radius-md);padding:10px;margin-top:12px;background:var(--blue-light);">
          <div style="font-size:11px;color:var(--blue-text);font-weight:600;margin-bottom:6px;">Zona de firma — Propietario 3ºB</div>
          <div style="height:36px;border-radius:6px;background:#fff;border:0.5px solid var(--blue);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--blue-dark);">Aquí irá tu firma</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px;">Al continuar confirmas que has leído el documento completo.</div>
      <button class="btn-primary" onclick="nextFirmaStep()">He leído el documento →</button>
      <button class="btn-secondary" onclick="prevFirmaStep()">← Atrás</button>
    `;
  } else if (firmaStep === 3) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 3 de 4</div>
      <div style="font-size:18px;font-weight:600;margin-bottom:6px;">Dibuja tu firma</div>
      <div style="font-size:12px;color:var(--text-tertiary);text-align:center;margin-bottom:8px;">Usa el dedo para firmar en el recuadro</div>
      <div class="sig-canvas-wrap"><canvas id="sig-canvas" width="340" height="130"></canvas></div>
      <div style="font-size:12px;color:var(--blue-dark);cursor:pointer;text-align:right;margin-bottom:14px;" onclick="clearFirmaCanvas()">Borrar y repetir</div>
      <button class="btn-primary" onclick="nextFirmaStep()">Confirmar firma →</button>
      <button class="btn-secondary" onclick="prevFirmaStep()">← Atrás</button>
    `;
    setTimeout(initFirmaCanvas, 50);
  } else if (firmaStep === 4) {
    sc.innerHTML = `
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">Paso 4 de 4</div>
      <div style="font-size:18px;font-weight:600;margin-bottom:14px;">Verifica tu identidad</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.5;margin-bottom:4px;">Hemos enviado un código al <strong>+34 6** *** **12</strong>. Introdúcelo para completar la firma.</div>
      <div class="otp-inputs">
        ${[1,2,3,4,5,6].map(i=>`<input type="text" maxlength="1" id="otp${i}" oninput="otpNext(this,${i})"/>`).join('')}
      </div>
      <div style="font-size:12px;color:var(--blue-dark);text-align:center;cursor:pointer;margin-bottom:12px;">Reenviar código</div>
      <div style="font-size:12px;color:var(--text-tertiary);line-height:1.5;margin-bottom:6px;">Este paso garantiza la validez legal bajo el Reglamento eIDAS.</div>
      <button class="btn-primary" onclick="completarFirma()">Firmar documento</button>
    `;
  }
}

function initFirmaCanvas() {
  const canvas = document.getElementById('sig-canvas');
  if (!canvas) return;
  firmaCtx = canvas.getContext('2d');
  firmaCtx.strokeStyle = '#0C447C'; firmaCtx.lineWidth = 2.5;
  firmaCtx.lineCap = 'round'; firmaCtx.lineJoin = 'round';
  function pos(e) { const r=canvas.getBoundingClientRect(); const s=e.touches?e.touches[0]:e; return {x:s.clientX-r.left,y:s.clientY-r.top}; }
  canvas.onmousedown = canvas.ontouchstart = e => { e.preventDefault(); firmaDrawing=true; const p=pos(e); firmaCtx.beginPath(); firmaCtx.moveTo(p.x,p.y); };
  canvas.onmousemove = canvas.ontouchmove = e => { e.preventDefault(); if(!firmaDrawing)return; const p=pos(e); firmaCtx.lineTo(p.x,p.y); firmaCtx.stroke(); };
  canvas.onmouseup = canvas.ontouchend = () => { firmaDrawing=false; };
}

function clearFirmaCanvas() { if(firmaCtx) firmaCtx.clearRect(0,0,340,130); }
function otpNext(el,n) { el.classList.add('filled'); if(el.value&&n<6) document.getElementById('otp'+(n+1)).focus(); }
function nextFirmaStep() { if(firmaStep<4){firmaStep++;renderFirma();} }
function prevFirmaStep() { if(firmaStep>1){firmaStep--;renderFirma();} }

function completarFirma() {
  const el = document.getElementById('content-firma');
  el.innerHTML = `
    <div class="success-wrap">
      <div class="success-circle"><svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="var(--green-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="display:inline-flex;align-items:center;gap:5px;background:var(--green-light);border-radius:20px;padding:4px 12px;font-size:12px;color:var(--green-text);font-weight:600;margin-bottom:12px;">✓ Firma válida · eIDAS</div>
      <div style="font-size:17px;font-weight:600;margin-bottom:8px;">Documento firmado</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:14px;">Tu firma ha quedado registrada. La copia firmada está en tu repositorio de documentos.</div>
      <div style="background:var(--gray-bg);border-radius:var(--radius-md);padding:12px 14px;text-align:left;margin-bottom:14px;">
        ${[['Firmante','Lucía P. · 3ºB'],['Fecha','18 abr 2026 · 11:42'],['Método','Firma + OTP SMS'],['Proveedor','Signaturit · eIDAS'],['ID','SGN-2026-04-18-3847']].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:0.5px solid var(--gray-border);font-size:12px;"><span style="color:var(--text-secondary);">${k}</span><span style="font-weight:600;">${v}</span></div>
        `).join('')}
      </div>
      <button class="btn-primary" style="max-width:280px;margin:0 auto;" onclick="goBack()">Volver al inicio</button>
    </div>
  `;
}
