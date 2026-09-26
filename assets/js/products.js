/* =========================================================================
   MALHAN FRAGRANCE — CATÁLOGO DE PRODUCTOS
   -------------------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA CARGAR PRODUCTOS.

   Cómo se está cargando el catálogo:
   Cada producto entra recién cuando me pasás su foto real con el precio
   (como las capturas de historias que mandás). En cuanto entra, busco
   el género y los aromas reales del perfume y lo cargo directo en
   "hombre" o "mujer" — no queda ningún producto sin clasificar ni con
   datos inventados. Ya no existe una categoría "mixto" propia: las
   fragancias unisex viven dentro de Hombre y de Mujer (el mismo
   producto en las dos listas) marcadas con unisex:true — ver ese campo
   más abajo. Todavía falta cargar la foto real de cada uno (queda ""
   hasta que la mandes) y confirmar que precio/aromas estén bien.

   Cómo agregar un producto:
   1. Guardá la foto en assets/img/<categoria>/, por ejemplo:
        assets/img/hombre/malhan-noir.jpg
   2. Copiá un bloque { ... } de los de abajo y pegalo en su categoría.
   3. Cambiá nombre, precio, descripción y la ruta de la imagen.
   4. Guardá el archivo y listo: la web se actualiza sola.

   Campos de cada producto
   -------------------------------------------------------------------------
   nombre    (texto)     Nombre de la fragancia. OBLIGATORIO.
   familia   (texto)     OPCIONAL. Familia olfativa corta, ej: "Amaderado",
                         "Floral", "Cítrico". Se muestra como subtítulo.
   precio    (número)    Ej: 28000  →  se muestra "$ 28.000".
                         Poné null si preferís "Consultar precio".
   desc      (texto)     Una o dos líneas describiendo el perfume (notas,
                         carácter, ocasión de uso).
   img       (texto)     Ruta de la foto. Si la dejás en "" se muestra
                         un placeholder prolijo hasta que la cargues.
   img2      (texto)     OPCIONAL. Una segunda foto del mismo producto.
   etiqueta  (texto)     OPCIONAL. Ej: "Nuevo", "Premium", "Último".
   color     (texto)     OPCIONAL. Color de la etiqueta:
                         "dorado" (por defecto) | "marron" | "verde"
   detalles  (lista)     OPCIONAL. Notas olfativas o puntos que se ven al
                         abrir la ficha (ej: "Salida: bergamota, pimienta rosa").
   agotado   (true)      OPCIONAL. Marca el producto como sin stock.
   unisex    (true)      OPCIONAL. Marca la fragancia como unisex: le agrega
                         el cartel "Fragancia unisex" arriba de la foto en
                         la tarjeta y hace que aparezca en el filtro
                         Filtros > Género > Mixto. Para que una fragancia
                         unisex se vea tanto en Hombre como en Mujer, pegá
                         el mismo bloque (con unisex:true) en las dos listas.
   proximamente (true)   OPCIONAL. Para lo que todavía no llegó (sección
                         "Los Próximos Ingresos"): muestra "Próximamente"
                         en lugar del precio y saca el botón "Agregar" —
                         solo se puede consultar por WhatsApp. No lleva
                         precio.

   variantes (lista)     OPCIONAL. Para el mismo perfume en varios tamaños
                         (ej. 30 ml / 50 ml / 100 ml). Si lo usás, NO
                         pongas precio/desc/img/detalles/agotado arriba:
                         van adentro de cada variante. Arriba solo queda
                         nombre/familia/etiqueta.
                         Cada variante:
                           label    (texto)   Ej: "30 ml". OBLIGATORIO.
                           precio, desc, img, img2, detalles, agotado →
                           igual que en un producto normal, pero uno por
                           variante.
                         En la ficha del producto, tocar un tamaño cambia
                         el precio y la descripción de arriba. El primero
                         de la lista es el que se ve por defecto en la
                         tarjeta del catálogo.
   ========================================================================= */

const CONFIG = {
  /* Número de WhatsApp en formato internacional, sin + ni espacios.
     Argentina: 54 + 9 + característica sin 0 + número sin 15. */
  whatsapp: "5492920629946",
  whatsappVisible: "2920 629946",

  /* Link completo a tu perfil. Si lo dejás vacío, el ícono de Instagram
     no aparece en el sitio. */
  instagram: "https://www.instagram.com/malhan_fragrance",

  moneda: "$",

  /* Datos para pagar por transferencia. Malhan solo cobra en efectivo o
     por transferencia (no maneja tarjetas ni cobra online), así que esto
     es el único medio de pago no-efectivo del carrito. Dejalo en null si
     algún día hay que sacarlo — el pedido en efectivo por WhatsApp sigue
     funcionando igual. */
  pago: {
    titular: "Genaro Larraburu Pezzano",
    alias: "larraburu.g",
    cvu: "0000003100065126407221"
  }
};

/* =========================================================================
   ESTRUCTURA DEL SITIO
   -------------------------------------------------------------------------
   Cada categoría es una sección del catálogo (viven todas en la misma
   página, index.html). De acá salen solas la barra de filtros, la
   navegación de arriba, el footer, los títulos de cada sección y las
   tarjetas grandes con foto de arriba del catálogo (el menú de portadas,
   igual que en ROAR).

   El orden acá abajo es el orden en que aparecen los menús en el sitio
   (después de "Todos", que va siempre primero y no se edita acá).

   foto (texto) OPCIONAL. Portada para la tarjeta grande de esa categoría.
                Dejala en "" hasta tener la imagen: la tarjeta se ve igual,
                con un fondo liso en vez de foto.
   ========================================================================= */
const CATEGORIAS = {
  hombre: { nombre: "Hombre", foto: "assets/img/categorias/hombre.jpg" },
  mujer: { nombre: "Mujer", foto: "assets/img/categorias/mujer.jpg" },

  /* Selección propia: los perfumes que más recomendamos, de cualquier
     género. No se arma sola juntando las otras categorías — hay que
     cargar sus productos a mano en PRODUCTOS.recomendacion, más abajo. */
  recomendacion: { nombre: "Nuestra Recomendación", foto: "assets/img/categorias/recomendacion.jpg" },

  /* Lo que ya tenemos confirmado y listo para pedir (foto + precio real). */
  stock: { nombre: "Stock", foto: "assets/img/categorias/stock.jpg" },

  /* Lo que está por llegar: se ve con "Próximamente" en lugar del precio
     (ver el campo proximamente más arriba). */
  proximos: { nombre: "Los Próximos Ingresos", foto: "assets/img/categorias/proximos.jpg" }
};

/* Portada de la tarjeta "Todos" (la que muestra el catálogo completo).
   Dejala en "" hasta tener la imagen. */
const FOTO_TODOS = "assets/img/categorias/todos.jpg";

/* Temporada recomendada de cada perfume (uno o dos ids de acá). Es un
   criterio orientativo nuestro según la familia olfativa de cada uno —
   no hay una fuente que lo certifique — para ayudar a elegir según la
   época del año. Un perfume sin temporada (como el desodorante) no
   entra en ningún filtro salvo "Todas". */
const TEMPORADAS = {
  primavera: "Primavera",
  verano: "Verano",
  otono: "Otoño",
  invierno: "Invierno"
};

/* Aroma dominante de cada perfume (uno o dos ids de acá), para elegir
   directo por lo que uno busca oler en vez de por época del año. Mismo
   criterio nuestro según la familia olfativa, no una certificación. */
const AROMAS = {
  dulce: "Dulce",
  citrico: "Cítrico",
  amaderado: "Amaderado",
  fresco: "Fresco",
  floral: "Floral"
};

/* =========================================================================
   CLIENTES
   -------------------------------------------------------------------------
   Lo que dicen los que ya compraron. Ayuda a que alguien nuevo se anime a
   pedir por WhatsApp sin haber probado el perfume antes.

   texto  → la frase, cortita. Tal cual la dijo.
   autor  → nombre o usuario de Instagram de quien lo dijo.
   img    → captura de la historia o foto que mandó. Opcional.

   Si dejás la lista vacía, la sección entera no aparece.
   ========================================================================= */
const TESTIMONIOS = [
  {
    texto: "Los mejores, siempre 🔥😮‍💨",
    autor: "@bengocheaa_"
  },
  {
    texto: "Gracias @malhan_fragrance.",
    autor: "@fran_fimpell"
  },
  {
    texto: "Gracias @malhan_fragrance, muy buena calidad y atención.",
    autor: "@francodasilveira_"
  },
  {
    texto: "Gran atención y mejor presentación",
    autor: "@Lorenzo_engraf"
  },
  {
    texto: "Genaro asesoró muy bien en la elección",
    autor: "@joacobarciia"
  }
];

/* =========================================================================
   PRODUCTOS
   -------------------------------------------------------------------------
   precio: el real, de la captura que mandaste. familia/desc/detalles:
   notas oficiales del perfume (buscadas en Fragrantica). Falta la foto
   real de cada uno (queda img: "" y se ve un placeholder prolijo).
   ========================================================================= */
