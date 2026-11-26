const canvas = document.querySelector('#diagram');
const pen = canvas.getContext('2d');
const notes = {
  'AS-IS': 'El modelo actual incluye la solicitud por web, app o teléfono, la confirmación y un recordatorio 24 horas antes.',
  'TO-BE': 'El modelo propuesto añade la devolución de llamada, la recomendación de franjas y el aviso a la lista de espera.'
};
const features = {
  phone: {
    names: ['Reproducir mensaje automático', 'Registrar número', 'Devolver llamada'],
    note: 'Si no se puede atender la llamada, se reproduce un mensaje y se registra el número para devolverla.'
  },
  schedule: {
    names: ['Analizar franja habitual del paciente'],
    note: 'El sistema analiza el historial para recomendar citas disponibles en la franja habitual del paciente.'
  },
  waiting: {
    names: ['Observar lista de espera', 'Notificar hueco disponible'],
    note: 'Cuando se cancela una cita, el sistema consulta la lista de espera y avisa de que se ha liberado un hueco.'
  }
};

let model = 'AS-IS';
let selectedFeature = '';
let view = { scale: 1, x: 0, y: 0 };
let drag;

function label(text, [x, y, width, height], color = '#183056') {
  if (!text) return;
  pen.fillStyle = color;
  pen.font = '12px Arial';
  pen.textAlign = 'center';
  pen.textBaseline = 'middle';
  const lines = [''];
  for (const word of text.split(/\s+/)) {
    const last = lines.length - 1;
    const next = lines[last] ? lines[last] + ' ' + word : word;
    if (lines[last] && pen.measureText(next).width > Math.max(width, 34)) lines.push(word);
    else lines[last] = next;
  }
  lines.forEach((line, index) => pen.fillText(line, x + width / 2, y + height / 2 + (index - (lines.length - 1) / 2) * 14));
}

function drawEdge(edge) {
  const last = edge.points.at(-1);
  const previous = edge.points.at(-2);
  if (!previous) return;
  const message = edge.type === 'messageFlow';
  const association = edge.type.toLowerCase().includes('association');
  pen.strokeStyle = '#60748d';
  pen.fillStyle = '#60748d';
  pen.lineWidth = 1.5;
  pen.setLineDash(message ? [7, 5] : association ? [2, 4] : []);
  pen.beginPath();
  edge.points.forEach(([x, y], index) => index ? pen.lineTo(x, y) : pen.moveTo(x, y));
  pen.stroke();
  pen.setLineDash([]);
  const angle = Math.atan2(last[1] - previous[1], last[0] - previous[0]);
  pen.save();
  pen.translate(...last);
  pen.rotate(angle);
  pen.beginPath();
  pen.moveTo(-9, -4);
  pen.lineTo(0, 0);
  pen.lineTo(-9, 4);
  if (!association) pen.closePath();
  if (message) {
    pen.fillStyle = '#fff';
    pen.fill();
    pen.stroke();
  } else if (association) pen.stroke();
  else pen.fill();
  pen.restore();
  if (message) {
    pen.beginPath();
    pen.arc(...edge.points[0], 3.4, 0, Math.PI * 2);
    pen.fillStyle = '#fff';
    pen.fill();
    pen.stroke();
  }
  if (edge.label) label(edge.name, edge.label);
}

function isContainer(shape) {
  return shape.type === 'participant' || shape.type === 'lane';
}

