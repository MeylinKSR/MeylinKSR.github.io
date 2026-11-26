// ── Conexia Web Admin — Controlador principal ──

const VIEWS = {
  dashboard: { title: 'Vista general', render: renderDashboard },
  comunidades: { title: 'Comunidades', render: renderComunidades },
  incidencias: { title: 'Incidencias', render: renderIncidencias },
  comunicaciones: { title: 'Comunicaciones', render: renderComunicaciones },
  documentos: { title: 'Documentos', render: renderDocumentos },
  firmas: { title: 'Firmas digitales', render: renderFirmas },
  ajustes: { title: 'Ajustes', render: renderAjustes },
  'nueva-comunidad': { title: 'Nueva comunidad', render: renderNuevaComunidad },
};

let currentView = 'dashboard';

function switchView(view, navEl) {
  currentView = view;

  // Reset wizard step si volvemos a nueva-comunidad
  if (view !== 'nueva-comunidad') resetWizard();

  // Actualizar nav activo
  const activeNav = navEl || document.querySelector(`.nav-item[data-view="${view}"]`);
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item === activeNav);
    if (item === activeNav) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });

  // Actualizar título topbar
  const v = VIEWS[view];
  if (v) {
    document.getElementById('topbar-title').textContent = v.title; document.title = v.title + ' · Conexia';
    const content = document.getElementById('main-content');
    content.innerHTML = v.render();
    if (view === 'nueva-comunidad') labelWizardFields();
    content.scrollTop = 0;
    if (!navEl) content.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  switchView('dashboard', document.querySelector('.nav-item[data-view="dashboard"]'));
});