const PRODUCTOS = {

  /* ======================================================================
     STOCK  ·  confirmados con foto y precio real
     -----------------------------------------------------------------------
     Género ya definido para cuando los repartas a las otras categorías:
     Asad, Asad Bourbon, Odyssey Mandarin Sky → Hombre
     Yara Rosa, Yara Candy, Eclaire → Mujer
     Khamrah Qahwa, Confidential Private Gold → unisex (van en Hombre Y
     en Mujer, con unisex:true — ver el campo "unisex" más arriba)
     ====================================================================== */
  stock: [
    {
      nombre: "Asad",
      familia: "Oriental",
      temporada: ["invierno"],
      aroma: ["dulce", "amaderado"],
      precio: 75836,
      desc: "Pimienta negra, tabaco y piña sobre un fondo amaderado con vainilla y ámbar.",
      img: "assets/img/stock/asad.jpg",
      detalles: ["Salida: pimienta negra, tabaco, piña", "Corazón: pachulí, café, iris", "Fondo: vainilla, ámbar, madera seca, benjuí, ládano"]
    },
    {
      nombre: "Asad Bourbon",
      familia: "Oriental gourmand",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 101457,
      desc: "Lavanda y pimienta rosa sobre cacao y vainilla bourbon. Cálido, dulce y con muy buena proyección.",
      img: "assets/img/stock/asad-bourbon.jpg",
      detalles: ["Salida: lavanda, ciruela mirabel, pimienta rosa", "Corazón: cacao, nuez moscada, davana", "Fondo: vainilla bourbon, ámbar, vetiver"]
    },
    {
      nombre: "Odyssey Mandarin Sky",
      familia: "Cítrico amaderado",
      temporada: ["verano", "otono"],
      aroma: ["citrico", "amaderado"],
      precio: 66231,
      desc: "Mandarina y naranja sobre caramelo y haba tonka, cerrando en cedro y vetiver. Fresco con fondo amaderado.",
      img: "assets/img/stock/odyssey-mandarin-sky.jpg",
      detalles: ["Salida: mandarina, naranja, azafrán, salvia", "Corazón: caramelo, haba tonka, caléndula", "Fondo: ambroxan, cedro, vetiver"]
    },
    {
      nombre: "Yara Rosa",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 76415,
      desc: "Orquídea y heliotropo sobre frutas tropicales, cerrando en vainilla y sándalo. El clásico rosa de Lattafa.",
      img: "assets/img/stock/yara-rosa.jpg",
      detalles: ["Salida: orquídea, heliotropo, mandarina", "Corazón: acorde gourmand, frutas tropicales", "Fondo: vainilla, almizcle, sándalo"]
    },
    {
      nombre: "Yara Candy",
      familia: "Frutal gourmand",
      temporada: ["primavera", "invierno"],
      aroma: ["dulce", "floral"],
      precio: 66296,
      desc: "Grosella negra y mandarina verde sobre caramelo de fresa y gardenia. Dulce, frutal y fácil de llevar.",
      img: "assets/img/stock/yara-candy.jpg",
      detalles: ["Salida: grosella negra, mandarina verde", "Corazón: caramelo de fresa, gardenia", "Fondo: vainilla, almizcle, ámbar, sándalo"]
    },
    {
      nombre: "Eclaire",
      familia: "Floral gourmand",
      temporada: ["primavera", "invierno"],
      aroma: ["floral", "dulce"],
      precio: 96804,
      desc: "Caramelo y leche sobre miel y flores blancas, cerrando en vainilla y praliné. Dulce y goloso.",
      img: "assets/img/stock/eclaire.jpg",
      detalles: ["Salida: caramelo, leche, azúcar", "Corazón: miel, flores blancas", "Fondo: vainilla, praliné, almizcle"]
    },
    {
      nombre: "Khamrah Qahwa",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 59477,
      desc: "Canela y cardamomo sobre café, vainilla y haba tonka. Intenso y envolvente.",
      img: "assets/img/stock/khamrah-qahwa.jpg",
      detalles: ["Salida: canela, cardamomo, jengibre", "Corazón: praliné, frutos confitados, flores blancas", "Fondo: vainilla, café, haba tonka, benjuí, almizcle"]
    },
    {
      nombre: "Confidential Private Gold",
      familia: "Chypre frutal",
      temporada: ["otono", "primavera"],
      aroma: ["amaderado", "floral"],
      precio: 56112,
      desc: "Durazno, maracuyá y frambuesa sobre un fondo de almizcle, vainilla y sándalo. Fresco y dulce.",
      img: "assets/img/stock/confidential-private-gold.jpg",
      detalles: ["Salida: durazno, maracuyá, pera, frambuesa, grosella negra", "Corazón: lirio de los valles", "Fondo: almizcle, vainilla, pachulí, sándalo, heliotropo"]
    }
  ],

  /* ======================================================================
     HOMBRE
     ====================================================================== */
  hombre: [
    {
      nombre: "Hawas Black",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 107911,
      desc: "Bergamota, ananá y pomelo sobre pachulí y cedro, cerrando en musgo de roble y ámbar.",
      img: "assets/img/hombre/hawas-black.jpg",
      detalles: ["Salida: bergamota, ananá, pomelo", "Corazón: pachulí, cedro, jazmín", "Fondo: musgo de roble, madera, ámbar"]
    },
    {
      nombre: "Hawas Kobra",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 87821,
      desc: "Jengibre y mandarina sobre té verde y canela, cerrando en almizcle y ámbar.",
      img: "assets/img/hombre/hawas-kobra.jpg",
      detalles: ["Salida: jengibre, bergamota, mandarina", "Corazón: té verde, canela, neroli", "Fondo: almizcle, madera, ámbar"]
    },
    {
      nombre: "Hawas Tropical",
      familia: "Frutal gourmand",
      temporada: ["primavera", "invierno"],
      aroma: ["dulce", "floral"],
      precio: 76993,
      desc: "Hoja de higo, agua de coco y jengibre sobre higo y menta, cerrando en haba tonka, almizcle y sándalo.",
      img: "assets/img/hombre/hawas-tropical.jpg",
      detalles: ["Salida: hoja de higo, agua de coco, jengibre", "Corazón: coco, higo, menta", "Fondo: haba tonka, almizcle, sándalo"]
    },
    {
      nombre: "Hawas",
      familia: "Aromático acuático",
      temporada: ["verano"],
      aroma: ["fresco"],
      precio: 65803,
      desc: "El Hawas original de Rasasi: apertura afrutada de manzana, bergamota y limón con un toque de canela, corazón acuático de ciruela y azahar, y fondo ambarado con almizcle y pachulí.",
      img: "assets/img/hombre/hawas.jpg",
      detalles: ["Salida: bergamota, manzana, canela, limón", "Corazón: notas acuáticas, ciruela, azahar, cardamomo", "Fondo: ámbar gris, almizcle, madera a la deriva, pachulí"]
    },
    {
      nombre: "Hawas Ice",
      familia: "Aromático fresco",
      temporada: ["primavera", "verano"],
      aroma: ["fresco"],
      precio: 92324,
      desc: "Versión fría del Hawas, con salida cítrica de manzana, limón y bergamota siciliana realzada por anís estrellado, corazón de ciruela y azahar, y fondo amaderado con musgo y ámbar.",
      img: "assets/img/hombre/hawas-ice.jpg",
      detalles: ["Salida: manzana, limón italiano, bergamota siciliana, anís estrellado", "Corazón: ciruela, azahar, cardamomo", "Fondo: almizcle, ámbar, madera a la deriva, musgo"]
    },
    {
      nombre: "9 PM",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 70476,
      desc: "Manzana, canela y lavanda silvestre sobre bergamota, con un corazón floral de azahar y lirio de los valles que cierra en vainilla, haba tonka, ámbar y pachulí.",
      img: "assets/img/hombre/9-pm.jpg",
      detalles: ["Salida: manzana, canela, lavanda silvestre, bergamota", "Corazón: azahar, lirio de los valles", "Fondo: vainilla, haba tonka, ámbar, pachulí"]
    },
    {
      nombre: "Turathi Blue",
      familia: "Aromático acuático",
      temporada: ["verano"],
      aroma: ["fresco"],
      precio: 86813,
      desc: "Bergamota y mandarina frescas sobre un corazón ambarino y amaderado, que cierra en almizcle, pachulí y un toque de especias.",
      img: "assets/img/hombre/turathi-blue.jpg",
      detalles: ["Salida: bergamota, mandarina", "Corazón: ámbar, notas amaderadas", "Fondo: almizcle, pachulí, especias"]
    },
    {
      nombre: "Dubai Night",
      familia: "Ambarino amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado", "dulce"],
      precio: 139192,
      desc: "Azafrán, bergamota y elemí abren con un toque especiado, sobre un corazón de oud y rosa búlgara que cierra en haba tonka, ámbar, almizcle blanco y musgo de roble.",
      img: "assets/img/hombre/dubai-night.jpg",
      detalles: ["Salida: azafrán, bergamota, elemí", "Corazón: oud, rosa búlgara, lirio de los valles", "Fondo: haba tonka, ámbar, almizcle blanco, musgo de roble"]
    },
    {
      nombre: "Club de Nuit Iconic",
      familia: "Aromático especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "fresco"],
      precio: 95519,
      desc: "Pomelo, limón y menta con un toque de pimienta rosa se funden en un corazón especiado de jengibre, melón y nuez moscada, que cierra en incienso, sándalo, ámbar y cedro.",
      img: "assets/img/hombre/club-de-nuit-iconic.jpg",
      detalles: ["Salida: pomelo, limón, menta, pimienta rosa", "Corazón: jengibre, melón, jazmín, nuez moscada", "Fondo: incienso, sándalo, ámbar, cedro, pachulí"]
    },
    {
      nombre: "Club de Nuit Intense Man EDT",
      familia: "Amaderado especiado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 81625,
      desc: "Limón, ananá y bergamota dan una apertura fresca y afrutada, sobre un corazón ahumado de abedul, jazmín y rosa que cierra en almizcle, ámbar gris, pachulí y vainilla.",
      img: "assets/img/hombre/club-de-nuit-intense-man-edt.jpg",
      detalles: ["Salida: limón, ananá, bergamota, grosella negra", "Corazón: abedul, jazmín, rosa", "Fondo: almizcle, ámbar gris, pachulí, vainilla"]
    },
    {
      nombre: "Club de Nuit Urban Man Elixir",
      familia: "Amaderado aromático",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 92709,
      desc: "Bergamota, pimienta rosa y azahar abren sobre un corazón aromático de lavanda y geranio, que cierra en una base amaderada de vetiver, ámbar y pachulí.",
      img: "assets/img/hombre/club-de-nuit-urban-man-elixir.jpg",
      detalles: ["Salida: bergamota, pimienta rosa, azahar", "Corazón: lavanda, geranio, vetiver", "Fondo: ámbar, cedro, pachulí"]
    },
    {
      nombre: "Odyssey Aqua",
      familia: "Amaderado aromático",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 73756,
      desc: "Naranja y pomelo con un toque herbal de artemisia dan paso a un corazón fresco de menta y lavanda, que cierra en ambroxan, ciprés y pachulí.",
      img: "assets/img/hombre/odyssey-aqua.jpg",
      detalles: ["Salida: naranja, pomelo, artemisia", "Corazón: menta, lavanda", "Fondo: ambroxan, ciprés, pachulí"]
    },
    {
      nombre: "Odyssey Homme Blanco",
      familia: "Oriental fougère",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 74700,
      desc: "Pimienta rosa, pomelo y yuzu se abren sobre un corazón marino con hoja de violeta, que cierra en una base ambarina y amaderada.",
      img: "assets/img/hombre/odyssey-homme-blanco.jpg",
      detalles: ["Salida: pimienta rosa, pomelo, yuzu", "Corazón: notas marinas, hoja de violeta", "Fondo: madera ambarina, ámbar, madera de gaiac"]
    },
    {
      nombre: "Odyssey Homme Negro",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 58577,
      desc: "Cardamomo, mandarina y neroli abren paso a azahar y rosa, sobre un fondo envolvente de vainilla, sándalo y ámbar. Un oriental amaderado potente, pensado para la noche.",
      img: "assets/img/hombre/odyssey-homme-negro.jpg",
      detalles: ["Salida: cardamomo, mandarina, neroli", "Corazón: azahar, rosa", "Fondo: vainilla, sándalo, ámbar"]
    },
    {
      nombre: "Odyssey Mega",
      familia: "Aromático amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 58084,
      desc: "Naranja, limón y bergamota frescos se apoyan en salvia y enebro, sobre una base amaderada de cedro, vetiver y haba tonka. Versátil, pensado para el uso diario.",
      img: "assets/img/hombre/odyssey-mega.jpg",
      detalles: ["Salida: naranja, limón, bergamota, jengibre", "Corazón: ananá, salvia, enebro, geranio", "Fondo: almizcle, cedro, haba tonka, vetiver"]
    },
    {
      nombre: "Uomo Intense",
      familia: "Aromático amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 64795,
      desc: "Jengibre, bergamota y limón dan una apertura fresca y especiada, con albahaca y hojas de violeta en el corazón. Cierra amaderado, con haba tonka, vara de oro y cedro de fondo.",
      img: "assets/img/hombre/uomo-intense.jpg",
      detalles: ["Salida: jengibre, bergamota, limón", "Corazón: especias, pimienta blanca, albahaca, hojas de violeta", "Fondo: haba tonka, vara de oro, cedro"]
    },
    {
      nombre: "Spectre Ghost",
      familia: "Amaderado aromático",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 96183,
      desc: "Jengibre, cardamomo y bergamota abren con un toque especiado, seguidos de pimienta rosa, grosella negra y rosa turca en el corazón. El fondo de vainilla, cedro y pachulí cierra cálido y amaderado.",
      img: "assets/img/hombre/spectre-ghost.jpg",
      detalles: ["Salida: jengibre, cardamomo, bergamota", "Corazón: pimienta rosa, grosella negra, rosa", "Fondo: vainilla, cedro, pachulí"]
    },
    {
      nombre: "Liquid Brun",
      familia: "Amaderado gourmand",
      temporada: ["otono"],
      aroma: ["amaderado", "dulce"],
      precio: 105424,
      desc: "Canela, azahar y cardamomo se mezclan con bergamota fresca, sobre un corazón de vainilla bourbon. Cierra dulce y amaderado, con praliné, almizcle y madera de guayaco.",
      img: "assets/img/hombre/liquid-brun.jpg",
      detalles: ["Salida: canela, azahar, cardamomo, bergamota", "Corazón: vainilla bourbon, elemí", "Fondo: praliné, ambroxan, almizcle, madera de guayaco"]
    },
    {
      nombre: "Asad Elixir",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 86513,
      desc: "Pimienta rosa, azafrán y pomelo dan una apertura especiada, con tabaco y vainilla en el corazón. El fondo de ámbar claro, incienso y pachulí lo hace denso y envolvente, ideal para la noche.",
      img: "assets/img/hombre/asad-elixir.jpg",
      detalles: ["Salida: pimienta rosa, azafrán, pomelo", "Corazón: tabaco, vainilla, cedro", "Fondo: ámbar claro, incienso, pachulí, cashmerán"]
    },
    {
      nombre: "Asad Zanzibar",
      familia: "Oriental acuático",
      temporada: ["invierno", "verano"],
      aroma: ["fresco"],
      precio: 61343,
      desc: "Lavanda y pimienta negra abren con frescura, seguidas de agua de coco, iris y un toque salino en el corazón. Cierra cálido, con vainilla e incienso de fondo, en un perfil tropical poco convencional.",
      img: "assets/img/hombre/asad-zanzibar.jpg",
      detalles: ["Salida: lavanda, pimienta negra", "Corazón: agua de coco, iris, sal", "Fondo: vainilla, incienso"]
    },
    {
      nombre: "Fakhar Black",
      familia: "Amaderado dulce",
      temporada: ["otono"],
      aroma: ["amaderado", "dulce"],
      precio: 65631,
      desc: "Manzana, bergamota y jengibre abren frescos y ligeramente dulces, con lavanda y salvia en el corazón. El fondo de haba tonka, cedro y vetiver lo deja amaderado y versátil para el día a día.",
      img: "assets/img/hombre/fakhar-black.jpg",
      detalles: ["Salida: manzana, bergamota, jengibre", "Corazón: lavanda, salvia, enebro, geranio", "Fondo: haba tonka, cedro, madera de ámbar, vetiver"]
    },
    {
      nombre: "Fakhar Silver",
      familia: "Aromático amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 58748,
      desc: "Manzana, jengibre y bergamota sobre lavanda, salvia y enebro, cerrando en madera de ámbar, cedro y vetiver.",
      img: "assets/img/hombre/fakhar-silver.jpg",
      detalles: ["Salida: manzana, jengibre, bergamota", "Corazón: lavanda, salvia, enebro", "Fondo: madera de ámbar, haba tonka, cedro, vetiver"]
    },
    {
      nombre: "Habik for Men",
      familia: "Aromático amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 58748,
      desc: "Cardamomo, pimienta y bergamota sobre lavanda, canela y salvia, cerrando en sándalo, almizcle y pachulí.",
      img: "assets/img/hombre/habik-for-men.jpg",
      detalles: ["Salida: cardamomo, pimienta, bergamota", "Corazón: lavanda, canela, salvia", "Fondo: haba tonka, sándalo, almizcle, pachulí"]
    },
    {
      nombre: "Hayaati Masc",
      familia: "Amaderado aromático",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 44084,
      desc: "Manzana y bergamota sobre canela y notas amaderadas, cerrando en almizcle y vainilla.",
      img: "assets/img/hombre/hayaati-masc.jpg",
      detalles: ["Salida: manzana, bergamota", "Corazón: canela, notas amaderadas", "Fondo: almizcle, vainilla"]
    },
    {
      nombre: "His Confession",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 81304,
      desc: "Mandarina, canela y lavanda sobre iris, ciprés y benjuí, cerrando en vainilla, haba tonka y ámbar.",
      img: "assets/img/hombre/his-confession.jpg",
      detalles: ["Salida: mandarina, canela, lavanda", "Corazón: iris, ciprés, benjuí", "Fondo: vainilla, haba tonka, pachulí, ámbar"]
    },
    {
      nombre: "Khamrah Dukhan",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 57976,
      desc: "Especias, pimienta de Jamaica y mandarina sobre incienso, labdano y azahar, cerrando en tabaco, praliné y ámbar.",
      img: "assets/img/hombre/khamrah-dukhan.jpg",
      detalles: ["Salida: especias, pimienta de Jamaica, mandarina", "Corazón: incienso, labdano, azahar", "Fondo: praliné, tabaco, ámbar, haba tonka"]
    },
    {
      nombre: "Pisa",
      familia: "Aromático cítrico",
      temporada: ["verano"],
      aroma: ["citrico", "fresco"],
      precio: 105852,
      desc: "Mandarina, limón y bergamota sobre cedro, cerrando en sándalo y ámbar.",
      img: "assets/img/hombre/pisa.jpg",
      detalles: ["Salida: mandarina, limón, bergamota", "Corazón: cedro", "Fondo: sándalo, ámbar"]
    },
    {
      nombre: "Salvo",
      familia: "Oriental fougère",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 65137,
      desc: "Apertura fresca de bergamota que da paso a un corazón especiado de lavanda, pimienta de Sichuán, anís estrellado y nuez moscada, sobre un fondo ambroxado con vainilla.",
      img: "assets/img/hombre/salvo.jpg",
      detalles: ["Salida: bergamota", "Corazón: lavanda, pimienta de Sichuán, anís estrellado, nuez moscada", "Fondo: ambroxán, vainilla"]
    },
    {
      nombre: "Salvo Elixir",
      familia: "Aromático especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "fresco"],
      precio: 58363,
      desc: "Versión más intensa del Salvo: pomelo, cardamomo, canela y nuez moscada en la salida, corazón de vainilla y lavanda, y un fondo ambarado con vetiver, regaliz y pachulí.",
      img: "assets/img/hombre/salvo-elixir.jpg",
      detalles: ["Salida: pomelo, cardamomo, canela, nuez moscada", "Corazón: vainilla, lavanda", "Fondo: ámbar, vetiver, regaliz, pachulí"]
    },
    {
      nombre: "Yeah Man",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 52103,
      desc: "Salida frutal de manzana y jengibre sobre bergamota, corazón herbal de salvia, enebro y geranio, y fondo amaderado con cedro, vetiver e incienso.",
      img: "assets/img/hombre/yeah-man.jpg",
      detalles: ["Salida: manzana, jengibre, bergamota", "Corazón: salvia, bayas de enebro, geranio", "Fondo: amberwood, cedro, vetiver, incienso, haba tonka"]
    },
    {
      nombre: "Yeah Man Parfum",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 52509,
      desc: "Edición parfum de mayor concentración sobre la misma base: manzana, bergamota y jengibre en la apertura, corazón de geranio, enebro y salvia, y fondo amaderado ambarado con incienso y haba tonka.",
      img: "assets/img/hombre/yeah-man-parfum.jpg",
      detalles: ["Salida: manzana, bergamota, jengibre", "Corazón: geranio, bayas de enebro, salvia", "Fondo: amberwood, cedro, incienso, haba tonka, vetiver"]
    },
    {
      nombre: "Rayhaan Wolf",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 87264,
      desc: "Fragancia cálida y envolvente pensada para la noche, con salida especiada de cardamomo, corazón dulce de toffee y fondo amaderado ambarado.",
      img: "assets/img/hombre/rayhaan-wolf.jpg",
      detalles: ["Salida: cardamomo", "Corazón: toffee", "Fondo: amberwood"]
    },
    {
      nombre: "Rayhaan Italia",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 125620,
      desc: "Apertura fresca de lavanda, limón y bergamota que da paso a un corazón cálido de miel, canela, cashmeran y jazmín, y cierra en vainilla, tabaco y haba tonka.",
      img: "assets/img/hombre/rayhaan-italia.jpg",
      detalles: ["Salida: lavanda, limón, bergamota", "Corazón: miel, canela, cashmeran, jazmín", "Fondo: vainilla, hoja de tabaco, haba tonka"]
    },
    {
      nombre: "Bharara King 100ml",
      familia: "Aromático afrutado",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 126584,
      desc: "Salida cítrica de naranja, bergamota y limón sobre un corazón de notas frutales dulces, con fondo cálido de vainilla, almizcle blanco y ámbar.",
      img: "assets/img/hombre/bharara-king-100ml.jpg",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: notas frutales", "Fondo: vainilla, almizcle blanco, ámbar"]
    },
    {
      nombre: "Bharara King 150ml",
      familia: "Aromático afrutado",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 170044,
      desc: "Mismo perfil que el Bharara King en formato grande: naranja, bergamota y limón en la salida, corazón frutal dulce, y fondo de vainilla, almizcle blanco y ámbar.",
      img: "assets/img/hombre/bharara-king-150ml.jpg",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: notas frutales", "Fondo: vainilla, almizcle blanco, ámbar"]
    },
    {
      nombre: "The Kingdom",
      familia: "Aromático especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "fresco"],
      precio: 70412,
      desc: "Lavanda, menta y salvia sobre un corazón dulce de vainilla, tabaco y azahar, cerrando en haba tonka, benjuí y ládano. Elegante y envolvente, con ese perfil dulce-especiado de los grandes clásicos franceses.",
      img: "assets/img/hombre/the-kingdom.jpg",
      detalles: ["Salida: lavanda, menta, salvia", "Corazón: vainilla, tabaco, azahar", "Fondo: haba tonka, benjuí, ládano"]
    },
    {
      nombre: "Jean Lowe Inmortal",
      familia: "Aromático fougère",
      temporada: ["otono"],
      aroma: ["amaderado", "fresco"],
      precio: 57848,
      desc: "Jengibre, pomelo y bergamota sobre un corazón herbal de romero, salvia y geranio, cerrando en ambroxán, ámbar y ládano. Fresco y moderno, para el día y la noche.",
      img: "assets/img/hombre/jean-lowe-inmortal.jpg",
      detalles: ["Salida: jengibre, pomelo, bergamota", "Corazón: romero, notas acuáticas, salvia, geranio", "Fondo: ambroxán, ámbar, ládano"]
    },

    /* ====================================================================
       EX-MIXTO → HOMBRE
       ------------------------------------------------------------------
       Fragancias que antes vivían en la categoría "Mixto" (hoy eliminada
       como menú propio) y que, según la clasificación definitiva de
       género, son Hombre.
       ==================================================================== */
    {
      nombre: "Gold Edition 120ml",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 123283,
      desc: "Bergamota y notas verdes sobre melón, ananá y ámbar, cerrando en vainilla y madera. Amber Oud Gold Edition, de Al Haramain.",
      img: "assets/img/mixto/gold-edition-120ml.jpg",
      detalles: ["Salida: bergamota, notas verdes", "Corazón: melón, ananá, ámbar, acorde gourmand", "Fondo: vainilla, almizcle, madera"]
    },
    {
      nombre: "Hawas Malibu",
      familia: "Aromático",
      temporada: ["otono", "primavera"],
      aroma: ["fresco"],
      precio: 82933,
      desc: "Ananá, naranja y pomelo sobre iris, ámbar y lavanda, cerrando en haba tonka y almizcle.",
      img: "assets/img/mixto/hawas-malibu.jpg",
      detalles: ["Salida: ananá, naranja, pomelo", "Corazón: iris, ámbar, lavanda", "Fondo: haba tonka, almizcle, pachulí, cashmerán"]
    },
    {
      nombre: "Hawas Fire",
      familia: "Aromático marino",
      temporada: ["verano"],
      aroma: ["fresco"],
      precio: 92024,
      desc: "Apertura de salvia esclarea, corazón floral marino de jazmín egipcio con notas acuáticas, y fondo salino de ámbar gris y minerales.",
      img: "assets/img/mixto/hawas-fire.jpg",
      detalles: ["Salida: salvia esclarea", "Corazón: jazmín egipcio, notas marinas", "Fondo: ámbar gris, ámbar, notas minerales"]
    },
    {
      nombre: "9 AM Dive",
      familia: "Aromático acuático",
      temporada: ["verano"],
      aroma: ["fresco"],
      precio: 75279,
      desc: "Limón, menta y grosella negra con un toque de pimienta rosa, sobre un corazón de manzana, cedro e incienso que cierra en jengibre, sándalo, pachulí y jazmín.",
      img: "assets/img/mixto/9-am-dive.jpg",
      detalles: ["Salida: limón, menta, grosella negra, pimienta rosa", "Corazón: manzana, cedro, incienso", "Fondo: jengibre, sándalo, pachulí, jazmín"]
    },
    {
      nombre: "9 PM Elixir",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 104437,
      desc: "Nuez moscada, elemí y cardamomo sobre un corazón especiado de pimienta de Jamaica, lavanda y cuero, que cierra en ládano, pachulí y vainilla.",
      img: "assets/img/mixto/9-pm-elixir.jpg",
      detalles: ["Salida: nuez moscada, elemí, cardamomo", "Corazón: pimienta de Jamaica, lavanda, cuero", "Fondo: ládano, pachulí, vainilla"]
    },
    {
      nombre: "9 PM Night Out",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 125899,
      desc: "Pitahaya, coñac y manzana sobre bergamota, con un corazón goloso de toffee, gamuza y cardamomo que cierra en haba tonka, pachulí y ámbar.",
      img: "assets/img/mixto/9-pm-night-out.jpg",
      detalles: ["Salida: pitahaya, coñac, manzana, bergamota", "Corazón: toffee, gamuza, cardamomo, cedro", "Fondo: haba tonka, pachulí, ámbar"]
    },
    {
      nombre: "9 PM Rebel",
      familia: "Amaderado frutal",
      temporada: ["otono", "primavera"],
      aroma: ["amaderado", "floral"],
      precio: 109411,
      desc: "Manzana verde, ananá y mandarina abren con frescura frutal, sobre un corazón amaderado de cedro y vainilla que cierra en ámbar gris, caramelo y musgo de roble.",
      img: "assets/img/mixto/9-pm-rebel.jpg",
      detalles: ["Salida: manzana verde, ananá, mandarina", "Corazón: cedro, vainilla, musgo de roble", "Fondo: ámbar gris, caramelo, almizcle"]
    },
    {
      nombre: "Aqua Dubai",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 114321,
      desc: "Notas verdes, bergamota y mandarina dan una apertura fresca, sobre un corazón jugoso de melón, ananá y grosella negra que cierra en almizcle y vainilla.",
      img: "assets/img/mixto/aqua-dubai.jpg",
      detalles: ["Salida: notas verdes, bergamota, mandarina", "Corazón: melón, ananá, grosella negra, ámbar", "Fondo: almizcle, galbano, vainilla"]
    },
    {
      nombre: "Club de Nuit Bling",
      familia: "Amaderado aromático",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 96032,
      desc: "Cítricos frescos se mezclan con frutas maduras como mango, guayaba y pitaya, sobre un corazón floral que se funde en maderas suaves y vainilla.",
      img: "assets/img/mixto/club-de-nuit-bling.jpg",
      detalles: ["Salida: cítricos, mango, guayaba", "Corazón: flores blancas, pitaya", "Fondo: maderas aterciopeladas, vainilla"]
    },
    {
      nombre: "Club de Nuit Precieux",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 132631,
      desc: "Ananá, limón y caramelo abren con frescura frutal, sobre un corazón de musgo de roble y jazmín que cierra en cuero, ámbar, almizcle blanco y vainilla.",
      img: "assets/img/mixto/Club-de-Nuit-Precieux.jpg",
      detalles: ["Salida: ananá, limón, bergamota, caramelo", "Corazón: musgo de roble, jazmín, lirio de los valles", "Fondo: ambroxan, cuero, ámbar, vainilla"]
    },
    {
      nombre: "Club de Nuit Sillage",
      familia: "Floral amaderado",
      temporada: ["primavera", "otono"],
      aroma: ["floral", "amaderado"],
      precio: 82847,
      desc: "Bergamota, limón y lima dan una apertura cítrica, sobre un corazón floral de rosa e iris que cierra en sándalo, cedro y almizcle.",
      img: "assets/img/mixto/Club-Acqua-di-Profumo.jpg",
      detalles: ["Salida: bergamota, limón, lima, grosella negra", "Corazón: rosa, iris, jazmín", "Fondo: ambroxan, almizcle, sándalo, cedro"]
    },
    {
      nombre: "Mandarin Sky Elixir",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 89815,
      desc: "Mandarina y naranja se especian con cardamomo y lavanda, sobre un corazón goloso de caramelo y haba tonka que cierra en vainilla, vetiver y pachulí.",
      img: "assets/img/mixto/Odyssey-Mandarin-Sky-Elixir.jpg",
      detalles: ["Salida: mandarina, naranja, lavanda, cardamomo", "Corazón: caramelo, haba tonka, pachulí, incienso", "Fondo: vainilla, vetiver"]
    },
    {
      nombre: "Liquid Brun Limited Edition",
      familia: "Oriental fougère",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 152377,
      desc: "Versión extrait de Liquid Brun, con cardamomo, lavanda y cítricos en la apertura y azahar y rosa en el corazón. El fondo de vainilla, haba tonka, ámbar y musgo de roble le da mayor cuerpo y duración que el original.",
      img: "assets/img/mixto/liquid-brun-limited-edition.jpg",
      detalles: ["Salida: cardamomo, lavanda, cítricos", "Corazón: azahar, madera de guayaco, rosa", "Fondo: vainilla, haba tonka, ámbar, musgo de roble"]
    },
    {
      nombre: "Veneno",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 109712,
      desc: "Manzana y canela con un toque ahumado en la apertura, tabaco y musgo en el corazón. Cierra con vainilla bourbon y almizcle, en un perfil aromático frutal con carácter.",
      img: "assets/img/mixto/veneno.jpg",
      detalles: ["Salida: manzana, humo, canela", "Corazón: tabaco, musgo", "Fondo: vainilla bourbon, almizcle"]
    },
    {
      nombre: "Vulcan Feu",
      familia: "Floral amaderado",
      temporada: ["primavera", "otono"],
      aroma: ["floral", "amaderado"],
      precio: 103515,
      desc: "Mango, limón y jengibre abren jugosos y frescos, con pimienta rosa, jazmín y praliné en el corazón. El fondo de haba tonka, cedro y ámbar gris lo cierra cálido y envolvente.",
      img: "assets/img/mixto/vulcan-feu.jpg",
      detalles: ["Salida: mango, limón, jengibre, ruibarbo", "Corazón: pimienta rosa, jazmín, violeta, praliné", "Fondo: haba tonka, cedro, ámbar gris, musgo"]
    },
    {
      nombre: "Art of Universe",
      familia: "Cítrico aromático",
      temporada: ["verano"],
      aroma: ["citrico", "fresco"],
      precio: 85269,
      desc: "Mandarina, bergamota y jengibre se combinan con un toque fresco de menta, mientras pera y azahar aparecen en el corazón. El fondo de almizcle, ámbar y cedro le da calidez amaderada.",
      img: "assets/img/mixto/art-of-universe.jpg",
      detalles: ["Salida: mandarina, jengibre, bergamota, menta", "Corazón: pera, azahar", "Fondo: almizcle, ámbar, cedro"]
    },
    {
      nombre: "Atlas",
      familia: "Acuático fresco",
      temporada: ["verano"],
      aroma: ["fresco"],
      precio: 72513,
      desc: "Notas marinas, sal y limón abren con frescura acuática, sobre un corazón de davana e iris. Cierra amaderado, con ámbar gris, musgo de roble y sándalo de fondo.",
      img: "assets/img/mixto/atlas.jpg",
      detalles: ["Salida: notas marinas, sal, limón", "Corazón: davana, iris", "Fondo: ámbar gris, musgo de roble, sándalo"]
    },
    {
      nombre: "Badee Al Oud For Glory",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 55147,
      desc: "Azafrán, nuez moscada y lavanda dan una apertura especiada, seguida de un corazón denso de oud y pachulí. El fondo repite oud y pachulí sobre almizcle, para una estela intensa y duradera.",
      img: "assets/img/mixto/badee-al-oud-for-glory.jpg",
      detalles: ["Salida: azafrán, nuez moscada, lavanda", "Corazón: oud, pachulí", "Fondo: oud, pachulí, almizcle"]
    },
    {
      nombre: "Fakhar Gold",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 70863,
      desc: "Nardo y un toque salino abren de forma inusual, dando paso a ámbar, haba tonka y cashmerán en el corazón. Cierra amaderado y resinoso, con cedro, vetiver y ládano de fondo.",
      img: "assets/img/mixto/fakhar-gold.jpg",
      detalles: ["Salida: nardo, sal", "Corazón: ámbar, haba tonka, cashmerán", "Fondo: cedro, vetiver, ládano"]
    },
    {
      nombre: "Hayaati Al Maleki",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 52016,
      desc: "Pimienta rosa, bergamota y jengibre sobre cedro, incienso y labdano, cerrando en almizcle, ámbar gris y ámbar.",
      img: "assets/img/mixto/hayaati-al-maleki.jpg",
      detalles: ["Salida: pimienta rosa, bergamota, jengibre, nuez moscada", "Corazón: cedro, incienso, labdano", "Fondo: almizcle, ámbar gris, ámbar"]
    },
    {
      nombre: "Honor and Glory",
      familia: "Ámbar gourmand",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 57848,
      desc: "Ananá y crème brûlée sobre canela, cúrcuma y pimienta negra, cerrando en vainilla, sándalo y musgo.",
      img: "assets/img/mixto/honor-and-glory.jpg",
      detalles: ["Salida: ananá, crème brûlée", "Corazón: canela, cúrcuma, pimienta negra, benjuí", "Fondo: vainilla, sándalo, cashmerán, musgo"]
    },
    {
      nombre: "Khamrah",
      familia: "Gourmand oriental",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 69897,
      desc: "Canela, nuez moscada y bergamota sobre dátiles, praliné y tuberosa, cerrando en vainilla, haba tonka y ámbar.",
      img: "assets/img/mixto/khamrah.jpg",
      detalles: ["Salida: canela, nuez moscada, bergamota", "Corazón: dátiles, praliné, tuberosa", "Fondo: vainilla, haba tonka, madera de ámbar, mirra"]
    },
    {
      nombre: "Musaman Black",
      familia: "Aromático amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 91916,
      desc: "Lavanda, nuez moscada y salvia sobre cedro y geranio, cerrando en haba tonka, ámbar y pachulí.",
      img: "assets/img/mixto/musaman-black.jpg",
      detalles: ["Salida: lavanda, nuez moscada, salvia, bergamota", "Corazón: cedro, geranio", "Fondo: haba tonka, ámbar, pachulí"]
    },
    {
      nombre: "Musaman White",
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 100471,
      desc: "Especias, bergamota y naranja sobre coco, ylang-ylang y ambroxan, cerrando en sándalo, almizcle y benjuí.",
      img: "assets/img/mixto/musaman-white.jpg",
      detalles: ["Salida: especias, bergamota, naranja", "Corazón: coco, ylang-ylang, ambroxan", "Fondo: sándalo, almizcle, benjuí"]
    },
    {
      nombre: "Opulent Dubai",
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 52337,
      desc: "Mango, pomelo y jengibre sobre jazmín, cedro y violeta, cerrando en ámbar gris, musgo de roble y benjuí.",
      img: "assets/img/mixto/opulent-dubai.jpg",
      detalles: ["Salida: mango, pomelo, limón, jengibre", "Corazón: jazmín, cedro, violeta", "Fondo: ámbar gris, musgo de roble, benjuí"]
    },
    {
      nombre: "Qaed Al Fursan",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 52381,
      desc: "Ananá y azafrán sobre abeto balsámico y jazmín, cerrando en cedro, ámbar y oud.",
      img: "assets/img/mixto/qaed-al-fursan.jpg",
      detalles: ["Salida: ananá, azafrán", "Corazón: abeto balsámico, jazmín", "Fondo: cedro, ámbar, oud"]
    },
    {
      nombre: "Spectre Malachite",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 59499,
      desc: "Apertura cítrica y afrutada de mandarina verde, bergamota y grosella negra, con un corazón floral y especiado de lavanda, jazmín y pimienta rosa, sobre un fondo amaderado de almizcle, ámbar y vetiver.",
      img: "assets/img/mixto/spectre-malachite.jpg",
      detalles: ["Salida: mandarina verde, bergamota, grosella negra", "Corazón: lavanda, jazmín, pimienta rosa", "Fondo: almizcle, ámbar, madera, vetiver"]
    },
    {
      nombre: "Your Touch Amber",
      familia: "Oriental ambarado",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 45177,
      desc: "Composición lineal y envolvente centrada en el ámbar: apertura de lavanda fresca que se funde con un corazón ambarado y un fondo de vainilla.",
      img: "assets/img/mixto/your-touch-amber.jpg",
      detalles: ["Salida: lavanda", "Corazón: ámbar", "Fondo: vainilla"]
    },
    {
      nombre: "Your Touch Intense",
      familia: "Oriental vainillado",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 62736,
      desc: "Apertura de pimienta rosa, violeta y enebro, corazón cálido de toffee, canela, lavanda y salvia romana, cerrando en vainilla, haba tonka, ámbar y gamuza.",
      img: "assets/img/mixto/your-touch-intense.jpg",
      detalles: ["Salida: pimienta rosa, violeta, enebro", "Corazón: toffee, canela, lavanda, salvia romana", "Fondo: vainilla, haba tonka, ámbar, gamuza"]
    },
    {
      nombre: "Tropical Vibes",
      familia: "Frutal tropical",
      temporada: ["verano"],
      aroma: ["floral", "fresco"],
      precio: 69468,
      desc: "Salida jugosa de mango, ananá, bergamota y ron, corazón cremoso de coco y flores blancas con un toque marino, y fondo amaderado de almizcle, ámbar, sándalo y vetiver.",
      img: "assets/img/mixto/tropical-vibes.jpg",
      detalles: ["Salida: mango, ananá, bergamota, ron", "Corazón: coco, flores blancas, notas marinas", "Fondo: almizcle, ámbar, sándalo, vetiver"]
    },
    {
      nombre: "Copa Del Mundo",
      familia: "Oriental floral",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 151605,
      desc: "Apertura de bergamota, jazmín y heliotropo, corazón floral y dulce de lirio, haba tonka y geranio, sobre un fondo de vetiver, vainilla y almizcle.",
      img: "assets/img/mixto/copa-del-mundo.jpg",
      detalles: ["Salida: bergamota, jazmín, heliotropo", "Corazón: lirio (orris), haba tonka, geranio", "Fondo: vetiver de Haití, vainilla, almizcle"]
    },
    {
      nombre: "Erba Pura 100ml",
      familia: "Cítrico frutal",
      temporada: ["verano"],
      aroma: ["citrico", "floral"],
      precio: 368192,
      desc: "Apertura chispeante de naranja, bergamota y limón sicilianos, corazón de una canasta de frutas mediterráneas (durazno, manzana, melón y ananá), y fondo cremoso de almizcle blanco, vainilla y ámbar.",
      img: "assets/img/mixto/erba-pura-100ml.jpg",
      detalles: ["Salida: naranja siciliana, bergamota, limón siciliano", "Corazón: durazno, manzana, melón, ananá", "Fondo: almizcle blanco, vainilla, ámbar"]
    },
    {
      nombre: "Rayhaan Elixir",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 78344,
      desc: "Apertura fresca de menta y bergamota, corazón cálido de lavanda y benjuí, y fondo dulce de vainilla y haba tonka.",
      img: "assets/img/mixto/rayhaan-elixir.jpg",
      detalles: ["Salida: menta, bergamota", "Corazón: lavanda, benjuí", "Fondo: vainilla, haba tonka"]
    },
    {
      nombre: "Qaed Al Fursan Unlimited",
      familia: "Floral frutal gourmand",
      temporada: ["primavera"],
      aroma: ["floral", "dulce"],
      precio: 38424,
      desc: "Coco, ananá y cítricos sobre un corazón floral de ylang-ylang, frangipani y jazmín, cerrando en vainilla, sándalo y almizcle. Tropical y cremoso, pensado para el día.",
      img: "assets/img/mixto/qaed-al-fursan-unlimited.jpg",
      detalles: ["Salida: coco, ananá, cítricos", "Corazón: ylang-ylang, frangipani, jazmín", "Fondo: vainilla, almizcle, sándalo"]
    },
    {
      nombre: "Qaed Al Fursan Untamed",
      familia: "Amaderado especiado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 41017,
      desc: "Cardamomo, canela y mandarina sobre un corazón especiado de lavanda, salvia y ciprés con un toque de caramelo, cerrando en ámbar, cedro y vetiver. Cálido e intenso, ideal para la noche.",
      img: "assets/img/mixto/qaed-al-fursan-untamed.jpg",
      detalles: ["Salida: cardamomo, canela, mandarina, nuez moscada", "Corazón: caramelo, lavanda, ciprés", "Fondo: ámbar, cedro, vetiver, ládano"]
    },
    {
      nombre: "Teriaq Intense",
      familia: "Oriental especiado",
      temporada: ["invierno"],
      aroma: ["amaderado"],
      precio: 78388,
      desc: "Azafrán y bergamota sobre un corazón de licor de ciruela y canela, cerrando en ámbar, haba tonka y benjuí. Denso y dulce, con gran proyección para el frío.",
      img: "assets/img/mixto/teriaq-intense.jpg",
      detalles: ["Salida: azafrán, bergamota", "Corazón: licor de ciruela, canela", "Fondo: ámbar, haba tonka, benjuí"]
    },
    {
      nombre: "Vintage Radio",
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 75000,
      desc: "Lavanda, salvia y bergamota sobre un corazón de ciruela, palo santo y pimienta negra, cerrando en sándalo y oud. Limpio y amaderado, con un toque metálico particular.",
      img: "assets/img/mixto/vintage-radio.jpg",
      detalles: ["Salida: lavanda, salvia, bergamota", "Corazón: ciruela, palo santo, pimienta negra", "Fondo: sándalo, oud"]
    },
    {
      nombre: "Philos Pura",
      familia: "Aromático frutal",
      temporada: ["primavera"],
      aroma: ["fresco", "floral"],
      precio: 47513,
      desc: "Naranja, bergamota y limón sobre un corazón frutal jugoso, cerrando en vainilla de Madagascar, almizcle blanco y ámbar. Fresco y cítrico, ideal para el día.",
      img: "assets/img/mixto/philos-pura.jpg",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: frutas", "Fondo: vainilla de Madagascar, almizcle blanco, ámbar"]
    },

    /* ====================================================================
       NUEVOS · de la lista de precios nueva
       ------------------------------------------------------------------
       Todavía sin foto (img: ""). Notas y género según Fragrantica.
       ==================================================================== */
    {
      nombre: "Vulcan Black Friday",
      familia: "Cuero especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado"],
      precio: 94296,
      desc: "Azafrán, manzana y canela abren especiados, sobre un corazón de cuero y rosa que cierra seco y terroso, con pachulí, musgo, almizcle y papiro. De French Avenue.",
      img: "",
      detalles: ["Salida: azafrán, manzana, canela", "Corazón: cuero, rosa", "Fondo: pachulí, musgo, almizcle, papiro"]
    },
    {
      nombre: "Hawas Verde",
      familia: "Cítrico aromático",
      temporada: ["primavera", "verano"],
      aroma: ["citrico", "fresco"],
      precio: 107653,
      desc: "Lima y manzana verde realzadas con romero, sobre un fondo de pachulí y ámbar. Verde, cítrico y fresco, ideal para el día. De Rasasi.",
      img: "",
      detalles: ["Notas: lima, romero, manzana verde, pachulí, ámbar"]
    },
    {
      nombre: "Rayhaan Aquatica",
      familia: "Cítrico gourmand",
      temporada: ["verano"],
      aroma: ["citrico", "dulce"],
      precio: 85077,
      desc: "Lima, bergamota y mandarina con leche de coco abren tropicales, sobre caña de azúcar, jazmín, hibisco y gardenia, cerrando en ron, haba tonka, almizcle y pachulí.",
      img: "",
      detalles: ["Salida: lima, leche de coco, bergamota, mandarina", "Corazón: caña de azúcar, jazmín, hibisco, gardenia", "Fondo: almizcle, ron, haba tonka, pachulí"]
    },
    {
      nombre: "Rayhaan Obsidian",
      familia: "Amaderado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado"],
      precio: 88357,
      desc: "Iris y cítricos abren frescos, con un corazón de cuero gamuzado y acordes florales. Cierra amaderado y profundo, con cedro, sándalo, ambreta y oud.",
      img: "",
      detalles: ["Salida: iris, cítricos", "Corazón: gamuza, acordes florales", "Fondo: cedro, sándalo, ambreta, oud"]
    },
    {
      nombre: "Rayhaan Pacific Aura",
      familia: "Aromático acuático",
      temporada: ["primavera", "verano"],
      aroma: ["fresco", "citrico"],
      precio: 80939,
      desc: "Mandarina, menta, cidra y grosella negra abren frescos, sobre albahaca, zanahoria y rosa, cerrando en higo, ambroxan y ámbar. En la línea de Pacific Chill de Louis Vuitton.",
      img: "",
      detalles: ["Salida: mandarina, menta, cidra, bergamota, grosella negra, cilantro", "Corazón: albahaca, zanahoria, rosa", "Fondo: higo, ambroxan, ámbar"]
    },

    /* ====================================================================
       UNISEX · el mismo perfume vive también en Mujer
       ------------------------------------------------------------------
       Fragancias realmente unisex. El menú "Mixto" ya no existe, pero se
       las sigue pudiendo filtrar como "Mixto" (Filtros > Género) gracias a
       unisex:true, que además dibuja el cartel "Fragancia unisex" arriba
       de la foto en la tarjeta.
       ==================================================================== */
    {
      nombre: "Badee Al Oud Amethyst",
      unisex: true,
      familia: "Oriental floral",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 50601,
      desc: "Pimienta rosa y bergamota sobre rosa turca y búlgara, cerrando en oud, ámbar y vainilla.",
      img: "assets/img/mixto/badee-al-oud-amethyst.jpg",
      detalles: ["Salida: pimienta rosa, bergamota", "Corazón: rosa turca, rosa búlgara, jazmín", "Fondo: oud, ámbar, vainilla"]
    },
    {
      nombre: "Club de Nuit Untold",
      unisex: true,
      familia: "Ambarino amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado", "dulce"],
      precio: 93760,
      desc: "Azafrán y jazmín se funden en un corazón de madera ambarina y ámbar gris, cerrando en una base resinosa de abeto y cedro.",
      img: "assets/img/mixto/Club-De-Nuit-Untold.jpg",
      detalles: ["Salida: azafrán, jazmín", "Corazón: madera ambarina, ámbar gris", "Fondo: resina de abeto, cedro"]
    },
    {
      nombre: "Ajwad",
      unisex: true,
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 45692,
      desc: "Bergamota y lichi dan una apertura frutal y fresca, con jazmín, rosas y canela en el corazón. Cierra amaderado, con cedro, sándalo, ámbar y almizcle de fondo.",
      img: "assets/img/mixto/ajwad.jpg",
      detalles: ["Salida: bergamota, lichi", "Corazón: jazmín, rosas, canela", "Fondo: cedro, sándalo, ámbar, almizcle"]
    },
    {
      nombre: "Angham",
      unisex: true,
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 67111,
      desc: "Jengibre, mandarina y pimienta rosa abren con energía, seguidos de lavanda, praliné, cacao y jazmín en el corazón. Cierra en un fondo cálido de vainilla, ámbar y almizcle.",
      img: "assets/img/mixto/angham.jpg",
      detalles: ["Salida: jengibre, mandarina, pimienta rosa", "Corazón: lavanda, praliné, cacao, jazmín", "Fondo: vainilla, ámbar, almizcle"]
    },
    {
      nombre: "Badee Al Oud Sublime",
      unisex: true,
      familia: "Frutal tropical",
      temporada: ["verano"],
      aroma: ["floral", "fresco"],
      precio: 62436,
      desc: "Manzana, lichi y rosa abren jugosos y frescos, con ciruela y jazmín en el corazón. Cierra en musgo, vainilla y pachulí, en un perfil frutal alejado del oud clásico pese al nombre.",
      img: "assets/img/mixto/badee-al-oud-sublime.jpg",
      detalles: ["Salida: manzana, lichi, rosa", "Corazón: ciruela, jazmín", "Fondo: musgo, vainilla, pachulí"]
    },
    {
      nombre: "Khamrah Waha",
      unisex: true,
      familia: "Gourmand fresco",
      temporada: ["invierno", "verano"],
      aroma: ["dulce", "fresco"],
      precio: 126820,
      desc: "Bergamota, yuzu y jengibre sobre pepino, sal marina e iris, cerrando en vainilla, haba tonka y almizcle.",
      img: "assets/img/mixto/khamrah-waha.jpg",
      detalles: ["Salida: bergamota, yuzu, enebro, jengibre", "Corazón: pepino, sal marina, iris, salvia", "Fondo: vainilla, haba tonka, almizcle"]
    },
    {
      nombre: "Khanjar",
      unisex: true,
      familia: "Especiado amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 110033,
      desc: "Nuez moscada, pimienta de Jamaica y jengibre sobre violeta, pachulí y cashmerán, cerrando en cuero, incienso y vetiver.",
      img: "assets/img/mixto/khanjar.jpg",
      detalles: ["Salida: nuez moscada, pimienta de Jamaica, jengibre", "Corazón: violeta, pachulí, cashmerán", "Fondo: cuero, incienso, almizcle, vetiver"]
    },
    {
      nombre: "Nebras Pride",
      unisex: true,
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 87221,
      desc: "Frutos rojos y mandarina sobre vainilla, cacao y rosa, cerrando en azúcar, haba tonka y ámbar.",
      img: "assets/img/mixto/nebras-pride.jpg",
      detalles: ["Salida: frutos rojos, mandarina", "Corazón: vainilla, cacao, rosa", "Fondo: azúcar, haba tonka, ámbar, almizcle"]
    },
    {
      nombre: "Extravagant Lover",
      unisex: true,
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 38873,
      desc: "Mandarina y pimienta rosa sobre un corazón floral de azahar, jazmín y rosa, cerrando en ámbar y vainilla. Sensual y audaz, cítrico al inicio y amaderado cálido al final.",
      img: "assets/img/mixto/extravagant-lover.jpg",
      detalles: ["Salida: mandarina, pimienta rosa", "Corazón: azahar, jazmín, rosa", "Fondo: ámbar, vainilla"]
    },
    {
      nombre: "Glacier Bella",
      unisex: true,
      familia: "Oriental afrutado",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 46271,
      desc: "Bergamota y pera verde sobre un corazón floral con un toque de cuero, cerrando en vainilla, vetiver, ámbar y almizcle. Fresco y sensual, con dulzura frutal.",
      img: "assets/img/mixto/glacier-bella.jpg",
      detalles: ["Salida: bergamota, pera verde", "Corazón: notas florales, cuero", "Fondo: vainilla, vetiver, ámbar, almizcle"]
    },
    {
      nombre: "Glacier Bold",
      unisex: true,
      familia: "Amaderado especiado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 44769,
      desc: "Bergamota y coco sobre un corazón especiado de cúrcuma, canela y pimienta negra, cerrando en haba tonka, vainilla y sándalo. Fresco al inicio, cada vez más envolvente.",
      img: "assets/img/mixto/glacier-bold.jpg",
      detalles: ["Salida: bergamota, coco", "Corazón: cúrcuma, canela, pimienta negra", "Fondo: haba tonka, vainilla, sándalo"]
    },
    {
      nombre: "Jean Lowe Noir",
      unisex: true,
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 60549,
      desc: "Oud e incienso sobre un corazón de rosa, frambuesa y azafrán, cerrando en ámbar, benjuí y geranio. Intenso y de gran duración; conviene usarlo con moderación.",
      img: "assets/img/mixto/jean-lowe-noir.jpg",
      detalles: ["Salida: oud, incienso", "Corazón: rosa, frambuesa, azafrán, abedul", "Fondo: ámbar, benjuí, geranio"]
    },
    {
      nombre: "La Baroque Rouge",
      unisex: true,
      familia: "Oriental floral",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 42411,
      desc: "Azafrán, pera y mandarina sobre un corazón floral de jazmín, ylang-ylang y lirio, cerrando en ámbar, madera de cachemira y almizcle. Dulce y envolvente.",
      img: "assets/img/mixto/la-baroque-rouge.jpg",
      detalles: ["Salida: azafrán, pera, mandarina", "Corazón: jazmín, ylang-ylang, lirio", "Fondo: ámbar, madera de cachemira, almizcle"]
    },
    {
      nombre: "Stallion 53",
      unisex: true,
      familia: "Amaderado oriental",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado"],
      precio: 71935,
      desc: "Cardamomo y violeta abren paso a un corazón de ámbar e iris, sobre una base amaderada de sándalo, cuero y cedro de Virginia. Envolvente, muy cercano a Santal 33.",
      img: "assets/img/mixto/Stallion-53.jpg",
      detalles: ["Salida: cardamomo, violeta", "Corazón: ámbar, iris", "Fondo: sándalo, cuero, cedro de Virginia, papiro"]
    },
    {
      nombre: "Dunescape Dubai",
      unisex: true,
      familia: "Aromático fougère",
      temporada: ["primavera", "verano"],
      aroma: ["citrico", "fresco"],
      precio: 106109,
      desc: "Cítricos, jengibre, enebro y salvia abren frescos, sobre un corazón ozónico de cashmerán, geranio y rosa que cierra en ámbar seco, almizcle y sándalo. Un fougère aromático de Armaf.",
      img: "",
      detalles: ["Salida: limón, mandarina, bergamota, naranja sanguina, jengibre, enebro, salvia", "Corazón: cashmerán, acorde ozónico, geranio, rosa, manzana", "Fondo: ámbar seco, almizcle, sándalo"]
    },
    {
      nombre: "Odyssey Bahamas",
      unisex: true,
      familia: "Frutal acuático",
      temporada: ["verano"],
      aroma: ["fresco", "dulce"],
      precio: 96333,
      desc: "Melón, pera, manzana verde y ciruela con un toque salino abren jugosos, sobre un corazón acuático de nenúfar, incienso y musgo de roble que cierra en almizcle, cedro, ámbar y azúcar. De la línea tropical de Armaf.",
      img: "",
      detalles: ["Salida: melón cantalupo, algas, melón, pera, manzana verde, ciruela, sal", "Corazón: notas acuáticas, incienso, nenúfar, musgo de roble", "Fondo: almizcle, cedro, ámbar, azúcar"]
    },
    {
      nombre: "Odyssey Go Mango",
      unisex: true,
      familia: "Frutal gourmand",
      temporada: ["primavera", "verano"],
      aroma: ["dulce"],
      precio: 92773,
      desc: "Limón, jengibre y pimienta rosa abren luminosos, con mango y haba tonka en el corazón. Cierra cálido y dulce, con ámbar, vainilla, guayaco y un toque de frutos secos. También de la línea tropical de Armaf.",
      img: "",
      detalles: ["Salida: limón, jengibre, pimienta rosa, flores blancas", "Corazón: mango, madera seca, haba tonka", "Fondo: ámbar, vainilla, madera de guayaco, almizcle, frutos secos"]
    },
    {
      nombre: "Hawas Chrome",
      unisex: true,
      familia: "Frutal fresco",
      temporada: ["primavera", "verano"],
      aroma: ["fresco", "dulce"],
      precio: 114471,
      desc: "Durazno, naranja dulce y frutas amarillas abren jugosos, con maracuyá, mango y un toque acuático en el corazón, sobre un fondo cremoso de almizcle, ámbar y vainilla. Lanzamiento 2026 de Rasasi.",
      img: "",
      detalles: ["Salida: durazno, naranja dulce, frutas amarillas", "Corazón: maracuyá, mango, frutas, notas acuáticas", "Fondo: almizcle, ámbar, vainilla"]
    },
    {
      nombre: "Riiffs Momento",
      unisex: true,
      familia: "Amaderado especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "dulce"],
      precio: 99227,
      desc: "Azúcar, azafrán y mandarina abren dulces y especiados, con haba tonka, rosa damascena y oud en el corazón. Cierra con caramelo, amberwood y cedro. De Riiffs, en concentración extrait.",
      img: "",
      detalles: ["Salida: azúcar, azafrán, mandarina", "Corazón: haba tonka, rosa damascena, oud", "Fondo: caramelo, amberwood, cedro"]
    },
    {
      nombre: "Teriaq",
      unisex: true,
      familia: "Oriental gourmand",
      temporada: ["otono", "invierno"],
      aroma: ["dulce"],
      precio: 64216,
      desc: "El Teriaq original de Lattafa, creado por Quentin Bisch: caramelo, almendra amarga, damasco y pimienta rosa sobre miel, ruibarbo y rosa, cerrando en cuero, vainilla, ládano y vetiver. Dulce, con un fondo de cuero bien marcado.",
      img: "",
      detalles: ["Salida: caramelo, almendra amarga, damasco, pimienta rosa", "Corazón: miel, ruibarbo, flores blancas, rosa", "Fondo: cuero, vainilla, almizcle, ládano, vetiver"]
    }
  ],

  /* ======================================================================
     MUJER
     ====================================================================== */
  mujer: [
    {
      nombre: "9 AM Rosa",
      familia: "Oriental frutal",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 79009,
      desc: "Mandarina, pomelo y bergamota abren paso a un corazón frutal de frambuesa y grosella negra, que cierra en almizcle, ámbar y naranja.",
      img: "assets/img/mujer/9-am-rosa.jpg",
      detalles: ["Salida: mandarina, pomelo, bergamota", "Corazón: frambuesa, grosella negra", "Fondo: almizcle, ámbar, naranja"]
    },
    {
      nombre: "Club de Nuit Maleka",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 90887,
      desc: "Lichi, bergamota y pimienta rosa se posan sobre un corazón de iris, que cierra en un fondo goloso de praliné, sándalo y ambroxan.",
      img: "assets/img/mujer/club-de-nuit-maleka.jpg",
      detalles: ["Salida: lichi, bergamota, pimienta rosa", "Corazón: iris", "Fondo: praliné, sándalo, ambroxan"]
    },
    {
      nombre: "Club de Nuit Woman",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 85999,
      desc: "Naranja, pomelo y durazno abren con frescura frutal, sobre un corazón floral de rosa y jazmín que cierra en pachulí, vainilla y almizcle.",
      img: "assets/img/mujer/club-de-nuit-woman.jpg",
      detalles: ["Salida: naranja, bergamota, pomelo, durazno", "Corazón: rosa, jazmín, geranio, lichi", "Fondo: pachulí, almizcle, vainilla, vetiver"]
    },
    {
      nombre: "Odyssey Candy",
      familia: "Frutal gourmand",
      temporada: ["primavera", "invierno"],
      aroma: ["dulce", "floral"],
      precio: 56969,
      desc: "Frutilla, frambuesa y durazno se envuelven en un corazón goloso de caramelo y maracuyá, cerrando en almizcle, ámbar y pachulí.",
      img: "assets/img/mujer/odyssey-candy.jpg",
      detalles: ["Salida: frutilla, frambuesa, durazno, bergamota", "Corazón: caramelo, jazmín, maracuyá", "Fondo: pachulí, almizcle, ámbar"]
    },
    {
      nombre: "Badee Al Oud Noble Blush",
      familia: "Floral gourmand",
      temporada: ["primavera", "invierno"],
      aroma: ["floral", "dulce"],
      precio: 61364,
      desc: "Leche de rosas en la apertura, con merengue y almendra en el corazón, sobre un fondo cremoso de vainilla, sándalo y almizcle. Perfil gourmand floral, dulce y suave.",
      img: "assets/img/mujer/badee-al-oud-noble-blush.jpg",
      detalles: ["Salida: leche de rosas", "Corazón: merengue, almendra", "Fondo: vainilla, sándalo, almizcle"]
    },
    {
      nombre: "Delilah",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 73992,
      desc: "Ruibarbo, lichi y bergamota dan una apertura jugosa, con rosa turca, peonía y lirio en el corazón. Cierra suave, con almizcle blanco, vainilla y cashmerán de fondo.",
      img: "assets/img/mujer/delilah.jpg",
      detalles: ["Salida: ruibarbo, lichi, bergamota", "Corazón: rosa turca, peonía, lirio", "Fondo: almizcle blanco, vainilla, cashmerán"]
    },
    {
      nombre: "Emaan",
      familia: "Chipre floral",
      temporada: ["primavera", "otono"],
      aroma: ["floral", "amaderado"],
      precio: 59649,
      desc: "Azahar, grosella negra y bergamota abren frescos y afrutados, con nardo, jazmín y caléndula en el corazón. Cierra en almizcle, vainilla, cedro y pachulí, con muy buena estela.",
      img: "assets/img/mujer/emaan.jpg",
      detalles: ["Salida: azahar, grosella negra, bergamota", "Corazón: nardo, jazmín, caléndula", "Fondo: almizcle, vainilla, cedro, pachulí"]
    },
    {
      nombre: "Fakhar Rosa",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 76372,
      desc: "Frutas, lirio y granada sobre tuberosa, jazmín y gardenia, cerrando en vainilla, sándalo y almizcle blanco.",
      img: "assets/img/mujer/fakhar-rosa.jpg",
      detalles: ["Salida: frutas, lirio, granada", "Corazón: tuberosa, jazmín, gardenia, rosa", "Fondo: vainilla, almizcle blanco, sándalo"]
    },
    {
      nombre: "Haya",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 70155,
      desc: "Champagne, frutilla y mandarina sobre gardenia, jazmín y orquídea vainilla, cerrando en ámbar, sándalo y castaña.",
      img: "assets/img/mujer/haya.jpg",
      detalles: ["Salida: champagne, frutilla, mandarina, naranja sanguina", "Corazón: gardenia, jazmín, orquídea vainilla", "Fondo: ámbar, sándalo, castaña"]
    },
    {
      nombre: "Hayaati Rosa",
      familia: "Floral frutal gourmand",
      temporada: ["primavera"],
      aroma: ["floral", "dulce"],
      precio: 48779,
      desc: "Lychee, pomelo y grosella roja sobre rosa, durazno y cedro, cerrando en vainilla, praliné y ámbar.",
      img: "assets/img/mujer/hayaati-rosa.jpg",
      detalles: ["Salida: lychee, pomelo, grosella roja", "Corazón: rosa, durazno, cedro", "Fondo: vainilla, praliné, ámbar"]
    },
    {
      nombre: "Her Confession",
      familia: "Ámbar vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 87907,
      desc: "Canela y especias sobre tuberosa, jazmín e incienso, cerrando en vainilla, almizcle y haba tonka.",
      img: "assets/img/mujer/her-confession.jpg",
      detalles: ["Salida: canela, especias", "Corazón: tuberosa, jazmín, incienso", "Fondo: vainilla, almizcle, haba tonka"]
    },
    {
      nombre: "Mayar",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 54653,
      desc: "Lichi, frambuesa y hoja de violeta sobre rosa blanca, peonía y jazmín, cerrando en almizcle y vainilla.",
      img: "assets/img/mujer/mayar.jpg",
      detalles: ["Salida: lichi, frambuesa, hoja de violeta", "Corazón: rosa blanca, peonía, jazmín", "Fondo: almizcle, vainilla"]
    },
    {
      nombre: "Mayar Natural Intense",
      familia: "Floral acuático",
      temporada: ["primavera", "verano"],
      aroma: ["floral", "fresco"],
      precio: 53345,
      desc: "Mandarina verde, higo y agua de coco sobre loto, nenúfar y jazmín, cerrando en almizcle, sándalo y vainilla.",
      img: "assets/img/mujer/mayar-natural-intense.jpg",
      detalles: ["Salida: mandarina verde, higo, agua de coco, melón", "Corazón: loto, nenúfar, jazmín", "Fondo: almizcle, ambroxan, vainilla, sándalo"]
    },
    {
      nombre: "Hawas Diva",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 101715,
      desc: "Apertura jugosa de frutos rojos, ruibarbo y lychee sobre un corazón de rosa, incienso y cedro, cerrando en vainilla, almizcle y ámbar gris.",
      img: "assets/img/mujer/hawas-diva.jpg",
      detalles: ["Salida: frutos rojos, ruibarbo, lychee", "Corazón: rosa, incienso, cedro", "Fondo: vainilla, almizcle, ámbar gris"]
    },
    {
      nombre: "Ameerat Al Arab",
      familia: "Floral amaderado",
      temporada: ["primavera", "otono"],
      aroma: ["floral", "amaderado"],
      precio: 52167,
      desc: "Salida cítrica sobre un corazón de almizcle blanco y aloe vera, con un fondo floral y amaderado de jazmín, madera y oud.",
      img: "assets/img/mujer/ameerat-al-arab.jpg",
      detalles: ["Salida: cítricos, bergamota", "Corazón: almizcle blanco, aloe vera", "Fondo: jazmín, almizcle, madera, oud"]
    },
    {
      nombre: "Ameerat Al Arab Prive Rose",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 57697,
      desc: "Apertura frutal de frambuesa, bergamota y rosa, corazón floral de jazmín, peonía y más rosa, sobre un fondo cálido de sándalo, almizcle, ámbar y pachulí.",
      img: "assets/img/mujer/ameerat-al-arab-prive-rose.jpg",
      detalles: ["Salida: frambuesa, bergamota, rosa", "Corazón: jazmín, peonía, rosa", "Fondo: sándalo, almizcle, ámbar, pachulí"]
    },
    {
      nombre: "Al Wataniah Sabah Al Ward",
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 49980,
      desc: "Apertura vibrante de pimienta rosa y mandarina, corazón dulce de cacao, azahar y jazmín sambac, y fondo cálido de vainilla, haba tonka y pachulí.",
      img: "assets/img/mujer/al-wataniah-sabah-al-ward.jpg",
      detalles: ["Salida: pimienta rosa, mandarina", "Corazón: cacao, azahar, jazmín sambac", "Fondo: vainilla, haba tonka, pachulí"]
    },
    {
      nombre: "The Kingdom Fem",
      familia: "Floral frutal gourmand",
      temporada: ["primavera"],
      aroma: ["floral", "dulce"],
      precio: 65737,
      desc: "Pera, grosella negra y peonía sobre un corazón de jazmín, praliné y haba tonka, cerrando en vainilla, sándalo, ámbar y almizcle. Floral, dulce y envolvente.",
      img: "assets/img/mujer/the-kingdom-fem.jpg",
      detalles: ["Salida: pera, grosella negra, peonía", "Corazón: jazmín, praliné, haba tonka", "Fondo: vainilla, sándalo, ámbar, almizcle"]
    },
    {
      nombre: "Yara Elixir",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 74571,
      desc: "Frutilla y grosella negra sobre un corazón floral de jazmín y azahar, cerrando en vainilla, caramelo, ámbar y almizcle. Dulce, envolvente y adictivo.",
      img: "assets/img/mujer/yara-elixir.jpg",
      detalles: ["Salida: frutilla, grosella negra", "Corazón: jazmín, azahar", "Fondo: vainilla, caramelo, ámbar, almizcle"]
    },
    {
      nombre: "Yara Moi",
      familia: "Floral frutal gourmand",
      temporada: ["primavera"],
      aroma: ["floral", "dulce"],
      precio: 57097,
      desc: "Pera, pimienta rosa y grosella negra sobre un corazón cremoso de nardo, jazmín y almendra, cerrando en vainilla, cashmerán y pachulí. La más intensa de la línea Yara.",
      img: "assets/img/mujer/yara-moi.jpg",
      detalles: ["Salida: pera, pimienta rosa, grosella negra", "Corazón: nardo, jazmín, almendra", "Fondo: vainilla, cashmerán, pachulí"]
    },
    {
      nombre: "Yara Tous",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 55017,
      desc: "Mango, coco y maracuyá sobre un corazón floral de jazmín, azahar y heliotropo, cerrando en vainilla, almizcle y cashmerán. Tropical y veraniego.",
      img: "assets/img/mujer/yara-tous.jpg",
      detalles: ["Salida: mango, coco, maracuyá", "Corazón: jazmín, azahar, heliotropo", "Fondo: vainilla, almizcle, cashmerán"]
    },
    {
      nombre: "Intrude",
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 47749,
      desc: "Pera y bergamota sobre un corazón floral de azahar y jazmín, cerrando en pachulí y vetiver. Sofisticado y sensual.",
      img: "assets/img/mujer/intrude.jpg",
      detalles: ["Salida: pera, bergamota", "Corazón: azahar, jazmín", "Fondo: pachulí, vetiver"]
    },
    {
      nombre: "La Vivacité",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 58405,
      desc: "Grosella negra y pera sobre un corazón floral de iris, azahar y jazmín, cerrando en pachulí, haba tonka, praliné y vainilla. Fresco al inicio, cremoso y dulce al final.",
      img: "assets/img/mujer/la-vivacite.jpg",
      detalles: ["Salida: grosella negra, pera", "Corazón: iris, azahar, jazmín", "Fondo: pachulí, haba tonka, praliné, vainilla"]
    },
    {
      nombre: "La Voie",
      familia: "Floral blanco",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 65931,
      desc: "Azahar y bergamota sobre un corazón blanco de nardo y jazmín indio, cerrando en vainilla de Madagascar, almizcle blanco y cedro. Floral blanco clásico y de gran presencia.",
      img: "assets/img/mujer/la-voie.jpg",
      detalles: ["Salida: azahar, bergamota", "Corazón: nardo, jazmín indio", "Fondo: vainilla de Madagascar, almizcle blanco, cedro"]
    },
    {
      nombre: "Papillon D'Or",
      familia: "Floral frutal gourmand",
      temporada: ["primavera"],
      aroma: ["floral", "dulce"],
      precio: 75921,
      desc: "Frutas exóticas y mandarina sobre un corazón de azahar, peonía y vainilla, cerrando en haba tonka, ambroxán y vainilla. Dulce y frutal, gourmand suave.",
      img: "assets/img/mujer/papillon-dor.jpg",
      detalles: ["Salida: frutas exóticas, mandarina", "Corazón: azahar, peonía, vainilla", "Fondo: haba tonka, ambroxán, vainilla"]
    },
    {
      nombre: "Rose Seduction VIP",
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 67925,
      desc: "Pimienta rosa y champagne rosé sobre un corazón de rosa y flor de durazno, cerrando en madera y almizcle blanco. Chispeante y romántico.",
      img: "assets/img/mujer/rose-seduction-vip.jpg",
      detalles: ["Salida: pimienta rosa, champagne rosé", "Corazón: rosa, flor de durazno", "Fondo: notas amaderadas, almizcle blanco"]
    },

    /* ====================================================================
       EX-MIXTO → MUJER
       ------------------------------------------------------------------
       Fragancias que antes vivían en la categoría "Mixto" (hoy eliminada
       como menú propio) y que, según la clasificación definitiva de
       género, son Mujer.
       ==================================================================== */
    {
      nombre: "Mayar Cherry Intense",
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 53196,
      desc: "Frutilla y bergamota sobre mermelada de cereza y cacao, cerrando en vainilla, ámbar y pachulí.",
      img: "assets/img/mixto/mayar-cherry-intense.jpg",
      detalles: ["Salida: frutilla, bergamota", "Corazón: mermelada de cereza, cacao", "Fondo: vainilla, ámbar, pachulí"]
    },
    {
      nombre: "Victoria",
      familia: "Gourmand cítrico",
      temporada: ["verano", "invierno"],
      aroma: ["dulce", "citrico"],
      precio: 71441,
      desc: "Tarta de limón merengada sobre un corazón floral de neroli, rosa y jazmín, cerrando en vainilla, almizcle y ámbar. Jugoso y luminoso, para el uso diario.",
      img: "assets/img/mixto/victoria.jpg",
      detalles: ["Salida: tarta de limón merengada, cítricos", "Corazón: neroli, rosa, jazmín", "Fondo: vainilla, almizcle, ámbar"]
    },
    {
      nombre: "Baroque Extreme",
      familia: "Aromático especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "fresco"],
      precio: 47235,
      desc: "Azafrán y almendra sobre un corazón amaderado de cedro y jazmín egipcio, cerrando en ámbar gris, madera y almizcle. Cremoso y dulce, en la línea de los ambarados franceses de culto.",
      img: "assets/img/mixto/baroque-extreme.jpg",
      detalles: ["Salida: azafrán, almendra", "Corazón: notas amaderadas, cedro, jazmín egipcio", "Fondo: ámbar gris, madera, almizcle"]
    },

    /* ====================================================================
       UNISEX · el mismo perfume vive también en Hombre
       ------------------------------------------------------------------
       Ver la nota en la lista de Hombre: mismo criterio, unisex:true.
       ==================================================================== */
    {
      nombre: "Badee Al Oud Amethyst",
      unisex: true,
      familia: "Oriental floral",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 50601,
      desc: "Pimienta rosa y bergamota sobre rosa turca y búlgara, cerrando en oud, ámbar y vainilla.",
      img: "assets/img/mixto/badee-al-oud-amethyst.jpg",
      detalles: ["Salida: pimienta rosa, bergamota", "Corazón: rosa turca, rosa búlgara, jazmín", "Fondo: oud, ámbar, vainilla"]
    },
    {
      nombre: "Club de Nuit Untold",
      unisex: true,
      familia: "Ambarino amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado", "dulce"],
      precio: 93760,
      desc: "Azafrán y jazmín se funden en un corazón de madera ambarina y ámbar gris, cerrando en una base resinosa de abeto y cedro.",
      img: "assets/img/mixto/Club-De-Nuit-Untold.jpg",
      detalles: ["Salida: azafrán, jazmín", "Corazón: madera ambarina, ámbar gris", "Fondo: resina de abeto, cedro"]
    },
    {
      nombre: "Ajwad",
      unisex: true,
      familia: "Floral frutal",
      temporada: ["primavera"],
      aroma: ["floral"],
      precio: 45692,
      desc: "Bergamota y lichi dan una apertura frutal y fresca, con jazmín, rosas y canela en el corazón. Cierra amaderado, con cedro, sándalo, ámbar y almizcle de fondo.",
      img: "assets/img/mixto/ajwad.jpg",
      detalles: ["Salida: bergamota, lichi", "Corazón: jazmín, rosas, canela", "Fondo: cedro, sándalo, ámbar, almizcle"]
    },
    {
      nombre: "Angham",
      unisex: true,
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 67111,
      desc: "Jengibre, mandarina y pimienta rosa abren con energía, seguidos de lavanda, praliné, cacao y jazmín en el corazón. Cierra en un fondo cálido de vainilla, ámbar y almizcle.",
      img: "assets/img/mixto/angham.jpg",
      detalles: ["Salida: jengibre, mandarina, pimienta rosa", "Corazón: lavanda, praliné, cacao, jazmín", "Fondo: vainilla, ámbar, almizcle"]
    },
    {
      nombre: "Badee Al Oud Sublime",
      unisex: true,
      familia: "Frutal tropical",
      temporada: ["verano"],
      aroma: ["floral", "fresco"],
      precio: 62436,
      desc: "Manzana, lichi y rosa abren jugosos y frescos, con ciruela y jazmín en el corazón. Cierra en musgo, vainilla y pachulí, en un perfil frutal alejado del oud clásico pese al nombre.",
      img: "assets/img/mixto/badee-al-oud-sublime.jpg",
      detalles: ["Salida: manzana, lichi, rosa", "Corazón: ciruela, jazmín", "Fondo: musgo, vainilla, pachulí"]
    },
    {
      nombre: "Khamrah Waha",
      unisex: true,
      familia: "Gourmand fresco",
      temporada: ["invierno", "verano"],
      aroma: ["dulce", "fresco"],
      precio: 126820,
      desc: "Bergamota, yuzu y jengibre sobre pepino, sal marina e iris, cerrando en vainilla, haba tonka y almizcle.",
      img: "assets/img/mixto/khamrah-waha.jpg",
      detalles: ["Salida: bergamota, yuzu, enebro, jengibre", "Corazón: pepino, sal marina, iris, salvia", "Fondo: vainilla, haba tonka, almizcle"]
    },
    {
      nombre: "Khanjar",
      unisex: true,
      familia: "Especiado amaderado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 110033,
      desc: "Nuez moscada, pimienta de Jamaica y jengibre sobre violeta, pachulí y cashmerán, cerrando en cuero, incienso y vetiver.",
      img: "assets/img/mixto/khanjar.jpg",
      detalles: ["Salida: nuez moscada, pimienta de Jamaica, jengibre", "Corazón: violeta, pachulí, cashmerán", "Fondo: cuero, incienso, almizcle, vetiver"]
    },
    {
      nombre: "Nebras Pride",
      unisex: true,
      familia: "Oriental vainilla",
      temporada: ["invierno"],
      aroma: ["dulce"],
      precio: 87221,
      desc: "Frutos rojos y mandarina sobre vainilla, cacao y rosa, cerrando en azúcar, haba tonka y ámbar.",
      img: "assets/img/mixto/nebras-pride.jpg",
      detalles: ["Salida: frutos rojos, mandarina", "Corazón: vainilla, cacao, rosa", "Fondo: azúcar, haba tonka, ámbar, almizcle"]
    },
    {
      nombre: "Extravagant Lover",
      unisex: true,
      familia: "Floral oriental",
      temporada: ["primavera", "invierno"],
      aroma: ["floral"],
      precio: 38873,
      desc: "Mandarina y pimienta rosa sobre un corazón floral de azahar, jazmín y rosa, cerrando en ámbar y vainilla. Sensual y audaz, cítrico al inicio y amaderado cálido al final.",
      img: "assets/img/mixto/extravagant-lover.jpg",
      detalles: ["Salida: mandarina, pimienta rosa", "Corazón: azahar, jazmín, rosa", "Fondo: ámbar, vainilla"]
    },
    {
      nombre: "Glacier Bella",
      unisex: true,
      familia: "Oriental afrutado",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 46271,
      desc: "Bergamota y pera verde sobre un corazón floral con un toque de cuero, cerrando en vainilla, vetiver, ámbar y almizcle. Fresco y sensual, con dulzura frutal.",
      img: "assets/img/mixto/glacier-bella.jpg",
      detalles: ["Salida: bergamota, pera verde", "Corazón: notas florales, cuero", "Fondo: vainilla, vetiver, ámbar, almizcle"]
    },
    {
      nombre: "Glacier Bold",
      unisex: true,
      familia: "Amaderado especiado",
      temporada: ["otono"],
      aroma: ["amaderado"],
      precio: 44769,
      desc: "Bergamota y coco sobre un corazón especiado de cúrcuma, canela y pimienta negra, cerrando en haba tonka, vainilla y sándalo. Fresco al inicio, cada vez más envolvente.",
      img: "assets/img/mixto/glacier-bold.jpg",
      detalles: ["Salida: bergamota, coco", "Corazón: cúrcuma, canela, pimienta negra", "Fondo: haba tonka, vainilla, sándalo"]
    },
    {
      nombre: "Jean Lowe Noir",
      unisex: true,
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["amaderado"],
      precio: 60549,
      desc: "Oud e incienso sobre un corazón de rosa, frambuesa y azafrán, cerrando en ámbar, benjuí y geranio. Intenso y de gran duración; conviene usarlo con moderación.",
      img: "assets/img/mixto/jean-lowe-noir.jpg",
      detalles: ["Salida: oud, incienso", "Corazón: rosa, frambuesa, azafrán, abedul", "Fondo: ámbar, benjuí, geranio"]
    },
    {
      nombre: "La Baroque Rouge",
      unisex: true,
      familia: "Oriental floral",
      temporada: ["invierno", "primavera"],
      aroma: ["floral"],
      precio: 42411,
      desc: "Azafrán, pera y mandarina sobre un corazón floral de jazmín, ylang-ylang y lirio, cerrando en ámbar, madera de cachemira y almizcle. Dulce y envolvente.",
      img: "assets/img/mixto/la-baroque-rouge.jpg",
      detalles: ["Salida: azafrán, pera, mandarina", "Corazón: jazmín, ylang-ylang, lirio", "Fondo: ámbar, madera de cachemira, almizcle"]
    },
    {
      nombre: "Stallion 53",
      unisex: true,
      familia: "Amaderado oriental",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado"],
      precio: 71935,
      desc: "Cardamomo y violeta abren paso a un corazón de ámbar e iris, sobre una base amaderada de sándalo, cuero y cedro de Virginia. Envolvente, muy cercano a Santal 33.",
      img: "assets/img/mixto/Stallion-53.jpg",
      detalles: ["Salida: cardamomo, violeta", "Corazón: ámbar, iris", "Fondo: sándalo, cuero, cedro de Virginia, papiro"]
    },
    {
      nombre: "Dunescape Dubai",
      unisex: true,
      familia: "Aromático fougère",
      temporada: ["primavera", "verano"],
      aroma: ["citrico", "fresco"],
      precio: 106109,
      desc: "Cítricos, jengibre, enebro y salvia abren frescos, sobre un corazón ozónico de cashmerán, geranio y rosa que cierra en ámbar seco, almizcle y sándalo. Un fougère aromático de Armaf.",
      img: "",
      detalles: ["Salida: limón, mandarina, bergamota, naranja sanguina, jengibre, enebro, salvia", "Corazón: cashmerán, acorde ozónico, geranio, rosa, manzana", "Fondo: ámbar seco, almizcle, sándalo"]
    },
    {
      nombre: "Odyssey Bahamas",
      unisex: true,
      familia: "Frutal acuático",
      temporada: ["verano"],
      aroma: ["fresco", "dulce"],
      precio: 96333,
      desc: "Melón, pera, manzana verde y ciruela con un toque salino abren jugosos, sobre un corazón acuático de nenúfar, incienso y musgo de roble que cierra en almizcle, cedro, ámbar y azúcar. De la línea tropical de Armaf.",
      img: "",
      detalles: ["Salida: melón cantalupo, algas, melón, pera, manzana verde, ciruela, sal", "Corazón: notas acuáticas, incienso, nenúfar, musgo de roble", "Fondo: almizcle, cedro, ámbar, azúcar"]
    },
    {
      nombre: "Odyssey Go Mango",
      unisex: true,
      familia: "Frutal gourmand",
      temporada: ["primavera", "verano"],
      aroma: ["dulce"],
      precio: 92773,
      desc: "Limón, jengibre y pimienta rosa abren luminosos, con mango y haba tonka en el corazón. Cierra cálido y dulce, con ámbar, vainilla, guayaco y un toque de frutos secos. También de la línea tropical de Armaf.",
      img: "",
      detalles: ["Salida: limón, jengibre, pimienta rosa, flores blancas", "Corazón: mango, madera seca, haba tonka", "Fondo: ámbar, vainilla, madera de guayaco, almizcle, frutos secos"]
    },
    {
      nombre: "Hawas Chrome",
      unisex: true,
      familia: "Frutal fresco",
      temporada: ["primavera", "verano"],
      aroma: ["fresco", "dulce"],
      precio: 114471,
      desc: "Durazno, naranja dulce y frutas amarillas abren jugosos, con maracuyá, mango y un toque acuático en el corazón, sobre un fondo cremoso de almizcle, ámbar y vainilla. Lanzamiento 2026 de Rasasi.",
      img: "",
      detalles: ["Salida: durazno, naranja dulce, frutas amarillas", "Corazón: maracuyá, mango, frutas, notas acuáticas", "Fondo: almizcle, ámbar, vainilla"]
    },
    {
      nombre: "Riiffs Momento",
      unisex: true,
      familia: "Amaderado especiado",
      temporada: ["otono", "invierno"],
      aroma: ["amaderado", "dulce"],
      precio: 99227,
      desc: "Azúcar, azafrán y mandarina abren dulces y especiados, con haba tonka, rosa damascena y oud en el corazón. Cierra con caramelo, amberwood y cedro. De Riiffs, en concentración extrait.",
      img: "",
      detalles: ["Salida: azúcar, azafrán, mandarina", "Corazón: haba tonka, rosa damascena, oud", "Fondo: caramelo, amberwood, cedro"]
    },
    {
      nombre: "Teriaq",
      unisex: true,
      familia: "Oriental gourmand",
      temporada: ["otono", "invierno"],
      aroma: ["dulce"],
      precio: 64216,
      desc: "El Teriaq original de Lattafa, creado por Quentin Bisch: caramelo, almendra amarga, damasco y pimienta rosa sobre miel, ruibarbo y rosa, cerrando en cuero, vainilla, ládano y vetiver. Dulce, con un fondo de cuero bien marcado.",
      img: "",
      detalles: ["Salida: caramelo, almendra amarga, damasco, pimienta rosa", "Corazón: miel, ruibarbo, flores blancas, rosa", "Fondo: cuero, vainilla, almizcle, ládano, vetiver"]
    }
  ],

  /* ======================================================================
     NUESTRA RECOMENDACIÓN  ·  selección propia, cualquier género
     -----------------------------------------------------------------------
     Se carga a mano: pegá acá el producto que quieras destacar (puede
     repetir uno que ya esté en Hombre/Mujer/Stock) o sumá uno nuevo.
     ====================================================================== */
  recomendacion: [],

  /* ======================================================================
     LOS PRÓXIMOS INGRESOS  ·  todavía no llegaron
     -----------------------------------------------------------------------
     Van sin precio y con proximamente:true (ver ese campo más arriba).
     Cuando llegue uno: pasalo a Hombre y/o Mujer con su precio real y
     sacale proximamente:true.
     ====================================================================== */
  proximos: [
    {
      nombre: "Rave Now Rosa",
      proximamente: true,
      familia: "Floral frutal",
      temporada: ["primavera", "verano"],
      aroma: ["dulce", "floral"],
      desc: "Fragancia femenina de Rave (Lattafa), el Now Women de frasco rosa: frutos rojos y naranja sobre un corazón de malvavisco, jazmín y lirio de los valles, cerrando en vainilla, almizcle y musgo. Dulce, frutal y fácil de llevar.",
      img: "assets/img/proximos/rave-now-rosa.jpg",
      detalles: ["Salida: frutos rojos, naranja", "Corazón: malvavisco, jazmín, lirio de los valles", "Fondo: vainilla, almizcle, musgo"]
    },
    {
      nombre: "Azzaro The Most Wanted EDP Intense",
      proximamente: true,
      familia: "Oriental amaderado",
      temporada: ["invierno", "otono"],
      aroma: ["dulce", "amaderado"],
      desc: "Fragancia masculina de Azzaro, en su versión Eau de Parfum Intense: cardamomo especiado sobre un corazón goloso de toffee, con fondo de amberwood. Cálida, dulce y con mucha presencia, ideal para la noche.",
      img: "assets/img/proximos/azzaro-the-most-wanted.jpg",
      detalles: ["Salida: cardamomo", "Corazón: toffee", "Fondo: amberwood"]
    },
    {
      nombre: "Jean Paul Gaultier Le Beau Le Parfum",
      proximamente: true,
      familia: "Oriental amaderado",
      temporada: ["otono", "invierno"],
      aroma: ["dulce", "amaderado"],
      desc: "Fragancia masculina de Jean Paul Gaultier, en versión Eau de Parfum Intense creada por Quentin Bisch: ananá, iris, jengibre y ciprés abren frescos, sobre un corazón de coco y maderas que cierra en haba tonka, sándalo, ámbar y ámbar gris.",
      img: "assets/img/proximos/le-beau-le-parfum.jpg",
      detalles: ["Salida: ananá, iris, jengibre, ciprés", "Corazón: coco, notas amaderadas", "Fondo: haba tonka, sándalo, ámbar, ámbar gris"]
    },
    {
      nombre: "Jean Paul Gaultier Le Male Elixir",
      proximamente: true,
      familia: "Oriental fougère",
      temporada: ["invierno", "otono"],
      aroma: ["dulce"],
      desc: "Fragancia masculina de Jean Paul Gaultier, creada por Quentin Bisch: lavanda y menta abren frescas, sobre un corazón de vainilla y benjuí que cierra en miel, haba tonka y tabaco. Intensa, dulce y envolvente.",
      img: "assets/img/proximos/le-male-elixir.jpg",
      detalles: ["Salida: lavanda, menta", "Corazón: vainilla, benjuí", "Fondo: miel, haba tonka, tabaco"]
    },
    {
      nombre: "Yves Saint Laurent Y EDP",
      proximamente: true,
      familia: "Aromático fougère",
      temporada: ["otono", "primavera"],
      aroma: ["fresco", "amaderado"],
      desc: "Fragancia masculina de Yves Saint Laurent, creada por Dominique Ropion: bergamota, jengibre y manzana abren frescos, sobre un corazón aromático de salvia, geranio y enebro que cierra en amberwood, haba tonka, cedro, vetiver e incienso.",
      img: "assets/img/proximos/ysl-y-edp.jpg",
      detalles: ["Salida: bergamota, jengibre, manzana", "Corazón: salvia, geranio, bayas de enebro", "Fondo: vetiver, cedro, haba tonka, amberwood, incienso"]
    },
    {
      nombre: "Emporio Armani Stronger With You Intensely",
      proximamente: true,
      familia: "Oriental fougère",
      temporada: ["invierno", "otono"],
      aroma: ["dulce"],
      desc: "Fragancia masculina de Emporio Armani: pimienta rosa, enebro y violeta abren especiados, sobre un corazón de toffee, canela, lavanda y salvia que cierra en vainilla, ámbar, haba tonka y gamuza. Dulce, cálida y muy envolvente.",
      img: "assets/img/proximos/stronger-with-you-intensely.jpg",
      detalles: ["Salida: pimienta rosa, enebro, violeta", "Corazón: toffee, canela, lavanda, salvia", "Fondo: vainilla, ámbar, haba tonka, gamuza"]
    }
  ]

};