function drawShape(shape) {
  const [x, y, w, h] = shape.box;
  const active = features[selectedFeature]?.names.includes(shape.name);
  const type = shape.type;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const color = active ? '#1649a4' : '#405d82';
  pen.strokeStyle = color;
  pen.fillStyle = active ? '#cfe3ff' : '#fff';
  pen.lineWidth = active ? 4 : 1.5;
  pen.beginPath();
  if (isContainer(shape)) {
    pen.fillStyle = type === 'participant' ? '#fff' : '#f6f9fe';
    pen.rect(x, y, w, h);
    pen.fill();
    pen.stroke();
    pen.fillStyle = '#e6eefb';
    pen.fillRect(x, y, 25, h);
    pen.strokeRect(x, y, 25, h);
    pen.save();
    pen.translate(x + 12.5, cy);
    pen.rotate(-Math.PI / 2);
    label(shape.name, [-h / 2, -12, h, 24]);
    pen.restore();
    return;
  }
  if (type.endsWith('Gateway')) {
    pen.moveTo(cx, y);
    pen.lineTo(x + w, cy);
    pen.lineTo(cx, y + h);
    pen.lineTo(x, cy);
    pen.closePath();
  } else if (type.endsWith('Event')) {
    pen.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    if (type === 'endEvent') pen.lineWidth = 3;
  } else if (type === 'dataStoreReference') {
    pen.moveTo(x, y + 7);
    pen.bezierCurveTo(x, y - 2, x + w, y - 2, x + w, y + 7);
    pen.lineTo(x + w, y + h - 7);
    pen.bezierCurveTo(x + w, y + h + 2, x, y + h + 2, x, y + h - 7);
    pen.closePath();
  } else {
    pen.roundRect(x, y, w, h, 9);
  }
  pen.fill();
  pen.stroke();
  pen.lineWidth = 1.5;
  pen.beginPath();
  if (type === 'parallelGateway' || (type === 'exclusiveGateway' && shape.marker)) {
    pen.save();
    pen.translate(cx, cy);
    if (type === 'exclusiveGateway') pen.rotate(Math.PI / 4);
    pen.moveTo(-9, 0);
    pen.lineTo(9, 0);
    pen.moveTo(0, -9);
    pen.lineTo(0, 9);
    pen.stroke();
    pen.restore();
  } else if (type === 'dataStoreReference') {
    for (const offset of [7, 12, 17]) {
      pen.moveTo(x, y + offset);
      pen.bezierCurveTo(x, y + offset + 9, x + w, y + offset + 9, x + w, y + offset);
    }
    pen.stroke();
  } else if (type.endsWith('Event')) {
    if (type.startsWith('intermediate')) pen.ellipse(cx, cy, w / 2 - 4, h / 2 - 4, 0, 0, Math.PI * 2);
    pen.stroke();
    if (shape.detail.includes('messageEventDefinition')) {
      pen.strokeRect(cx - 8, cy - 5, 16, 10);
      pen.beginPath();
      pen.moveTo(cx - 8, cy - 5);
      pen.lineTo(cx, cy + 1);
      pen.lineTo(cx + 8, cy - 5);
      pen.stroke();
    }
    if (shape.detail.includes('timerEventDefinition')) {
      pen.beginPath();
      pen.arc(cx, cy, 8, 0, Math.PI * 2);
      pen.moveTo(cx, cy - 5);
      pen.lineTo(cx, cy);
      pen.lineTo(cx + 4, cy + 2);
      pen.stroke();
    }
  }
  label(shape.name, shape.label || (type === 'task' ? [x + 5, y, w - 10, h] : [x - 22, y + h + 3, w + 44, 17]), color);
}

function draw() {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }
  pen.setTransform(ratio, 0, 0, ratio, 0, 0);
  pen.clearRect(0, 0, width, height);
  pen.translate(view.x, view.y);
  pen.scale(view.scale, view.scale);
  const { shapes, edges } = window.models[model];
  shapes.filter(isContainer).forEach(drawShape);
  edges.forEach(drawEdge);
  shapes.filter(shape => !isContainer(shape)).forEach(drawShape);
}

function showBounds(boxes, maxScale) {
  const left = Math.min(...boxes.map(box => box[0]));
  const top = Math.min(...boxes.map(box => box[1]));
  const right = Math.max(...boxes.map(([x, , w]) => x + w));
  const bottom = Math.max(...boxes.map(([, y, , h]) => y + h));
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const scale = Math.min(maxScale, (width - 34) / (right - left), (height - 34) / (bottom - top));
  view = { scale, x: (width - (left + right) * scale) / 2, y: (height - (top + bottom) * scale) / 2 };
  draw();
}

function fit() {
  const { shapes, edges } = window.models[model];
  const boxes = shapes.map(shape => shape.box);
  for (const item of [...shapes, ...edges]) {
    if (item.label) boxes.push(item.label);
    if (item.points) boxes.push(...item.points.map(([x, y]) => [x, y, 0, 0]));
  }
  showBounds(boxes, 1);
}

function focusFeature() {
  const boxes = window.models[model].shapes.filter(shape => features[selectedFeature].names.includes(shape.name)).map(shape => shape.box);
  if (boxes.length) showBounds(boxes.map(([x, y, w, h]) => [x - 55, y - 48, w + 110, h + 96]), 1.25);
  else fit();
}

