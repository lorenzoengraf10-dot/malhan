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
      precio: null,
      desc: "Bergamota, ananá y pomelo sobre pachulí y cedro, cerrando en musgo de roble y ámbar.",
      img: "",
      detalles: ["Salida: bergamota, ananá, pomelo", "Corazón: pachulí, cedro, jazmín", "Fondo: musgo de roble, madera, ámbar"]
    },
    {
      nombre: "Hawas Kobra",
      familia: "Oriental amaderado",
      precio: null,
      desc: "Jengibre y mandarina sobre té verde y canela, cerrando en almizcle y ámbar.",
      img: "",
      detalles: ["Salida: jengibre, bergamota, mandarina", "Corazón: té verde, canela, neroli", "Fondo: almizcle, madera, ámbar"]
    },
    {
      nombre: "Hawas Tropical",
      familia: "Frutal gourmand",
      precio: null,
      desc: "Hoja de higo, agua de coco y jengibre sobre higo y menta, cerrando en haba tonka, almizcle y sándalo.",
      img: "",
      detalles: ["Salida: hoja de higo, agua de coco, jengibre", "Corazón: coco, higo, menta", "Fondo: haba tonka, almizcle, sándalo"]
    }
  ],

  /* ======================================================================
     MUJER
     ====================================================================== */
  mujer: [],

  /* ======================================================================
     MIXTO  ·  fragancias unisex
     ====================================================================== */
  mixto: [
    {
      nombre: "Badee Al Oud Amethyst",
      familia: "Oriental floral",
      precio: null,
      desc: "Pimienta rosa y bergamota sobre rosa turca y búlgara, cerrando en oud, ámbar y vainilla.",
      img: "",
      detalles: ["Salida: pimienta rosa, bergamota", "Corazón: rosa turca, rosa búlgara, jazmín", "Fondo: oud, ámbar, vainilla"]
    },
    {
      nombre: "Gold Edition 120ml",
      familia: "Oriental vainilla",
      precio: null,
      desc: "Bergamota y notas verdes sobre melón, ananá y ámbar, cerrando en vainilla y madera. Amber Oud Gold Edition, de Al Haramain.",
      img: "",
      detalles: ["Salida: bergamota, notas verdes", "Corazón: melón, ananá, ámbar, acorde gourmand", "Fondo: vainilla, almizcle, madera"]
    },
    {
      nombre: "Hawas Malibu",
      familia: "Aromático",
      precio: null,
      desc: "Ananá, naranja y pomelo sobre iris, ámbar y lavanda, cerrando en haba tonka y almizcle.",
      img: "",
      detalles: ["Salida: ananá, naranja, pomelo", "Corazón: iris, ámbar, lavanda", "Fondo: haba tonka, almizcle, pachulí, cashmerán"]
    }
  ]

};
