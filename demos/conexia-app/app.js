// ── Conexia App — Controlador principal ──

const SCREENS = ['inicio','incidencias','documentos','avisos'];
let currentScreen = 'inicio';
let historyStack = ['inicio'];

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function badgeEstado(estado) {
  const map = {
    abierta: ['badge-blue','Abierta'],
    progreso: ['badge-amber','En gestión'],
    resuelta: ['badge-green','Resuelta'],
    cerrada: ['badge-gray','Cerrada'],
  };
  const [cls, label] = map[estado] || ['badge-gray', estado];
  return `<span class="badge ${cls}">${label}</span>`;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById('screen-' + id);
  if (el) el.classList.remove('hidden');
}

function switchTab(tab, el) {
  currentScreen = tab;
  historyStack = [tab];
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  showScreen(tab);
  document.getElementById('main-nav').style.display = 'flex';
  renderScreen(tab);
}

function showSubview(view) {
  historyStack.push(view);
  showScreen(view);
  document.getElementById('main-nav').style.display = 'none';
  renderScreen(view);
}

function showView(view) { showSubview(view); }

function goBack() {
  historyStack.pop();
  const prev = historyStack[historyStack.length - 1] || 'inicio';
  if (SCREENS.includes(prev)) {
    document.getElementById('main-nav').style.display = 'flex';
    showScreen(prev);
    renderScreen(prev);
  } else {
    showScreen(prev);
    renderScreen(prev);
  }
}

function switchTabAndDetail(tab, id) {
  switchTab(tab, document.querySelectorAll('.nav-item')[SCREENS.indexOf(tab)]);
  if (tab === 'incidencias') {
    incDetalle = DATA.incidencias.find(i => i.id === id);
    renderIncidencias();
  }
}

function renderScreen(s) {
  const renders = {
    inicio: renderInicio,
    incidencias: renderIncidencias,
    documentos: renderDocumentos,
    avisos: renderAvisos,
    'nueva-incidencia': renderNuevaIncidencia,
    firma: renderFirma,
  };
  if (renders[s]) renders[s]();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  showScreen('inicio');
  renderInicio();
});
