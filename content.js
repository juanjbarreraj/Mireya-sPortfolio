// =============================================================
//  MIREYA ROJAS — PORTFOLIO · SINGLE SOURCE OF CONTENT
//  Edit THIS file to change any text or project on the site,
//  then run:  node build.mjs
//  Every string exists in en + es. Media paths point to
//  /assets/... — swap the placeholder files for real ones
//  keeping the same filenames (or change the paths here).
// =============================================================

export const site = {
  name: 'Mireya Rojas',
  fullName: 'Mireya Rojas Fenoy',
  domain: 'https://mireyarojas.com', // TODO: set real domain before launch
  defaultLang: 'en',
  langs: ['en', 'es'],
  themeColor: '#FF2B1F',
  social: {
    linkedin: 'https://www.linkedin.com/in/mireya-rojas-9b9133331/',
    instagram: 'https://www.instagram.com/thereds_museum/',
    email: 'irismireya11@gmail.com',
  },
};

// ------------------------------------------------ UI STRINGS
export const ui = {
  en: {
    langName: 'English', otherLangLabel: 'ES', otherLangTitle: 'Ver en español',
    skip: 'Skip to content',
    nav: { motion: 'Motion Design', illustration: 'Illustration', animation: 'Animation', about: 'About Me' },
    viewMore: 'View more',
    viewProject: 'View project',
    showreelNote: 'Showreel — replace assets/media/showreel.mp4 with the real reel',
    illustrationTitle: 'Illustration',
    illustrationIntro: 'Bright colors, new techniques, and drawings that try to make you smile.',
    animationTitle: 'Animation',
    animationIntro: 'Stories in motion — pick a project and press play.',
    aboutTitle: 'Who am I?',
    aboutCta: 'Let’s make something fun',
    contactTitle: 'Contact me',
    contactBlurb: 'Got a project, a story, or a wild idea that needs color and motion? I’d love to hear it.',
    contactButton: 'Say hi!',
    contactWork: 'Check out my work!',
    backToTop: 'Back to top',
    backToWork: '← All animation projects',
    comingSoon: 'Coming soon…',
    comingSoonNote: 'This project is still cooking — soon I’ll be able to show you more!',
    galleryHint: 'Click any drawing to open its page.',
    backToGallery: '← All illustrations',
    prevProject: 'Previous', nextProject: 'Next',
    moreOfProject: 'More of this project — keep scrolling!',
    lightboxClose: 'Close',
    prev: 'Previous', next: 'Next',
    footerMade: 'Made with play, color and a little bit of coffee.',
    notFoundTitle: 'Oops — this page ran away!',
    notFoundBody: 'The page you’re looking for doesn’t exist (or it’s hiding really well).',
    notFoundCta: 'Take me home',
    aboutParas: [
      'Mireya Rojas is a Spanish‑Colombian artist currently living in Pittsburgh, PA. She considers herself a kid who never grew up, and her art reflects that <strong>playful spirit</strong>. She loves bright colors, testing out new techniques, and taking on projects that bring a smile to your face.',
      'Her journey brought her from Spain to the U.S. to pursue a dual passion: studying animation while playing soccer at a competitive level — a passion she still shares today by coaching young players. That same love for play and imagination fuels her creative work. <strong>She enjoys illustrating children’s books, designing products, and creating playful animations</strong> that bring stories to life and build worlds where imagination can run wild.',
      'Whether she is designing products for Pup‑o‑Clock, creating animations for the Pittsburgh Penguins, or painting murals for local gyms, she is up for any project that lets her play, create, and spread a little joy.',
    ],
    metaHome: 'Mireya Rojas — 2D artist & animator. Colorful, playful illustration, motion design and animation from Pittsburgh, PA.',
    metaIllustration: 'Illustration gallery by Mireya Rojas — children’s books, characters and colorful drawings.',
  },
  es: {
    langName: 'Español', otherLangLabel: 'EN', otherLangTitle: 'View in English',
    skip: 'Saltar al contenido',
    nav: { motion: 'Motion Design', illustration: 'Ilustración', animation: 'Animación', about: 'Sobre mí' },
    viewMore: 'Ver más',
    viewProject: 'Ver proyecto',
    showreelNote: 'Showreel — sustituye assets/media/showreel.mp4 por el reel real',
    illustrationTitle: 'Ilustración',
    illustrationIntro: 'Colores vivos, técnicas nuevas y dibujos que intentan sacarte una sonrisa.',
    animationTitle: 'Animación',
    animationIntro: 'Historias en movimiento — elige un proyecto y dale al play.',
    aboutTitle: '¿Quién soy?',
    aboutCta: 'Hagamos algo divertido',
    contactTitle: 'Contáctame',
    contactBlurb: '¿Tienes un proyecto, una historia o una idea loca que necesita color y movimiento? Me encantaría escucharla.',
    contactButton: '¡Escríbeme!',
    contactWork: '¡Mira mi trabajo!',
    backToTop: 'Volver arriba',
    backToWork: '← Todos los proyectos de animación',
    comingSoon: 'Muy pronto…',
    comingSoonNote: 'Este proyecto aún se está cocinando — ¡pronto podré enseñarte más!',
    galleryHint: 'Haz clic en cualquier dibujo para abrir su página.',
    backToGallery: '← Todas las ilustraciones',
    prevProject: 'Anterior', nextProject: 'Siguiente',
    moreOfProject: '¡Más de este proyecto — sigue bajando!',
    lightboxClose: 'Cerrar',
    prev: 'Anterior', next: 'Siguiente',
    footerMade: 'Hecho con juego, color y un poquito de café.',
    notFoundTitle: '¡Ups! Esta página se escapó',
    notFoundBody: 'La página que buscas no existe (o se esconde muy bien).',
    notFoundCta: 'Llévame al inicio',
    aboutParas: [
      'Mireya Rojas es una artista hispano‑colombiana que vive actualmente en Pittsburgh, PA. Se considera una niña que nunca creció, y su arte refleja ese <strong>espíritu juguetón</strong>. Le encantan los colores vivos, probar técnicas nuevas y aceptar proyectos que te saquen una sonrisa.',
      'Su camino la llevó de España a Estados Unidos para perseguir una doble pasión: estudiar animación mientras jugaba al fútbol a nivel competitivo — una pasión que hoy sigue compartiendo entrenando a jugadoras jóvenes. Ese mismo amor por el juego y la imaginación alimenta su trabajo creativo. <strong>Disfruta ilustrando libros infantiles, diseñando productos y creando animaciones juguetonas</strong> que dan vida a historias y construyen mundos donde la imaginación corre libre.',
      'Ya sea diseñando productos para Pup‑o‑Clock, creando animaciones para los Pittsburgh Penguins o pintando murales para gimnasios locales, se apunta a cualquier proyecto que le permita jugar, crear y repartir un poquito de alegría.',
    ],
    metaHome: 'Mireya Rojas — artista 2D y animadora. Ilustración, motion design y animación llenas de color desde Pittsburgh, PA.',
    metaIllustration: 'Galería de ilustración de Mireya Rojas — libros infantiles, personajes y dibujos llenos de color.',
  },
};

