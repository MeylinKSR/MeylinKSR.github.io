const rooms = [
  {
    title: 'Bienvenido a Sentimix',
    description: 'Al llegar, el equipo recibe a la clase, presenta Japón como destino del semestre y explica el recorrido. El reto del grupo es recoger una observación en cada estación para compartirla de vuelta al aula.',
    equipment: 'En la maqueta · Mostrador de recepción, bancos y acceso al recorrido.',
  },
  {
    title: 'Una ventana a Japón',
    description: 'Toma asiento en el vagón. Una proyección panorámica convierte la pared en una ventana. El guía invita al grupo a fijarse en cómo cambian el paisaje y las formas de habitarlo a lo largo del trayecto.',
    equipment: 'En la maqueta · Pantalla panorámica y cuatro bancos de tren.',
    action: 'Mirar por la ventana',
    detail: 'Imagina el cambio de escena entre una ciudad iluminada y un paisaje de montaña. ¿Qué diferencias encuentras con un trayecto en tren por Madrid?',
  },
  {
    title: 'Escucha el lugar',
    description: 'Escucha de dónde viene cada sonido. En la visita, el guía alternaría música tradicional y ambientes del destino para que el grupo distinga un instrumento, un sonido natural y uno urbano.',
    equipment: 'En la maqueta · Paneles acústicos escalonados, altavoces laterales, bancos y balizas bajas que guían al asiento.',
    action: 'Descubrir la pista',
    detail: 'El koto es un instrumento japonés de cuerda pulsada. En la visita, el reto es distinguir la música de los sonidos del entorno.',
  },
  {
    title: 'Un aroma escondido',
    description: 'Sobre la mesa encuentras recipientes tapados. En el local podrías abrirlos y tratar de reconocer cada aroma.',
    equipment: 'En la maqueta · Mesa de muestras con tres recipientes iluminados y jardín de cerezo tras la celosía.',
    action: 'Abrir un recipiente virtual',
    detail: 'La pista es el cerezo en flor, uno de los aromas planteados en el proyecto para la edición de Japón.',
  },
  {
    title: 'La cultura entre tus manos',
    description: 'Explora objetos y materiales representativos. El grupo puede comparar la textura de una tela, la madera y la cerámica.',
    equipment: 'En la maqueta · Mesa de exploración con muestras de madera, tejido y cerámica.',
    action: 'Explorar la cerámica',
    detail: 'Compara mentalmente una pieza de cerámica lisa con otra rugosa. ¿Cómo describirías su superficie sin mirarla?',
  },
  {
    title: 'Japón a pequeños bocados',
    description: 'La visita termina con pequeñas degustaciones. El grupo observa cómo se presentan los alimentos y comparte qué ingredientes, sabores o costumbres le resultan familiares.',
    equipment: 'En la maqueta · Mesa de degustación, bandejas y tazas.',
    action: 'Ver la degustación de ejemplo',
    detail: 'El proyecto propone sushi y té verde como ejemplo para Japón.',
  },
  {
    title: 'Lo que te llevas de Japón',
    description: 'Has recorrido las cinco estaciones. El grupo puede compartir qué descubrió y continuar el aprendizaje en clase. La maqueta también contempla una tienda temática.',
    action: 'Ver la actividad para el aula',
    detail: 'Elige la estación que más te sorprendió. Describe qué aprendiste de Japón y compáralo con una experiencia cotidiana en tu entorno.',
  },
];

const byId = (id) => document.getElementById(id);
const roomButtons = [...document.querySelectorAll('[data-room]')];
const scene = document.querySelector('.scene');
const stage = byId('stage');
const title = byId('room-title');
const description = byId('room-description');
const equipment = byId('room-equipment');
const activity = byId('activity');
const detail = byId('detail');
const previous = byId('previous');
const next = byId('next');
let currentRoom = 0;

function showRoom(index) {
  currentRoom = index;
  window.sentimixModel?.select(index);
  window.sentimixSensory?.select(index);
  const room = rooms[index];
  scene.dataset.scene = index;
  stage.textContent = index === 0 ? 'Comienzo · Japón' : index === 6 ? 'Fin del recorrido · Japón' : `Estación ${index} de 5 · Japón`;
  title.textContent = room.title;
  description.textContent = room.description;
  equipment.textContent = room.equipment || '';
  equipment.hidden = !room.equipment;
  activity.hidden = !room.action;
  activity.textContent = room.action || '';
  activity.setAttribute('aria-expanded', 'false');
  detail.textContent = room.detail || '';
  detail.hidden = true;
  previous.hidden = index === 0;
  next.textContent = ['Empezar el recorrido', 'Siguiente estación', 'Siguiente estación', 'Siguiente estación', 'Siguiente estación', 'Terminar el recorrido', 'Volver a empezar'][index];
  for (const button of roomButtons) {
    button.setAttribute('aria-pressed', String(index === Number(button.dataset.room)));
  }
}

document.addEventListener('sentimix:select-room', (event) => showRoom(event.detail));

activity.setAttribute('aria-controls', 'detail');
activity.addEventListener('click', () => {
  detail.hidden = !detail.hidden;
  activity.setAttribute('aria-expanded', String(!detail.hidden));
});
previous.addEventListener('click', () => {
  showRoom(currentRoom - 1);
  if (previous.hidden) next.focus();
});
next.addEventListener('click', () => showRoom((currentRoom + 1) % rooms.length));
for (const button of roomButtons) {
  button.addEventListener('click', () => showRoom(Number(button.dataset.room)));
}
showRoom(0);

const form = byId('booking-form');
const ticket = byId('ticket');
const people = byId('people');
const confirmation = byId('confirmation');
const total = byId('total');
const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

function updateTotal() {
  const price = ticket.value === '10' ? 10 : 15;
  total.value = people.validity.valid ? formatter.format(price * people.valueAsNumber) : '—';
  confirmation.hidden = true;
}

form.addEventListener('input', updateTotal);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const modality = ticket.selectedOptions[0].textContent.split(' · ')[0];
  const group = people.valueAsNumber === 1 ? '1 persona' : `${people.valueAsNumber} personas`;
  confirmation.textContent = `Simulación completada. ${modality}, ${group}. Total estimado: ${total.value}.`;
  confirmation.hidden = false;
});
updateTotal();
