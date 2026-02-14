/* -------------------------------------------------
   EXODO | Interacciones livianas
-------------------------------------------------- */

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks?.classList.remove("open");
  });
});

const yearEl = document.querySelector("[data-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealObserver = null;

if (!prefersReducedMotion) {
  revealObserver = new IntersectionObserver(
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

const registerReveal = (elements) => {
  elements.forEach((el) => {
    if (!(el instanceof Element)) return;
    if (el.dataset.reveal === "true") return;
    el.dataset.reveal = "true";
    el.classList.add("reveal");

    if (prefersReducedMotion) {
      el.classList.add("active");
      return;
    }

    revealObserver?.observe(el);
  });
};

const nav = document.querySelector(".nav");
const updateNavState = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 10);
};

const hero = document.querySelector(".hero, .page-hero");
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
if (!prefersReducedMotion) {
  updateParallax();
}
window.addEventListener("scroll", onScroll, { passive: true });

document.addEventListener("DOMContentLoaded", function () {
  registerReveal(document.querySelectorAll("section, h1, h2, h3, h4"));

  function negocioAbierto(hA, mA, hC, mC) {
    const ahora = new Date();
    const horaArgentina = new Date(
      ahora.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
    );

    const minutosActuales = horaArgentina.getHours() * 60 + horaArgentina.getMinutes();
    const apertura = hA * 60 + mA;
    const cierre = hC * 60 + mC;

    return minutosActuales >= apertura && minutosActuales < cierre;
  }

  function ponerEstado(nombre, abierto) {
    const badge = document.querySelector(`[data-status="${nombre}"]`);
    if (!badge) return;

    const text = badge.querySelector(".status-text");
    if (text) {
      text.textContent = abierto ? "Abierto ahora" : "Cerrado";
    } else {
      badge.textContent = abierto ? "Abierto ahora" : "Cerrado";
    }
    badge.classList.add(abierto ? "status-open" : "status-closed");
  }

  ponerEstado("corralon", negocioAbierto(8, 30, 18, 0));
  ponerEstado("constructora", negocioAbierto(8, 30, 21, 0));

  const productList = document.querySelector("#product-list");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const cartWhatsapp = document.querySelector("#cart-whatsapp");

  if (!(productList && cartItems && cartTotal && cartWhatsapp)) return;

  const products = [
    { id: "alambre", name: "Alambre", unit: "Kg" },
    { id: "hierro-6", name: "Hierro del 6", unit: "Barra" },
    { id: "hierro-8", name: "Hierro del 8", unit: "Barra" },
    { id: "hierro-10", name: "Hierro del 10", unit: "Barra" },
    { id: "hierro-12", name: "Hierro del 12", unit: "Barra" },
    { id: "chapa-galv-c27", name: "Chapa galvanizada c27", unit: "Unidad" },
    { id: "chapa-galv-c25", name: "Chapa galvanizada c25", unit: "Unidad" },
    { id: "chapa-cinc-c27", name: "Chapa cincalum c27", unit: "Unidad" },
    { id: "chapa-cinc-c25", name: "Chapa cincalum c25", unit: "Unidad" },
    { id: "chapa-trap-c27", name: "Chapa trapezoidal c27", unit: "Unidad" },
    { id: "chapa-trap-c25", name: "Chapa trapezoidal c25", unit: "Unidad" },
    { id: "perfil-c80-16", name: "Perfil C 80 1.6", unit: "Unidad" },
    { id: "perfil-c80-20", name: "Perfil C 80 2.0", unit: "Unidad" },
    { id: "perfil-c100-16", name: "Perfil C 100 1.6", unit: "Unidad" },
    { id: "perfil-c100-20", name: "Perfil C 100 2.0", unit: "Unidad" },
    { id: "perfil-c120-20", name: "Perfil C 120 2.0", unit: "Unidad" },
    { id: "malla-4-15x15", name: "Malla 4mm 15x15", unit: "Unidad" },
    { id: "malla-5-15x15", name: "Malla 5mm 15x15", unit: "Unidad" },
    { id: "malla-6-15x15", name: "Malla 6mm 15x15", unit: "Unidad" },
    { id: "clavos-2", name: "Clavos 2", unit: "Kg" },
    { id: "clavos-2-1-2", name: "Clavos 2 1/2", unit: "Kg" },
    { id: "cemento-25", name: "Cemento x25kg", unit: "Bolsa" },
    { id: "plasticor-25", name: "Plasticor x25kg", unit: "Bolsa" },
    { id: "fino-weber-25", name: "Fino Weber x25kg", unit: "Bolsa" },
    { id: "pegamento-ceramico-weber", name: "Pegamento p/ ceramico Weber", unit: "Bolsa" },
    { id: "cal-hidratada", name: "Cal hidratada", unit: "Bolsa" },
    { id: "ladrillo-12x18x33", name: "Ladrillos 12x18x33", unit: "Unidad" },
    { id: "ladrillo-8x18x33", name: "Ladrillos 8x18x33", unit: "Unidad" },
    { id: "ladrillo-18x18x33", name: "Ladrillos 18x18x33", unit: "Unidad" },
    { id: "ladrillo-comun", name: "Ladrillos comunes", unit: "Unidad" },
    { id: "ladrillo-comun-sel", name: "Ladrillos comunes/seleccionados", unit: "Unidad" },
    { id: "bovedilla-10", name: "Bovedillas 10mm", unit: "Unidad" },
    { id: "bovedilla-12", name: "Bovedillas 12mm", unit: "Unidad" },
    { id: "viguetas-tensolite", name: "Viguetas Tensolite (1.0 a 5.0 m, cada 20 cm)", unit: "m" },
    { id: "ripio-4mt", name: "Ripio x4mt", unit: "m3" },
    { id: "arena-4mt", name: "Arena x4mt", unit: "m3" },
    { id: "arena-mt", name: "Arena x mt", unit: "m3" },
    { id: "ripio-mt", name: "Ripio x mt", unit: "m3" },
    { id: "tierra-4mt", name: "Tierra x4mt", unit: "m3" },
    { id: "relleno-4mt", name: "Relleno x4mt", unit: "m3" },
    { id: "granza-mt", name: "Granza x mt", unit: "m3" },
    { id: "pvc-110", name: "Cano PVC 110", unit: "Unidad" },
    { id: "codo-110", name: "Codo PVC 110", unit: "Unidad" },
    { id: "curva-110", name: "Curva PVC 110", unit: "Unidad" },
    { id: "pegamento-pvc", name: "Pegamento p/ PVC", unit: "Unidad" },
    { id: "aislantes-5", name: "Aislantes 5mm", unit: "Unidad" },
    { id: "aislantes-10", name: "Aislantes 10mm", unit: "Unidad" },
  ];

  const cart = new Map();

  const parseQty = (rawValue) => {
    const parsed = Number.parseInt(String(rawValue || "").trim(), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  };

  const renderProducts = () => {
    productList.innerHTML = products
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

    registerReveal(productList.querySelectorAll(".product-card"));
  };

  const buildWhatsappMessage = () => {
    if (cart.size === 0) return "Hola, quiero consultar por materiales del corralon.";
    const lines = ["Hola, quiero consultar por estos materiales:"];
    cart.forEach((item) => {
      lines.push(`- ${item.name}: ${item.qty} ${item.unit}`);
    });
    return lines.join("\n");
  };

  const renderCart = () => {
    if (cart.size === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Todavia no agregaste productos.</p>';
    } else {
      cartItems.innerHTML = Array.from(cart.values())
        .map(
          (item) => `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-header">
              <span>${item.name}</span>
              <span>${item.qty} ${item.unit}</span>
            </div>
            <div class="product-meta">Unidad: ${item.unit}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
              <button class="btn btn-outline-dark" data-action="remove" data-id="${item.id}">Quitar</button>
            </div>
          </div>
        `
        )
        .join("");
    }

    cartTotal.textContent = "Sin precios publicados";

    if (cart.size === 0) {
      cartWhatsapp.classList.add("is-disabled");
      cartWhatsapp.href = "https://wa.me/5493815704653";
    } else {
      cartWhatsapp.classList.remove("is-disabled");
      cartWhatsapp.href =
        "https://wa.me/5493815704653?text=" + encodeURIComponent(buildWhatsappMessage());
    }
  };

  productList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.action !== "add") return;

    const id = target.dataset.id;
    const product = products.find((item) => item.id === id);
    if (!product) return;

    const card = target.closest(".product-card");
    const qtyInput = card ? card.querySelector("[data-qty-input]") : null;
    const qty = parseQty(qtyInput instanceof HTMLInputElement ? qtyInput.value : 1);

    const current = cart.get(id);
    if (current) {
      current.qty += qty;
    } else {
      cart.set(id, { ...product, qty });
    }

    renderCart();
  });

  cartItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const action = target.dataset.action;
    const id = target.dataset.id;
    if (!action || !id) return;

    const item = cart.get(id);
    if (!item) return;

    if (action === "increase") item.qty += 1;
    if (action === "decrease") item.qty -= 1;
    if (action === "remove") item.qty = 0;

    if (item.qty <= 0) {
      cart.delete(id);
    }

    renderCart();
  });

  renderProducts();
  renderCart();
});
