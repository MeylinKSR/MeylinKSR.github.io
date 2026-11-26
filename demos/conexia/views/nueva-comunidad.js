// ── Vista: Nueva comunidad (wizard 5 pasos) ──
let wizStep = 1;
const wizardDraft = new Map();
function resetWizard() { wizStep = 1; wizardDraft.clear(); }

function renderNuevaComunidad() {
  const steps = [
    { label:'Datos generales', sub:'Nombre, dirección, CIF' },
    { label:'Estructura', sub:'Portales, plantas, viviendas' },
    { label:'Presidente y cargos', sub:'Roles y contactos' },
    { label:'Configuración', sub:'Notificaciones, accesos' },
    { label:'Revisión y crear', sub:'Confirmar y guardar' },
  ];

  const stepsHTML = steps.map((s,i)=>{
    const n = i+1;
    const cls = n < wizStep ? 'done' : n === wizStep ? 'active' : 'pending';
    return `
      <button type="button" class="wiz-step-item" onclick="goWizStep(${n})" ${n === wizStep ? 'aria-current="step"' : ''}>
        <div class="wiz-num ${cls}">${cls==='done'?'✓':n}</div>
        <div>
          <div class="wiz-label ${cls==='active'?'active':''}">${s.label}</div>
          <div class="wiz-sublabel">${s.sub}</div>
        </div>
      </button>
    `;
  }).join('');

  const formHTML = getWizStepContent();

  return `
    <div class="full-panel">
      <div class="row-between" style="margin-bottom:20px;">
        <h2 style="font-size:17px;font-weight:600;">Nueva comunidad</h2>
        <button class="btn-outline" onclick="switchView('comunidades',null)">Cancelar</button>
      </div>
      <div class="wiz-layout">
        <div class="wiz-steps-col">${stepsHTML}</div>
        <div class="wiz-form-col">
          <form id="wiz-form" onsubmit="event.preventDefault()">${formHTML}</form>
          ${wizStep <= 5 ? `
          <div class="form-footer">
            <span style="font-size:12px;color:var(--text-tertiary);">Paso ${wizStep} de 5</span>
            <div style="display:flex;gap:10px;">
              ${wizStep > 1 ? `<button class="btn-outline" onclick="goWizStep(${wizStep-1})">Atrás</button>` : ''}
              <button class="btn-primary" onclick="${wizStep<5?`goWizStep(${wizStep+1})`:'crearComunidad()'}">${wizStep===5?'Añadir a la demo':'Continuar'}</button>
            </div>
          </div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function getWizStepContent() {
  if (wizStep === 1) return `
    <div style="font-size:16px;font-weight:600;margin-bottom:4px;">Datos generales</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:18px;">Información básica visible para los vecinos en la app.</div>
    <div class="two-col-form">
      <div class="field"><label>Nombre de la comunidad *</label><input name="communityName" type="text" required placeholder="Ej: C/ Gran Vía 55"/></div>
      <div class="field"><label>CIF de la comunidad</label><input type="text" placeholder="Ej: H28123456"/></div>
    </div>
    <div class="field"><label>Dirección completa *</label><input name="address" type="text" required placeholder="Calle, número, código postal, ciudad"/></div>
    <div class="two-col-form">
      <div class="field"><label>Año de construcción</label><input type="text" placeholder="Ej: 1985"/></div>
      <div class="field"><label>Número total de viviendas *</label><input name="homes" type="number" required placeholder="Ej: 24" min="1"/></div>
    </div>
    <div class="section-sep">Datos del seguro (opcional)</div>
    <div class="two-col-form">
      <div class="field"><label>Compañía aseguradora</label><input type="text" placeholder="Ej: Mapfre"/></div>
      <div class="field"><label>Nº de póliza</label><input type="text" placeholder="Ej: POL-2024-000123"/></div>
    </div>
    <div class="field"><label>Notas internas</label><textarea placeholder="Observaciones visibles solo para el administrador..."></textarea></div>
  `;

  if (wizStep === 2) return `
    <div style="font-size:16px;font-weight:600;margin-bottom:4px;">Estructura del edificio</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:18px;">Define portales, plantas y viviendas. Puedes añadirlas manualmente.</div>
    <div class="two-col-form">
      <div class="field"><label>Número de portales</label><input type="number" value="1" min="1"/></div>
      <div class="field"><label>Plantas por portal</label><input type="number" value="5" min="1"/></div>
    </div>
    <div class="two-col-form">
      <div class="field"><label>Viviendas por planta</label><input type="number" value="2" min="1"/></div>
      <div class="field"><label>¿Tiene locales comerciales?</label><select><option>No</option><option>Sí</option></select></div>
    </div>
    <div class="section-sep">Viviendas — alta manual</div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Viviendas del edificio"><table class="viv-table">
      <thead><tr><th>Identificador</th><th>Portal</th><th>Planta</th><th>Puerta</th><th>Tipo</th></tr></thead>
      <tbody id="viv-tbody">
        <tr><td><input value="1ºA"/></td><td><input value="1"/></td><td><input value="1"/></td><td><input value="A"/></td><td><select><option>Vivienda</option><option>Local</option><option>Garaje</option></select></td></tr>
        <tr><td><input value="1ºB"/></td><td><input value="1"/></td><td><input value="1"/></td><td><input value="B"/></td><td><select><option>Vivienda</option><option>Local</option><option>Garaje</option></select></td></tr>
        <tr><td><input value="2ºA"/></td><td><input value="1"/></td><td><input value="2"/></td><td><input value="A"/></td><td><select><option>Vivienda</option><option>Local</option><option>Garaje</option></select></td></tr>
      </tbody>
    </table></div>
    <button type="button" class="btn-outline" onclick="addVivRow()">Añadir vivienda</button>
  `;

  if (wizStep === 3) return `
    <div style="font-size:16px;font-weight:600;margin-bottom:4px;">Presidente y cargos</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:18px;">Asigna los cargos de la comunidad. El presidente recibirá permisos especiales en la app.</div>
    <div class="section-sep">Presidente</div>
    <div class="two-col-form">
      <div class="field"><label>Nombre y apellidos *</label><input type="text" placeholder="Ej: María López García"/></div>
      <div class="field"><label>Vivienda *</label><select><option value="">Selecciona…</option><option>1ºA</option><option>1ºB</option><option>2ºA</option></select></div>
    </div>
    <div class="two-col-form">
      <div class="field"><label>Email *</label><input type="email" placeholder="presidente@email.com"/><div class="hint">Recibirá invitación de acceso</div></div>
      <div class="field"><label>Teléfono</label><input type="tel" placeholder="+34 6XX XXX XXX"/></div>
    </div>
    <div class="section-sep">Secretario / vocal (opcional)</div>
    <div class="two-col-form">
      <div class="field"><label>Nombre</label><input type="text" placeholder="Nombre del secretario"/></div>
      <div class="field"><label>Email</label><input type="email" placeholder="secretario@email.com"/></div>
    </div>
    <div class="section-sep">Proveedor de mantenimiento habitual (opcional)</div>
    <div class="two-col-form">
      <div class="field"><label>Empresa</label><input type="text" placeholder="Ej: Fontanería Ruiz S.L."/></div>
      <div class="field"><label>Teléfono</label><input type="tel" placeholder="+34 91X XXX XXX"/></div>
    </div>
  `;

  if (wizStep === 4) return `
    <div style="font-size:16px;font-weight:600;margin-bottom:4px;">Configuración inicial</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:18px;">Ajusta cómo funciona la comunidad en Conexia desde el primer día.</div>
    <div class="section-sep">Notificaciones a vecinos</div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Notificaciones push activadas</div><div style="font-size:12px;color:var(--text-tertiary);">Alertas de incidencias y avisos</div></div><button type="button" class="toggle on" role="switch" aria-checked="true" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Resumen semanal por email</div><div style="font-size:12px;color:var(--text-tertiary);">Email automático cada lunes</div></div><button type="button" class="toggle" role="switch" aria-checked="false" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Permitir incidencias anónimas</div><div style="font-size:12px;color:var(--text-tertiary);">El vecino puede reportar sin mostrar su nombre</div></div><button type="button" class="toggle on" role="switch" aria-checked="true" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="section-sep">Acceso de vecinos</div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Alta por invitación</div><div style="font-size:12px;color:var(--text-tertiary);">Solo acceden vecinos invitados por el administrador</div></div><button type="button" class="toggle on" role="switch" aria-checked="true" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Directorio de vecinos visible</div><div style="font-size:12px;color:var(--text-tertiary);">Los residentes pueden ver quién vive en el edificio</div></div><button type="button" class="toggle" role="switch" aria-checked="false" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="section-sep">Firma digital</div>
    <div class="toggle-row"><div><div style="font-size:13px;font-weight:500;">Activar firma digital (Signaturit)</div><div style="font-size:12px;color:var(--text-tertiary);">Firmas con validez eIDAS</div></div><button type="button" class="toggle on" role="switch" aria-checked="true" onclick="this.setAttribute('aria-checked', this.classList.toggle('on'))"></button></div>
    <div class="field" style="margin-top:16px;"><label>Cuota mensual de comunidad (€)</label><input type="number" placeholder="Ej: 87.50"/><div class="hint">Visible para vecinos en sus recibos</div></div>
  `;

  if (wizStep === 5) {
    const details = new FormData(wizardDraft.get(1));
    return `
      <h2>Revisa la nueva comunidad</h2>
      <p class="result-count">Se añadirá al listado de esta sesión de demostración.</p>
      <dl class="summary-block">
        <div class="sum-row"><dt>Nombre</dt><dd>${escapeText(details.get('communityName').trim())}</dd></div>
        <div class="sum-row"><dt>Dirección</dt><dd>${escapeText(details.get('address').trim())}</dd></div>
        <div class="sum-row"><dt>Viviendas</dt><dd>${escapeText(details.get('homes'))}</dd></div>
      </dl>`;
  }

  return '';
}

function goWizStep(n) {
  const form = document.getElementById('wiz-form');
  if (wizStep === 1 && n > 1) {
    for (const name of ['communityName', 'address']) form.elements[name].value = form.elements[name].value.trim();
    if (!form.reportValidity()) return;
  }
  wizardDraft.set(wizStep, form);
  wizStep = n;
  const content = document.getElementById('main-content');
  content.innerHTML = renderNuevaComunidad();
  if (n < 5 && wizardDraft.has(n)) document.getElementById('wiz-form').replaceWith(wizardDraft.get(n));
  labelWizardFields();
  content.scrollTop = 0;
  content.focus();
}
function addVivRow() {
  const tb = document.getElementById('viv-tbody');
  if (!tb) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><input placeholder="id"/></td><td><input placeholder="1"/></td><td><input placeholder=""/></td><td><input placeholder=""/></td><td><select><option>Vivienda</option><option>Local</option><option>Garaje</option></select></td>`;
  tb.appendChild(tr);
}

function crearComunidad() {
  const details = new FormData(wizardDraft.get(1));
  const nombre = details.get('communityName').trim();
  DATA.comunidades.push({
    nombre, direccion: details.get('address'), vecinos: 0, incidencias: 0, ultima: 'Ahora mismo', estado: 'ok'
  });
  resetWizard();
  const content = document.getElementById('main-content');
  content.innerHTML = `
    <div class="full-panel success-center">
      <h2>${escapeText(nombre)} se ha añadido</h2>
      <p class="result-count">Puedes consultarla en el listado durante esta sesión de demostración.</p>
      <button class="btn-primary" onclick="switchView('comunidades')">Ver comunidades</button>
    </div>`;
  content.focus();
}
function labelWizardFields() {
  const form = document.getElementById('wiz-form');
  form.querySelectorAll('.field').forEach((field, index) => {
    const input = field.querySelector('input, select, textarea');
    if (!input) return;
    input.id = `wizard-${wizStep}-field-${index}`;
    field.querySelector('label').htmlFor = input.id;
  });
  form.querySelectorAll('.toggle-row').forEach(row => {
    const toggle = row.querySelector('button');
    if (toggle) toggle.setAttribute('aria-label', row.firstElementChild.firstElementChild.textContent);
  });
}