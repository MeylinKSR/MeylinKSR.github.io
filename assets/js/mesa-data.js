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
    { artista: "Katy Perry", destacado: true, color: "var(--coral)", fotos: [], videos: [] },
    { artista: "Lady Gaga", destacado: true, color: "var(--lilac)", fotos: ["assets/img/mesa/gaga-1.webp", "assets/img/mesa/gaga-2.webp"], videos: [] },
    { artista: "5 Seconds of Summer", corto: "5SOS", destacado: true, color: "var(--mint)", fotos: ["assets/img/mesa/5sos-1.webp"], videos: [] },
    { artista: "Taylor Swift", fotos: ["assets/img/mesa/taylor-1.webp", "assets/img/mesa/taylor-entradas.webp"], videos: [] },
    { artista: "Simple Plan", fotos: ["assets/img/mesa/simpleplan-2.webp", "assets/img/mesa/simpleplan-1.webp"], videos: [] },
    { artista: "Ed Sheeran", fotos: [], videos: [] },
    { artista: "Imagine Dragons", fotos: [], videos: [] },
    { artista: "Big Time Rush", fotos: [], videos: [] },
  ],

  /* Libros. portada: ruta de imagen (vacía = se muestra el lomo con título y autor). */
  libros: [
    { titulo: "Los siete maridos de Evelyn Hugo", autor: "Taylor Jenkins Reid", portada: "" },
    { titulo: "Amarilla", autor: "R. F. Kuang", portada: "" },
    { titulo: "Rodeado de idiotas", autor: "Thomas Erikson", portada: "" },
    { titulo: "El visitante", autor: "Stephen King", portada: "" },
    { titulo: "La insoportable levedad del ser", autor: "Milan Kundera", portada: "" },
    { titulo: "Rebelión en la granja", autor: "George Orwell", portada: "" },
    { titulo: "Lolita", autor: "Vladimir Nabokov", portada: "" },
    { titulo: "La biblioteca de medianoche", autor: "Matt Haig", portada: "" },
    { titulo: "Orgullo y prejuicio", autor: "Jane Austen", portada: "" },
    { titulo: "Verity", autor: "Colleen Hoover", portada: "" },
    { titulo: "La hipótesis del amor", autor: "Ali Hazelwood", portada: "" },
  ],
  proximoLibro: { titulo: "Las gratitudes", autor: "Delphine de Vigan", portada: "" },

  /* Pantalla: series y videojuegos */
  series: ["Breaking Bad", "Cómo defender a un asesino", "The Office", "The Big Bang Theory", "Rick y Morty"],
  juegos: ["The Last of Us", "The Last of Us Parte II", "Saga Uncharted", "Grand Theft Auto IV", "Grand Theft Auto V", "Grand Theft Auto VI", "Los Sims", "Overcooked"],

  /* Viajes: solo el nombre del destino */
  viajes: [
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

  /* Leo, supervisor oficial de MEY */
  leo: {
    normal: "assets/img/mesa/leo-1.webp",
    comiendo: "assets/img/mesa/leo-2.webp",
    durmiendo: "assets/img/mesa/leo-4.webp",
    frases: [
      "¿Otra visita?",
      "¿Has traído comida?",
      "Esto de supervisar proyectos es agotador.",
      "Mi horario de trabajo depende de mis siestas.",
      "Puedes quedarte, pero no me molestes.",
    ],
  },
};
