/* -------------------------------------------------
   EXODO | Interacciones del sitio
-------------------------------------------------- */

const CART_STORAGE_KEY = "exodo_cart_v1";
const CART_WHATSAPP_BASE_URL = "https://wa.me/5493815704653";

const productCategories = [
  {
    id: "hierros",
    title: "Hierros",
    items: [
      { id: "alambre", name: "Alambre", unit: "Kg" },
      { id: "hierro-6", name: "Hierro del 6", unit: "Barra" },
      { id: "hierro-8", name: "Hierro del 8", unit: "Barra" },
      { id: "hierro-10", name: "Hierro del 10", unit: "Barra" },
      { id: "hierro-12", name: "Hierro del 12", unit: "Barra" },
      { id: "malla-4-15x15", name: "Malla 4mm 15x15", unit: "Unidad" },
      { id: "malla-5-15x15", name: "Malla 5mm 15x15", unit: "Unidad" },
      { id: "malla-6-15x15", name: "Malla 6mm 15x15", unit: "Unidad" },
    ],
  },
  {
    id: "cementos",
    title: "Cementos",
    items: [
      { id: "cemento-25", name: "Cemento x25kg", unit: "Bolsa" },
      { id: "plasticor-25", name: "Plasticor x25kg", unit: "Bolsa" },
      { id: "fino-weber-25", name: "Fino Weber x25kg", unit: "Bolsa" },
      { id: "pegamento-ceramico-weber", name: "Pegamento p/ ceramico Weber", unit: "Bolsa" },
      { id: "cal-hidratada", name: "Cal hidratada", unit: "Bolsa" },
      { id: "ladrillo-12x18x33", name: "Ladrillos 12x18x33", unit: "Unidad" },
      { id: "ladrillo-8x18x33", name: "Ladrillos 8x18x33", unit: "Unidad" },
    ],
  },
  {
    id: "electricidad",
    title: "Electricidad",
    items: [
      { id: "cable-25", name: "Cable taller 2.5mm", unit: "Rollo" },
      { id: "caja-octogonal", name: "Caja octogonal", unit: "Unidad" },
      { id: "llave-termica", name: "Llave termica 2x25A", unit: "Unidad" },
      { id: "toma-doble", name: "Tomacorriente doble", unit: "Unidad" },
    ],
  },
  {
    id: "sanitarios",
    title: "Sanitarios",
    items: [
      { id: "pvc-110", name: "Cano PVC 110", unit: "Unidad" },
      { id: "codo-110", name: "Codo PVC 110", unit: "Unidad" },
      { id: "curva-110", name: "Curva PVC 110", unit: "Unidad" },
      { id: "pegamento-pvc", name: "Pegamento p/ PVC", unit: "Unidad" },
    ],
  },
  {
    id: "chapas",
    title: "Chapas",
    items: [
      { id: "chapa-galv-c27", name: "Chapa galvanizada c27", unit: "Unidad" },
      { id: "chapa-galv-c25", name: "Chapa galvanizada c25", unit: "Unidad" },
      { id: "chapa-cinc-c27", name: "Chapa cincalum c27", unit: "Unidad" },
      { id: "chapa-cinc-c25", name: "Chapa cincalum c25", unit: "Unidad" },
      { id: "chapa-trap-c27", name: "Chapa trapezoidal c27", unit: "Unidad" },
      { id: "chapa-trap-c25", name: "Chapa trapezoidal c25", unit: "Unidad" },
    ],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    items: [
      { id: "clavos-2", name: "Clavos 2", unit: "Kg" },
      { id: "clavos-2-1-2", name: "Clavos 2 1/2", unit: "Kg" },
      { id: "pala-punta", name: "Pala punta", unit: "Unidad" },
      { id: "nivel-60", name: "Nivel 60cm", unit: "Unidad" },
    ],
  },
];

const productIndex = buildProductIndex(productCategories);

initBaseUi();
document.addEventListener("DOMContentLoaded", () => {
  initBusinessStatus();
  initCatalogAndCart();
});

function initBaseUi() {
  initBurgerMenu();
  initAnchorScroll();
  initFooterYear();
  initScrollEffects();
}

function initBurgerMenu() {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (!burger || !navLinks) return;
  burger.addEventListener("click", () => navLinks.classList.toggle("open"));
}

function initAnchorScroll() {
  const navLinks = document.querySelector(".nav-links");
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (navLinks) navLinks.classList.remove("open");
    });
  });
}

