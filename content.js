// =============================================================
//  MIREYA ROJAS FENOY — PORTFOLIO · SINGLE SOURCE OF CONTENT
//  Edit THIS file to change any text, video or image on the site,
//  then run:  node build.mjs
//
//  • Every visible string exists in English (en) and Spanish (es).
//  • Media lives in assets-src/  → published at /assets/...
//      videos  → assets-src/media/      (MP4, H.264)
//      images  → assets-src/img/...
//  • Leave a path as '' (empty) to show an empty "coming soon" slot.
// =============================================================

export const site = {
  name: 'Mireya Rojas',
  fullName: 'Mireya Rojas Fenoy',
  domain: 'https://portfolioworkinprogress.netlify.app', // change when she gets her own domain
  defaultLang: 'en',
  langs: ['en', 'es'],
  themeColor: '#FF1744',
  social: {
    email: 'irismireya11@gmail.com',
    instagram: 'https://www.instagram.com/thereds_museum/',
    linkedin: 'https://www.linkedin.com/in/mireya-rojas-9b9133331/',
    tiktok: '', // paste her TikTok URL here and the icon appears everywhere
  },
  // Home hero video ("Motion Design Demo Reel"). Drop the file at
  // assets-src/media/demoreel.mp4 — the build picks it up automatically.
  demoReel: '/assets/media/demoreel.mp4',
  demoReelPoster: '/assets/img/posters/the-beginning.jpg',
  // About-me photo cycler: every file in assets-src/img/about/ is used,
  // in name order, one new picture every `aboutInterval` ms.
  aboutInterval: 3000,
};

