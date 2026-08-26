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

  moneda: "$"
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
      precio: 70999,
      desc: "Pimienta negra, tabaco y piña sobre un fondo amaderado con vainilla y ámbar.",
      img: "assets/img/stock/asad.jpg",
      detalles: ["Salida: pimienta negra, tabaco, piña", "Corazón: pachulí, café, iris", "Fondo: vainilla, ámbar, madera seca, benjuí, ládano"]
    },
    {
      nombre: "Asad Bourbon",
      familia: "Oriental gourmand",
      precio: 83999,
      desc: "Lavanda y pimienta rosa sobre cacao y vainilla bourbon. Cálido, dulce y con muy buena proyección.",
      img: "assets/img/stock/asad-bourbon.jpg",
      detalles: ["Salida: lavanda, ciruela mirabel, pimienta rosa", "Corazón: cacao, nuez moscada, davana", "Fondo: vainilla bourbon, ámbar, vetiver"]
    },
    {
      nombre: "Odyssey Mandarin Sky",
      familia: "Cítrico amaderado",
      precio: 69999,
      desc: "Mandarina y naranja sobre caramelo y haba tonka, cerrando en cedro y vetiver. Fresco con fondo amaderado.",
      img: "assets/img/stock/odyssey-mandarin-sky.jpg",
      detalles: ["Salida: mandarina, naranja, azafrán, salvia", "Corazón: caramelo, haba tonka, caléndula", "Fondo: ambroxan, cedro, vetiver"]
    },
    {
      nombre: "Yara Rosa",
      familia: "Oriental vainilla",
      precio: 64999,
      desc: "Orquídea y heliotropo sobre frutas tropicales, cerrando en vainilla y sándalo. El clásico rosa de Lattafa.",
      img: "assets/img/stock/yara-rosa.jpg",
      detalles: ["Salida: orquídea, heliotropo, mandarina", "Corazón: acorde gourmand, frutas tropicales", "Fondo: vainilla, almizcle, sándalo"]
    },
    {
      nombre: "Yara Candy",
      familia: "Frutal gourmand",
      precio: 59999,
      desc: "Grosella negra y mandarina verde sobre caramelo de fresa y gardenia. Dulce, frutal y fácil de llevar.",
      img: "assets/img/stock/yara-candy.jpg",
      detalles: ["Salida: grosella negra, mandarina verde", "Corazón: caramelo de fresa, gardenia", "Fondo: vainilla, almizcle, ámbar, sándalo"]
    },
    {
      nombre: "Eclaire",
      familia: "Floral gourmand",
      precio: 82999,
      desc: "Caramelo y leche sobre miel y flores blancas, cerrando en vainilla y praliné. Dulce y goloso.",
      img: "assets/img/stock/eclaire.jpg",
      detalles: ["Salida: caramelo, leche, azúcar", "Corazón: miel, flores blancas", "Fondo: vainilla, praliné, almizcle"]
    },
    {
      nombre: "Khamrah Qahwa",
      familia: "Oriental vainilla",
      precio: 58999,
      desc: "Canela y cardamomo sobre café, vainilla y haba tonka. Intenso y envolvente.",
      img: "assets/img/stock/khamrah-qahwa.jpg",
      detalles: ["Salida: canela, cardamomo, jengibre", "Corazón: praliné, frutos confitados, flores blancas", "Fondo: vainilla, café, haba tonka, benjuí, almizcle"]
    },
    {
      nombre: "Confidential Private Gold",
      familia: "Chypre frutal",
      precio: 42999,
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
      img: "",
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
      img: "",
      detalles: ["Salida: hoja de higo, agua de coco, jengibre", "Corazón: coco, higo, menta", "Fondo: haba tonka, almizcle, sándalo"]
    },
    {
      nombre: "9 PM",
      familia: "Oriental vainilla",
      precio: 69903,
      desc: "Manzana, canela y lavanda silvestre sobre bergamota, con un corazón floral de azahar y lirio de los valles que cierra en vainilla, haba tonka, ámbar y pachulí.",
      img: "",
      detalles: ["Salida: manzana, canela, lavanda silvestre, bergamota", "Corazón: azahar, lirio de los valles", "Fondo: vainilla, haba tonka, ámbar, pachulí"]
    },
    {
      nombre: "Turathi Blue",
      familia: "Aromático acuático",
      precio: 80837,
      desc: "Bergamota y mandarina frescas sobre un corazón ambarino y amaderado, que cierra en almizcle, pachulí y un toque de especias.",
      img: "",
      detalles: ["Salida: bergamota, mandarina", "Corazón: ámbar, notas amaderadas", "Fondo: almizcle, pachulí, especias"]
    },
    {
      nombre: "Dubai Night",
      familia: "Ambarino amaderado",
      precio: 120279,
      desc: "Azafrán, bergamota y elemí abren con un toque especiado, sobre un corazón de oud y rosa búlgara que cierra en haba tonka, ámbar, almizcle blanco y musgo de roble.",
      img: "",
      detalles: ["Salida: azafrán, bergamota, elemí", "Corazón: oud, rosa búlgara, lirio de los valles", "Fondo: haba tonka, ámbar, almizcle blanco, musgo de roble"]
    },
    {
      nombre: "Club de Nuit Iconic",
      familia: "Aromático especiado",
      precio: 95904,
      desc: "Pomelo, limón y menta con un toque de pimienta rosa se funden en un corazón especiado de jengibre, melón y nuez moscada, que cierra en incienso, sándalo, ámbar y cedro.",
      img: "",
      detalles: ["Salida: pomelo, limón, menta, pimienta rosa", "Corazón: jengibre, melón, jazmín, nuez moscada", "Fondo: incienso, sándalo, ámbar, cedro, pachulí"]
    },
    {
      nombre: "Club de Nuit Intense Man EDT",
      familia: "Amaderado especiado",
      precio: 82871,
      desc: "Limón, ananá y bergamota dan una apertura fresca y afrutada, sobre un corazón ahumado de abedul, jazmín y rosa que cierra en almizcle, ámbar gris, pachulí y vainilla.",
      img: "",
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
      img: "",
      detalles: ["Salida: naranja, pomelo, artemisia", "Corazón: menta, lavanda", "Fondo: ambroxan, ciprés, pachulí"]
    },
    {
      nombre: "Odyssey Homme Blanco",
      familia: "Oriental fougère",
      precio: 77093,
      desc: "Pimienta rosa, pomelo y yuzu se abren sobre un corazón marino con hoja de violeta, que cierra en una base ambarina y amaderada.",
      img: "",
      detalles: ["Salida: pimienta rosa, pomelo, yuzu", "Corazón: notas marinas, hoja de violeta", "Fondo: madera ambarina, ámbar, madera de gaiac"]
    },
    {
      nombre: "Odyssey Homme Negro",
      familia: "Oriental amaderado",
      precio: 59695,
      desc: "Cardamomo, mandarina y neroli abren paso a azahar y rosa, sobre un fondo envolvente de vainilla, sándalo y ámbar. Un oriental amaderado potente, pensado para la noche.",
      img: "",
      detalles: ["Salida: cardamomo, mandarina, neroli", "Corazón: azahar, rosa", "Fondo: vainilla, sándalo, ámbar"]
    },
    {
      nombre: "Odyssey Mega",
      familia: "Aromático amaderado",
      precio: 59373,
      desc: "Naranja, limón y bergamota frescos se apoyan en salvia y enebro, sobre una base amaderada de cedro, vetiver y haba tonka. Versátil, pensado para el uso diario.",
      img: "",
      detalles: ["Salida: naranja, limón, bergamota, jengibre", "Corazón: ananá, salvia, enebro, geranio", "Fondo: almizcle, cedro, haba tonka, vetiver"]
    },
    {
      nombre: "Uomo Intense",
      familia: "Aromático amaderado",
      precio: 60529,
      desc: "Jengibre, bergamota y limón dan una apertura fresca y especiada, con albahaca y hojas de violeta en el corazón. Cierra amaderado, con haba tonka, vara de oro y cedro de fondo.",
      img: "",
      detalles: ["Salida: jengibre, bergamota, limón", "Corazón: especias, pimienta blanca, albahaca, hojas de violeta", "Fondo: haba tonka, vara de oro, cedro"]
    },
    {
      nombre: "Spectre Ghost",
      familia: "Amaderado aromático",
      precio: 94812,
      desc: "Jengibre, cardamomo y bergamota abren con un toque especiado, seguidos de pimienta rosa, grosella negra y rosa turca en el corazón. El fondo de vainilla, cedro y pachulí cierra cálido y amaderado.",
      img: "",
      detalles: ["Salida: jengibre, cardamomo, bergamota", "Corazón: pimienta rosa, grosella negra, rosa", "Fondo: vainilla, cedro, pachulí"]
    },
    {
      nombre: "Liquid Brun",
      familia: "Amaderado gourmand",
      precio: 104079,
      desc: "Canela, azahar y cardamomo se mezclan con bergamota fresca, sobre un corazón de vainilla bourbon. Cierra dulce y amaderado, con praliné, almizcle y madera de guayaco.",
      img: "",
      detalles: ["Salida: canela, azahar, cardamomo, bergamota", "Corazón: vainilla bourbon, elemí", "Fondo: praliné, ambroxan, almizcle, madera de guayaco"]
    },
    {
      nombre: "Asad Elixir",
      familia: "Oriental amaderado",
      precio: 85439,
      desc: "Pimienta rosa, azafrán y pomelo dan una apertura especiada, con tabaco y vainilla en el corazón. El fondo de ámbar claro, incienso y pachulí lo hace denso y envolvente, ideal para la noche.",
      img: "",
      detalles: ["Salida: pimienta rosa, azafrán, pomelo", "Corazón: tabaco, vainilla, cedro", "Fondo: ámbar claro, incienso, pachulí, cashmerán"]
    },
    {
      nombre: "Asad Zanzibar",
      familia: "Oriental acuático",
      precio: 60743,
      desc: "Lavanda y pimienta negra abren con frescura, seguidas de agua de coco, iris y un toque salino en el corazón. Cierra cálido, con vainilla e incienso de fondo, en un perfil tropical poco convencional.",
      img: "",
      detalles: ["Salida: lavanda, pimienta negra", "Corazón: agua de coco, iris, sal", "Fondo: vainilla, incienso"]
    },
    {
      nombre: "Fakhar Black",
      familia: "Amaderado dulce",
      precio: 66564,
      desc: "Manzana, bergamota y jengibre abren frescos y ligeramente dulces, con lavanda y salvia en el corazón. El fondo de haba tonka, cedro y vetiver lo deja amaderado y versátil para el día a día.",
      img: "",
      detalles: ["Salida: manzana, bergamota, jengibre", "Corazón: lavanda, salvia, enebro, geranio", "Fondo: haba tonka, cedro, madera de ámbar, vetiver"]
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
      img: "",
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
    }
  ]

};