function initFooterYear() {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function initScrollEffects() {
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero, .page-hero");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealObserver = buildRevealObserver(prefersReducedMotion);
  registerReveal(document.querySelectorAll("section, h1, h2, h3, h4"), revealObserver, prefersReducedMotion);

  const updateNavState = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  let ticking = false;
  const updateParallax = () => {
    if (!hero || prefersReducedMotion) return;
    const offset = Math.min(window.scrollY * 0.08, 40);
    hero.style.setProperty("--hero-parallax", `calc(50% + ${offset}px)`);
    ticking = false;
  };

  const onScroll = () => {
    updateNavState();
    if (ticking || !hero || prefersReducedMotion) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateNavState();
  if (!prefersReducedMotion) updateParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function buildRevealObserver(prefersReducedMotion) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return null;

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );
}

function registerReveal(elements, observer, prefersReducedMotion) {
  elements.forEach((element) => {
    if (!(element instanceof Element)) return;
    if (element.dataset.reveal === "true") return;

    element.dataset.reveal = "true";
    element.classList.add("reveal");

    if (prefersReducedMotion) {
      element.classList.add("active");
      return;
    }

    if (observer) {
      observer.observe(element);
    } else {
      element.classList.add("active");
    }
  });
}

function initBusinessStatus() {
  setBusinessStatus("corralon", isBusinessOpen(8, 30, 18, 0));
  setBusinessStatus("constructora", isBusinessOpen(8, 30, 21, 0));
}

function isBusinessOpen(openHour, openMinute, closeHour, closeMinute) {
  const now = new Date();
  const localDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const currentMinutes = localDate.getHours() * 60 + localDate.getMinutes();
  const opening = openHour * 60 + openMinute;
  const closing = closeHour * 60 + closeMinute;
  return currentMinutes >= opening && currentMinutes < closing;
}

function setBusinessStatus(name, open) {
  const badge = document.querySelector(`[data-status="${name}"]`);
  if (!badge) return;

  const text = badge.querySelector(".status-text");
  const statusText = open ? "Abierto ahora" : "Cerrado";
  if (text) {
    text.textContent = statusText;
  } else {
    badge.textContent = statusText;
  }

  badge.classList.remove("status-open", "status-closed");
  badge.classList.add(open ? "status-open" : "status-closed");
}

function initCatalogAndCart() {
  const refs = getCatalogRefs();
  if (!refs) return;

  const state = {
    cart: loadCartFromStorage(),
    activeFilter: null,
  };

  renderCatalog(refs.productList, state.activeFilter);
  renderCart(refs, state.cart);
  applyCategoryFilter(refs, state, null);

  refs.productList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.action !== "add") return;

    const productId = target.dataset.id;
    if (!productId) return;

    const product = productIndex.get(productId);
    if (!product) return;

    const card = target.closest(".product-card");
    const qtyInput = card ? card.querySelector("[data-qty-input]") : null;
    const qty = parsePositiveInteger(qtyInput instanceof HTMLInputElement ? qtyInput.value : "1");
    addToCart(state.cart, productId, qty);
    saveCartToStorage(state.cart);
    renderCart(refs, state.cart);
  });

  refs.cartItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const action = target.dataset.action;
    const productId = target.dataset.id;
    if (!action || !productId) return;

    if (action === "increase") updateCartQty(state.cart, productId, 1);
    if (action === "decrease") updateCartQty(state.cart, productId, -1);
    if (action === "remove") removeFromCart(state.cart, productId);

    saveCartToStorage(state.cart);
    renderCart(refs, state.cart);
  });

  refs.categoryCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const filter = card.dataset.filter || null;
      applyCategoryFilter(refs, state, filter);

      const activeCatalog = document.querySelector("#catalogo-activo");
      if (activeCatalog) activeCatalog.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  refs.deliveryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      renderCart(refs, state.cart);
    });
  });
}

function getCatalogRefs() {
  const productList = document.querySelector("#product-list");
  const productEmpty = document.querySelector("#product-empty");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const cartWhatsapp = document.querySelector("#cart-whatsapp");
  const deliveryInputs = Array.from(
    document.querySelectorAll('input[name="delivery-mode"]')
  );
  const categoryCards = Array.from(document.querySelectorAll(".category-card"));

  if (
    !(productList && productEmpty && cartItems && cartTotal && cartWhatsapp) ||
    !deliveryInputs.length
  ) {
    return null;
  }

  return {
    productList,
    productEmpty,
    cartItems,
    cartTotal,
    cartWhatsapp,
    deliveryInputs,
    categoryCards,
  };
}