function selectModel(next, feature = '') {
  model = next;
  selectedFeature = feature;
  for (const button of document.querySelectorAll('[data-model]')) button.setAttribute('aria-pressed', button.dataset.model === model);
  for (const button of document.querySelectorAll('[data-feature]')) button.setAttribute('aria-pressed', button.dataset.feature === feature);
  document.querySelector('#download').href = model.toLowerCase() + '.bpmn';
  document.querySelector('#model-note').textContent = features[feature]?.note || notes[model];
  canvas.setAttribute('aria-label', 'Diagrama BPMN ' + model + '. Usa las flechas para desplazarte y las teclas más y menos para hacer zoom.');
  if (feature) focusFeature();
  else fit();
}

function zoom(multiplier, x = canvas.clientWidth / 2, y = canvas.clientHeight / 2) {
  const next = Math.min(3, Math.max(.04, view.scale * multiplier));
  const change = next / view.scale;
  view = { scale: next, x: x - (x - view.x) * change, y: y - (y - view.y) * change };
  draw();
}

for (const button of document.querySelectorAll('[data-model]')) button.addEventListener('click', () => selectModel(button.dataset.model));
for (const button of document.querySelectorAll('[data-feature]')) button.addEventListener('click', () => selectModel('TO-BE', button.dataset.feature));
document.querySelector('#show-flow').addEventListener('click', () => selectModel('TO-BE', 'waiting'));
document.querySelector('#fit').addEventListener('click', fit);
document.querySelector('#plus').addEventListener('click', () => zoom(1.32));
document.querySelector('#minus').addEventListener('click', () => zoom(1 / 1.32));
canvas.addEventListener('pointerdown', event => {
  if (event.button !== 0 || drag) return;
  drag = { id: event.pointerId, x: event.clientX - view.x, y: event.clientY - view.y };
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', event => {
  if (!drag || drag.id !== event.pointerId) return;
  view.x = event.clientX - drag.x;
  view.y = event.clientY - drag.y;
  draw();
});
canvas.addEventListener('lostpointercapture', () => { drag = undefined; });
canvas.addEventListener('keydown', event => {
  const movement = { ArrowLeft: [35, 0], ArrowRight: [-35, 0], ArrowUp: [0, 35], ArrowDown: [0, -35] }[event.key];
  if (movement) {
    event.preventDefault();
    view.x += movement[0];
    view.y += movement[1];
    draw();
  } else if (event.key === '+' || event.key === '-') {
    event.preventDefault();
    zoom(event.key === '+' ? 1.32 : 1 / 1.32);
  }
});
new ResizeObserver(() => selectedFeature ? focusFeature() : fit()).observe(canvas);

const steps = [
  { slot: 'Ocupada', message: 'La agenda está completa. Puedes apuntarte a la lista de espera.', action: 'Apuntarme a la lista de espera' },
  { slot: 'Ocupada', message: 'Estás en la primera posición. Veamos qué ocurre si otra persona cancela.', action: 'Simular cancelación' },
  { slot: 'Ofrecida a lista de espera', message: 'Aviso simulado: se ha liberado la cita de las 10:30. Puedes aceptar el hueco.', action: 'Aceptar la cita' },
  { slot: 'Confirmada para ti', message: 'Cita confirmada en la simulación. La aceptación se añade aquí para completar la experiencia del paciente.', action: 'Cita confirmada' }
];
let step = 0;
const nextButton = document.querySelector('#demo-next');
const resetButton = document.querySelector('#reset');
function renderDemo() {
  const state = steps[step];
  const slot = document.querySelector('#slot');
  slot.textContent = state.slot;
  slot.dataset.state = step >= 2 ? 'open' : 'busy';
  document.querySelector('#demo-message').textContent = state.message;
  nextButton.textContent = state.action;
  nextButton.disabled = step === steps.length - 1;
}
nextButton.addEventListener('click', () => {
  if (step < steps.length - 1) step++;
  renderDemo();
  if (nextButton.disabled) resetButton.focus();
});
resetButton.addEventListener('click', () => {
  step = 0;
  renderDemo();
  nextButton.focus();
});
selectModel('AS-IS');
renderDemo();
