/* =========================================================================
   MALHAN FRAGRANCE — CATÁLOGO DE PRODUCTOS
   -------------------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA CARGAR PRODUCTOS.

   Antes de publicar el sitio, completá:
   1. CONFIG.whatsapp / CONFIG.whatsappVisible → tu número real. Mientras
      quede vacío, los botones "Agregar al pedido" y "Consultar" no van a
      abrir ningún chat.
   2. CONFIG.instagram → el link a tu perfil. Si lo dejás vacío, el ícono
      de Instagram no se muestra (ni en el header ni en el footer).
   3. Los productos de PRODUCTOS de acá abajo son EJEMPLOS para que veas
      cómo se ve el catálogo armado. Reemplazalos por tus fragancias
      reales (nombre, precio, descripción, foto) antes de compartir el
      link con clientes.

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
     Argentina: 54 + 9 + característica sin 0 + número sin 15.
     COMPLETAR ANTES DE PUBLICAR: mientras esté vacío, los botones de
     pedido y consulta no van a poder abrir un chat. */
  whatsapp: "",
  whatsappVisible: "",

  /* Link completo a tu perfil, ej: "https://www.instagram.com/malhan.fragrance".
     Si lo dejás vacío, el ícono de Instagram no aparece en el sitio. */
  instagram: "",

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

   Las dos de acá abajo son EJEMPLOS para mostrar cómo queda la sección
   armada — reemplazalas por reseñas reales de tus clientes antes de
   publicar. Si dejás la lista vacía, la sección entera no aparece.
   ========================================================================= */
const TESTIMONIOS = [
  {
    texto: "Reseña de ejemplo — reemplazar por un comentario real de un cliente.",
    autor: "Cliente Malhan"
  },
  {
    texto: "Otra reseña de ejemplo — misma idea, cortita y tal cual la dijo.",
    autor: "Cliente Malhan"
  }
];

