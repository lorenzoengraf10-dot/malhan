/* =========================================================================
   MALHAN FRAGRANCE — CATÁLOGO DE PRODUCTOS
   -------------------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA CARGAR PRODUCTOS.

   Estado actual (ver PRODUCTOS más abajo):
   - Los 127 nombres de "sin_clasificar" son los reales, de tu catálogo.
   - precio y desc son INVENTADOS por ahora, para que el catálogo no se
     vea vacío. Cuando tengas fotos, aromas, género y precio real de
     cada uno, movés ese producto de "sin_clasificar" a "hombre",
     "mujer" o "mixto" (cortás el bloque { ... } y lo pegás en la lista
     que corresponda) y le cambiás precio/desc/img/detalles.
   - Cuando "sin_clasificar" quede vacío, borrá esa categoría entera de
     CATEGORIAS (unas líneas más abajo) para que desaparezca la pastilla.
   - Las dos reseñas de TESTIMONIOS también son de ejemplo: cambialas
     por comentarios reales de clientes antes de publicar.

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
  hombre: { nombre: "Hombre" },
  mujer: { nombre: "Mujer" },
  mixto: { nombre: "Mixto" },

  /* Categoría temporal: acá caen los productos que todavía no tienen
     género asignado (ver PRODUCTOS.sin_clasificar). Borrá esta línea
     cuando ya hayas repartido todos los productos en las tres de arriba. */
  sin_clasificar: { nombre: "Sin clasificar" }
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

  hombre: [],
  mujer: [],
  mixto: [],

  /* ======================================================================
     SIN CLASIFICAR
     -----------------------------------------------------------------------
     Los 127 nombres de acá abajo son los reales de tu catálogo (PDF que
     pasaste). precio y desc son inventados, de relleno, hasta que me
     pases el precio y el aroma real de cada uno. Cuando sepas el género
     de un producto, cortalo de esta lista y pegalo en "hombre", "mujer"
     o "mixto" de arriba.
     ====================================================================== */
  sin_clasificar: [
    { nombre: "9 AM Dive", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "9 AM Rosa", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "9 PM", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "9 PM Elixir", precio: 32900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "9 PM Night Out", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "9 PM Rebel", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Turathi Blue", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Aqua Dubai", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Dubai Night", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Gold Edition 120ml", precio: 29900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Club de Nuit Bling", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Club de Nuit Iconic", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Club de Nuit Intense Man EDT", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Club de Nuit Maleka", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Club de Nuit Precieux", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Club de Nuit Sillage", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Club de Nuit Untold", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Club de Nuit Urban Man Elixir", precio: 32900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Club de Nuit Woman", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Desodorante 200ml", precio: 8900, desc: "Desodorante en aerosol, larga duración.", img: "" },
    { nombre: "Mandarin Sky", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Mandarin Sky Elixir", precio: 32900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Odyssey Aqua", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Odyssey Candy", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Odyssey Homme Blanco", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Odyssey Homme Negro", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Odyssey Mega", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Stallion 53", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Uomo Intense", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Liquid Brun", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Liquid Brun Limited Edition", precio: 32900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Spectre Ghost", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Veneno", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Vulcan Feu", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Ajwad", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Angham", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Art of Universe", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Asad", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Asad Bourbon", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Asad Elixir", precio: 32900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Asad Zanzibar", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Atlas", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Badee Al Oud Amethyst", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Badee Al Oud For Glory", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Badee Al Oud Noble Blush", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Badee Al Oud Sublime", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Confidential Gold", precio: 32900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Delilah", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Eclaire", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Emaan", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Fakhar Black", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Fakhar Gold", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Fakhar Rosa", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Fakhar Silver", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Habik For Men", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Haya", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Hayaati Al Maleki", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Hayaati Masc", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Hayaati Rosa", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Her Confession", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "His Confession", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Honor and Glory", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Khamrah", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Khamrah Dukhan", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Khamrah Qahwa", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Khamrah Waha", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Khanjar", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Mayar", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Mayar Cherry Intense", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Mayar Natural Intense", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Musaman Black", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Musaman White", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Nebras Pride", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Opulent Dubai", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Pisa", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Qaed Al Fursan", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Qaed Unlimited", precio: 32900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Qaed Untamed", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Teriaq Intense", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "The Kingdom", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "The Kingdom Fem", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Victoria", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Vintage Radio", precio: 32900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Yara Candy", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Yara Elixir", precio: 32900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Yara Moi", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Yara Rosa", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Yara Tous", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Baroque Extreme", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Extravagant Lover", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Glacier Bella", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Glacier Bold", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Intrude", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Jean Lowe Inmortal", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Jean Lowe Noir", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "La Baroque Rouge", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "La Vivacite EDP", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "La Voie", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Papillon Door Fem", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Philos Pura", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Rose Seduction VIP", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Salvo EDP", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Salvo Elixir", precio: 32900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Spectre Malachite", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Yeah Man EDP", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Yeah Man Parfum", precio: 32900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Your Touch Amber", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Your Touch Intense", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Hawas", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Hawas Black", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Hawas Diva", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Hawas Fire", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Hawas Ice", precio: 24900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Hawas Kobra", precio: 24900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Hawas Malibu", precio: 24900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Hawas Tropical", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Rayhaan Wolf", precio: 24900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Tropical Vibes", precio: 24900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Al Wataniah Sabah Al Ward", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" },
    { nombre: "Ameerat Al Arab", precio: 24900, desc: "Un imprescindible entre las fragancias árabes más pedidas.", img: "" },
    { nombre: "Ameerat Al Arab Prive Rose", precio: 32900, desc: "Fragancia importada de alta perfumería, buena duración y proyección.", img: "" },
    { nombre: "Bharara King 100ml", precio: 27900, desc: "Un clásico de la perfumería árabe, ideal para uso diario.", img: "" },
    { nombre: "Bharara King 150ml", precio: 34900, desc: "Fragancia de nicho, para quienes buscan salir de lo común.", img: "" },
    { nombre: "Copa del Mundo", precio: 24900, desc: "Pensada para looks de noche, con estela intensa y duradera.", img: "" },
    { nombre: "Erba Pura 100ml", precio: 27900, desc: "Una fragancia versátil, fácil de llevar en cualquier ocasión.", img: "" },
    { nombre: "Rayhaan Elixir", precio: 32900, desc: "Ideal para renovar tu colección con algo distinto.", img: "" },
    { nombre: "Rayhaan Italia", precio: 24900, desc: "Fragancia de alta gama, con muy buena relación duración-precio.", img: "" }
  ]

};
