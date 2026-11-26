(() => {
  const stations = [
    {
      sense: 'Vista',
      title: 'Japón desde el vagón',
      prompt: 'Deja que la proyección ocupe tu campo de visión. Elige qué observar desde la ventana.',
      alt: 'Bancos de tren frente a una proyección panorámica de un paisaje japonés',
      options: [
        ['Mirar el horizonte', 'Sigue la silueta de la montaña y busca su reflejo en el agua. ¿Dónde termina el paisaje y empieza el reflejo?', null, 'horizon'],
        ['Mirar en primer plano', 'Fíjate en las ramas y en su contraste con la montaña. En el trayecto proyectado, lo cercano pasa más deprisa que el horizonte.', null, 'foreground'],
      ],
    },
    {
      sense: 'Oído',
      title: 'Lluvia entre los árboles',
      image: 'sala-2-ambiente.jpg',
      prompt: 'Sigue la luz a ras de suelo hasta el banco. Cuando la sala quede en penumbra, escucha de dónde viene cada sonido. Con auriculares se aprecia mejor el cambio de lado.',
      alt: 'Sala de escucha en penumbra con paneles acústicos escalonados y luces cálidas a ras de suelo',
      options: [
        ['Escuchar cuerdas', 'Escucha el ataque de cada nota y cómo se apaga. Este ejemplo está sintetizado y recrea el carácter de una cuerda pulsada.', 'strings'],
        ['Escuchar lluvia', 'Escucha primero la lluvia continua. Después, intenta seguir las gotas cercanas que pasan de un lado al otro. Paisaje sonoro sintetizado.', 'rain'],
      ],
    },
    {
      sense: 'Olfato',
      title: 'Un jardín bajo la tapa',
      image: 'sala-3-ambiente.jpg',
      prompt: 'Acércate a la mesa iluminada. Abre una de las tres muestras y mira cómo se levanta su tapa en la maqueta. En la visita, cada recipiente concentra un aroma distinto.',
      alt: 'Mesa de olfato con tres recipientes iluminados frente a un jardín de cerezo y celosías',
      options: [
        ['Abrir muestra A', 'Cerezo en flor. La propuesta del proyecto lo usa como referencia floral de la edición de Japón.'],
        ['Abrir muestra B', 'Té tostado. Ejemplo para comparar una nota cálida y tostada con la muestra floral.'],
        ['Abrir muestra C', 'Madera. Ejemplo para identificar una nota seca frente a las otras dos muestras.'],
      ],
    },
    {
      sense: 'Tacto',
      title: 'Leer con las manos',
      prompt: 'La luz lateral deja ver el relieve. Elige una muestra e imagina cómo la distinguirías con los ojos cerrados.',
      alt: 'Mesa de taller con tejidos teñidos de índigo, cerámica y muestras de madera',
      options: [
        ['Cerámica', 'En la visita, toca primero la superficie esmaltada y luego la base sin esmaltar. Compara el deslizamiento de los dedos.'],
        ['Tejido', 'En la visita, palpa el entramado y pliega la pieza. Fíjate en su flexibilidad y en la resistencia del tejido.'],
        ['Madera', 'En la visita, recorre la veta con la yema del dedo, primero a lo largo y luego a través de ella.'],
      ],
    },
    {
      sense: 'Gusto',
      title: 'Japón en dos bocados',
      prompt: 'La mesa baja el ritmo del recorrido. Elige una degustación del menú de ejemplo y descubre qué buscaría el guía.',
      alt: 'Mesa de degustación con bandejas de sushi y tazas de té verde',
      options: [
        ['Sushi', 'El guía propone identificar el punto ácido del arroz y compararlo con el sabor del relleno.'],
        ['Té verde', 'El guía invita a notar cómo cambia la sensación entre el primer sorbo y el sabor que queda al final.'],
      ],
    },
  ];
  const get = (id) => document.getElementById(id);
  const panel = get('immersion');
  const image = get('immersion-image');
  const options = get('sensory-options');
  const result = get('sensory-result');
  let audio;
  let channel;
  const stop = document.createElement('button');
  stop.type = 'button';
  stop.textContent = 'Detener sonido';
  stop.hidden = true;
  options.after(stop);
  stop.className = 'stop-sound';
  stop.addEventListener('click', stopAudio);

  function stopAudio() {
    stop.hidden = true;
    panel.classList.remove('is-listening');
    if (!channel) return;
    channel.disconnect();
    channel = null;
  }

  function playAudio(kind) {
    if (!window.AudioContext) return false;
    audio ||= new AudioContext();
    void audio.resume();
    channel = audio.createGain();
    channel.gain.value = .55;
    channel.connect(audio.destination);
    const now = audio.currentTime;
    if (kind === 'strings') {
      [293.66, 349.23, 392, 440, 587.33, 440, 392, 293.66].forEach((frequency, index) => {
        const start = now + index * .48;
        const tone = audio.createOscillator();
        const envelope = audio.createGain();
        tone.type = 'triangle';
        tone.frequency.value = frequency;
        envelope.gain.setValueAtTime(.0001, start);
        envelope.gain.exponentialRampToValueAtTime(.25, start + .012);
        envelope.gain.exponentialRampToValueAtTime(.0001, start + .82);
        tone.connect(envelope).connect(channel);
        tone.start(start);
        tone.stop(start + .83);
      });
    } else {
      const duration = 11;
      const buffer = audio.createBuffer(2, audio.sampleRate * duration, audio.sampleRate);
      for (const side of [0, 1]) {
        const samples = buffer.getChannelData(side);
        for (let i = 0; i < samples.length; i++) {
          const t = i / audio.sampleRate;
          const drip = Math.max(0, Math.sin(t * 37) * Math.sin(t * 16.3)) ** 14;
          const sweep = .5 + .5 * Math.sin(t * 1.65 + side * Math.PI);
          const fade = Math.min(1, t * 2, (duration - t) * 2);
          samples[i] = (Math.random() * 2 - 1) * (.18 + .51 * drip * sweep) * fade;
        }
      }
      const source = audio.createBufferSource();
      const filter = audio.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2700;
      source.buffer = buffer;
      source.connect(filter).connect(channel);
      source.start(now);
    }
    stop.hidden = false;
    panel.classList.add('is-listening');
    const playing = channel;
    window.setTimeout(() => {
      if (channel === playing) stopAudio();
    }, kind === 'rain' ? 11000 : 4300);
    return true;
  }

  window.sentimixSensory = {
    select(index) {
      stopAudio();
      const station = stations[index - 1];
      panel.hidden = !station;
      if (!station) return;
      panel.dataset.station = index;
      get('immersion-sense').textContent = `${station.sense} · Sentido protagonista`;
      get('immersion-title').textContent = station.title;
      get('immersion-prompt').textContent = station.prompt;
      image.src = station.image || `sala-${index}.jpg`;
      image.alt = station.alt;
      image.removeAttribute('data-look');
      options.replaceChildren();
      result.hidden = true;
      for (const [sample, [text, detail, sound, look]] of station.options.entries()) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
          stopAudio();
          for (const option of options.children) option.setAttribute('aria-pressed', String(option === button));
          if (look) image.dataset.look = look;
          if (index === 3) window.sentimixModel?.liftSample(sample);
          result.textContent = sound && !playAudio(sound) ? `${detail} El audio no está disponible en este navegador.` : detail;
          result.hidden = false;
        });
        options.append(button);
      }
    },
  };
})();
