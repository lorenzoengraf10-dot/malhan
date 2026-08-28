/* =========================================================================
   MALHAN FRAGRANCE — CATÁLOGO DE PRODUCTOS
   -------------------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA CARGAR PRODUCTOS.

   Cómo se está cargando el catálogo:
   Cada producto entra recién cuando me pasás su foto real con el precio
   (como las capturas de historias que mandás). En cuanto entra, busco
   el género y los aromas reales del perfume y lo cargo directo en
   "hombre", "mujer" o "mixto" — no queda ningún producto sin clasificar
   ni con datos inventados. Todavía falta cargar la foto real de cada
   uno (queda "" hasta que la mandes) y confirmar que precio/aromas
   estén bien.

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
   navegación de arriba, el footer y los títulos de cada sección.
   ========================================================================= */
const CATEGORIAS = {
  /* Lo que ya tenemos confirmado y listo para pedir (foto + precio real).
     Al frente de todo porque es lo que un cliente puede comprar hoy. */
  stock: { nombre: "Stock" },

  hombre: { nombre: "Hombre" },
  mujer: { nombre: "Mujer" },
  mixto: { nombre: "Mixto" }
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
    texto: "Los mejores, siempre 🔥😪",
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
    autor: "@joaquin.barcia"
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
     Khamrah Qahwa, Confidential Private Gold → Mixto
     ====================================================================== */
  stock: [
    {
      nombre: "Asad",
      familia: "Oriental",
      precio: 73327,
      desc: "Pimienta negra, tabaco y piña sobre un fondo amaderado con vainilla y ámbar.",
      img: "assets/img/stock/asad.jpg",
      detalles: ["Salida: pimienta negra, tabaco, piña", "Corazón: pachulí, café, iris", "Fondo: vainilla, ámbar, madera seca, benjuí, ládano"]
    },
    {
      nombre: "Asad Bourbon",
      familia: "Oriental gourmand",
      precio: 89761,
      desc: "Lavanda y pimienta rosa sobre cacao y vainilla bourbon. Cálido, dulce y con muy buena proyección.",
      img: "assets/img/stock/asad-bourbon.jpg",
      detalles: ["Salida: lavanda, ciruela mirabel, pimienta rosa", "Corazón: cacao, nuez moscada, davana", "Fondo: vainilla bourbon, ámbar, vetiver"]
    },
    {
      nombre: "Odyssey Mandarin Sky",
      familia: "Cítrico amaderado",
      precio: 69860,
      desc: "Mandarina y naranja sobre caramelo y haba tonka, cerrando en cedro y vetiver. Fresco con fondo amaderado.",
      img: "assets/img/stock/odyssey-mandarin-sky.jpg",
      detalles: ["Salida: mandarina, naranja, azafrán, salvia", "Corazón: caramelo, haba tonka, caléndula", "Fondo: ambroxan, cedro, vetiver"]
    },
    {
      nombre: "Yara Rosa",
      familia: "Oriental vainilla",
      precio: 73583,
      desc: "Orquídea y heliotropo sobre frutas tropicales, cerrando en vainilla y sándalo. El clásico rosa de Lattafa.",
      img: "assets/img/stock/yara-rosa.jpg",
      detalles: ["Salida: orquídea, heliotropo, mandarina", "Corazón: acorde gourmand, frutas tropicales", "Fondo: vainilla, almizcle, sándalo"]
    },
    {
      nombre: "Yara Candy",
      familia: "Frutal gourmand",
      precio: 60380,
      desc: "Grosella negra y mandarina verde sobre caramelo de fresa y gardenia. Dulce, frutal y fácil de llevar.",
      img: "assets/img/stock/yara-candy.jpg",
      detalles: ["Salida: grosella negra, mandarina verde", "Corazón: caramelo de fresa, gardenia", "Fondo: vainilla, almizcle, ámbar, sándalo"]
    },
    {
      nombre: "Eclaire",
      familia: "Floral gourmand",
      precio: 94171,
      desc: "Caramelo y leche sobre miel y flores blancas, cerrando en vainilla y praliné. Dulce y goloso.",
      img: "assets/img/stock/eclaire.jpg",
      detalles: ["Salida: caramelo, leche, azúcar", "Corazón: miel, flores blancas", "Fondo: vainilla, praliné, almizcle"]
    },
    {
      nombre: "Khamrah Qahwa",
      familia: "Oriental vainilla",
      precio: 59395,
      desc: "Canela y cardamomo sobre café, vainilla y haba tonka. Intenso y envolvente.",
      img: "assets/img/stock/khamrah-qahwa.jpg",
      detalles: ["Salida: canela, cardamomo, jengibre", "Corazón: praliné, frutos confitados, flores blancas", "Fondo: vainilla, café, haba tonka, benjuí, almizcle"]
    },
    {
      nombre: "Confidential Private Gold",
      familia: "Chypre frutal",
      precio: 49337,
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
      precio: 101511,
      desc: "Bergamota, ananá y pomelo sobre pachulí y cedro, cerrando en musgo de roble y ámbar.",
      img: "assets/img/hombre/hawas-black.jpg",
      detalles: ["Salida: bergamota, ananá, pomelo", "Corazón: pachulí, cedro, jazmín", "Fondo: musgo de roble, madera, ámbar"]
    },
    {
      nombre: "Hawas Kobra",
      familia: "Oriental amaderado",
      precio: 93336,
      desc: "Jengibre y mandarina sobre té verde y canela, cerrando en almizcle y ámbar.",
      img: "",
      detalles: ["Salida: jengibre, bergamota, mandarina", "Corazón: té verde, canela, neroli", "Fondo: almizcle, madera, ámbar"]
    },
    {
      nombre: "Hawas Tropical",
      familia: "Frutal gourmand",
      precio: 78269,
      desc: "Hoja de higo, agua de coco y jengibre sobre higo y menta, cerrando en haba tonka, almizcle y sándalo.",
      img: "assets/img/hombre/hawas-tropical.jpg",
      detalles: ["Salida: hoja de higo, agua de coco, jengibre", "Corazón: coco, higo, menta", "Fondo: haba tonka, almizcle, sándalo"]
    },
    {
      nombre: "Hawas",
      familia: "Aromático acuático",
      precio: 66992,
      desc: "El Hawas original de Rasasi: apertura afrutada de manzana, bergamota y limón con un toque de canela, corazón acuático de ciruela y azahar, y fondo ambarado con almizcle y pachulí.",
      img: "",
      detalles: ["Salida: bergamota, manzana, canela, limón", "Corazón: notas acuáticas, ciruela, azahar, cardamomo", "Fondo: ámbar gris, almizcle, madera a la deriva, pachulí"]
    },
    {
      nombre: "Hawas Ice",
      familia: "Aromático fresco",
      precio: 98023,
      desc: "Versión fría del Hawas, con salida cítrica de manzana, limón y bergamota siciliana realzada por anís estrellado, corazón de ciruela y azahar, y fondo amaderado con musgo y ámbar.",
      img: "assets/img/hombre/hawas-ice.jpg",
      detalles: ["Salida: manzana, limón italiano, bergamota siciliana, anís estrellado", "Corazón: ciruela, azahar, cardamomo", "Fondo: almizcle, ámbar, madera a la deriva, musgo"]
    },
    {
      nombre: "9 PM",
      familia: "Oriental vainilla",
      precio: 69903,
      desc: "Manzana, canela y lavanda silvestre sobre bergamota, con un corazón floral de azahar y lirio de los valles que cierra en vainilla, haba tonka, ámbar y pachulí.",
      img: "assets/img/hombre/9-pm.jpg",
      detalles: ["Salida: manzana, canela, lavanda silvestre, bergamota", "Corazón: azahar, lirio de los valles", "Fondo: vainilla, haba tonka, ámbar, pachulí"]
    },
    {
      nombre: "Turathi Blue",
      familia: "Aromático acuático",
      precio: 80837,
      desc: "Bergamota y mandarina frescas sobre un corazón ambarino y amaderado, que cierra en almizcle, pachulí y un toque de especias.",
      img: "assets/img/hombre/turathi-blue.jpg",
      detalles: ["Salida: bergamota, mandarina", "Corazón: ámbar, notas amaderadas", "Fondo: almizcle, pachulí, especias"]
    },
    {
      nombre: "Dubai Night",
      familia: "Ambarino amaderado",
      precio: 120279,
      desc: "Azafrán, bergamota y elemí abren con un toque especiado, sobre un corazón de oud y rosa búlgara que cierra en haba tonka, ámbar, almizcle blanco y musgo de roble.",
      img: "assets/img/hombre/dubai-night.jpg",
      detalles: ["Salida: azafrán, bergamota, elemí", "Corazón: oud, rosa búlgara, lirio de los valles", "Fondo: haba tonka, ámbar, almizcle blanco, musgo de roble"]
    },
    {
      nombre: "Club de Nuit Iconic",
      familia: "Aromático especiado",
      precio: 95904,
      desc: "Pomelo, limón y menta con un toque de pimienta rosa se funden en un corazón especiado de jengibre, melón y nuez moscada, que cierra en incienso, sándalo, ámbar y cedro.",
      img: "assets/img/hombre/club-de-nuit-iconic.jpg",
      detalles: ["Salida: pomelo, limón, menta, pimienta rosa", "Corazón: jengibre, melón, jazmín, nuez moscada", "Fondo: incienso, sándalo, ámbar, cedro, pachulí"]
    },
    {
      nombre: "Club de Nuit Intense Man EDT",
      familia: "Amaderado especiado",
      precio: 82871,
      desc: "Limón, ananá y bergamota dan una apertura fresca y afrutada, sobre un corazón ahumado de abedul, jazmín y rosa que cierra en almizcle, ámbar gris, pachulí y vainilla.",
      img: "assets/img/hombre/club-de-nuit-intense-man-edt.jpg",
      detalles: ["Salida: limón, ananá, bergamota, grosella negra", "Corazón: abedul, jazmín, rosa", "Fondo: almizcle, ámbar gris, pachulí, vainilla"]
    },
    {
      nombre: "Club de Nuit Urban Man Elixir",
      familia: "Amaderado aromático",
      precio: 96888,
      desc: "Bergamota, pimienta rosa y azahar abren sobre un corazón aromático de lavanda y geranio, que cierra en una base amaderada de vetiver, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: bergamota, pimienta rosa, azahar", "Corazón: lavanda, geranio, vetiver", "Fondo: ámbar, cedro, pachulí"]
    },
    {
      nombre: "Odyssey Aqua",
      familia: "Amaderado aromático",
      precio: 77564,
      desc: "Naranja y pomelo con un toque herbal de artemisia dan paso a un corazón fresco de menta y lavanda, que cierra en ambroxan, ciprés y pachulí.",
      img: "assets/img/hombre/odyssey-aqua.jpg",
      detalles: ["Salida: naranja, pomelo, artemisia", "Corazón: menta, lavanda", "Fondo: ambroxan, ciprés, pachulí"]
    },
    {
      nombre: "Odyssey Homme Blanco",
      familia: "Oriental fougère",
      precio: 77093,
      desc: "Pimienta rosa, pomelo y yuzu se abren sobre un corazón marino con hoja de violeta, que cierra en una base ambarina y amaderada.",
      img: "assets/img/hombre/odyssey-homme-blanco.jpg",
      detalles: ["Salida: pimienta rosa, pomelo, yuzu", "Corazón: notas marinas, hoja de violeta", "Fondo: madera ambarina, ámbar, madera de gaiac"]
    },
    {
      nombre: "Odyssey Homme Negro",
      familia: "Oriental amaderado",
      precio: 59695,
      desc: "Cardamomo, mandarina y neroli abren paso a azahar y rosa, sobre un fondo envolvente de vainilla, sándalo y ámbar. Un oriental amaderado potente, pensado para la noche.",
      img: "assets/img/hombre/odyssey-homme-negro.jpg",
      detalles: ["Salida: cardamomo, mandarina, neroli", "Corazón: azahar, rosa", "Fondo: vainilla, sándalo, ámbar"]
    },
    {
      nombre: "Odyssey Mega",
      familia: "Aromático amaderado",
      precio: 59373,
      desc: "Naranja, limón y bergamota frescos se apoyan en salvia y enebro, sobre una base amaderada de cedro, vetiver y haba tonka. Versátil, pensado para el uso diario.",
      img: "assets/img/hombre/odyssey-mega.jpg",
      detalles: ["Salida: naranja, limón, bergamota, jengibre", "Corazón: ananá, salvia, enebro, geranio", "Fondo: almizcle, cedro, haba tonka, vetiver"]
    },
    {
      nombre: "Uomo Intense",
      familia: "Aromático amaderado",
      precio: 60529,
      desc: "Jengibre, bergamota y limón dan una apertura fresca y especiada, con albahaca y hojas de violeta en el corazón. Cierra amaderado, con haba tonka, vara de oro y cedro de fondo.",
      img: "assets/img/hombre/uomo-intense.jpg",
      detalles: ["Salida: jengibre, bergamota, limón", "Corazón: especias, pimienta blanca, albahaca, hojas de violeta", "Fondo: haba tonka, vara de oro, cedro"]
    },
    {
      nombre: "Spectre Ghost",
      familia: "Amaderado aromático",
      precio: 94812,
      desc: "Jengibre, cardamomo y bergamota abren con un toque especiado, seguidos de pimienta rosa, grosella negra y rosa turca en el corazón. El fondo de vainilla, cedro y pachulí cierra cálido y amaderado.",
      img: "assets/img/hombre/spectre-ghost.jpg",
      detalles: ["Salida: jengibre, cardamomo, bergamota", "Corazón: pimienta rosa, grosella negra, rosa", "Fondo: vainilla, cedro, pachulí"]
    },
    {
      nombre: "Liquid Brun",
      familia: "Amaderado gourmand",
      precio: 104079,
      desc: "Canela, azahar y cardamomo se mezclan con bergamota fresca, sobre un corazón de vainilla bourbon. Cierra dulce y amaderado, con praliné, almizcle y madera de guayaco.",
      img: "assets/img/hombre/liquid-brun.jpg",
      detalles: ["Salida: canela, azahar, cardamomo, bergamota", "Corazón: vainilla bourbon, elemí", "Fondo: praliné, ambroxan, almizcle, madera de guayaco"]
    },
    {
      nombre: "Asad Elixir",
      familia: "Oriental amaderado",
      precio: 85439,
      desc: "Pimienta rosa, azafrán y pomelo dan una apertura especiada, con tabaco y vainilla en el corazón. El fondo de ámbar claro, incienso y pachulí lo hace denso y envolvente, ideal para la noche.",
      img: "assets/img/hombre/asad-elixir.jpg",
      detalles: ["Salida: pimienta rosa, azafrán, pomelo", "Corazón: tabaco, vainilla, cedro", "Fondo: ámbar claro, incienso, pachulí, cashmerán"]
    },
    {
      nombre: "Asad Zanzibar",
      familia: "Oriental acuático",
      precio: 60743,
      desc: "Lavanda y pimienta negra abren con frescura, seguidas de agua de coco, iris y un toque salino en el corazón. Cierra cálido, con vainilla e incienso de fondo, en un perfil tropical poco convencional.",
      img: "assets/img/hombre/asad-zanzibar.jpg",
      detalles: ["Salida: lavanda, pimienta negra", "Corazón: agua de coco, iris, sal", "Fondo: vainilla, incienso"]
    },
    {
      nombre: "Fakhar Black",
      familia: "Amaderado dulce",
      precio: 66564,
      desc: "Manzana, bergamota y jengibre abren frescos y ligeramente dulces, con lavanda y salvia en el corazón. El fondo de haba tonka, cedro y vetiver lo deja amaderado y versátil para el día a día.",
      img: "",
      detalles: ["Salida: manzana, bergamota, jengibre", "Corazón: lavanda, salvia, enebro, geranio", "Fondo: haba tonka, cedro, madera de ámbar, vetiver"]
    },
    {
      nombre: "Fakhar Silver",
      familia: "Aromático amaderado",
      precio: 56869,
      desc: "Manzana, jengibre y bergamota sobre lavanda, salvia y enebro, cerrando en madera de ámbar, cedro y vetiver.",
      img: "assets/img/hombre/fakhar-silver.jpg",
      detalles: ["Salida: manzana, jengibre, bergamota", "Corazón: lavanda, salvia, enebro", "Fondo: madera de ámbar, haba tonka, cedro, vetiver"]
    },
    {
      nombre: "Habik for Men",
      familia: "Aromático amaderado",
      precio: 57768,
      desc: "Cardamomo, pimienta y bergamota sobre lavanda, canela y salvia, cerrando en sándalo, almizcle y pachulí.",
      img: "assets/img/hombre/habik-for-men.jpg",
      detalles: ["Salida: cardamomo, pimienta, bergamota", "Corazón: lavanda, canela, salvia", "Fondo: haba tonka, sándalo, almizcle, pachulí"]
    },
    {
      nombre: "Hayaati Masc",
      familia: "Amaderado aromático",
      precio: 44479,
      desc: "Manzana y bergamota sobre canela y notas amaderadas, cerrando en almizcle y vainilla.",
      img: "assets/img/hombre/hayaati-masc.jpg",
      detalles: ["Salida: manzana, bergamota", "Corazón: canela, notas amaderadas", "Fondo: almizcle, vainilla"]
    },
    {
      nombre: "His Confession",
      familia: "Oriental amaderado",
      precio: 80667,
      desc: "Mandarina, canela y lavanda sobre iris, ciprés y benjuí, cerrando en vainilla, haba tonka y ámbar.",
      img: "assets/img/hombre/his-confession.jpg",
      detalles: ["Salida: mandarina, canela, lavanda", "Corazón: iris, ciprés, benjuí", "Fondo: vainilla, haba tonka, pachulí, ámbar"]
    },
    {
      nombre: "Khamrah Dukhan",
      familia: "Oriental especiado",
      precio: 58004,
      desc: "Especias, pimienta de Jamaica y mandarina sobre incienso, labdano y azahar, cerrando en tabaco, praliné y ámbar.",
      img: "assets/img/hombre/khamrah-dukhan.jpg",
      detalles: ["Salida: especias, pimienta de Jamaica, mandarina", "Corazón: incienso, labdano, azahar", "Fondo: praliné, tabaco, ámbar, haba tonka"]
    },
    {
      nombre: "Pisa",
      familia: "Aromático cítrico",
      precio: 99284,
      desc: "Mandarina, limón y bergamota sobre cedro, cerrando en sándalo y ámbar.",
      img: "assets/img/hombre/pisa.jpg",
      detalles: ["Salida: mandarina, limón, bergamota", "Corazón: cedro", "Fondo: sándalo, ámbar"]
    },
    {
      nombre: "Salvo",
      familia: "Oriental fougère",
      precio: 63055,
      desc: "Apertura fresca de bergamota que da paso a un corazón especiado de lavanda, pimienta de Sichuán, anís estrellado y nuez moscada, sobre un fondo ambroxado con vainilla.",
      img: "assets/img/hombre/salvo.jpg",
      detalles: ["Salida: bergamota", "Corazón: lavanda, pimienta de Sichuán, anís estrellado, nuez moscada", "Fondo: ambroxán, vainilla"]
    },
    {
      nombre: "Salvo Elixir",
      familia: "Aromático especiado",
      precio: 57020,
      desc: "Versión más intensa del Salvo: pomelo, cardamomo, canela y nuez moscada en la salida, corazón de vainilla y lavanda, y un fondo ambarado con vetiver, regaliz y pachulí.",
      img: "assets/img/hombre/salvo-elixir.jpg",
      detalles: ["Salida: pomelo, cardamomo, canela, nuez moscada", "Corazón: vainilla, lavanda", "Fondo: ámbar, vetiver, regaliz, pachulí"]
    },
    {
      nombre: "Yeah Man",
      familia: "Aromático frutal",
      precio: 51520,
      desc: "Salida frutal de manzana y jengibre sobre bergamota, corazón herbal de salvia, enebro y geranio, y fondo amaderado con cedro, vetiver e incienso.",
      img: "assets/img/hombre/yeah-man.jpg",
      detalles: ["Salida: manzana, jengibre, bergamota", "Corazón: salvia, bayas de enebro, geranio", "Fondo: amberwood, cedro, vetiver, incienso, haba tonka"]
    },
    {
      nombre: "Yeah Man Parfum",
      familia: "Aromático frutal",
      precio: 50835,
      desc: "Edición parfum de mayor concentración sobre la misma base: manzana, bergamota y jengibre en la apertura, corazón de geranio, enebro y salvia, y fondo amaderado ambarado con incienso y haba tonka.",
      img: "assets/img/hombre/yeah-man-parfum.jpg",
      detalles: ["Salida: manzana, bergamota, jengibre", "Corazón: geranio, bayas de enebro, salvia", "Fondo: amberwood, cedro, incienso, haba tonka, vetiver"]
    },
    {
      nombre: "Rayhaan Wolf",
      familia: "Oriental amaderado",
      precio: 87065,
      desc: "Fragancia cálida y envolvente pensada para la noche, con salida especiada de cardamomo, corazón dulce de toffee y fondo amaderado ambarado.",
      img: "assets/img/hombre/rayhaan-wolf.jpg",
      detalles: ["Salida: cardamomo", "Corazón: toffee", "Fondo: amberwood"]
    },
    {
      nombre: "Rayhaan Italia",
      familia: "Oriental especiado",
      precio: 127212,
      desc: "Apertura fresca de lavanda, limón y bergamota que da paso a un corazón cálido de miel, canela, cashmeran y jazmín, y cierra en vainilla, tabaco y haba tonka.",
      img: "assets/img/hombre/rayhaan-italia.jpg",
      detalles: ["Salida: lavanda, limón, bergamota", "Corazón: miel, canela, cashmeran, jazmín", "Fondo: vainilla, hoja de tabaco, haba tonka"]
    },
    {
      nombre: "Bharara King 100ml",
      familia: "Aromático afrutado",
      precio: 131000,
      desc: "Salida cítrica de naranja, bergamota y limón sobre un corazón de notas frutales dulces, con fondo cálido de vainilla, almizcle blanco y ámbar.",
      img: "assets/img/hombre/bharara-king-100ml.jpg",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: notas frutales", "Fondo: vainilla, almizcle blanco, ámbar"]
    },
    {
      nombre: "Bharara King 150ml",
      familia: "Aromático afrutado",
      precio: 169241,
      desc: "Mismo perfil que el Bharara King en formato grande: naranja, bergamota y limón en la salida, corazón frutal dulce, y fondo de vainilla, almizcle blanco y ámbar.",
      img: "assets/img/hombre/bharara-king-150ml.jpg",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: notas frutales", "Fondo: vainilla, almizcle blanco, ámbar"]
    },
    {
      nombre: "The Kingdom",
      familia: "Aromático especiado",
      precio: 67207,
      desc: "Lavanda, menta y salvia sobre un corazón dulce de vainilla, tabaco y azahar, cerrando en haba tonka, benjuí y ládano. Elegante y envolvente, con ese perfil dulce-especiado de los grandes clásicos franceses.",
      img: "assets/img/hombre/the-kingdom.jpg",
      detalles: ["Salida: lavanda, menta, salvia", "Corazón: vainilla, tabaco, azahar", "Fondo: haba tonka, benjuí, ládano"]
    },
    {
      nombre: "Jean Lowe Inmortal",
      familia: "Aromático fougère",
      precio: 58496,
      desc: "Jengibre, pomelo y bergamota sobre un corazón herbal de romero, salvia y geranio, cerrando en ambroxán, ámbar y ládano. Fresco y moderno, para el día y la noche.",
      img: "assets/img/hombre/jean-lowe-inmortal.jpg",
      detalles: ["Salida: jengibre, pomelo, bergamota", "Corazón: romero, notas acuáticas, salvia, geranio", "Fondo: ambroxán, ámbar, ládano"]
    }
  ],

  /* ======================================================================
     MUJER
     ====================================================================== */
  mujer: [
    {
      nombre: "9 AM Rosa",
      familia: "Oriental frutal",
      precio: 85931,
      desc: "Mandarina, pomelo y bergamota abren paso a un corazón frutal de frambuesa y grosella negra, que cierra en almizcle, ámbar y naranja.",
      img: "",
      detalles: ["Salida: mandarina, pomelo, bergamota", "Corazón: frambuesa, grosella negra", "Fondo: almizcle, ámbar, naranja"]
    },
    {
      nombre: "Club de Nuit Maleka",
      familia: "Floral frutal",
      precio: 91324,
      desc: "Lichi, bergamota y pimienta rosa se posan sobre un corazón de iris, que cierra en un fondo goloso de praliné, sándalo y ambroxan.",
      img: "",
      detalles: ["Salida: lichi, bergamota, pimienta rosa", "Corazón: iris", "Fondo: praliné, sándalo, ambroxan"]
    },
    {
      nombre: "Club de Nuit Woman",
      familia: "Floral frutal",
      precio: 86937,
      desc: "Naranja, pomelo y durazno abren con frescura frutal, sobre un corazón floral de rosa y jazmín que cierra en pachulí, vainilla y almizcle.",
      img: "",
      detalles: ["Salida: naranja, bergamota, pomelo, durazno", "Corazón: rosa, jazmín, geranio, lichi", "Fondo: pachulí, almizcle, vainilla, vetiver"]
    },
    {
      nombre: "Odyssey Candy",
      familia: "Frutal gourmand",
      precio: 57640,
      desc: "Frutilla, frambuesa y durazno se envuelven en un corazón goloso de caramelo y maracuyá, cerrando en almizcle, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: frutilla, frambuesa, durazno, bergamota", "Corazón: caramelo, jazmín, maracuyá", "Fondo: pachulí, almizcle, ámbar"]
    },
    {
      nombre: "Badee Al Oud Noble Blush",
      familia: "Floral gourmand",
      precio: 59759,
      desc: "Leche de rosas en la apertura, con merengue y almendra en el corazón, sobre un fondo cremoso de vainilla, sándalo y almizcle. Perfil gourmand floral, dulce y suave.",
      img: "",
      detalles: ["Salida: leche de rosas", "Corazón: merengue, almendra", "Fondo: vainilla, sándalo, almizcle"]
    },
    {
      nombre: "Delilah",
      familia: "Floral frutal",
      precio: 68255,
      desc: "Ruibarbo, lichi y bergamota dan una apertura jugosa, con rosa turca, peonía y lirio en el corazón. Cierra suave, con almizcle blanco, vainilla y cashmerán de fondo.",
      img: "",
      detalles: ["Salida: ruibarbo, lichi, bergamota", "Corazón: rosa turca, peonía, lirio", "Fondo: almizcle blanco, vainilla, cashmerán"]
    },
    {
      nombre: "Emaan",
      familia: "Chipre floral",
      precio: 57919,
      desc: "Azahar, grosella negra y bergamota abren frescos y afrutados, con nardo, jazmín y caléndula en el corazón. Cierra en almizcle, vainilla, cedro y pachulí, con muy buena estela.",
      img: "",
      detalles: ["Salida: azahar, grosella negra, bergamota", "Corazón: nardo, jazmín, caléndula", "Fondo: almizcle, vainilla, cedro, pachulí"]
    },
    {
      nombre: "Fakhar Rosa",
      familia: "Floral frutal",
      precio: 75637,
      desc: "Frutas, lirio y granada sobre tuberosa, jazmín y gardenia, cerrando en vainilla, sándalo y almizcle blanco.",
      img: "",
      detalles: ["Salida: frutas, lirio, granada", "Corazón: tuberosa, jazmín, gardenia, rosa", "Fondo: vainilla, almizcle blanco, sándalo"]
    },
    {
      nombre: "Haya",
      familia: "Floral frutal",
      precio: 68768,
      desc: "Champagne, frutilla y mandarina sobre gardenia, jazmín y orquídea vainilla, cerrando en ámbar, sándalo y castaña.",
      img: "",
      detalles: ["Salida: champagne, frutilla, mandarina, naranja sanguina", "Corazón: gardenia, jazmín, orquídea vainilla", "Fondo: ámbar, sándalo, castaña"]
    },
    {
      nombre: "Hayaati Rosa",
      familia: "Floral frutal gourmand",
      precio: 49593,
      desc: "Lychee, pomelo y grosella roja sobre rosa, durazno y cedro, cerrando en vainilla, praliné y ámbar.",
      img: "",
      detalles: ["Salida: lychee, pomelo, grosella roja", "Corazón: rosa, durazno, cedro", "Fondo: vainilla, praliné, ámbar"]
    },
    {
      nombre: "Her Confession",
      familia: "Ámbar vainilla",
      precio: 82913,
      desc: "Canela y especias sobre tuberosa, jazmín e incienso, cerrando en vainilla, almizcle y haba tonka.",
      img: "",
      detalles: ["Salida: canela, especias", "Corazón: tuberosa, jazmín, incienso", "Fondo: vainilla, almizcle, haba tonka"]
    },
    {
      nombre: "Mayar",
      familia: "Floral frutal",
      precio: 55928,
      desc: "Lichi, frambuesa y hoja de violeta sobre rosa blanca, peonía y jazmín, cerrando en almizcle y vainilla.",
      img: "",
      detalles: ["Salida: lichi, frambuesa, hoja de violeta", "Corazón: rosa blanca, peonía, jazmín", "Fondo: almizcle, vainilla"]
    },
    {
      nombre: "Mayar Natural Intense",
      familia: "Floral acuático",
      precio: 54088,
      desc: "Mandarina verde, higo y agua de coco sobre loto, nenúfar y jazmín, cerrando en almizcle, sándalo y vainilla.",
      img: "",
      detalles: ["Salida: mandarina verde, higo, agua de coco, melón", "Corazón: loto, nenúfar, jazmín", "Fondo: almizcle, ambroxan, vainilla, sándalo"]
    },
    {
      nombre: "Hawas Diva",
      familia: "Floral frutal",
      precio: 94684,
      desc: "Apertura jugosa de frutos rojos, ruibarbo y lychee sobre un corazón de rosa, incienso y cedro, cerrando en vainilla, almizcle y ámbar gris.",
      img: "assets/img/mujer/hawas-diva.jpg",
      detalles: ["Salida: frutos rojos, ruibarbo, lychee", "Corazón: rosa, incienso, cedro", "Fondo: vainilla, almizcle, ámbar gris"]
    },
    {
      nombre: "Ameerat Al Arab",
      familia: "Floral amaderado",
      precio: 50899,
      desc: "Salida cítrica sobre un corazón de almizcle blanco y aloe vera, con un fondo floral y amaderado de jazmín, madera y oud.",
      img: "",
      detalles: ["Salida: cítricos, bergamota", "Corazón: almizcle blanco, aloe vera", "Fondo: jazmín, almizcle, madera, oud"]
    },
    {
      nombre: "Ameerat Al Arab Prive Rose",
      familia: "Floral frutal",
      precio: 55051,
      desc: "Apertura frutal de frambuesa, bergamota y rosa, corazón floral de jazmín, peonía y más rosa, sobre un fondo cálido de sándalo, almizcle, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: frambuesa, bergamota, rosa", "Corazón: jazmín, peonía, rosa", "Fondo: sándalo, almizcle, ámbar, pachulí"]
    },
    {
      nombre: "Al Wataniah Sabah Al Ward",
      familia: "Floral oriental",
      precio: 48503,
      desc: "Apertura vibrante de pimienta rosa y mandarina, corazón dulce de cacao, azahar y jazmín sambac, y fondo cálido de vainilla, haba tonka y pachulí.",
      img: "",
      detalles: ["Salida: pimienta rosa, mandarina", "Corazón: cacao, azahar, jazmín sambac", "Fondo: vainilla, haba tonka, pachulí"]
    },
    {
      nombre: "The Kingdom Fem",
      familia: "Floral frutal gourmand",
      precio: 64211,
      desc: "Pera, grosella negra y peonía sobre un corazón de jazmín, praliné y haba tonka, cerrando en vainilla, sándalo, ámbar y almizcle. Floral, dulce y envolvente.",
      img: "",
      detalles: ["Salida: pera, grosella negra, peonía", "Corazón: jazmín, praliné, haba tonka", "Fondo: vainilla, sándalo, ámbar, almizcle"]
    },
    {
      nombre: "Yara Elixir",
      familia: "Oriental vainilla",
      precio: 74781,
      desc: "Frutilla y grosella negra sobre un corazón floral de jazmín y azahar, cerrando en vainilla, caramelo, ámbar y almizcle. Dulce, envolvente y adictivo.",
      img: "",
      detalles: ["Salida: frutilla, grosella negra", "Corazón: jazmín, azahar", "Fondo: vainilla, caramelo, ámbar, almizcle"]
    },
    {
      nombre: "Yara Moi",
      familia: "Floral frutal gourmand",
      precio: 54537,
      desc: "Pera, pimienta rosa y grosella negra sobre un corazón cremoso de nardo, jazmín y almendra, cerrando en vainilla, cashmerán y pachulí. La más intensa de la línea Yara.",
      img: "",
      detalles: ["Salida: pera, pimienta rosa, grosella negra", "Corazón: nardo, jazmín, almendra", "Fondo: vainilla, cashmerán, pachulí"]
    },
    {
      nombre: "Yara Tous",
      familia: "Floral frutal",
      precio: 54344,
      desc: "Mango, coco y maracuyá sobre un corazón floral de jazmín, azahar y heliotropo, cerrando en vainilla, almizcle y cashmerán. Tropical y veraniego.",
      img: "",
      detalles: ["Salida: mango, coco, maracuyá", "Corazón: jazmín, azahar, heliotropo", "Fondo: vainilla, almizcle, cashmerán"]
    },
    {
      nombre: "Intrude",
      familia: "Floral oriental",
      precio: 47540,
      desc: "Pera y bergamota sobre un corazón floral de azahar y jazmín, cerrando en pachulí y vetiver. Sofisticado y sensual.",
      img: "",
      detalles: ["Salida: pera, bergamota", "Corazón: azahar, jazmín", "Fondo: pachulí, vetiver"]
    },
    {
      nombre: "La Vivacité",
      familia: "Floral frutal",
      precio: 54495,
      desc: "Grosella negra y pera sobre un corazón floral de iris, azahar y jazmín, cerrando en pachulí, haba tonka, praliné y vainilla. Fresco al inicio, cremoso y dulce al final.",
      img: "",
      detalles: ["Salida: grosella negra, pera", "Corazón: iris, azahar, jazmín", "Fondo: pachulí, haba tonka, praliné, vainilla"]
    },
    {
      nombre: "La Voie",
      familia: "Floral blanco",
      precio: 67827,
      desc: "Azahar y bergamota sobre un corazón blanco de nardo y jazmín indio, cerrando en vainilla de Madagascar, almizcle blanco y cedro. Floral blanco clásico y de gran presencia.",
      img: "",
      detalles: ["Salida: azahar, bergamota", "Corazón: nardo, jazmín indio", "Fondo: vainilla de Madagascar, almizcle blanco, cedro"]
    },
    {
      nombre: "Papillon D'Or",
      familia: "Floral frutal gourmand",
      precio: 79683,
      desc: "Frutas exóticas y mandarina sobre un corazón de azahar, peonía y vainilla, cerrando en haba tonka, ambroxán y vainilla. Dulce y frutal, gourmand suave.",
      img: "",
      detalles: ["Salida: frutas exóticas, mandarina", "Corazón: azahar, peonía, vainilla", "Fondo: haba tonka, ambroxán, vainilla"]
    },
    {
      nombre: "Rose Seduction VIP",
      familia: "Floral frutal",
      precio: 62433,
      desc: "Pimienta rosa y champagne rosé sobre un corazón de rosa y flor de durazno, cerrando en madera y almizcle blanco. Chispeante y romántico.",
      img: "",
      detalles: ["Salida: pimienta rosa, champagne rosé", "Corazón: rosa, flor de durazno", "Fondo: notas amaderadas, almizcle blanco"]
    }
  ],

  /* ======================================================================
     MIXTO  ·  fragancias unisex
     ====================================================================== */
  mixto: [
    {
      nombre: "Badee Al Oud Amethyst",
      familia: "Oriental floral",
      precio: 52697,
      desc: "Pimienta rosa y bergamota sobre rosa turca y búlgara, cerrando en oud, ámbar y vainilla.",
      img: "",
      detalles: ["Salida: pimienta rosa, bergamota", "Corazón: rosa turca, rosa búlgara, jazmín", "Fondo: oud, ámbar, vainilla"]
    },
    {
      nombre: "Gold Edition 120ml",
      familia: "Oriental vainilla",
      precio: 124195,
      desc: "Bergamota y notas verdes sobre melón, ananá y ámbar, cerrando en vainilla y madera. Amber Oud Gold Edition, de Al Haramain.",
      img: "",
      detalles: ["Salida: bergamota, notas verdes", "Corazón: melón, ananá, ámbar, acorde gourmand", "Fondo: vainilla, almizcle, madera"]
    },
    {
      nombre: "Hawas Malibu",
      familia: "Aromático",
      precio: 90960,
      desc: "Ananá, naranja y pomelo sobre iris, ámbar y lavanda, cerrando en haba tonka y almizcle.",
      img: "",
      detalles: ["Salida: ananá, naranja, pomelo", "Corazón: iris, ámbar, lavanda", "Fondo: haba tonka, almizcle, pachulí, cashmerán"]
    },
    {
      nombre: "Hawas Fire",
      familia: "Aromático marino",
      precio: 90596,
      desc: "Apertura de salvia esclarea, corazón floral marino de jazmín egipcio con notas acuáticas, y fondo salino de ámbar gris y minerales.",
      img: "",
      detalles: ["Salida: salvia esclarea", "Corazón: jazmín egipcio, notas marinas", "Fondo: ámbar gris, ámbar, notas minerales"]
    },
    {
      nombre: "9 AM Dive",
      familia: "Aromático acuático",
      precio: 75017,
      desc: "Limón, menta y grosella negra con un toque de pimienta rosa, sobre un corazón de manzana, cedro e incienso que cierra en jengibre, sándalo, pachulí y jazmín.",
      img: "",
      detalles: ["Salida: limón, menta, grosella negra, pimienta rosa", "Corazón: manzana, cedro, incienso", "Fondo: jengibre, sándalo, pachulí, jazmín"]
    },
    {
      nombre: "9 PM Elixir",
      familia: "Oriental especiado",
      precio: 103757,
      desc: "Nuez moscada, elemí y cardamomo sobre un corazón especiado de pimienta de Jamaica, lavanda y cuero, que cierra en ládano, pachulí y vainilla.",
      img: "",
      detalles: ["Salida: nuez moscada, elemí, cardamomo", "Corazón: pimienta de Jamaica, lavanda, cuero", "Fondo: ládano, pachulí, vainilla"]
    },
    {
      nombre: "9 PM Night Out",
      familia: "Oriental especiado",
      precio: 138255,
      desc: "Pitahaya, coñac y manzana sobre bergamota, con un corazón goloso de toffee, gamuza y cardamomo que cierra en haba tonka, pachulí y ámbar.",
      img: "",
      detalles: ["Salida: pitahaya, coñac, manzana, bergamota", "Corazón: toffee, gamuza, cardamomo, cedro", "Fondo: haba tonka, pachulí, ámbar"]
    },
    {
      nombre: "9 PM Rebel",
      familia: "Amaderado frutal",
      precio: 103051,
      desc: "Manzana verde, ananá y mandarina abren con frescura frutal, sobre un corazón amaderado de cedro y vainilla que cierra en ámbar gris, caramelo y musgo de roble.",
      img: "",
      detalles: ["Salida: manzana verde, ananá, mandarina", "Corazón: cedro, vainilla, musgo de roble", "Fondo: ámbar gris, caramelo, almizcle"]
    },
    {
      nombre: "Aqua Dubai",
      familia: "Aromático frutal",
      precio: 115527,
      desc: "Notas verdes, bergamota y mandarina dan una apertura fresca, sobre un corazón jugoso de melón, ananá y grosella negra que cierra en almizcle y vainilla.",
      img: "",
      detalles: ["Salida: notas verdes, bergamota, mandarina", "Corazón: melón, ananá, grosella negra, ámbar", "Fondo: almizcle, galbano, vainilla"]
    },
    {
      nombre: "Club de Nuit Bling",
      familia: "Amaderado aromático",
      precio: 95368,
      desc: "Cítricos frescos se mezclan con frutas maduras como mango, guayaba y pitaya, sobre un corazón floral que se funde en maderas suaves y vainilla.",
      img: "",
      detalles: ["Salida: cítricos, mango, guayaba", "Corazón: flores blancas, pitaya", "Fondo: maderas aterciopeladas, vainilla"]
    },
    {
      nombre: "Club de Nuit Precieux",
      familia: "Oriental amaderado",
      precio: 132925,
      desc: "Ananá, limón y caramelo abren con frescura frutal, sobre un corazón de musgo de roble y jazmín que cierra en cuero, ámbar, almizcle blanco y vainilla.",
      img: "",
      detalles: ["Salida: ananá, limón, bergamota, caramelo", "Corazón: musgo de roble, jazmín, lirio de los valles", "Fondo: ambroxan, cuero, ámbar, vainilla"]
    },
    {
      nombre: "Club de Nuit Sillage",
      familia: "Floral amaderado",
      precio: 83941,
      desc: "Bergamota, limón y lima dan una apertura cítrica, sobre un corazón floral de rosa e iris que cierra en sándalo, cedro y almizcle.",
      img: "",
      detalles: ["Salida: bergamota, limón, lima, grosella negra", "Corazón: rosa, iris, jazmín", "Fondo: ambroxan, almizcle, sándalo, cedro"]
    },
    {
      nombre: "Club de Nuit Untold",
      familia: "Ambarino amaderado",
      precio: 93720,
      desc: "Azafrán y jazmín se funden en un corazón de madera ambarina y ámbar gris, cerrando en una base resinosa de abeto y cedro.",
      img: "",
      detalles: ["Salida: azafrán, jazmín", "Corazón: madera ambarina, ámbar gris", "Fondo: resina de abeto, cedro"]
    },
    {
      nombre: "Mandarin Sky Elixir",
      familia: "Oriental amaderado",
      precio: 94299,
      desc: "Mandarina y naranja se especian con cardamomo y lavanda, sobre un corazón goloso de caramelo y haba tonka que cierra en vainilla, vetiver y pachulí.",
      img: "",
      detalles: ["Salida: mandarina, naranja, lavanda, cardamomo", "Corazón: caramelo, haba tonka, pachulí, incienso", "Fondo: vainilla, vetiver"]
    },
    {
      nombre: "Desodorante 200ml",
      familia: "Desodorante",
      precio: 22116,
      desc: "Desodorante en aerosol, 200 ml.",
      img: ""
    },
    {
      nombre: "Stallion 53",
      familia: "Amaderado oriental",
      precio: 61279,
      desc: "Cardamomo y violeta abren paso a un corazón de ámbar e iris, sobre una base amaderada de sándalo, cuero y cedro de Virginia. Envolvente, muy cercano a Santal 33.",
      img: "",
      detalles: ["Salida: cardamomo, violeta", "Corazón: ámbar, iris", "Fondo: sándalo, cuero, cedro de Virginia, papiro"]
    },
    {
      nombre: "Liquid Brun Limited Edition",
      familia: "Oriental fougère",
      precio: 150901,
      desc: "Versión extrait de Liquid Brun, con cardamomo, lavanda y cítricos en la apertura y azahar y rosa en el corazón. El fondo de vainilla, haba tonka, ámbar y musgo de roble le da mayor cuerpo y duración que el original.",
      img: "assets/img/mixto/liquid-brun-limited-edition.jpg",
      detalles: ["Salida: cardamomo, lavanda, cítricos", "Corazón: azahar, madera de guayaco, rosa", "Fondo: vainilla, haba tonka, ámbar, musgo de roble"]
    },
    {
      nombre: "Veneno",
      familia: "Aromático frutal",
      precio: 109021,
      desc: "Manzana y canela con un toque ahumado en la apertura, tabaco y musgo en el corazón. Cierra con vainilla bourbon y almizcle, en un perfil aromático frutal con carácter.",
      img: "",
      detalles: ["Salida: manzana, humo, canela", "Corazón: tabaco, musgo", "Fondo: vainilla bourbon, almizcle"]
    },
    {
      nombre: "Vulcan Feu",
      familia: "Floral amaderado",
      precio: 114072,
      desc: "Mango, limón y jengibre abren jugosos y frescos, con pimienta rosa, jazmín y praliné en el corazón. El fondo de haba tonka, cedro y ámbar gris lo cierra cálido y envolvente.",
      img: "",
      detalles: ["Salida: mango, limón, jengibre, ruibarbo", "Corazón: pimienta rosa, jazmín, violeta, praliné", "Fondo: haba tonka, cedro, ámbar gris, musgo"]
    },
    {
      nombre: "Ajwad",
      familia: "Floral frutal",
      precio: 44095,
      desc: "Bergamota y lichi dan una apertura frutal y fresca, con jazmín, rosas y canela en el corazón. Cierra amaderado, con cedro, sándalo, ámbar y almizcle de fondo.",
      img: "",
      detalles: ["Salida: bergamota, lichi", "Corazón: jazmín, rosas, canela", "Fondo: cedro, sándalo, ámbar, almizcle"]
    },
    {
      nombre: "Angham",
      familia: "Oriental vainilla",
      precio: 65216,
      desc: "Jengibre, mandarina y pimienta rosa abren con energía, seguidos de lavanda, praliné, cacao y jazmín en el corazón. Cierra en un fondo cálido de vainilla, ámbar y almizcle.",
      img: "",
      detalles: ["Salida: jengibre, mandarina, pimienta rosa", "Corazón: lavanda, praliné, cacao, jazmín", "Fondo: vainilla, ámbar, almizcle"]
    },
    {
      nombre: "Art of Universe",
      familia: "Cítrico aromático",
      precio: 84625,
      desc: "Mandarina, bergamota y jengibre se combinan con un toque fresco de menta, mientras pera y azahar aparecen en el corazón. El fondo de almizcle, ámbar y cedro le da calidez amaderada.",
      img: "",
      detalles: ["Salida: mandarina, jengibre, bergamota, menta", "Corazón: pera, azahar", "Fondo: almizcle, ámbar, cedro"]
    },
    {
      nombre: "Atlas",
      familia: "Acuático fresco",
      precio: 77007,
      desc: "Notas marinas, sal y limón abren con frescura acuática, sobre un corazón de davana e iris. Cierra amaderado, con ámbar gris, musgo de roble y sándalo de fondo.",
      img: "",
      detalles: ["Salida: notas marinas, sal, limón", "Corazón: davana, iris", "Fondo: ámbar gris, musgo de roble, sándalo"]
    },
    {
      nombre: "Badee Al Oud For Glory",
      familia: "Oriental amaderado",
      precio: 54237,
      desc: "Azafrán, nuez moscada y lavanda dan una apertura especiada, seguida de un corazón denso de oud y pachulí. El fondo repite oud y pachulí sobre almizcle, para una estela intensa y duradera.",
      img: "",
      detalles: ["Salida: azafrán, nuez moscada, lavanda", "Corazón: oud, pachulí", "Fondo: oud, pachulí, almizcle"]
    },
    {
      nombre: "Badee Al Oud Sublime",
      familia: "Frutal tropical",
      precio: 57041,
      desc: "Manzana, lichi y rosa abren jugosos y frescos, con ciruela y jazmín en el corazón. Cierra en musgo, vainilla y pachulí, en un perfil frutal alejado del oud clásico pese al nombre.",
      img: "",
      detalles: ["Salida: manzana, lichi, rosa", "Corazón: ciruela, jazmín", "Fondo: musgo, vainilla, pachulí"]
    },
    {
      nombre: "Fakhar Gold",
      familia: "Oriental amaderado",
      precio: 63953,
      desc: "Nardo y un toque salino abren de forma inusual, dando paso a ámbar, haba tonka y cashmerán en el corazón. Cierra amaderado y resinoso, con cedro, vetiver y ládano de fondo.",
      img: "",
      detalles: ["Salida: nardo, sal", "Corazón: ámbar, haba tonka, cashmerán", "Fondo: cedro, vetiver, ládano"]
    },
    {
      nombre: "Hayaati Al Maleki",
      familia: "Oriental especiado",
      precio: 50985,
      desc: "Pimienta rosa, bergamota y jengibre sobre cedro, incienso y labdano, cerrando en almizcle, ámbar gris y ámbar.",
      img: "",
      detalles: ["Salida: pimienta rosa, bergamota, jengibre, nuez moscada", "Corazón: cedro, incienso, labdano", "Fondo: almizcle, ámbar gris, ámbar"]
    },
    {
      nombre: "Honor and Glory",
      familia: "Ámbar gourmand",
      precio: 56013,
      desc: "Ananá y crème brûlée sobre canela, cúrcuma y pimienta negra, cerrando en vainilla, sándalo y musgo.",
      img: "",
      detalles: ["Salida: ananá, crème brûlée", "Corazón: canela, cúrcuma, pimienta negra, benjuí", "Fondo: vainilla, sándalo, cashmerán, musgo"]
    },
    {
      nombre: "Khamrah",
      familia: "Gourmand oriental",
      precio: 65623,
      desc: "Canela, nuez moscada y bergamota sobre dátiles, praliné y tuberosa, cerrando en vainilla, haba tonka y ámbar.",
      img: "",
      detalles: ["Salida: canela, nuez moscada, bergamota", "Corazón: dátiles, praliné, tuberosa", "Fondo: vainilla, haba tonka, madera de ámbar, mirra"]
    },
    {
      nombre: "Khamrah Waha",
      familia: "Gourmand fresco",
      precio: 137376,
      desc: "Bergamota, yuzu y jengibre sobre pepino, sal marina e iris, cerrando en vainilla, haba tonka y almizcle.",
      img: "",
      detalles: ["Salida: bergamota, yuzu, enebro, jengibre", "Corazón: pepino, sal marina, iris, salvia", "Fondo: vainilla, haba tonka, almizcle"]
    },
    {
      nombre: "Khanjar",
      familia: "Especiado amaderado",
      precio: 109343,
      desc: "Nuez moscada, pimienta de Jamaica y jengibre sobre violeta, pachulí y cashmerán, cerrando en cuero, incienso y vetiver.",
      img: "",
      detalles: ["Salida: nuez moscada, pimienta de Jamaica, jengibre", "Corazón: violeta, pachulí, cashmerán", "Fondo: cuero, incienso, almizcle, vetiver"]
    },
    {
      nombre: "Mayar Cherry Intense",
      familia: "Oriental vainilla",
      precio: 52889,
      desc: "Frutilla y bergamota sobre mermelada de cereza y cacao, cerrando en vainilla, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: frutilla, bergamota", "Corazón: mermelada de cereza, cacao", "Fondo: vainilla, ámbar, pachulí"]
    },
    {
      nombre: "Musaman Black",
      familia: "Aromático amaderado",
      precio: 91773,
      desc: "Lavanda, nuez moscada y salvia sobre cedro y geranio, cerrando en haba tonka, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: lavanda, nuez moscada, salvia, bergamota", "Corazón: cedro, geranio", "Fondo: haba tonka, ámbar, pachulí"]
    },
    {
      nombre: "Musaman White",
      familia: "Floral oriental",
      precio: 107203,
      desc: "Especias, bergamota y naranja sobre coco, ylang-ylang y ambroxan, cerrando en sándalo, almizcle y benjuí.",
      img: "",
      detalles: ["Salida: especias, bergamota, naranja", "Corazón: coco, ylang-ylang, ambroxan", "Fondo: sándalo, almizcle, benjuí"]
    },
    {
      nombre: "Nebras Pride",
      familia: "Oriental vainilla",
      precio: 80089,
      desc: "Frutos rojos y mandarina sobre vainilla, cacao y rosa, cerrando en azúcar, haba tonka y ámbar.",
      img: "",
      detalles: ["Salida: frutos rojos, mandarina", "Corazón: vainilla, cacao, rosa", "Fondo: azúcar, haba tonka, ámbar, almizcle"]
    },
    {
      nombre: "Opulent Dubai",
      familia: "Floral oriental",
      precio: 50428,
      desc: "Mango, pomelo y jengibre sobre jazmín, cedro y violeta, cerrando en ámbar gris, musgo de roble y benjuí.",
      img: "",
      detalles: ["Salida: mango, pomelo, limón, jengibre", "Corazón: jazmín, cedro, violeta", "Fondo: ámbar gris, musgo de roble, benjuí"]
    },
    {
      nombre: "Qaed Al Fursan",
      familia: "Oriental amaderado",
      precio: 48309,
      desc: "Ananá y azafrán sobre abeto balsámico y jazmín, cerrando en cedro, ámbar y oud.",
      img: "",
      detalles: ["Salida: ananá, azafrán", "Corazón: abeto balsámico, jazmín", "Fondo: cedro, ámbar, oud"]
    },
    {
      nombre: "Spectre Malachite",
      familia: "Oriental amaderado",
      precio: 60380,
      desc: "Apertura cítrica y afrutada de mandarina verde, bergamota y grosella negra, con un corazón floral y especiado de lavanda, jazmín y pimienta rosa, sobre un fondo amaderado de almizcle, ámbar y vetiver.",
      img: "",
      detalles: ["Salida: mandarina verde, bergamota, grosella negra", "Corazón: lavanda, jazmín, pimienta rosa", "Fondo: almizcle, ámbar, madera, vetiver"]
    },
    {
      nombre: "Your Touch Amber",
      familia: "Oriental ambarado",
      precio: 41868,
      desc: "Composición lineal y envolvente centrada en el ámbar: apertura de lavanda fresca que se funde con un corazón ambarado y un fondo de vainilla.",
      img: "",
      detalles: ["Salida: lavanda", "Corazón: ámbar", "Fondo: vainilla"]
    },
    {
      nombre: "Your Touch Intense",
      familia: "Oriental vainillado",
      precio: 58389,
      desc: "Apertura de pimienta rosa, violeta y enebro, corazón cálido de toffee, canela, lavanda y salvia romana, cerrando en vainilla, haba tonka, ámbar y gamuza.",
      img: "",
      detalles: ["Salida: pimienta rosa, violeta, enebro", "Corazón: toffee, canela, lavanda, salvia romana", "Fondo: vainilla, haba tonka, ámbar, gamuza"]
    },
    {
      nombre: "Tropical Vibes",
      familia: "Frutal tropical",
      precio: 91731,
      desc: "Salida jugosa de mango, ananá, bergamota y ron, corazón cremoso de coco y flores blancas con un toque marino, y fondo amaderado de almizcle, ámbar, sándalo y vetiver.",
      img: "",
      detalles: ["Salida: mango, ananá, bergamota, ron", "Corazón: coco, flores blancas, notas marinas", "Fondo: almizcle, ámbar, sándalo, vetiver"]
    },
    {
      nombre: "Copa Del Mundo",
      familia: "Oriental floral",
      precio: 150837,
      desc: "Apertura de bergamota, jazmín y heliotropo, corazón floral y dulce de lirio, haba tonka y geranio, sobre un fondo de vetiver, vainilla y almizcle.",
      img: "",
      detalles: ["Salida: bergamota, jazmín, heliotropo", "Corazón: lirio (orris), haba tonka, geranio", "Fondo: vetiver de Haití, vainilla, almizcle"]
    },
    {
      nombre: "Erba Pura 100ml",
      familia: "Cítrico frutal",
      precio: 367020,
      desc: "Apertura chispeante de naranja, bergamota y limón sicilianos, corazón de una canasta de frutas mediterráneas (durazno, manzana, melón y ananá), y fondo cremoso de almizcle blanco, vainilla y ámbar.",
      img: "",
      detalles: ["Salida: naranja siciliana, bergamota, limón siciliano", "Corazón: durazno, manzana, melón, ananá", "Fondo: almizcle blanco, vainilla, ámbar"]
    },
    {
      nombre: "Rayhaan Elixir",
      familia: "Oriental amaderado",
      precio: 83256,
      desc: "Apertura fresca de menta y bergamota, corazón cálido de lavanda y benjuí, y fondo dulce de vainilla y haba tonka.",
      img: "",
      detalles: ["Salida: menta, bergamota", "Corazón: lavanda, benjuí", "Fondo: vainilla, haba tonka"]
    },
    {
      nombre: "Qaed Al Fursan Unlimited",
      familia: "Floral frutal gourmand",
      precio: 39557,
      desc: "Coco, ananá y cítricos sobre un corazón floral de ylang-ylang, frangipani y jazmín, cerrando en vainilla, sándalo y almizcle. Tropical y cremoso, pensado para el día.",
      img: "",
      detalles: ["Salida: coco, ananá, cítricos", "Corazón: ylang-ylang, frangipani, jazmín", "Fondo: vainilla, almizcle, sándalo"]
    },
    {
      nombre: "Qaed Al Fursan Untamed",
      familia: "Amaderado especiado",
      precio: 41976,
      desc: "Cardamomo, canela y mandarina sobre un corazón especiado de lavanda, salvia y ciprés con un toque de caramelo, cerrando en ámbar, cedro y vetiver. Cálido e intenso, ideal para la noche.",
      img: "",
      detalles: ["Salida: cardamomo, canela, mandarina, nuez moscada", "Corazón: caramelo, lavanda, ciprés", "Fondo: ámbar, cedro, vetiver, ládano"]
    },
    {
      nombre: "Teriaq Intense",
      familia: "Oriental especiado",
      precio: 80688,
      desc: "Azafrán y bergamota sobre un corazón de licor de ciruela y canela, cerrando en ámbar, haba tonka y benjuí. Denso y dulce, con gran proyección para el frío.",
      img: "",
      detalles: ["Salida: azafrán, bergamota", "Corazón: licor de ciruela, canela", "Fondo: ámbar, haba tonka, benjuí"]
    },
    {
      nombre: "Victoria",
      familia: "Gourmand cítrico",
      precio: 66971,
      desc: "Tarta de limón merengada sobre un corazón floral de neroli, rosa y jazmín, cerrando en vainilla, almizcle y ámbar. Jugoso y luminoso, para el uso diario.",
      img: "",
      detalles: ["Salida: tarta de limón merengada, cítricos", "Corazón: neroli, rosa, jazmín", "Fondo: vainilla, almizcle, ámbar"]
    },
    {
      nombre: "Vintage Radio",
      familia: "Oriental amaderado",
      precio: 69347,
      desc: "Lavanda, salvia y bergamota sobre un corazón de ciruela, palo santo y pimienta negra, cerrando en sándalo y oud. Limpio y amaderado, con un toque metálico particular.",
      img: "",
      detalles: ["Salida: lavanda, salvia, bergamota", "Corazón: ciruela, palo santo, pimienta negra", "Fondo: sándalo, oud"]
    },
    {
      nombre: "Baroque Extreme",
      familia: "Aromático especiado",
      precio: 48439,
      desc: "Azafrán y almendra sobre un corazón amaderado de cedro y jazmín egipcio, cerrando en ámbar gris, madera y almizcle. Cremoso y dulce, en la línea de los ambarados franceses de culto.",
      img: "",
      detalles: ["Salida: azafrán, almendra", "Corazón: notas amaderadas, cedro, jazmín egipcio", "Fondo: ámbar gris, madera, almizcle"]
    },
    {
      nombre: "Extravagant Lover",
      familia: "Floral oriental",
      precio: 38316,
      desc: "Mandarina y pimienta rosa sobre un corazón floral de azahar, jazmín y rosa, cerrando en ámbar y vainilla. Sensual y audaz, cítrico al inicio y amaderado cálido al final.",
      img: "",
      detalles: ["Salida: mandarina, pimienta rosa", "Corazón: azahar, jazmín, rosa", "Fondo: ámbar, vainilla"]
    },
    {
      nombre: "Glacier Bella",
      familia: "Oriental afrutado",
      precio: 48716,
      desc: "Bergamota y pera verde sobre un corazón floral con un toque de cuero, cerrando en vainilla, vetiver, ámbar y almizcle. Fresco y sensual, con dulzura frutal.",
      img: "",
      detalles: ["Salida: bergamota, pera verde", "Corazón: notas florales, cuero", "Fondo: vainilla, vetiver, ámbar, almizcle"]
    },
    {
      nombre: "Glacier Bold",
      familia: "Amaderado especiado",
      precio: 44928,
      desc: "Bergamota y coco sobre un corazón especiado de cúrcuma, canela y pimienta negra, cerrando en haba tonka, vainilla y sándalo. Fresco al inicio, cada vez más envolvente.",
      img: "",
      detalles: ["Salida: bergamota, coco", "Corazón: cúrcuma, canela, pimienta negra", "Fondo: haba tonka, vainilla, sándalo"]
    },
    {
      nombre: "Jean Lowe Noir",
      familia: "Oriental amaderado",
      precio: 59952,
      desc: "Oud e incienso sobre un corazón de rosa, frambuesa y azafrán, cerrando en ámbar, benjuí y geranio. Intenso y de gran duración; conviene usarlo con moderación.",
      img: "",
      detalles: ["Salida: oud, incienso", "Corazón: rosa, frambuesa, azafrán, abedul", "Fondo: ámbar, benjuí, geranio"]
    },
    {
      nombre: "La Baroque Rouge",
      familia: "Oriental floral",
      precio: 42104,
      desc: "Azafrán, pera y mandarina sobre un corazón floral de jazmín, ylang-ylang y lirio, cerrando en ámbar, madera de cachemira y almizcle. Dulce y envolvente.",
      img: "",
      detalles: ["Salida: azafrán, pera, mandarina", "Corazón: jazmín, ylang-ylang, lirio", "Fondo: ámbar, madera de cachemira, almizcle"]
    },
    {
      nombre: "Philos Pura",
      familia: "Aromático frutal",
      precio: 51413,
      desc: "Naranja, bergamota y limón sobre un corazón frutal jugoso, cerrando en vainilla de Madagascar, almizcle blanco y ámbar. Fresco y cítrico, ideal para el día.",
      img: "",
      detalles: ["Salida: naranja, bergamota, limón", "Corazón: frutas", "Fondo: vainilla de Madagascar, almizcle blanco, ámbar"]
    }
  ]

};
