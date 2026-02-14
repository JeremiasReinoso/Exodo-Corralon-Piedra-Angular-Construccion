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

// Smooth scroll for in-page anchors
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

// Dynamic year
const yearEl = document.querySelector("[data-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal (IntersectionObserver)
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

// Navbar scroll state
const nav = document.querySelector(".nav");
const updateNavState = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 10);
};

// Parallax (very subtle) for hero background
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

  const minutosActuales =
    horaArgentina.getHours() * 60 + horaArgentina.getMinutes();

  const apertura = hA * 60 + mA;
  const cierre = hC * 60 + mC;

  return minutosActuales >= apertura && minutosActuales < cierre;
}

const corralon = negocioAbierto(8,30,18,0);
const constructora = negocioAbierto(8,30,21,0);

function ponerEstado(nombre, abierto){
  const badge = document.querySelector(`[data-status="${nombre}"]`);

  if(!badge) return;

  const text = badge.querySelector(".status-text");
  if (text) {
    text.textContent = abierto ? "Abierto ahora" : "Cerrado";
  } else {
    badge.textContent = abierto ? "Abierto ahora" : "Cerrado";
  }
  badge.classList.add(abierto ? "status-open" : "status-closed");
}

ponerEstado("corralon", corralon);
ponerEstado("constructora", constructora);

  const productList = document.querySelector("#product-list");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const cartWhatsapp = document.querySelector("#cart-whatsapp");

  if (productList && cartItems && cartTotal && cartWhatsapp) {
    const products = [
      { id: "alambre", name: "Alambre", unit: "Kg", price: 0 },
      { id: "hierro-6", name: "Hierro del 6", unit: "Barra", price: 0 },
      { id: "hierro-8", name: "Hierro del 8", unit: "Barra", price: 0 },
      { id: "hierro-10", name: "Hierro del 10", unit: "Barra", price: 0 },
      { id: "hierro-12", name: "Hierro del 12", unit: "Barra", price: 0 },
      { id: "chapa-galv-c27", name: "Chapa galvanizada c27", unit: "Unidad", price: 0 },
      { id: "chapa-galv-c25", name: "Chapa galvanizada c25", unit: "Unidad", price: 0 },
      { id: "chapa-cinc-c27", name: "Chapa cincalum c27", unit: "Unidad", price: 0 },
      { id: "chapa-cinc-c25", name: "Chapa cincalum c25", unit: "Unidad", price: 0 },
      { id: "chapa-trap-c27", name: "Chapa trapezoidal c27", unit: "Unidad", price: 0 },
      { id: "chapa-trap-c25", name: "Chapa trapezoidal c25", unit: "Unidad", price: 0 },
      { id: "perfil-c80-16", name: "Perfil C 80 1.6", unit: "Unidad", price: 0 },
      { id: "perfil-c80-20", name: "Perfil C 80 2.0", unit: "Unidad", price: 0 },
      { id: "perfil-c100-16", name: "Perfil C 100 1.6", unit: "Unidad", price: 0 },
      { id: "perfil-c100-20", name: "Perfil C 100 2.0", unit: "Unidad", price: 0 },
      { id: "perfil-c120-20", name: "Perfil C 120 2.0", unit: "Unidad", price: 0 },
      { id: "malla-4-15x15", name: "Malla 4mm 15x15", unit: "Unidad", price: 0 },
      { id: "malla-5-15x15", name: "Malla 5mm 15x15", unit: "Unidad", price: 0 },
      { id: "malla-6-15x15", name: "Malla 6mm 15x15", unit: "Unidad", price: 0 },
      { id: "clavos-2", name: "Clavos 2”", unit: "Kg", price: 0 },
      { id: "clavos-2-1-2", name: "Clavos 2 1/2", unit: "Kg", price: 0 },
      { id: "cemento-25", name: "Cemento x25kg", unit: "Bolsa", price: 0 },
      { id: "plasticor-25", name: "Plasticor x25kg", unit: "Bolsa", price: 0 },
      { id: "fino-weber-25", name: "Fino Weber x25kg", unit: "Bolsa", price: 0 },
      { id: "pegamento-ceramico-weber", name: "Pegamento p/ cerámico Weber", unit: "Bolsa", price: 0 },
      { id: "cal-hidratada", name: "Cal hidratada", unit: "Bolsa", price: 0 },
      { id: "ladrillo-12x18x33", name: "Ladrillos 12x18x33", unit: "Unidad", price: 0 },
      { id: "ladrillo-8x18x33", name: "Ladrillos 8x18x33", unit: "Unidad", price: 0 },
      { id: "ladrillo-18x18x33", name: "Ladrillos 18x18x33", unit: "Unidad", price: 0 },
      { id: "ladrillo-comun", name: "Ladrillos comunes", unit: "Unidad", price: 0 },
      { id: "ladrillo-comun-sel", name: "Ladrillos comunes/seleccionados", unit: "Unidad", price: 0 },
      { id: "bovedilla-10", name: "Bovedillas 10mm", unit: "Unidad", price: 0 },
      { id: "bovedilla-12", name: "Bovedillas 12mm", unit: "Unidad", price: 0 },
      {
        id: "viguetas-tensolite",
        name: "Viguetas Tensolite (1.0 a 5.0 m, cada 20 cm)",
        unit: "m",
        price: 0,
      },
      { id: "ripio-4mt", name: "Ripio x4mt", unit: "m3", price: 0 },
      { id: "arena-4mt", name: "Arena x4mt", unit: "m3", price: 0 },
      { id: "arena-mt", name: "Arena x mt", unit: "m3", price: 0 },
      { id: "ripio-mt", name: "Ripio x mt", unit: "m3", price: 0 },
      { id: "tierra-4mt", name: "Tierra x4mt", unit: "m3", price: 0 },
      { id: "relleno-4mt", name: "Relleno x4mt", unit: "m3", price: 0 },
      { id: "granza-mt", name: "Granza x mt", unit: "m3", price: 0 },
      { id: "pvc-110", name: "Caño PVC 110", unit: "Unidad", price: 0 },
      { id: "codo-110", name: "Codo PVC 110", unit: "Unidad", price: 0 },
      { id: "curva-110", name: "Curva PVC 110", unit: "Unidad", price: 0 },
      { id: "pegamento-pvc", name: "Pegamento p/ PVC", unit: "Unidad", price: 0 },
      { id: "aislantes-5", name: "Aislantes 5mm", unit: "Unidad", price: 0 },
      { id: "aislantes-10", name: "Aislantes 10mm", unit: "Unidad", price: 0 },
    ];

    const priceFormatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

    const cart = new Map();

    const renderProducts = () => {
      productList.innerHTML = products
        .map(
          (product) => `
        <article class="product-card">
          <h4>${product.name}</h4>
          <div class="product-meta">Unidad: ${product.unit}</div>
          <div class="product-price">${priceFormatter.format(product.price)}</div>
          <div class="product-actions">
            <button class="btn btn-outline-dark" data-action="add" data-id="${product.id}">
              Agregar
            </button>
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
        lines.push(
          `- ${item.name} x${item.qty} (${priceFormatter.format(item.price * item.qty)})`
        );
      });
      lines.push(`Total estimado: ${priceFormatter.format(getCartTotal())}`);
      return lines.join("\n");
    };

    const getCartTotal = () => {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
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
              <span>${priceFormatter.format(item.price * item.qty)}</span>
            </div>
            <div class="product-meta">Unidad: ${item.unit}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
              <button class="btn btn-outline-dark" data-action="remove" data-id="${item.id}">
                Quitar
              </button>
            </div>
          </div>
        `
          )
          .join("");
      }

      const totalValue = getCartTotal();
      cartTotal.textContent = priceFormatter.format(totalValue);

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
      const current = cart.get(id);
      if (current) {
        current.qty += 1;
      } else {
        cart.set(id, { ...product, qty: 1 });
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
  }
});