const PRODUCTOS = {

  /* ======================================================================
     HOMBRE
     ====================================================================== */
  hombre: [
    {
      nombre: "Malhan Noir",
      familia: "Amaderado especiado",
      etiqueta: "Más pedido",
      color: "dorado",
      variantes: [
        {
          label: "30 ml",
          precio: 19800,
          desc: "Cuero, vetiver y pimienta negra sobre un fondo de ámbar. Intenso, para la noche.",
          img: "",
          detalles: ["Salida: pimienta negra, bergamota", "Corazón: cuero, vetiver", "Fondo: ámbar, almizcle"]
        },
        {
          label: "50 ml",
          precio: 29800,
          desc: "Cuero, vetiver y pimienta negra sobre un fondo de ámbar. Intenso, para la noche.",
          img: "",
          detalles: ["Salida: pimienta negra, bergamota", "Corazón: cuero, vetiver", "Fondo: ámbar, almizcle"]
        },
        {
          label: "100 ml",
          precio: 45800,
          desc: "Cuero, vetiver y pimienta negra sobre un fondo de ámbar. Intenso, para la noche.",
          img: "",
          detalles: ["Salida: pimienta negra, bergamota", "Corazón: cuero, vetiver", "Fondo: ámbar, almizcle"]
        }
      ]
    },
    {
      nombre: "Malhan Cedro Real",
      familia: "Amaderado",
      precio: 27400,
      desc: "Cedro y sándalo con un toque cítrico arriba. Prolijo, para todos los días.",
      img: "",
      detalles: ["Salida: bergamota", "Corazón: cedro, sándalo", "Fondo: almizcle blanco"]
    },
    {
      nombre: "Malhan Acero",
      familia: "Aromático fresco",
      precio: 24900,
      desc: "Bergamota y lavanda con almizcle limpio de fondo. El clásico de uso diario.",
      img: "",
      detalles: ["Salida: bergamota, mandarina", "Corazón: lavanda, geranio", "Fondo: almizcle"]
    },
    {
      nombre: "Malhan Oud Imperial",
      familia: "Oriental",
      etiqueta: "Premium",
      color: "marron",
      variantes: [
        {
          label: "30 ml",
          precio: 25400,
          desc: "Oud, azafrán y cuero. La opción más intensa de la línea hombre.",
          img: "",
          detalles: ["Salida: azafrán", "Corazón: oud, cuero", "Fondo: ámbar, sándalo"]
        },
        {
          label: "50 ml",
          precio: 42600,
          desc: "Oud, azafrán y cuero. La opción más intensa de la línea hombre.",
          img: "",
          detalles: ["Salida: azafrán", "Corazón: oud, cuero", "Fondo: ámbar, sándalo"]
        }
      ]
    },
    {
      nombre: "Malhan Costa",
      familia: "Fresco marino",
      precio: 23600,
      desc: "Cítricos y sal marina sobre madera blanca. Liviano, para el verano.",
      img: "",
      detalles: ["Salida: pomelo, notas marinas", "Corazón: sal marina", "Fondo: madera blanca"]
    },
    {
      nombre: "Malhan Tabaco",
      familia: "Especiado dulce",
      precio: 28200,
      desc: "Tabaco, vainilla y cacao. Cálido y envolvente, ideal para el invierno.",
      img: "",
      detalles: ["Salida: canela", "Corazón: tabaco", "Fondo: vainilla, cacao"]
    }
  ],

  /* ======================================================================
     MUJER
     ====================================================================== */
  mujer: [
    {
      nombre: "Malhan Rose Élite",
      familia: "Floral",
      etiqueta: "Más pedido",
      color: "dorado",
      variantes: [
        {
          label: "30 ml",
          precio: 19800,
          desc: "Rosa y peonía sobre almizcle blanco. Elegante y femenino.",
          img: "",
          detalles: ["Salida: bergamota", "Corazón: rosa, peonía", "Fondo: almizcle blanco"]
        },
        {
          label: "50 ml",
          precio: 29800,
          desc: "Rosa y peonía sobre almizcle blanco. Elegante y femenino.",
          img: "",
          detalles: ["Salida: bergamota", "Corazón: rosa, peonía", "Fondo: almizcle blanco"]
        },
        {
          label: "100 ml",
          precio: 45800,
          desc: "Rosa y peonía sobre almizcle blanco. Elegante y femenino.",
          img: "",
          detalles: ["Salida: bergamota", "Corazón: rosa, peonía", "Fondo: almizcle blanco"]
        }
      ]
    },
    {
      nombre: "Malhan Jazmín",
      familia: "Floral blanco",
      precio: 26800,
      desc: "Jazmín y azahar con un cierre de vainilla suave. Fresco y luminoso.",
      img: "",
      detalles: ["Salida: mandarina", "Corazón: jazmín, azahar", "Fondo: vainilla"]
    },
    {
      nombre: "Malhan Dulce Ámbar",
      familia: "Oriental dulce",
      precio: 28900,
      desc: "Ámbar, vainilla y un toque caramelo. Envolvente, para la noche.",
      img: "",
      detalles: ["Salida: mandarina", "Corazón: ámbar", "Fondo: vainilla, caramelo"]
    },
    {
      nombre: "Malhan Frutal",
      familia: "Frutal floral",
      precio: 23600,
      desc: "Durazno y frambuesa sobre flor de cerezo. Fresco y fácil de llevar.",
      img: "",
      detalles: ["Salida: durazno, frambuesa", "Corazón: flor de cerezo", "Fondo: almizcle"]
    },
    {
      nombre: "Malhan Iris Blanc",
      familia: "Floral polvoroso",
      precio: 27400,
      desc: "Iris y algodón con almizcle limpio. Delicado, para el día a día.",
      img: "",
      detalles: ["Salida: bergamota", "Corazón: iris", "Fondo: algodón, almizcle"]
    },
    {
      nombre: "Malhan Oro Rosa",
      familia: "Floral oriental",
      etiqueta: "Premium",
      color: "marron",
      variantes: [
        {
          label: "30 ml",
          precio: 25400,
          desc: "Oud rosado y frutos rojos. La opción más intensa de la línea mujer.",
          img: "",
          detalles: ["Salida: frutos rojos", "Corazón: oud rosado", "Fondo: ámbar"]
        },
        {
          label: "50 ml",
          precio: 42600,
          desc: "Oud rosado y frutos rojos. La opción más intensa de la línea mujer.",
          img: "",
          detalles: ["Salida: frutos rojos", "Corazón: oud rosado", "Fondo: ámbar"]
        }
      ]
    }
  ],

  /* ======================================================================
     MIXTO  ·  fragancias unisex
     ====================================================================== */
  mixto: [
    {
      nombre: "Malhan Unity",
      familia: "Amaderado cítrico",
      etiqueta: "Nuevo",
      color: "verde",
      precio: 26400,
      desc: "Bergamota, cedro y almizcle. Versátil, pensado para compartir.",
      img: "",
      detalles: ["Salida: bergamota", "Corazón: cedro", "Fondo: almizcle"]
    },
    {
      nombre: "Malhan Esencia",
      familia: "Aromático fresco",
      precio: 24900,
      desc: "Lavanda y geranio con un fondo limpio de ambroxan. Para todos los días.",
      img: "",
      detalles: ["Salida: lavanda", "Corazón: geranio", "Fondo: ambroxan"]
    },
    {
      nombre: "Malhan Vetiver Blanc",
      familia: "Verde amaderado",
      precio: 27800,
      desc: "Vetiver y té blanco. Fresco y seco, con muy buena estela.",
      img: "",
      detalles: ["Salida: té blanco", "Corazón: vetiver", "Fondo: almizcle"]
    },
    {
      nombre: "Malhan Origen",
      familia: "Especiado suave",
      precio: 25600,
      desc: "Cardamomo y sándalo sobre haba tonka. Cálido sin ser pesado.",
      img: "",
      detalles: ["Salida: cardamomo", "Corazón: sándalo", "Fondo: haba tonka"]
    }
  ]

};
