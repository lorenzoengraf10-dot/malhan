/* =========================================================================
   Malhan Fragrance — lógica del sitio
   -------------------------------------------------------------------------
   Arma el encabezado, el pie, la barra de filtros, el catálogo completo,
   la ficha de producto y el carrito. Todo vive en una sola página
   (index.html); las pastillas de arriba muestran/ocultan cada categoría
   sin recargar.

   Para cargar productos NO hace falta tocar este archivo: todo se edita
   en assets/js/products.js
   ========================================================================= */

(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------------------
     Utilidades
     --------------------------------------------------------------------- */

  const escapar = (txt = "") =>
    String(txt).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));

  const tieneWhatsapp = () => !!(CONFIG.whatsapp && CONFIG.whatsapp.trim());
  const tieneInstagram = () => !!(CONFIG.instagram && CONFIG.instagram.trim());

  const waLink = (mensaje) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  const slugify = (txt = "") =>
    String(txt)
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const linkProducto = (categoria, producto, variante) =>
    `${location.origin}${location.pathname}#producto=${categoria}:${slugify(producto.nombre)}` +
    (variante ? `:${slugify(variante.label)}` : "");

  /* Para productos con variantes (tamaños): la de "portada" es la primera
     sin agotado, o la primera de todas si no queda ninguna. */
  function varianteDefault(producto) {
    if (!producto.variantes) return null;
    return producto.variantes.find((v) => !v.agotado) || producto.variantes[0];
  }

  function activarLinksWa(ctx = document) {
    $$("[data-wa]", ctx).forEach((el) => {
      el.setAttribute("href", waLink(el.dataset.wa));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* Bloquear el scroll de fondo mientras el carrito o la ficha están
     abiertos. Con contador, por si llegaran a estar los dos abiertos. */
  let bloqueosScroll = 0;
  let scrollGuardado = 0;
  function bloquearScroll() {
    if (bloqueosScroll === 0) {
      scrollGuardado = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollGuardado}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    }
    bloqueosScroll++;
  }
  function desbloquearScroll() {
    bloqueosScroll = Math.max(0, bloqueosScroll - 1);
    if (bloqueosScroll === 0) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      const htmlEl = document.documentElement;
      const previo = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollGuardado);
      htmlEl.style.scrollBehavior = previo;
    }
  }

  const formatoPrecio = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

  const ICONO_WA =
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.89-6.96A9.77 9.77 0 0 0 12.04 2Zm4.5 13.84c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.13-.16.24-.64.79-.78.96-.15.16-.29.18-.53.06-.25-.13-1.04-.39-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>';

  const ICONO_IG =
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.83Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z"/></svg>';

  const ICONO_BOLSO =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-.6a1 1 0 0 1 0-2H8a1 1 0 0 1 .98.8L9.3 4H20a1 1 0 0 1 .97 1.24l-1.7 6.8A2 2 0 0 1 17.33 13.6H9.9l.3 1.4H18a1 1 0 1 1 0 2H9.4a1 1 0 0 1-.98-.8L7 4Zm2.7 2 .8 5.6h6.83l1.4-5.6H9.7ZM10 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg>';

  const ICONO_LUPA =
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.8 3a7.8 7.8 0 0 1 6.06 12.72l4.71 4.72a1 1 0 0 1-1.32 1.5l-.1-.08-4.71-4.72A7.8 7.8 0 1 1 10.8 3Zm0 2a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6Z"/></svg>';

  /* Frasco simplificado: mismo perfil que el isologo, en trazo, para usar
     como marcador de "todavía no hay foto" en tarjetas, ficha y carrito. */
  const ICONO_FRASCO =
    '<svg class="frasco-ph" viewBox="0 0 48 64" fill="none" aria-hidden="true"><path d="M19 3.5h10a2 2 0 0 1 2 2V10a2 2 0 0 1-2 2h-1.5v3.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.5 15.4V12H19a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 15.4h13c2.5 0 4.5 2 4.5 4.5v33c0 4-3.2 7.2-7.2 7.2h-7.6c-4 0-7.2-3.2-7.2-7.2v-33c0-2.5 2-4.5 4.5-4.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 26h16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1 4.2"/></svg>';

  /* Marca: isologo circular real + "Malhan" en serif + "Fragrance" chico
     y espaciado debajo. Se usa igual en el header y el footer. */
  const MARCA_HTML =
    '<img class="brand__logo" src="assets/img/logo.png" alt="" width="40" height="40" loading="lazy">' +
    '<span class="brand__mark"><span class="brand__word">Malhan</span><span class="brand__sub">Fragrance</span></span>';

  /* ---------------------------------------------------------------------
     Encabezado
     --------------------------------------------------------------------- */

  function renderHeader() {
    const cont = $("[data-header]");
    if (!cont) return;

    const items = Object.entries(CATEGORIAS)
      .map(([id, cat]) => `<li class="nav__item"><a href="#cat-${id}">${escapar(cat.nombre)}</a></li>`)
      .join("");

    cont.outerHTML = `
      <header class="header" id="header">
        <div class="wrap header__inner">
          <a class="brand" href="#inicio" aria-label="Malhan Fragrance — inicio">
            ${MARCA_HTML}
          </a>

          <nav class="nav" id="nav" aria-label="Secciones del catálogo">
            <ul class="nav__list">
              ${items}
              <li class="nav__item"><a href="#clientes">Clientes</a></li>
              <li class="nav__item"><a href="#preguntas">Preguntas</a></li>
              <li class="nav__item"><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>

          <button class="cartbtn" data-buscador-btn type="button" aria-label="Buscar un perfume" aria-expanded="false">
            ${ICONO_LUPA}
          </button>

          <button class="cartbtn" data-cart-open type="button" aria-label="Ver mi selección">
            ${ICONO_BOLSO}
            <span class="cartbtn__n" data-cart-count hidden>0</span>
          </button>

          <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div class="buscador" data-buscador>
        <div class="buscador__backdrop" data-buscador-close></div>
        <div class="wrap buscador__inner">
          ${ICONO_LUPA}
          <input type="search" class="buscador__input" data-buscador-input
                 placeholder="Buscá tu perfume por nombre…" aria-label="Buscar un perfume">
          <button class="buscador__limpiar" data-buscador-limpiar type="button" aria-label="Borrar búsqueda" hidden>×</button>
        </div>
      </div>

      <nav class="catnav" id="catnav" aria-label="Filtrar el catálogo">
        <div class="wrap catnav__inner">
          <button class="pill is-active" data-filtro="todos" type="button">Todos</button>
          ${Object.entries(CATEGORIAS)
            .map(([id, cat]) => `<button class="pill" data-filtro="${id}" type="button">${escapar(cat.nombre)}</button>`)
            .join("")}
        </div>
      </nav>`;
  }

  /* ---------------------------------------------------------------------
     Pie de página
     --------------------------------------------------------------------- */

  function renderFooter() {
    const cont = $("[data-footer]");
    if (!cont) return;

    const links = Object.entries(CATEGORIAS)
      .map(([id, cat]) => `<li><a href="#cat-${id}">${escapar(cat.nombre)}</a></li>`)
      .join("");

    cont.outerHTML = `
      <footer class="footer" id="contacto">
        <div class="wrap footer__inner">

          <div class="footer__col footer__brand">
            <span class="brand">${MARCA_HTML}</span>
            <p class="footer__tag">Perfumería de nicho para hombre, mujer y fragancias mixtas. Envíos a todo el país.</p>
            ${tieneInstagram() ? `
            <div class="footer__social">
              <a href="${escapar(CONFIG.instagram)}" target="_blank" rel="noopener"
                 aria-label="Instagram de Malhan Fragrance">${ICONO_IG} Instagram</a>
            </div>` : ""}
          </div>

          <nav class="footer__col" aria-label="Catálogo">
            <h2>Catálogo</h2>
            <ul>${links}</ul>
          </nav>

          <div class="footer__col">
            <h2>Ayuda</h2>
            <ul>
              <li><a href="#clientes">Clientes</a></li>
              <li><a href="#preguntas">Preguntas frecuentes</a></li>
              ${tieneWhatsapp() ? `<li><a data-wa="Hola Malhan! Quería hacer una consulta.">Escribinos por WhatsApp</a></li>` : ""}
            </ul>
            ${tieneWhatsapp() ? `<a class="btn btn--wa footer__wa" data-wa="Hola Malhan! Quería hacer una consulta.">Escribinos</a>` : ""}
          </div>
        </div>

        <div class="wrap footer__bottom">
          <p>© <span data-anio></span> Malhan Fragrance</p>
          <p>Pedidos por WhatsApp</p>
        </div>
      </footer>

      <div data-carrito></div>

      ${tieneWhatsapp() ? `
      <a class="fab" data-wa="Hola Malhan! Quería hacer una consulta." aria-label="Escribir por WhatsApp">
        ${ICONO_WA}<span class="fab__label">Escribinos</span>
      </a>` : ""}

      <div class="modal" id="modal" hidden>
        <div class="modal__backdrop" data-close></div>
        <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button class="modal__close" data-close aria-label="Cerrar">×</button>
          <div class="modal__media">
            <img id="modal-img" src="" alt="">
            <div class="modal__ph">${ICONO_FRASCO}<span>Foto próximamente</span></div>
            <div class="modal__thumbs" id="modal-thumbs" hidden></div>
          </div>
          <div class="modal__body">
            <p class="modal__cat" id="modal-cat"></p>
            <h2 class="modal__title" id="modal-title"></h2>
            <p class="modal__price" id="modal-price"></p>
            <div class="modal__variantes" id="modal-variantes" hidden></div>
            <p class="modal__desc" id="modal-desc"></p>
            <ul class="modal__specs" id="modal-specs"></ul>
            <button type="button" class="btn btn--primary modal__add" id="modal-add" hidden>Agregar a mi selección</button>
            <a class="btn btn--wa modal__cta" id="modal-wa">Consultar por WhatsApp</a>
            <button type="button" class="btn btn--ghost-dark modal__share" id="modal-share">Copiar link de este producto</button>
            <p class="modal__note">Te respondemos apenas lo vemos y coordinamos el resto por WhatsApp.</p>
          </div>
        </div>
      </div>`;

    const anio = $("[data-anio]");
    if (anio) anio.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
     Tarjetas de producto
     --------------------------------------------------------------------- */

  function precioHTML(producto) {
    if (producto.variantes) {
      const precios = producto.variantes
        .filter((v) => !v.agotado && typeof v.precio === "number" && v.precio > 0)
        .map((v) => v.precio);
      if (!precios.length) {
        return producto.variantes.every((v) => v.agotado)
          ? '<span class="card__price">Sin stock<small>Consultá reposición</small></span>'
          : '<span class="card__price">A consultar<small>Te pasamos el precio</small></span>';
      }
      const min = Math.min(...precios);
      const desde = min !== Math.max(...precios);
      return `<span class="card__price">${desde ? "Desde " : ""}${CONFIG.moneda} ${formatoPrecio.format(min)}</span>`;
    }
    if (producto.agotado) {
      return '<span class="card__price">Sin stock<small>Consultá reposición</small></span>';
    }
    if (typeof producto.precio === "number" && producto.precio > 0) {
      return `<span class="card__price">${CONFIG.moneda} ${formatoPrecio.format(producto.precio)}</span>`;
    }
    return '<span class="card__price">A consultar<small>Te pasamos el precio</small></span>';
  }

  function tarjeta(producto, categoria, indice) {
    const etiqueta = producto.etiqueta
      ? `<span class="card__tag card__tag--${producto.color || "dorado"}">${escapar(producto.etiqueta)}</span>`
      : "";

    const variante = varianteDefault(producto);
    const img = variante ? variante.img : producto.img;
    const desc = variante ? variante.desc : producto.desc;

    const mensaje = `Hola Malhan! Quería consultar por ${producto.nombre}. ¿Tenés disponible?`;

    const variantesHTML =
      producto.variantes && producto.variantes.length > 1
        ? `<div class="card__variantes" aria-label="Tamaños disponibles">
            ${producto.variantes
              .map((v) => {
                const activa = v === variante;
                const cls = activa ? " is-active" : "";
                const current = activa ? ' aria-current="true"' : "";
                return `<button type="button" class="pill pill--sm${cls}" data-variante="${escapar(v.label)}"${current}>${escapar(v.label)}</button>`;
              })
              .join("")}
          </div>`
        : "";

    const art = document.createElement("article");
    art.className = "card";
    art.dataset.categoria = categoria;
    art.dataset.index = indice;
    art.dataset.slug = slugify(producto.nombre);
    art.dataset.variante = variante ? variante.label : "";
    art.dataset.nombre = producto.nombre;
    art.dataset.familia = producto.familia || "";

    art.innerHTML = `
      <div class="card__media" data-abrir>
        ${etiqueta}
        ${img ? `<img src="${escapar(img)}" alt="${escapar(producto.nombre)}" loading="lazy" decoding="async">` : ""}
        <div class="card__ph">${ICONO_FRASCO}<span>Foto próximamente</span></div>
      </div>
      <div class="card__body">
        ${producto.familia ? `<span class="card__sub">${escapar(producto.familia)}</span>` : ""}
        <h3 class="card__name">${escapar(producto.nombre)}</h3>
        <p class="card__desc">${escapar(desc || "")}</p>
        ${variantesHTML}
        <div class="card__foot">
          ${precioHTML(producto)}
          <button class="btn card__add" data-agregar type="button">Agregar</button>
          <a class="card__consulta" data-wa="${escapar(mensaje)}">Consultar por WhatsApp</a>
        </div>
      </div>`;

    const media = $(".card__media", art);
    if (!img) {
      media.classList.add("is-empty");
    } else {
      $("img", media)?.addEventListener("error", () => media.classList.add("is-empty"), { once: true });
    }

    return art;
  }

  function grilla(lista, categoria, nombreSeccion) {
    const grid = document.createElement("div");
    grid.className = "grid";

    if (!lista.length) {
      grid.innerHTML = `
        <div class="empty">
          <strong>Estamos cargando esta sección</strong>
          Todavía no publicamos las fragancias de ${escapar(nombreSeccion)}.
          Escribinos y te contamos qué tenemos disponible.
        </div>`;
      return grid;
    }

    const frag = document.createDocumentFragment();
    lista.forEach(({ producto, indice }) => frag.appendChild(tarjeta(producto, categoria, indice)));
    grid.appendChild(frag);
    return grid;
  }

  /* ---------------------------------------------------------------------
     Clientes — si no hay ninguno cargado, la sección entera no se dibuja.
     --------------------------------------------------------------------- */

  function renderTestimonios() {
    const cont = $("[data-testimonios]");
    if (!cont) return;

    const lista = typeof TESTIMONIOS !== "undefined" ? TESTIMONIOS : [];
    const seccion = cont.closest("section");

    if (!lista.length) {
      if (seccion) seccion.remove();
      return;
    }

    cont.innerHTML = lista
      .map(
        (t) => `
        <figure class="testi">
          ${t.img
            ? `<div class="testi__media">
                 <img src="${escapar(t.img)}" alt="Compra de ${escapar(t.autor || "un cliente")}"
                      loading="lazy" decoding="async">
               </div>`
            : ""}
          <blockquote class="testi__texto">${escapar(t.texto)}</blockquote>
          ${t.autor ? `<figcaption class="testi__autor">${escapar(t.autor)}</figcaption>` : ""}
        </figure>`
      )
      .join("");

    $$(".testi__media img", cont).forEach((img) => {
      img.addEventListener("error", () => img.parentElement.remove(), { once: true });
    });
  }

  /* ---------------------------------------------------------------------
     Menú de categorías (tarjetas grandes con foto)
     -------------------------------------------------------------------
     "Todos" va siempre primero y a mano (mismo criterio que la pastilla
     "Todos" del header); el resto sale de CATEGORIAS, en su orden.
     --------------------------------------------------------------------- */

  function renderCategoryShowcase() {
    const cont = $("[data-menu-cats]");
    if (!cont) return;

    const tile = (id, nombre, foto, activaPorDefecto, ancha) => `
      <button type="button"
              class="catshowcase__tile${foto ? "" : " catshowcase__tile--sinfoto"}${activaPorDefecto ? " catshowcase__tile--active" : ""}${ancha ? " catshowcase__tile--wide" : ""}"
              data-filtro-tile="${id}">
        ${foto ? `<img class="catshowcase__photo" src="${escapar(foto)}" alt="" loading="lazy">` : ""}
        <span class="catshowcase__scrim"></span>
        <span class="catshowcase__label">${escapar(nombre)}</span>
      </button>`;

    cont.innerHTML = `
      <div class="catshowcase__grid">
        ${tile("todos", "Todos", FOTO_TODOS, true, true)}
        ${Object.entries(CATEGORIAS).map(([id, cat]) => tile(id, cat.nombre, cat.foto, false, false)).join("")}
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Catálogo completo
     --------------------------------------------------------------------- */

  function renderCatalogoCompleto() {
    const cont = $("[data-catalogo]");
    if (!cont) return;

    cont.innerHTML = Object.entries(CATEGORIAS)
      .map(([id, cat]) => `
          <div class="catsec" id="cat-${id}" data-cat="${id}">
            <div class="wrap">
              <header class="catsec__head">
                <h2 class="sec-title">${escapar(cat.nombre)}</h2>
              </header>
              <div class="grid" data-grilla="${id}"></div>
            </div>
          </div>`)
      .join("");

    Object.keys(CATEGORIAS).forEach((id) => {
      const lista = ((PRODUCTOS && PRODUCTOS[id]) || []).map((producto, indice) => ({ producto, indice }));
      $(`[data-grilla="${id}"]`, cont).replaceWith(grilla(lista, id, CATEGORIAS[id].nombre));
    });

    activarLinksWa(cont);
  }

  function initFiltroCatalogo() {
    const barra = $("#catnav");
    const secciones = $$(".catsec");
    if (!barra || !secciones.length) return;

    function aplicarFiltro(filtro) {
      $$(".pill[data-filtro]", barra).forEach((p) => p.classList.toggle("is-active", p.dataset.filtro === filtro));
      $$(".catshowcase__tile[data-filtro-tile]").forEach((t) => t.classList.toggle("catshowcase__tile--active", t.dataset.filtroTile === filtro));
      secciones.forEach((s) => { s.hidden = filtro !== "todos" && s.dataset.cat !== filtro; });
    }

    barra.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filtro]");
      if (!btn) return;
      aplicarFiltro(btn.dataset.filtro);
      $("#catalogo")?.scrollIntoView({ block: "start" });
    });

    const vidriera = $("[data-menu-cats]");
    if (vidriera) {
      vidriera.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filtro-tile]");
        if (!btn) return;
        aplicarFiltro(btn.dataset.filtroTile);
        $("#catalogo")?.scrollIntoView({ block: "start" });
      });
    }
  }

  /* ---------------------------------------------------------------------
     Buscador — filtra tarjetas por nombre/familia en todo el catálogo,
     sin importar qué pastilla de categoría esté activa.
     --------------------------------------------------------------------- */

  const normalizarTexto = (s) =>
    String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  function initBusqueda() {
    const wrap = $("[data-buscador]");
    const btn = $("[data-buscador-btn]");
    if (!wrap || !btn) return;

    const input = $("[data-buscador-input]", wrap);
    const limpiar = $("[data-buscador-limpiar]", wrap);
    const catnav = $("#catnav");
    const secciones = $$(".catsec");

    function aplicar() {
      const q = normalizarTexto(input.value.trim());
      limpiar.hidden = !q;

      if (!q) {
        $$(".card").forEach((c) => { c.hidden = false; });
        secciones.forEach((s) => { s.classList.remove("catsec--sin-resultados"); });
        const activo = $(".pill.is-active[data-filtro]", catnav);
        const filtro = activo ? activo.dataset.filtro : "todos";
        secciones.forEach((s) => { s.hidden = filtro !== "todos" && s.dataset.cat !== filtro; });
        return;
      }

      $$(".pill[data-filtro]", catnav).forEach((p) => p.classList.toggle("is-active", p.dataset.filtro === "todos"));
      $$(".catshowcase__tile[data-filtro-tile]").forEach((t) => t.classList.toggle("catshowcase__tile--active", t.dataset.filtroTile === "todos"));

      let totalVisible = 0;
      secciones.forEach((sec) => {
        sec.hidden = false;
        let visiblesEnSeccion = 0;
        $$(".card", sec).forEach((card) => {
          const va = card.dataset.nombre && (
            normalizarTexto(card.dataset.nombre).includes(q) ||
            normalizarTexto(card.dataset.familia).includes(q)
          );
          card.hidden = !va;
          if (va) { visiblesEnSeccion++; totalVisible++; }
        });
        sec.classList.toggle("catsec--sin-resultados", visiblesEnSeccion === 0);
      });

      $("[data-buscador-vacio]")?.remove();
      if (totalVisible === 0) {
        const cont = $("[data-catalogo]");
        if (cont) {
          const vacio = document.createElement("div");
          vacio.dataset.buscadorVacio = "";
          vacio.className = "wrap";
          vacio.innerHTML = `<div class="empty"><strong>No encontramos "${escapar(input.value.trim())}"</strong>Probá con otro nombre, o escribinos por WhatsApp y te ayudamos a encontrarlo.</div>`;
          cont.prepend(vacio);
        }
      }
    }

    function abrir() {
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Cerrar búsqueda");
      btn.innerHTML = '<span class="buscador__toggle-x" aria-hidden="true">×</span>';
      input.focus();
    }
    function cerrar() {
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Buscar un perfume");
      btn.innerHTML = ICONO_LUPA;
    }

    btn.addEventListener("click", () => {
      wrap.classList.contains("is-open") ? cerrar() : abrir();
    });
    $("[data-buscador-close]", wrap)?.addEventListener("click", cerrar);
    limpiar.addEventListener("click", () => { input.value = ""; aplicar(); input.focus(); });
    input.addEventListener("input", aplicar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && wrap.classList.contains("is-open")) cerrar();
    });
  }

  /* Pastillas de tamaño en la tarjeta: tocar una cambia precio/foto de esa
     tarjeta sin abrir la ficha, y queda como la variante que se agrega. */
  function initVariantesTarjeta() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".card__variantes [data-variante]");
      if (!btn) return;
      e.preventDefault();

      const card = btn.closest(".card");
      if (!card) return;

      const lista = PRODUCTOS[card.dataset.categoria];
      const producto = lista && lista[Number(card.dataset.index)];
      if (!producto || !producto.variantes) return;

      const variante = producto.variantes.find((v) => v.label === btn.dataset.variante);
      if (!variante) return;

      card.dataset.variante = variante.label;

      const media = $(".card__media", card);
      let img = $("img", media);
      if (variante.img) {
        if (!img) {
          img = document.createElement("img");
          img.alt = producto.nombre;
          img.loading = "lazy";
          img.decoding = "async";
          media.insertBefore(img, media.firstChild);
        }
        img.src = variante.img;
        media.classList.remove("is-empty");
      } else if (img) {
        media.classList.add("is-empty");
      }

      const precioViejo = $(".card__price", card);
      if (precioViejo) precioViejo.outerHTML = precioHTML(variante);

      $$("[data-variante]", $(".card__variantes", card)).forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });

      const mensaje = `Hola Malhan! Quería consultar por ${producto.nombre} — ${variante.label}. ¿Tenés disponible?`;
      const consulta = $(".card__consulta", card);
      if (consulta) {
        consulta.dataset.wa = mensaje;
        consulta.setAttribute("href", waLink(mensaje));
      }
    });
  }

  /* =====================================================================
     CARRITO
     ---------------------------------------------------------------------
     La selección se arma en el navegador del cliente y se manda entera
     por WhatsApp: no hay pago online, el sitio es estático. Queda
     guardada en su teléfono (localStorage) para no perderla.
     ===================================================================== */

  const CARRITO_KEY = "malhan-pedido";

  /* Medio de pago elegido en el carrito: "efectivo" no pide nada más,
     "transferencia" pide nombre + confirmación antes de armar el mensaje
     de WhatsApp (ver pintarPago/confirmarPorTransferencia más abajo). No
     se guarda en localStorage: cada visita arranca sin medio elegido. */
  const Pago = {
    metodo: null,
    nombre: "",
    confirmado: false,
    error: null
  };

  const Carrito = {
    items: [],

    cargar() {
      try {
        const guardado = JSON.parse(localStorage.getItem(CARRITO_KEY) || "[]");
        this.items = guardado.filter((it) => {
          if (!it || typeof it.slug !== "string" || !PRODUCTOS[it.categoria]) return false;
          const base = PRODUCTOS[it.categoria].find((p) => slugify(p.nombre) === it.slug);
          if (!base) return false;
          if (!base.variantes) return true;
          return base.variantes.some((v) => v.label === it.variante);
        });
      } catch {
        this.items = [];
      }
    },

    guardar() {
      try {
        localStorage.setItem(CARRITO_KEY, JSON.stringify(this.items));
      } catch {
        /* Si el navegador no deja guardar, la selección igual funciona
           mientras la página esté abierta. */
      }
    },

    producto(it) {
      const base = PRODUCTOS[it.categoria] &&
        PRODUCTOS[it.categoria].find((p) => slugify(p.nombre) === it.slug);
      if (!base) return null;
      if (!base.variantes) return base;
      const v = base.variantes.find((v) => v.label === it.variante) || varianteDefault(base);
      if (!v) return base;
      return { nombre: `${base.nombre} — ${v.label}`, precio: v.precio, img: v.img, agotado: v.agotado };
    },

    agregar(categoria, slug, variante) {
      variante = variante || null;
      const ya = this.items.find(
        (it) => it.categoria === categoria && it.slug === slug && it.variante === variante
      );
      if (ya) ya.cantidad += 1;
      else this.items.push({ categoria, slug, variante, cantidad: 1 });
      this.guardar();
      pintarCarrito();
    },

    /* Bajar a 0 deja el producto en pausa (no lo saca de la lista), por si
       el cliente se arrepiente. Sacarlo del todo es el botón "×". Un
       producto en 0 no cuenta en el total ni va en el mensaje de WhatsApp. */
    cambiar(categoria, slug, variante, delta) {
      variante = variante || null;
      const it = this.items.find(
        (i) => i.categoria === categoria && i.slug === slug && i.variante === variante
      );
      if (!it) return;
      it.cantidad = Math.max(0, it.cantidad + delta);
      this.guardar();
      pintarCarrito();
    },

    quitar(categoria, slug, variante) {
      variante = variante || null;
      this.items = this.items.filter(
        (i) => !(i.categoria === categoria && i.slug === slug && i.variante === variante)
      );
      this.guardar();
      pintarCarrito();
    },

    vaciar() {
      this.items = [];
      this.guardar();
      pintarCarrito();
    },

    unidades() {
      return this.items.reduce((n, it) => n + it.cantidad, 0);
    },

    total() {
      let suma = 0, aConsultar = 0;
      this.items.forEach((it) => {
        if (it.cantidad <= 0) return;
        const p = this.producto(it);
        if (typeof p.precio === "number" && p.precio > 0) suma += p.precio * it.cantidad;
        else aConsultar += it.cantidad;
      });
      return { suma, aConsultar };
    },

    /* pago (opcional) es el objeto Pago de más arriba: si viene con medio
       elegido, se le agregan al mensaje las líneas de medio de pago (y,
       para transferencia, el nombre para identificarla). */
    mensaje(pago) {
      const { suma, aConsultar } = this.total();

      const lineas = this.items
        .filter((it) => it.cantidad > 0)
        .map((it) => {
          const p = this.producto(it);
          const precio =
            typeof p.precio === "number" && p.precio > 0
              ? `${CONFIG.moneda} ${formatoPrecio.format(p.precio * it.cantidad)}`
              : "a consultar";
          return `• ${it.cantidad} × ${p.nombre} — ${precio}`;
        });

      let txt = "Hola Malhan! Quiero hacer este pedido:\n\n";
      txt += lineas.join("\n");

      if (suma > 0) txt += `\n\nTotal: ${CONFIG.moneda} ${formatoPrecio.format(suma)}`;
      if (aConsultar > 0) txt += suma > 0 ? `\n(+ ${aConsultar} producto(s) a consultar)` : "";

      if (pago && pago.metodo === "efectivo") {
        txt += `\n\nMedio de pago: Efectivo`;
      } else if (pago && pago.metodo === "transferencia") {
        txt += `\n\nMedio de pago: Transferencia`;
        txt += `\nYa realicé la transferencia a nombre de ${pago.nombre}. ¡Muchas gracias!`;
      }

      return txt;
    }
  };

  function renderCarrito() {
    const cont = $("[data-carrito]");
    if (!cont) return;

    cont.outerHTML = `
      <div class="cart" id="cart" hidden>
        <div class="cart__backdrop" data-cart-close></div>
        <aside class="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <header class="cart__head">
            <h2 class="cart__title" id="cart-title">Tu selección</h2>
            <button class="cart__close" data-cart-close aria-label="Cerrar">×</button>
          </header>

          <div class="cart__body" data-cart-body></div>

          <footer class="cart__foot" data-cart-foot hidden>
            <div class="cart__total" data-cart-total></div>

            <div class="cart__pago">
              <p class="cart__pago-label">¿Cómo vas a pagar?</p>
              <div class="cart__pago-opciones">
                <button type="button" class="pago-opcion" data-pago-metodo="efectivo" aria-pressed="false">Efectivo</button>
                <button type="button" class="pago-opcion" data-pago-metodo="transferencia" aria-pressed="false">Transferencia</button>
              </div>
            </div>

            <div data-pago-detalle></div>

            <button class="btn btn--ghost-dark cart__cerrar" data-cart-close type="button">Seguir viendo el catálogo</button>
            <button class="cart__vaciar" data-cart-vaciar type="button">Vaciar la selección</button>
          </footer>
        </aside>
      </div>`;
  }

  function pintarCarrito() {
    const burbuja = $("[data-cart-count]");
    const unidades = Carrito.unidades();
    if (burbuja) {
      burbuja.textContent = unidades;
      burbuja.hidden = unidades === 0;
    }

    const body = $("[data-cart-body]");
    const foot = $("[data-cart-foot]");
    if (!body) return;

    if (!Carrito.items.length) {
      body.innerHTML = `
        <div class="cart__vacio">
          <p><strong>Todavía no agregaste nada.</strong></p>
          <p>Entrá a una categoría del catálogo y sumá lo que te guste.</p>
          <a class="btn btn--primary" href="#catalogo">Ver el catálogo</a>
        </div>`;
      if (foot) foot.hidden = true;
      return;
    }

    body.innerHTML = Carrito.items
      .map((it) => {
        const p = Carrito.producto(it);
        const enPausa = it.cantidad === 0;
        const precio = enPausa
          ? "En pausa — tocá + para sumarlo de nuevo"
          : typeof p.precio === "number" && p.precio > 0
          ? `${CONFIG.moneda} ${formatoPrecio.format(p.precio * it.cantidad)}`
          : "A consultar";
        return `
          <article class="citem${enPausa ? " citem--pausa" : ""}" data-cat="${escapar(it.categoria)}" data-slug="${escapar(it.slug)}" data-variante="${escapar(it.variante || "")}">
            <div class="citem__media${p.img ? "" : " is-empty"}">
              ${p.img ? `<img src="${escapar(p.img)}" alt="" loading="lazy">` : ICONO_FRASCO}
            </div>
            <div class="citem__body">
              <h3 class="citem__nombre">${escapar(p.nombre)}</h3>
              <p class="citem__precio">${precio}</p>
              <div class="citem__cant">
                <button data-menos aria-label="Sacar uno de ${escapar(p.nombre)}"${enPausa ? " disabled" : ""}>−</button>
                <span aria-live="polite">${it.cantidad}</span>
                <button data-mas aria-label="Sumar uno de ${escapar(p.nombre)}">+</button>
              </div>
            </div>
            <button class="citem__quitar" data-quitar aria-label="Sacar ${escapar(p.nombre)} de la selección">×</button>
          </article>`;
      })
      .join("");

    if (foot) foot.hidden = false;

    const { suma, aConsultar } = Carrito.total();

    const elTotal = $("[data-cart-total]");
    if (elTotal) {
      elTotal.innerHTML = suma > 0
        ? `<span>Total</span><strong>${CONFIG.moneda} ${formatoPrecio.format(suma)}</strong>
           ${aConsultar ? `<small>+ ${aConsultar} a consultar</small>` : ""}`
        : `<span>Total</span><strong>A consultar</strong>`;
    }

    pintarPago();
  }

  /* =====================================================================
     MEDIO DE PAGO
     ---------------------------------------------------------------------
     Malhan solo cobra en efectivo o por transferencia (sin tarjetas ni
     cobro online). "Efectivo" abre WhatsApp directo; "Transferencia"
     muestra alias/CVU/titular de CONFIG.pago con botón de copiar cada
     dato, pide nombre y confirmación de que ya transfirió, y recién ahí
     arma el mensaje de WhatsApp — el dueño siempre verifica la
     transferencia en su cuenta antes de coordinar la entrega.
     ===================================================================== */

  function pintarPago() {
    $$(".pago-opcion").forEach((btn) => {
      const activo = btn.dataset.pagoMetodo === Pago.metodo;
      btn.classList.toggle("is-activo", activo);
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
    });

    const cont = $("[data-pago-detalle]");
    if (!cont) return;

    if (Pago.metodo === "efectivo") {
      cont.innerHTML = `
        <p class="cart__pago-nota">Pagás en efectivo al recibir o retirar tu pedido.</p>
        <a class="btn btn--wa cart__cta" id="cart-wa" href="${escapar(waLink(Carrito.mensaje(Pago)))}" target="_blank" rel="noopener">${ICONO_WA} <span>Hacer el pedido</span></a>
        <p class="cart__nota">Se abre WhatsApp con el pedido ya escrito. Ahí te confirmamos stock y coordinamos la entrega.</p>`;
      return;
    }

    if (Pago.metodo === "transferencia") {
      const datoRow = (etiqueta, valor) => `
        <div class="pago-dato-row">
          <span class="pago-dato-label">${escapar(etiqueta)}</span>
          <span class="pago-dato-valor">${escapar(valor)}</span>
          <button type="button" class="pago-dato-copy" data-pago-copiar="${escapar(valor)}">Copiar</button>
        </div>`;

      const { suma } = Carrito.total();

      cont.innerHTML = `
        <div class="pago-transferencia">
          <span class="pago-transferencia-title">Datos para transferir</span>
          <div class="pago-transferencia-datos">
            ${datoRow("Titular", CONFIG.pago.titular)}
            ${datoRow("Alias", CONFIG.pago.alias)}
            ${datoRow("CVU", CONFIG.pago.cvu)}
          </div>
          <p class="pago-transferencia-nota">Transferí ${suma > 0 ? `el total (${CONFIG.moneda} ${formatoPrecio.format(suma)})` : "el total de tu pedido"} y dejanos tu nombre para poder identificarla.</p>
          <input type="text" class="pago-transferencia-nombre" data-pago-nombre placeholder="Tu nombre y apellido" aria-label="Tu nombre y apellido, para identificar la transferencia" value="${escapar(Pago.nombre)}">
          <label class="pago-transferencia-check">
            <input type="checkbox" data-pago-confirmado ${Pago.confirmado ? "checked" : ""}>
            Ya realicé la transferencia
          </label>
          ${Pago.error ? `<p class="pago-transferencia-error">${escapar(Pago.error)}</p>` : ""}
          <button type="button" class="btn btn--wa cart__cta" data-pago-confirmar>${ICONO_WA} <span>Confirmar pedido por transferencia</span></button>
        </div>`;
      return;
    }

    cont.innerHTML = `<p class="cart__pago-nota cart__pago-nota--aviso">Elegí Efectivo o Transferencia para hacer el pedido.</p>`;
  }

  function copiarAlPortapapeles(valor) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(valor).catch(() => copiarConTextarea(valor));
    }
    return copiarConTextarea(valor);
  }

  function copiarConTextarea(valor) {
    const tmp = document.createElement("textarea");
    tmp.value = valor;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand("copy"); } catch { /* último recurso, sin más fallback */ }
    document.body.removeChild(tmp);
    return Promise.resolve();
  }

  function copiarDato(btn) {
    copiarAlPortapapeles(btn.dataset.pagoCopiar).then(() => {
      const original = btn.textContent;
      btn.textContent = "¡Copiado!";
      btn.classList.add("is-ok");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("is-ok");
      }, 1200);
    });
  }

  function confirmarPorTransferencia() {
    if (!Carrito.items.some((it) => it.cantidad > 0)) return;

    if (!Pago.confirmado) {
      Pago.error = 'Marcá "Ya realicé la transferencia" antes de confirmar.';
      pintarPago();
      return;
    }
    const nombre = (Pago.nombre || "").trim();
    if (!nombre) {
      Pago.error = "Escribí tu nombre y apellido para identificar la transferencia.";
      pintarPago();
      return;
    }

    window.open(waLink(Carrito.mensaje({ metodo: "transferencia", nombre })), "_blank", "noopener");

    Carrito.vaciar();
    Pago.metodo = null;
    Pago.nombre = "";
    Pago.confirmado = false;
    Pago.error = null;
    pintarPago();
  }

  function initCarrito() {
    const modal = $("#cart");
    if (!modal) return;

    const abrir = () => { modal.hidden = false; bloquearScroll(); };
    const cerrar = () => { modal.hidden = true; desbloquearScroll(); };

    document.addEventListener("click", (e) => {
      const btnAdd = e.target.closest("[data-agregar]");
      if (btnAdd) {
        e.preventDefault();
        const card = btnAdd.closest(".card");
        if (!card) return;
        Carrito.agregar(card.dataset.categoria, card.dataset.slug, card.dataset.variante || null);
        btnAdd.classList.add("is-ok");
        const original = btnAdd.dataset.original || btnAdd.innerHTML;
        btnAdd.dataset.original = original;
        btnAdd.innerHTML = "Agregado ✓";
        setTimeout(() => {
          btnAdd.classList.remove("is-ok");
          btnAdd.innerHTML = original;
        }, 1200);
        return;
      }

      if (e.target.closest("[data-cart-open]")) { e.preventDefault(); abrir(); return; }
      if (e.target.closest("[data-cart-close]")) { cerrar(); return; }
      if (e.target.closest("[data-cart-vaciar]")) { Carrito.vaciar(); return; }

      const fila = e.target.closest(".citem");
      if (fila) {
        const cat = fila.dataset.cat, slug = fila.dataset.slug, variante = fila.dataset.variante || null;
        if (e.target.closest("[data-mas]"))    Carrito.cambiar(cat, slug, variante, +1);
        if (e.target.closest("[data-menos]"))  Carrito.cambiar(cat, slug, variante, -1);
        if (e.target.closest("[data-quitar]")) Carrito.quitar(cat, slug, variante);
        return;
      }

      const btnMetodo = e.target.closest("[data-pago-metodo]");
      if (btnMetodo) {
        Pago.metodo = Pago.metodo === btnMetodo.dataset.pagoMetodo ? null : btnMetodo.dataset.pagoMetodo;
        Pago.error = null;
        pintarPago();
        return;
      }

      const btnCopiar = e.target.closest("[data-pago-copiar]");
      if (btnCopiar) { copiarDato(btnCopiar); return; }

      if (e.target.closest("[data-pago-confirmar]")) { confirmarPorTransferencia(); return; }
    });

    document.addEventListener("input", (e) => {
      if (e.target.matches("[data-pago-nombre]")) Pago.nombre = e.target.value;
    });

    document.addEventListener("change", (e) => {
      if (e.target.matches("[data-pago-confirmado]")) Pago.confirmado = e.target.checked;
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) cerrar();
    });
  }

  /* ---------------------------------------------------------------------
     Ficha de producto
     --------------------------------------------------------------------- */

  function initModal() {
    const modal = $("#modal");
    if (!modal) return;

    const elImg = $("#modal-img"), elCat = $("#modal-cat"), elTit = $("#modal-title");
    const elPre = $("#modal-price"), elDesc = $("#modal-desc"), elSpecs = $("#modal-specs");
    const elWa = $("#modal-wa"), media = $(".modal__media", modal);
    const elThumbs = $("#modal-thumbs"), elShare = $("#modal-share");
    const elVariantes = $("#modal-variantes"), elAdd = $("#modal-add");

    let ultimoFoco = null;
    let fotosActuales = [];
    let categoriaAbierta = null, indiceAbierto = null, varianteActual = null;

    function pintarFicha(p) {
      const v = p.variantes ? varianteActual : null;
      const efectivo = v
        ? { precio: v.precio, desc: v.desc, img: v.img, img2: v.img2, detalles: v.detalles, agotado: v.agotado }
        : p;

      const nombreCat = (CATEGORIAS[categoriaAbierta] && CATEGORIAS[categoriaAbierta].nombre) || "";

      elCat.textContent = p.familia ? `${nombreCat} · ${p.familia}` : nombreCat;
      elTit.textContent = v ? `${p.nombre} — ${v.label}` : p.nombre;
      elDesc.textContent = efectivo.desc || "";

      elPre.innerHTML = efectivo.agotado
        ? "Sin stock por el momento"
        : typeof efectivo.precio === "number" && efectivo.precio > 0
        ? `${CONFIG.moneda} ${formatoPrecio.format(efectivo.precio)}`
        : "Precio a consultar";

      elSpecs.innerHTML = (efectivo.detalles || []).map((d) => `<li>${escapar(d)}</li>`).join("");

      fotosActuales = [efectivo.img, efectivo.img2].filter(Boolean);

      media.classList.remove("is-empty");
      if (fotosActuales.length) {
        elImg.src = fotosActuales[0];
        elImg.alt = elTit.textContent;
        elImg.onerror = () => media.classList.add("is-empty");
      } else {
        elImg.removeAttribute("src");
        media.classList.add("is-empty");
      }

      if (fotosActuales.length > 1) {
        elThumbs.innerHTML = fotosActuales
          .map((f, i) => `<button type="button" data-foto="${i}" class="${i === 0 ? "is-active" : ""}" aria-label="Foto ${i + 1} de ${fotosActuales.length}"></button>`)
          .join("");
        elThumbs.hidden = false;
      } else {
        elThumbs.innerHTML = "";
        elThumbs.hidden = true;
      }

      if (p.variantes && p.variantes.length > 1) {
        elVariantes.innerHTML = p.variantes
          .map((variante) => {
            const activa = variante === v;
            const cls = activa ? " is-active" : "";
            const current = activa ? ' aria-current="true"' : "";
            return `<button type="button" class="pill pill--sm${cls}" data-variante="${escapar(variante.label)}"${current}>${escapar(variante.label)}</button>`;
          })
          .join("");
        elVariantes.hidden = false;
      } else {
        elVariantes.innerHTML = "";
        elVariantes.hidden = true;
      }

      if (elAdd) elAdd.hidden = !!efectivo.agotado;

      elWa.dataset.wa = `Hola Malhan! Quería consultar por ${elTit.textContent}. ¿Tenés disponible?`;
      activarLinksWa(modal);
    }

    function abrir(categoria, indice, varianteLabel) {
      const p = PRODUCTOS[categoria] && PRODUCTOS[categoria][indice];
      if (!p) return;

      categoriaAbierta = categoria;
      indiceAbierto = indice;
      varianteActual = p.variantes
        ? p.variantes.find((v) => v.label === varianteLabel) || varianteDefault(p)
        : null;

      pintarFicha(p);

      ultimoFoco = document.activeElement;
      modal.hidden = false;
      bloquearScroll();
      $(".modal__close", modal).focus();
    }

    function cerrar() {
      modal.hidden = true;
      desbloquearScroll();
      if (ultimoFoco) ultimoFoco.focus();
    }

    document.addEventListener("click", (e) => {
      const disparador = e.target.closest("[data-abrir]");
      if (disparador) {
        const card = disparador.closest(".card");
        if (card) abrir(card.dataset.categoria, Number(card.dataset.index), card.dataset.variante || undefined);
        return;
      }

      const btnFoto = e.target.closest("[data-foto]");
      if (btnFoto) {
        const i = Number(btnFoto.dataset.foto);
        if (fotosActuales[i]) elImg.src = fotosActuales[i];
        $$("[data-foto]", elThumbs).forEach((b) => b.classList.toggle("is-active", b === btnFoto));
        return;
      }

      const btnVariante = e.target.closest("[data-variante]");
      if (btnVariante && elVariantes.contains(btnVariante)) {
        const p = PRODUCTOS[categoriaAbierta] && PRODUCTOS[categoriaAbierta][indiceAbierto];
        if (!p || !p.variantes) return;
        varianteActual = p.variantes.find((v) => v.label === btnVariante.dataset.variante) || varianteActual;
        pintarFicha(p);
        return;
      }

      if (e.target.closest("#modal-add")) {
        const p = PRODUCTOS[categoriaAbierta] && PRODUCTOS[categoriaAbierta][indiceAbierto];
        if (!p) return;
        Carrito.agregar(categoriaAbierta, slugify(p.nombre), varianteActual ? varianteActual.label : null);
        const original = elAdd.textContent;
        elAdd.textContent = "Agregado ✓";
        setTimeout(() => { elAdd.textContent = original; }, 1200);
        return;
      }

      if (e.target.closest("#modal-share")) {
        const p = PRODUCTOS[categoriaAbierta] && PRODUCTOS[categoriaAbierta][indiceAbierto];
        if (!p) return;
        const link = linkProducto(categoriaAbierta, p, varianteActual);
        const original = elShare.textContent;
        const listo = () => {
          elShare.textContent = "Copiado ✓";
          setTimeout(() => { elShare.textContent = original; }, 1500);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(link).then(listo).catch(listo);
        else listo();
        return;
      }

      if (e.target.closest("[data-close]")) cerrar();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) cerrar();
    });

    function abrirDesdeHash() {
      const m = location.hash.match(/^#producto=([a-z0-9-]+):([^:]+)(?::(.+))?$/i);
      const [, categoriaCrudo, slugCrudo, varianteSlugCrudo] = m || [];
      const categoria = categoriaCrudo && categoriaCrudo.toLowerCase();
      const slug = slugCrudo && slugCrudo.toLowerCase();
      const varianteSlug = varianteSlugCrudo && varianteSlugCrudo.toLowerCase();
      const lista = categoria && PRODUCTOS[categoria];
      const indice = lista ? lista.findIndex((p) => slugify(p.nombre) === slug) : -1;
      if (indice === -1) {
        if (!modal.hidden) cerrar();
        return;
      }
      const p = lista[indice];
      const variante = varianteSlug && p.variantes
        ? p.variantes.find((v) => slugify(v.label) === varianteSlug)
        : null;
      abrir(categoria, indice, variante ? variante.label : undefined);
    }
    abrirDesdeHash();
    window.addEventListener("hashchange", abrirDesdeHash);
  }

  /* ---------------------------------------------------------------------
     Encabezado: menú mobile, sombra al scrollear, botón WhatsApp flotante
     --------------------------------------------------------------------- */

  function initHeader() {
    const header = $("#header"), burger = $("#burger"), nav = $("#nav");
    if (!header || !burger || !nav) return;

    burger.addEventListener("click", () => {
      const abierto = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(abierto));
      burger.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      const fab = $(".fab");
      if (fab) fab.classList.toggle("is-visible", window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Animación de entrada
     --------------------------------------------------------------------- */

  function initReveal() {
    const objetivos = $$(".sec-head, .catsec__head, .card, .testi");
    objetivos.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      objetivos.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entradas, o) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          o.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    objetivos.forEach((el) => obs.observe(el));
  }

  /* ---------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderCategoryShowcase();
    renderCatalogoCompleto();
    renderTestimonios();
    renderFooter();
    renderCarrito();

    activarLinksWa();
    initModal();
    initHeader();
    initFiltroCatalogo();
    initBusqueda();
    initVariantesTarjeta();
    initReveal();

    Carrito.cargar();
    initCarrito();
    pintarCarrito();
  });
})();