// ------------------------------------------------ ANIMATION PROJECTS
// Each becomes a page at /{lang}/work/{slug}/ and a tile on the home page.
// media.video → hero video slot; media.hover → short loop that plays when
// hovering the tile on the home page (optional).
export const projects = [
  {
    slug: '6233-km',
    accent: 'cyan',
    tileImage: '/assets/img/tile-6233km.jpg',
    video: '/assets/media/6233km.mp4',
    poster: '/assets/img/poster-6233km.svg',
    gallery: ['/assets/img/p6233-1.svg','/assets/img/p6233-2.svg','/assets/img/p6233-3.svg','/assets/img/p6233-4.svg','/assets/img/p6233-5.svg','/assets/img/p6233-6.svg'],
    layout: 'grid', // video + 6 stills below (per Mireya's wireframe)
    comingSoon: false,
    en: {
      title: '“6233 KM”',
      tagline: 'An animated short about the distance between two homes.',
      description: 'PLACEHOLDER — Short explanation of the project: the idea, Mireya’s role, tools used (e.g. TVPaint, After Effects), and what makes it special. Two or three sentences is perfect. <em>Replace this text in content.js.</em>',
      metaDescription: '6233 KM — an animated short film by Mireya Rojas.',
    },
    es: {
      title: '“6233 KM”',
      tagline: 'Un corto animado sobre la distancia entre dos hogares.',
      description: 'PLACEHOLDER — Pequeña explicación del proyecto: la idea, el papel de Mireya, las herramientas usadas (p. ej. TVPaint, After Effects) y qué lo hace especial. Con dos o tres frases basta. <em>Sustituye este texto en content.js.</em>',
      metaDescription: '6233 KM — un cortometraje animado de Mireya Rojas.',
    },
  },
  {
    slug: 'animations',
    accent: 'yellow',
    tileImage: '/assets/img/tile-animations.jpg',
    video: '/assets/media/animations.mp4',
    poster: '/assets/img/poster-animations.svg',
    // layout 'slides': hero video + two auto-advancing slideshows (per wireframe)
    layout: 'slides',
    slideshows: [
      ['/assets/img/anim-a1.svg','/assets/img/anim-a2.svg','/assets/img/anim-a3.svg','/assets/img/anim-a4.svg','/assets/img/anim-a5.svg'],
      ['/assets/img/anim-b1.svg','/assets/img/anim-b2.svg','/assets/img/anim-b3.svg','/assets/img/anim-b4.svg','/assets/img/anim-b5.svg'],
    ],
    comingSoon: false,
    en: {
      title: 'Animations',
      tagline: 'Loops, experiments and commissions — including work for the Pittsburgh Penguins.',
      description: 'PLACEHOLDER — A collection of animation work: personal loops, client pieces and experiments. Mention the Penguins animations and anything else worth bragging about. <em>Replace this text in content.js.</em>',
      metaDescription: 'Animation work by Mireya Rojas — loops, client work and experiments.',
    },
    es: {
      title: 'Animaciones',
      tagline: 'Loops, experimentos y encargos — incluido trabajo para los Pittsburgh Penguins.',
      description: 'PLACEHOLDER — Una colección de trabajos de animación: loops personales, piezas para clientes y experimentos. Menciona las animaciones para los Penguins y todo lo que merezca presumirse. <em>Sustituye este texto en content.js.</em>',
      metaDescription: 'Animación de Mireya Rojas — loops, trabajos para clientes y experimentos.',
    },
  },
  {
    slug: 'pup-o-clock',
    accent: 'pink',
    tileImage: '/assets/img/tile-pupoclock.jpg',
    video: '/assets/media/pupoclock.mp4',
    poster: '/assets/img/poster-pupoclock.svg',
    layout: 'grid',
    gallery: ['/assets/img/pup-1.svg','/assets/img/pup-2.svg','/assets/img/pup-3.svg','/assets/img/pup-4.svg'],
    comingSoon: true, // shows the “soon I’ll be able to show you” note
    en: {
      title: 'Pup O’Clock',
      tagline: 'Playful product design & animation for Pup‑o‑Clock.',
      description: 'PLACEHOLDER — What Mireya does for Pup‑o‑Clock: product illustration, brand characters, animations. <em>Replace this text in content.js.</em>',
      metaDescription: 'Pup O’Clock — product design and animation by Mireya Rojas.',
    },
    es: {
      title: 'Pup O’Clock',
      tagline: 'Diseño de producto y animación juguetona para Pup‑o‑Clock.',
      description: 'PLACEHOLDER — Lo que Mireya hace para Pup‑o‑Clock: ilustración de producto, personajes de marca, animaciones. <em>Sustituye este texto en content.js.</em>',
      metaDescription: 'Pup O’Clock — diseño de producto y animación de Mireya Rojas.',
    },
  },
];

