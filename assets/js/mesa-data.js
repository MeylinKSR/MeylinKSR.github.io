/*
  MI MESA · contenido de "Fuera del trabajo"
  ------------------------------------------------------------
  Para añadir algo nuevo, copia una línea del mismo bloque y cambia los datos.
  Las fotos van en assets/img/mesa/ (mejor en .webp, unos 900 px de lado largo).
  Si un campo de foto o portada se deja vacío (""), simplemente no se muestra.
*/
window.MESA = {
  /* Conciertos. destacado: true los pone delante y más grandes. corto: nombre breve para la entrada (opcional).
     fotos: rutas de imagen. videos: rutas .mp4 (se reproducen solo si se pulsan, sin sonido al empezar). */
  conciertos: [
    { artista: "Katy Perry", destacado: true, color: "var(--coral)", fotos: ["assets/img/mesa/katy-1.webp", "assets/img/mesa/katy-2.webp"], videos: [] },
    { artista: "Lady Gaga", destacado: true, color: "var(--lilac)", fotos: ["assets/img/mesa/gaga-1.webp", "assets/img/mesa/gaga-2.webp"], videos: [] },
    { artista: "5 Seconds of Summer", corto: "5SOS", destacado: true, color: "var(--mint)", fotos: ["assets/img/mesa/5sos-1.webp"], videos: [] },
    { artista: "Taylor Swift", fotos: ["assets/img/mesa/taylor-1.webp", "assets/img/mesa/taylor-entradas.webp"], videos: [] },
    { artista: "Simple Plan", fotos: ["assets/img/mesa/simpleplan-3.webp", "assets/img/mesa/simpleplan-2.webp", "assets/img/mesa/simpleplan-1.webp"], videos: [] },
    { artista: "Ed Sheeran", fotos: [], videos: [] },
    { artista: "Imagine Dragons", fotos: [], videos: [] },
    { artista: "Big Time Rush", fotos: [], videos: [] },
  ],

  /* Libros. ol: ediciones de Open Library de las que se toma la portada (se prueba una tras otra).
     Si ninguna carga, se busca por título y autor; si tampoco, se muestra la cubierta tipográfica.
     portada: ruta propia de imagen (opcional, tiene prioridad). */
  libros: [
    { titulo: "Los siete maridos de Evelyn Hugo", autor: "Taylor Jenkins Reid", ol: ["OL30198475M", "OL26680836M", "OL27383515M"] },
    { titulo: "Amarilla", autor: "R. F. Kuang", ol: ["OL38798008M", "OL50640487M", "OL46068311M"] },
    { titulo: "Rodeado de idiotas", autor: "Thomas Erikson", ol: ["OL28207106M"] },
    { titulo: "El visitante", autor: "Stephen King", ol: ["OL26523102M", "OL28173589M", "OL32974710M"] },
    { titulo: "La insoportable levedad del ser", autor: "Milan Kundera", ol: ["OL9135642M", "OL26231890M", "OL22996850M", "OL3006102M"] },
    { titulo: "Rebelión en la granja", autor: "George Orwell", ol: ["OL54787713M", "OL7591003M", "OL25429023M"] },
    { titulo: "Lolita", autor: "Vladimir Nabokov", ol: ["OL2060999M", "OL7500877M", "OL3063604M"] },
    { titulo: "La biblioteca de medianoche", autor: "Matt Haig", ol: ["OL31856078M", "OL34115610M"] },
    { titulo: "Orgullo y prejuicio", autor: "Jane Austen", ol: ["OL26402532M", "OL23035176M", "OL41770621M"] },
    { titulo: "Verity", autor: "Colleen Hoover", ol: ["OL27248516M", "OL36020400M", "OL37689762M"] },
    { titulo: "La hipótesis del amor", autor: "Ali Hazelwood", ol: ["OL37803633M", "OL31917995M", "OL38628096M"] },
  ],
  proximoLibro: { titulo: "Las gratitudes", autor: "Delphine de Vigan", buscar: "Les gratitudes" },

  /* Pantalla: series y videojuegos */
  /* wiki: título del artículo en la Wikipedia en inglés del que se toma la imagen (póster o portada). */
  series: [
    { t: "Breaking Bad", wiki: "Breaking Bad" },
    { t: "Cómo defender a un asesino", wiki: "How to Get Away with Murder" },
    { t: "The Office", wiki: "The Office (American TV series)" },
    { t: "The Big Bang Theory", wiki: "The Big Bang Theory" },
    { t: "Rick y Morty", wiki: "Rick and Morty" },
  ],
  juegos: [
    { t: "The Last of Us", wiki: "The Last of Us" },
    { t: "The Last of Us Parte II", wiki: "The Last of Us Part II" },
    { t: "Saga Uncharted", wiki: "Uncharted 4: A Thief's End" },
    { t: "Grand Theft Auto IV", wiki: "Grand Theft Auto IV" },
    { t: "Grand Theft Auto V", wiki: "Grand Theft Auto V" },
    { t: "Grand Theft Auto VI", wiki: "Grand Theft Auto VI" },
    { t: "Los Sims", wiki: "The Sims 4" },
    { t: "Overcooked", wiki: "Overcooked" },
  ],

  /* Viajes: solo el nombre del destino.
     mostrarViajes: false oculta la tarjeta de Viajes. Para volver a mostrarla, cámbialo a true. */
  mostrarViajes: false,
  viajes: [
    { destino: "Valencia", foto: "assets/img/mesa/valencia.webp", alt: "Mar entre palmeras en Valencia." },
    { destino: "Andorra", foto: "assets/img/mesa/andorra-1.webp", alt: "Carretera de montaña en Andorra." },
    { destino: "Galicia", foto: "assets/img/mesa/galicia.webp", alt: "Sendero bajo un pino junto al mar en Galicia." },
    { destino: "Andorra", foto: "assets/img/mesa/andorra-2.webp", alt: "Valle entre montañas en Andorra." },
    { destino: "Londres", foto: "assets/img/mesa/londres-eye.webp", alt: "Meylin frente al London Eye de noche." },
    { destino: "Londres", foto: "assets/img/mesa/londres-bigben.webp", alt: "Meylin junto al Big Ben." },
    { destino: "Londres", foto: "assets/img/mesa/londres-chinatown.webp", alt: "Puerta de Chinatown en Londres." },
  ],

  /* Repostería: dibujo = flan | bizcocho | magdalena | tortitas | tarta */
  postres: [
    { nombre: "Flan", dibujo: "flan" },
    { nombre: "Bizcocho", dibujo: "bizcocho" },
    { nombre: "Magdalenas", dibujo: "magdalena" },
    { nombre: "Tortitas", dibujo: "tortitas" },
    { nombre: "Tarta de queso", dibujo: "tarta" },
  ],
};