function renderCatalog(container, categoryId) {
  if (!categoryId) {
    container.innerHTML = "";
    return;
  }

  const category = productCategories.find((item) => item.id === categoryId);
  if (!category) {
    container.innerHTML = "";
    return;
  }

  const cards = category.items
    .map(
      (product) => `
            <article class="product-card">
              <div class="product-pick-label">Elegir producto</div>
              <h4>${product.name}</h4>
              <div class="product-meta">Unidad: ${product.unit}</div>
              <div class="product-qty-field">
                <label for="qty-${product.id}">Cantidad</label>
                <input id="qty-${product.id}" type="number" min="1" step="1" value="1" data-qty-input />
              </div>
              <div class="product-actions">
                <button class="btn btn-outline-dark" data-action="add" data-id="${product.id}">Agregar</button>
              </div>
            </article>
          `
    )
    .join("");

  container.innerHTML = `
    <section class="product-section" data-category="${category.id}" aria-labelledby="cat-${category.id}">
      <div class="product-section-header">
        <h3 id="cat-${category.id}" class="product-section-title">${category.title}</h3>
        <span class="product-section-count">${category.items.length} productos</span>
      </div>
      <div class="product-grid">
        ${cards}
      </div>
    </section>
  `;
}

function renderCart(refs, cartMap) {
  const items = Array.from(cartMap.entries())
    .map(([id, qty]) => {
      const product = productIndex.get(id);
      if (!product) return null;
      return { ...product, qty };
    })
    .filter(Boolean);

  if (items.length === 0) {
    refs.cartItems.innerHTML = '<p class="cart-empty">Todavia no agregaste productos.</p>';
  } else {
    refs.cartItems.innerHTML = items
      .map(
        (item) => `
          <article class="cart-item" data-id="${item.id}">
            <div class="cart-item-header">
              <span>${item.name}</span>
              <span>${item.qty} ${item.unit}</span>
            </div>
            <div class="product-meta">Unidad: ${item.unit}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">-</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
              <button class="btn btn-outline-dark" data-action="remove" data-id="${item.id}">Quitar</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  refs.cartTotal.textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;

  if (items.length === 0) {
    refs.cartWhatsapp.classList.add("is-disabled");
    refs.cartWhatsapp.href = CART_WHATSAPP_BASE_URL;
  } else {
    const deliveryMode = getSelectedDeliveryMode(refs.deliveryInputs);
    refs.cartWhatsapp.classList.remove("is-disabled");
    refs.cartWhatsapp.href = `${CART_WHATSAPP_BASE_URL}?text=${encodeURIComponent(
      buildWhatsappMessage(items, totalItems, deliveryMode)
    )}`;
  }
}

function applyCategoryFilter(refs, state, filter) {
  state.activeFilter = filter;
  renderCatalog(refs.productList, filter);
  refs.productEmpty.hidden = Boolean(filter);
  refs.categoryCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.filter === filter);
  });
}

function addToCart(cartMap, productId, qty) {
  const currentQty = cartMap.get(productId) || 0;
  cartMap.set(productId, currentQty + qty);
}

function updateCartQty(cartMap, productId, delta) {
  const currentQty = cartMap.get(productId);
  if (!currentQty) return;

  const nextQty = currentQty + delta;
  if (nextQty <= 0) {
    cartMap.delete(productId);
  } else {
    cartMap.set(productId, nextQty);
  }
}

function removeFromCart(cartMap, productId) {
  cartMap.delete(productId);
}

function parsePositiveInteger(rawValue) {
  const parsed = Number.parseInt(String(rawValue || "").trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildWhatsappMessage(items, totalItems, deliveryMode) {
  const deliveryText =
    deliveryMode === "envio" ? "con envio" : "con retiro en el local";
  const lines = [`Hola quiero averiguar estos productos ${deliveryText}:`];
  items.forEach((item) => lines.push(`- ${item.name}: ${item.qty} ${item.unit}`));
  lines.push(`Total de items: ${totalItems}`);
  return lines.join("\n");
}

function getSelectedDeliveryMode(inputs) {
  const selected = inputs.find((input) => input.checked);
  return selected ? selected.value : "retiro";
}

function loadCartFromStorage() {
  const cartMap = new Map();

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return cartMap;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return cartMap;

    parsed.forEach((entry) => {
      if (!entry || typeof entry !== "object") return;
      const id = typeof entry.id === "string" ? entry.id : "";
      const qty = parsePositiveInteger(entry.qty);
      if (!id || !productIndex.has(id)) return;
      cartMap.set(id, qty);
    });
  } catch (_error) {
    return cartMap;
  }

  return cartMap;
}

function saveCartToStorage(cartMap) {
  try {
    const serializable = Array.from(cartMap.entries()).map(([id, qty]) => ({ id, qty }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
  } catch (_error) {
    // localStorage can fail in private mode or blocked contexts.
  }
}

function buildProductIndex(categories) {
  const index = new Map();
  categories.forEach((category) => {
    category.items.forEach((item) => index.set(item.id, item));
  });
  return index;
}
