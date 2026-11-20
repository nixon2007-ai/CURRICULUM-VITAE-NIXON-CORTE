(function () {
  "use strict";

  var root = document.documentElement;

  // ---------- Menú móvil ----------
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- Rotador de roles (efecto máquina de escribir) ----------
  var roleEl = document.getElementById("roleText");
  var roles = [
    "Tecnologías de la Información",
    "Contabilidad y Auditoría",
    "Soporte técnico y redes",
    "Administración Financiera",
    "Desarrollo web junior"
  ];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (roleEl && !reduceMotion) {
    var r = 0, c = 0, deleting = false;
    (function tick() {
      var word = roles[r];
      roleEl.textContent = word.slice(0, c);
      var delay = deleting ? 35 : 70;

      if (!deleting && c === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && c === 0) {
        deleting = false;
        r = (r + 1) % roles.length;
        delay = 350;
      } else {
        c += deleting ? -1 : 1;
      }
      setTimeout(tick, delay);
    })();
  }

  // ---------- Aparición al hacer scroll ----------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- Enlace activo según la sección visible ----------
  var navAnchors = document.querySelectorAll(".nav__links a");
  var sections = [];
  navAnchors.forEach(function (a) {
    var id = a.getAttribute("href");
    var s = id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    if (s) sections.push({ a: a, s: s });
  });
  function setActive() {
    var y = window.scrollY + 120;
    var current = null;
    sections.forEach(function (o) { if (o.s.offsetTop <= y) current = o; });
    navAnchors.forEach(function (a) { a.classList.remove("is-active"); });
    if (current) current.a.classList.add("is-active");
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // ---------- Filtro de experiencia ----------
  var filterBtns = document.querySelectorAll(".filter");
  var jobs = document.querySelectorAll(".job");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      jobs.forEach(function (job) {
        var show = f === "all" || job.getAttribute("data-cat") === f;
        job.classList.toggle("is-hidden", !show);
        if (show) job.classList.add("is-visible");
      });
    });
  });

  // ---------- Guardar como PDF ----------
  var printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      // Mostrar toda la experiencia antes de imprimir
      jobs.forEach(function (j) { j.classList.remove("is-hidden"); j.classList.add("is-visible"); });
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      window.print();
    });
  }

  // ---------- Año del pie ----------
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
