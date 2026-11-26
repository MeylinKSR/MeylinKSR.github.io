function renderComingSoon(title, description, message) {
  return `
    <section class="view-intro"><h1>${title}</h1><p>${description}</p></section>
    <section class="full-panel empty-view">
      <h2>En preparación</h2><p>${message}</p>
      <button class="btn-outline" onclick="switchView('dashboard')">Volver al panel</button>
    </section>`;
}

function renderComunicaciones() {
  return renderComingSoon('Comunicaciones', 'Un espacio para los avisos de tus comunidades.', 'La publicación de avisos todavía está en preparación.');
}

function renderDocumentos() {
  const types = [...new Set(DATA.documentos.map(doc => doc.tipo))];
  return `
    <section class="view-intro"><h1>Documentos</h1><p>Consulta actas, presupuestos y acuerdos por finca. Los documentos de esta demo son ejemplos.</p></section>
    <section class="full-panel table-panel table-documents">
      <form class="list-tools" onchange="filterRecords(this)" onsubmit="event.preventDefault()">
        <label>Buscar documento<input name="query" type="search" placeholder="Título, referencia o asunto" oninput="filterRecords(this.form)"></label>
        <label>Comunidad<select name="community"><option value="">Todas</option>${DATA.comunidades.filter(c => DATA.documentos.some(doc => doc.comunidadId === c.id)).map(c => `<option value="${c.id}">${escapeText(c.nombre)}</option>`).join('')}</select></label>
        <label>Tipo de documento<select name="type"><option value="">Todos</option>${types.map(type => `<option>${type}</option>`).join('')}</select></label>
        <button class="btn-outline" type="button" onclick="this.form.reset(); filterRecords(this.form)">Limpiar filtros</button>
      </form>
      <p class="result-count" data-results role="status">${DATA.documentos.length} documentos</p>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Listado de documentos">
        <table class="data-table">
          <thead><tr><th scope="col">Documento</th><th scope="col">Comunidad</th><th scope="col">Tipo</th><th scope="col">Fecha</th></tr></thead>
          <tbody>${DATA.documentos.map((doc, index) => `
            <tr data-record data-search="${escapeText(`${doc.id} ${doc.titulo} ${doc.resumen} ${communityName(doc.comunidadId)}`)}" data-community="${doc.comunidadId}" data-type="${doc.tipo}">
              <td><button class="text-button" onclick="openDocument(${index})">${escapeText(doc.titulo)}</button><small class="record-reference">${doc.id}</small></td>
              <td>${escapeText(communityName(doc.comunidadId))}</td><td><span class="badge badge-blue">${doc.tipo}</span></td><td>${doc.fecha}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`;
}

function showCommunityDocuments(communityId) {
  document.getElementById('record-dialog').close();
  switchView('documentos');
  const form = document.querySelector('.table-documents form');
  form.elements.community.value = communityId;
  filterRecords(form);
}

function openDocument(index) {
  const doc = DATA.documentos[index];
  const dialog = document.getElementById('record-dialog');
  dialog.innerHTML = `
    <div class="panel-head"><div><p class="record-reference">${doc.id} · ${doc.tipo}</p><h2 id="record-title">${escapeText(doc.titulo)}</h2></div>
    <form method="dialog"><button class="btn-outline" autofocus>Cerrar</button></form></div>
    <p class="document-meta">${escapeText(communityName(doc.comunidadId))} · ${doc.fecha}</p>
    <p class="document-summary">${escapeText(doc.resumen)}</p>
    <div class="document-excerpt"><h3>Extracto de ejemplo</h3><p>${escapeText(doc.contenido)}</p></div>
    ${doc.firmaId ? `<button class="btn-primary" onclick="showSignature('${doc.firmaId}')">Ver quién falta por firmar</button>` : ''}`;
  dialog.showModal();
}

function renderFirmas() {
  return `
    <section class="view-intro"><h1>Seguimiento de firmas</h1><p>Abre una solicitud para ver qué vecinos han firmado y a quién le falta. Los nombres son ficticios.</p></section>
    <div class="signature-list">
      ${DATA.firmas.map(firma => {
        const { signed, total, pending } = signatureCounts(firma);
        return `
          <details class="full-panel signature-request" id="signature-${firma.id}">
            <summary>
              <div class="signature-heading"><strong>${escapeText(firma.titulo)}</strong><span>${escapeText(communityName(firma.comunidadId))} · Hasta el ${firma.limite}</span></div>
              <div class="signature-overview"><span class="badge badge-${pending ? 'amber' : 'green'}">${pending ? `${pending} ${pending === 1 ? 'pendiente' : 'pendientes'}` : 'Completa'}</span>
              <div class="signature-progress"><progress value="${signed}" max="${total}" aria-label="Firmas recibidas"></progress><span>${signed} de ${total}</span></div></div>
            </summary>
            <div class="signature-body table-signatures">
              <form class="list-tools" onchange="filterRecords(this)" onsubmit="event.preventDefault()">
                <label>Mostrar vecinos<select name="state"><option value="pending" selected>Pendientes</option><option value="signed">Firmaron</option><option value="">Todos</option></select></label>
              </form>
              <p class="result-count" data-results role="status">${pending} ${pending === 1 ? 'resultado' : 'resultados'}</p>
              <div class="table-scroll" tabindex="0" role="region" aria-label="Vecinos de la solicitud" ${pending ? '' : 'hidden'}>
                <table class="data-table"><thead><tr><th scope="col">Vecino</th><th scope="col">Vivienda</th><th scope="col">Estado</th><th scope="col">Fecha de firma</th></tr></thead>
                <tbody>${firma.participantes.map(([name, home, date]) => `<tr data-record data-search="" data-state="${date ? 'signed' : 'pending'}" ${date ? 'hidden' : ''}><td>${escapeText(name)}</td><td>${escapeText(home)}</td><td><span class="badge ${date ? 'badge-green' : 'badge-amber'}">${date ? 'Firmado' : 'Pendiente'}</span></td><td>${date || '—'}</td></tr>`).join('')}</tbody></table>
              </div>
            </div>
          </details>`;
      }).join('')}
    </div>`;
}

function showSignature(id) {
  const dialog = document.getElementById('record-dialog');
  if (dialog.open) dialog.close();
  switchView('firmas');
  const request = document.getElementById(`signature-${id}`);
  if (request) {
    request.open = true;
    request.querySelector('summary').focus();
  }
}

function renderAjustes() {
  return renderComingSoon('Ajustes', 'Preferencias de tu espacio de administración.', 'Los ajustes de cuenta todavía están en preparación.');
}