// ------------------------------------------------ UI STRINGS
export const ui = {
  en: {
    otherLangLabel: 'ES', otherLangTitle: 'Ver en español',
    skip: 'Skip to content',
    role: 'Art Director / Illustrator / Creative',
    nav: { motion: 'Motion Design', illustration: 'Illustration', projects: 'Projects', about: 'About Me', contact: 'Contact' },
    viewMore: 'View more',
    demoReel: 'Motion design demo reel',
    reelSoon: 'Demo reel coming soon',
    sound: 'Sound', mute: 'Mute', fullscreen: 'Full screen',
    illustrationTitle: 'Illustration',
    projectsTitle: 'Projects',
    motionTitle: 'Motion Design',
    comingSoon: 'Coming soon',
    mediaSoon: 'Coming soon',
    words: ['Animation', 'Motion Design', 'Illustration', 'Murals', 'Product Design'],
    aboutTitle: 'Who is Mireya?',
    aboutParas: [
      'Mireya Rojas is a Spanish‑Colombian artist currently living in Pittsburgh, PA. She considers herself a kid who never grew up, and her art reflects that playful spirit. She loves bright colors, testing out new techniques, and taking on projects that bring a smile to your face.',
      'Her journey brought her from Spain to the U.S. to pursue a dual passion: studying animation while playing soccer at a competitive level — a passion she still shares today by coaching young players. That same love for play and imagination fuels her creative work. She enjoys illustrating children’s books, designing products, and creating playful animations that bring stories to life and build worlds where imagination can run wild.',
      'Whether she is designing products for Pup‑o‑Clock, creating animations for the Pittsburgh Penguins, or painting murals for local gyms, she is up for any project that lets her play, create, and spread a little joy.',
    ],
    contactTitle: 'Let’s create something fun!',
    form: { name: 'Name', email: 'Email', message: 'Message', send: 'Send' },
    thanksTitle: 'Thank you!',
    thanksBody: 'Your message is on its way — Mireya will get back to you soon.',
    backHome: 'Back to home',
    footerMade: 'Made with play, color and a little bit of coffee.',
    hopeFun: 'Hope you had fun!',
    backToTop: 'Back to top',
    back: 'Back',
    close: 'Close', prev: 'Previous', next: 'Next',
    notFoundTitle: 'Oops — this page ran away!',
    notFoundCta: 'Take me home',
    metaHome: 'Mireya Rojas Fenoy — art director, illustrator and animator. Colorful motion design, illustration and projects from Pittsburgh, PA.',
    metaMotion: 'Motion design work by Mireya Rojas Fenoy.',
    metaIllustration: 'Illustration gallery by Mireya Rojas Fenoy.',
  },
  es: {
    otherLangLabel: 'EN', otherLangTitle: 'View in English',
    skip: 'Saltar al contenido',
    role: 'Directora de arte / Ilustradora / Creativa',
    nav: { motion: 'Motion Design', illustration: 'Ilustración', projects: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
    viewMore: 'Ver más',
    demoReel: 'Demo reel de motion design',
    reelSoon: 'Demo reel muy pronto',
    sound: 'Sonido', mute: 'Silenciar', fullscreen: 'Pantalla completa',
    illustrationTitle: 'Ilustración',
    projectsTitle: 'Proyectos',
    motionTitle: 'Motion Design',
    comingSoon: 'Muy pronto',
    mediaSoon: 'Muy pronto',
    words: ['Animación', 'Motion Design', 'Ilustración', 'Murales', 'Diseño de producto'],
    aboutTitle: '¿Quién es Mireya?',
    aboutParas: [
      'Mireya Rojas es una artista hispano‑colombiana que vive actualmente en Pittsburgh, PA. Se considera una niña que nunca creció, y su arte refleja ese espíritu juguetón. Le encantan los colores vivos, probar técnicas nuevas y aceptar proyectos que te saquen una sonrisa.',
      'Su camino la llevó de España a Estados Unidos para perseguir una doble pasión: estudiar animación mientras jugaba al fútbol a nivel competitivo — una pasión que hoy sigue compartiendo entrenando a jugadoras jóvenes. Ese mismo amor por el juego y la imaginación alimenta su trabajo creativo. Disfruta ilustrando libros infantiles, diseñando productos y creando animaciones juguetonas que dan vida a historias y construyen mundos donde la imaginación corre libre.',
      'Ya sea diseñando productos para Pup‑o‑Clock, creando animaciones para los Pittsburgh Penguins o pintando murales para gimnasios locales, se apunta a cualquier proyecto que le permita jugar, crear y repartir un poquito de alegría.',
    ],
    contactTitle: '¡Creemos algo divertido!',
    form: { name: 'Nombre', email: 'Email', message: 'Mensaje', send: 'Enviar' },
    thanksTitle: '¡Gracias!',
    thanksBody: 'Tu mensaje va en camino — Mireya te responderá pronto.',
    backHome: 'Volver al inicio',
    footerMade: 'Hecho con juego, color y un poquito de café.',
    hopeFun: '¡Espero que te hayas divertido!',
    backToTop: 'Volver arriba',
    back: 'Volver',
    close: 'Cerrar', prev: 'Anterior', next: 'Siguiente',
    notFoundTitle: '¡Ups! Esta página se escapó',
    notFoundCta: 'Llévame al inicio',
    metaHome: 'Mireya Rojas Fenoy — directora de arte, ilustradora y animadora. Motion design, ilustración y proyectos llenos de color desde Pittsburgh, PA.',
    metaMotion: 'Trabajos de motion design de Mireya Rojas Fenoy.',
    metaIllustration: 'Galería de ilustración de Mireya Rojas Fenoy.',
  },
};

// ------------------------------------------------ MOTION DESIGN VIDEOS
// Grid on /motion-design/ (preview plays on hover) + one page per video
// (blue page, video keeps playing, sound + full screen available).
// desc: one or more paragraphs; leave '' if not written yet.
export const motion = [
  { slug: 'coffee-explainer', video: '/assets/media/coffee-explainer.mp4', preview: '/assets/media/coffee-explainer-preview.mp4', poster: '/assets/img/posters/coffee-explainer.jpg',
    en: { title: 'Coffee Explainer Video', desc: '' }, es: { title: 'Video explicativo de café', desc: '' } },
  { slug: 'the-beginning', video: '/assets/media/the-beginning.mp4', preview: '/assets/media/the-beginning-preview.mp4', poster: '/assets/img/posters/the-beginning.jpg',
    en: { title: 'The Beginning', desc: '' }, es: { title: 'El comienzo', desc: '' } },
  { slug: 'cheerios-ad', video: '/assets/media/cheerios-ad.mp4', preview: '/assets/media/cheerios-ad-preview.mp4', poster: '/assets/img/posters/cheerios-ad.jpg',
    en: { title: 'Cheerios Ad', desc: '' }, es: { title: 'Anuncio de Cheerios', desc: '' } },
  { slug: 'space-museum', video: '/assets/media/space-museum.mp4', preview: '/assets/media/space-museum-preview.mp4', poster: '/assets/img/posters/space-museum.jpg',
    en: { title: 'Space Museum', desc: '' }, es: { title: 'Museo del espacio', desc: '' } },
  { slug: 'cocacola-ad', video: '/assets/media/cocacola-ad.mp4', preview: '/assets/media/cocacola-ad-preview.mp4', poster: '/assets/img/posters/cocacola-ad.jpg',
    en: { title: 'Coca‑Cola Ad', desc: '' }, es: { title: 'Anuncio de Coca‑Cola', desc: '' } },
  { slug: 'toy-ad', video: '/assets/media/toy-ad.mp4', preview: '/assets/media/toy-ad-preview.mp4', poster: '/assets/img/posters/toy-ad.jpg',
    en: { title: 'Toy Ad', desc: '' }, es: { title: 'Anuncio de juguete', desc: '' } },
];

// ------------------------------------------------ PROJECTS
// Horizontal banners on the home page (hover opens one, the other
// shrinks) + one page each. images: stills shown in a grid under the
// video — empty slots are shown for `slots` until real images exist.
export const projects = [
  { slug: '6233-km', banner: '/assets/img/tile-6233km.jpg', color: 'pink',
    video: '/assets/media/6233km.mp4', poster: '/assets/img/tile-6233km.jpg',
    images: [], slots: 6, comingSoon: false,
    en: { title: '6233 Km', role: '', intro: '', body: '' },
    es: { title: '6233 Km', role: '', intro: '', body: '' } },
  { slug: 'pup-o-clock', banner: '/assets/img/tile-pupoclock.jpg', color: 'pink',
    video: '', poster: '/assets/img/tile-pupoclock.jpg',
    images: [], slots: 0, comingSoon: true,
    en: { title: 'Pup O’Clock', role: 'Art Director', intro: '', body: '' },
    es: { title: 'Pup O’Clock', role: 'Directora de arte', intro: '', body: '' } },
];

// ------------------------------------------------ ILLUSTRATIONS
// Mosaic on the home page (first `illustrationHomeCount`) and the full
// gallery on /illustration/. Clicking opens a viewer with the big image,
// title, optional text (descEn / descEs) and optional extra images
// (more: ['/assets/img/work/…', …]).
// acc = hover tint picked from the artwork's own palette.
export const illustrationHomeCount = 9;
export const illustrations = [
  { slug: 'mireya-bookcover', src: '/assets/img/work/mireya-bookcover.jpg', ratio: 'wide', acc: '#C20000', en: "Book Cover", es: "Portada de libro" },
  { slug: 'poster-smallersize', src: '/assets/img/work/poster-smallersize.jpg', ratio: 'tall', acc: '#EADA1A', en: "Poster", es: "Cartel" },
  { slug: 'mireya-scenes', src: '/assets/img/work/mireya-scenes.jpg', ratio: 'wide', acc: '#2C4D96', en: "Scenes & Worlds", es: "Escenas y mundos" },
  { slug: 'best-soccer-player-comic', src: '/assets/img/work/best-soccer-player-comic.jpg', ratio: 'wide', acc: '#35AAB5', en: "Best Soccer Player — Comic", es: "El mejor futbolista — Cómic" },
  { slug: 'night-time-comic', src: '/assets/img/work/night-time-comic.jpg', ratio: 'square', acc: '#D36969', en: "Night Time — Comic", es: "Hora de dormir — Cómic" },
  { slug: 'harleen-34', src: '/assets/img/work/harleen-34.jpg', ratio: 'tall', acc: '#0AB883', en: "Harleen", es: "Harleen" },
  { slug: 'martina-29', src: '/assets/img/work/martina-29.jpg', ratio: 'tall', acc: '#0AB883', en: "Martina", es: "Martina" },
  { slug: 'tatum-26', src: '/assets/img/work/tatum-26.jpg', ratio: 'tall', acc: '#0AB883', en: "Tatum", es: "Tatum" },
  { slug: 'mireya-20', src: '/assets/img/work/mireya-20.jpg', ratio: 'tall', acc: '#0AB883', en: "Mireya", es: "Mireya" },
  { slug: 'img-6076', src: '/assets/img/work/img-6076.png', ratio: 'wide', acc: '#FF3DDE', en: "Sticker Art", es: "Arte de pegatinas" },
  { slug: 'img-6140', src: '/assets/img/work/img-6140.jpg', ratio: 'square', acc: '#6988D3', en: "Sketchbook", es: "Cuaderno de bocetos" },
  { slug: 'untitled-artwork-14', src: '/assets/img/work/untitled-artwork-14.jpg', ratio: 'square', acc: '#57A9E1', en: "Artwork 14", es: "Obra 14" },
  { slug: 'untitled-artwork-14-copy', src: '/assets/img/work/untitled-artwork-14-copy.png', ratio: 'wide', acc: '#FF3DDE', en: "Artwork 14 · 1", es: "Obra 14 · 1" },
  { slug: 'untitled-artwork-14-copy-2', src: '/assets/img/work/untitled-artwork-14-copy-2.jpg', ratio: 'square', acc: '#3DB4FF', en: "Artwork 14 · 2", es: "Obra 14 · 2" },
  { slug: 'untitled-artwork-14-copy-3', src: '/assets/img/work/untitled-artwork-14-copy-3.jpg', ratio: 'wide', acc: '#2C4C96', en: "Artwork 14 · 3", es: "Obra 14 · 3" },
  { slug: 'untitled-artwork-14-copy-4', src: '/assets/img/work/untitled-artwork-14-copy-4.jpg', ratio: 'wide', acc: '#C26100', en: "Artwork 14 · 4", es: "Obra 14 · 4" },
  { slug: 'untitled-artwork-14-copy-5', src: '/assets/img/work/untitled-artwork-14-copy-5.png', ratio: 'wide', acc: '#F87401', en: "Artwork 14 · 5", es: "Obra 14 · 5" },
  { slug: 'untitled-artwork-15', src: '/assets/img/work/untitled-artwork-15.jpg', ratio: 'wide', acc: '#FFFF3D', en: "Artwork 15", es: "Obra 15" },
  { slug: 'untitled-artwork-16', src: '/assets/img/work/untitled-artwork-16.jpg', ratio: 'wide', acc: '#B6550C', en: "Artwork 16", es: "Obra 16" },
  { slug: 'ilustracion-sin-titulo-1', src: '/assets/img/work/ilustracion-sin-titulo-1.jpg', ratio: 'square', acc: '#D36969', en: "Untitled No. 1", es: "Sin título n.º 1" },
  { slug: 'ilustracion-sin-titulo-2', src: '/assets/img/work/ilustracion-sin-titulo-2.jpg', ratio: 'tall', acc: '#5FBCDD', en: "Untitled No. 2", es: "Sin título n.º 2" },
  { slug: 'ilustracion-sin-titulo-2-copy', src: '/assets/img/work/ilustracion-sin-titulo-2-copy.jpg', ratio: 'wide', acc: '#3D2C96', en: "Untitled No. 2 b", es: "Sin título n.º 2 b" },
  { slug: 'ilustracion-sin-titulo-11', src: '/assets/img/work/ilustracion-sin-titulo-11.jpg', ratio: 'square', acc: '#41B2FB', en: "Untitled No. 11", es: "Sin título n.º 11" },
  { slug: 'ilustracion-sin-titulo-11-copy-2', src: '/assets/img/work/ilustracion-sin-titulo-11-copy-2.jpg', ratio: 'wide', acc: '#E1A15C', en: "Untitled No. 11 b", es: "Sin título n.º 11 b" },
  { slug: 'ilustracion-sin-titulo-23', src: '/assets/img/work/ilustracion-sin-titulo-23.jpg', ratio: 'wide', acc: '#466AE9', en: "Untitled No. 23", es: "Sin título n.º 23" },
  { slug: 'ilustracion-sin-titulo-24', src: '/assets/img/work/ilustracion-sin-titulo-24.jpg', ratio: 'wide', acc: '#FFBC00', en: "Untitled No. 24", es: "Sin título n.º 24" },
  { slug: 'ilustracion-sin-titulo-25', src: '/assets/img/work/ilustracion-sin-titulo-25.jpg', ratio: 'wide', acc: '#36CE5B', en: "Untitled No. 25", es: "Sin título n.º 25" },
  { slug: 'ilustracion-sin-titulo-26', src: '/assets/img/work/ilustracion-sin-titulo-26.jpg', ratio: 'wide', acc: '#5CA3E0', en: "Untitled No. 26", es: "Sin título n.º 26" },
  { slug: 'ilustracion-sin-titulo-27', src: '/assets/img/work/ilustracion-sin-titulo-27.jpg', ratio: 'wide', acc: '#FD3FAA', en: "Untitled No. 27", es: "Sin título n.º 27" },
  { slug: 'ilustracion-sin-titulo-28', src: '/assets/img/work/ilustracion-sin-titulo-28.jpg', ratio: 'wide', acc: '#583DFF', en: "Untitled No. 28", es: "Sin título n.º 28" },
  { slug: 'ilustracion-sin-titulo-29', src: '/assets/img/work/ilustracion-sin-titulo-29.jpg', ratio: 'wide', acc: '#FDD100', en: "Untitled No. 29", es: "Sin título n.º 29" },
  { slug: 'ilustracion-sin-titulo-32', src: '/assets/img/work/ilustracion-sin-titulo-32.jpg', ratio: 'wide', acc: '#F3CA4A', en: "Untitled No. 32", es: "Sin título n.º 32" },
  { slug: 'ilustracion-sin-titulo-33', src: '/assets/img/work/ilustracion-sin-titulo-33.jpg', ratio: 'wide', acc: '#E96353', en: "Untitled No. 33", es: "Sin título n.º 33" },
  { slug: 'ilustracion-sin-titulo-34', src: '/assets/img/work/ilustracion-sin-titulo-34.jpg', ratio: 'tall', acc: '#FF3D3D', en: "Untitled No. 34", es: "Sin título n.º 34" },
  { slug: 'untitled-artwork', src: '/assets/img/work/untitled-artwork.jpg', ratio: 'tall', acc: '#69C6D3', en: "Artwork", es: "Obra" },
  { slug: 'screenshot-2026-01-14-at-21-20-40', src: '/assets/img/work/screenshot-2026-01-14-at-21-20-40.jpg', ratio: 'wide', acc: '#3DFF3D', en: "Studio Work", es: "Trabajo de estudio" },
  { slug: 'img-3624', src: '/assets/img/work/img-3624.jpg', ratio: 'tall', acc: '#6599D7', en: "Early Work", es: "Trabajo temprano" },
];