// ------------------------------------------------ ILLUSTRATIONS
// Every illustration is clickable and gets its own page at
// /{lang}/illustration/{slug}/ (blue backdrop, big image, arrows —
// per Mireya's wireframe). `extras` = how many additional images that
// project shows when you scroll down (placeholders are generated;
// swap them in assets-src/img/ as {slug}-1.svg…N or change paths here).
export const illustrations = [
  { slug: 'mireya-bookcover', src: '/assets/img/work/mireya-bookcover.jpg', ratio: 'wide', acc: '#C20000', extras: 0, en: "Book Cover", es: "Portada de libro" },
  { slug: 'poster-smallersize', src: '/assets/img/work/poster-smallersize.jpg', ratio: 'tall', acc: '#EADA1A', extras: 0, en: "Poster", es: "Cartel" },
  { slug: 'mireya-scenes', src: '/assets/img/work/mireya-scenes.jpg', ratio: 'wide', acc: '#2C4D96', extras: 0, en: "Scenes & Worlds", es: "Escenas y mundos" },
  { slug: 'best-soccer-player-comic', src: '/assets/img/work/best-soccer-player-comic.jpg', ratio: 'wide', acc: '#35AAB5', extras: 0, en: "Best Soccer Player — Comic", es: "El mejor futbolista — Cómic" },
  { slug: 'night-time-comic', src: '/assets/img/work/night-time-comic.jpg', ratio: 'square', acc: '#D36969', extras: 0, en: "Night Time — Comic", es: "Hora de dormir — Cómic" },
  { slug: 'harleen-34', src: '/assets/img/work/harleen-34.jpg', ratio: 'tall', acc: '#0AB883', extras: 0, en: "Harleen", es: "Harleen" },
  { slug: 'martina-29', src: '/assets/img/work/martina-29.jpg', ratio: 'tall', acc: '#0AB883', extras: 0, en: "Martina", es: "Martina" },
  { slug: 'tatum-26', src: '/assets/img/work/tatum-26.jpg', ratio: 'tall', acc: '#0AB883', extras: 0, en: "Tatum", es: "Tatum" },
  { slug: 'mireya-20', src: '/assets/img/work/mireya-20.jpg', ratio: 'tall', acc: '#0AB883', extras: 0, en: "Mireya", es: "Mireya" },
  { slug: 'img-6076', src: '/assets/img/work/img-6076.png', ratio: 'wide', acc: '#FF3DDE', extras: 0, en: "Sticker Art", es: "Arte de pegatinas" },
  { slug: 'img-6140', src: '/assets/img/work/img-6140.jpg', ratio: 'square', acc: '#6988D3', extras: 0, en: "Sketchbook", es: "Cuaderno de bocetos" },
  { slug: 'untitled-artwork-14', src: '/assets/img/work/untitled-artwork-14.jpg', ratio: 'square', acc: '#57A9E1', extras: 0, en: "Artwork 14", es: "Obra 14" },
  { slug: 'untitled-artwork-14-copy', src: '/assets/img/work/untitled-artwork-14-copy.png', ratio: 'wide', acc: '#FF3DDE', extras: 0, en: "Artwork 14 · 1", es: "Obra 14 · 1" },
  { slug: 'untitled-artwork-14-copy-2', src: '/assets/img/work/untitled-artwork-14-copy-2.jpg', ratio: 'square', acc: '#3DB4FF', extras: 0, en: "Artwork 14 · 2", es: "Obra 14 · 2" },
  { slug: 'untitled-artwork-14-copy-3', src: '/assets/img/work/untitled-artwork-14-copy-3.jpg', ratio: 'wide', acc: '#2C4C96', extras: 0, en: "Artwork 14 · 3", es: "Obra 14 · 3" },
  { slug: 'untitled-artwork-14-copy-4', src: '/assets/img/work/untitled-artwork-14-copy-4.jpg', ratio: 'wide', acc: '#C26100', extras: 0, en: "Artwork 14 · 4", es: "Obra 14 · 4" },
  { slug: 'untitled-artwork-14-copy-5', src: '/assets/img/work/untitled-artwork-14-copy-5.png', ratio: 'wide', acc: '#F87401', extras: 0, en: "Artwork 14 · 5", es: "Obra 14 · 5" },
  { slug: 'untitled-artwork-15', src: '/assets/img/work/untitled-artwork-15.jpg', ratio: 'wide', acc: '#FFFF3D', extras: 0, en: "Artwork 15", es: "Obra 15" },
  { slug: 'untitled-artwork-16', src: '/assets/img/work/untitled-artwork-16.jpg', ratio: 'wide', acc: '#B6550C', extras: 0, en: "Artwork 16", es: "Obra 16" },
  { slug: 'ilustracion-sin-titulo-1', src: '/assets/img/work/ilustracion-sin-titulo-1.jpg', ratio: 'square', acc: '#D36969', extras: 0, en: "Untitled No. 1", es: "Sin título n.º 1" },
  { slug: 'ilustracion-sin-titulo-2', src: '/assets/img/work/ilustracion-sin-titulo-2.jpg', ratio: 'tall', acc: '#5FBCDD', extras: 0, en: "Untitled No. 2", es: "Sin título n.º 2" },
  { slug: 'ilustracion-sin-titulo-2-copy', src: '/assets/img/work/ilustracion-sin-titulo-2-copy.jpg', ratio: 'wide', acc: '#3D2C96', extras: 0, en: "Untitled No. 2 b", es: "Sin título n.º 2 b" },
  { slug: 'ilustracion-sin-titulo-11', src: '/assets/img/work/ilustracion-sin-titulo-11.jpg', ratio: 'square', acc: '#41B2FB', extras: 0, en: "Untitled No. 11", es: "Sin título n.º 11" },
  { slug: 'ilustracion-sin-titulo-11-copy-2', src: '/assets/img/work/ilustracion-sin-titulo-11-copy-2.jpg', ratio: 'wide', acc: '#E1A15C', extras: 0, en: "Untitled No. 11 b", es: "Sin título n.º 11 b" },
  { slug: 'ilustracion-sin-titulo-23', src: '/assets/img/work/ilustracion-sin-titulo-23.jpg', ratio: 'wide', acc: '#466AE9', extras: 0, en: "Untitled No. 23", es: "Sin título n.º 23" },
  { slug: 'ilustracion-sin-titulo-24', src: '/assets/img/work/ilustracion-sin-titulo-24.jpg', ratio: 'wide', acc: '#FFBC00', extras: 0, en: "Untitled No. 24", es: "Sin título n.º 24" },
  { slug: 'ilustracion-sin-titulo-25', src: '/assets/img/work/ilustracion-sin-titulo-25.jpg', ratio: 'wide', acc: '#36CE5B', extras: 0, en: "Untitled No. 25", es: "Sin título n.º 25" },
  { slug: 'ilustracion-sin-titulo-26', src: '/assets/img/work/ilustracion-sin-titulo-26.jpg', ratio: 'wide', acc: '#5CA3E0', extras: 0, en: "Untitled No. 26", es: "Sin título n.º 26" },
  { slug: 'ilustracion-sin-titulo-27', src: '/assets/img/work/ilustracion-sin-titulo-27.jpg', ratio: 'wide', acc: '#FD3FAA', extras: 0, en: "Untitled No. 27", es: "Sin título n.º 27" },
  { slug: 'ilustracion-sin-titulo-28', src: '/assets/img/work/ilustracion-sin-titulo-28.jpg', ratio: 'wide', acc: '#583DFF', extras: 0, en: "Untitled No. 28", es: "Sin título n.º 28" },
  { slug: 'ilustracion-sin-titulo-29', src: '/assets/img/work/ilustracion-sin-titulo-29.jpg', ratio: 'wide', acc: '#FDD100', extras: 0, en: "Untitled No. 29", es: "Sin título n.º 29" },
  { slug: 'ilustracion-sin-titulo-32', src: '/assets/img/work/ilustracion-sin-titulo-32.jpg', ratio: 'wide', acc: '#F3CA4A', extras: 0, en: "Untitled No. 32", es: "Sin título n.º 32" },
  { slug: 'ilustracion-sin-titulo-33', src: '/assets/img/work/ilustracion-sin-titulo-33.jpg', ratio: 'wide', acc: '#E96353', extras: 0, en: "Untitled No. 33", es: "Sin título n.º 33" },
  { slug: 'ilustracion-sin-titulo-34', src: '/assets/img/work/ilustracion-sin-titulo-34.jpg', ratio: 'tall', acc: '#FF3D3D', extras: 0, en: "Untitled No. 34", es: "Sin título n.º 34" },
  { slug: 'untitled-artwork', src: '/assets/img/work/untitled-artwork.jpg', ratio: 'tall', acc: '#69C6D3', extras: 0, en: "Artwork", es: "Obra" },
  { slug: 'screenshot-2026-01-14-at-21-20-40', src: '/assets/img/work/screenshot-2026-01-14-at-21-20-40.jpg', ratio: 'wide', acc: '#3DFF3D', extras: 0, en: "Studio Work", es: "Trabajo de estudio" },
  { slug: 'img-3624', src: '/assets/img/work/img-3624.jpg', ratio: 'tall', acc: '#6599D7', extras: 0, en: "Early Work", es: "Trabajo temprano" },
];
