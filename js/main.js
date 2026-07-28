// Navegación móvil
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Newsletter (footer)
(function () {
  var form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    var original = btn.textContent;
    btn.textContent = 'Hecho';
    setTimeout(function () { btn.textContent = original; }, 2000);
    form.reset();
  });
})();

// Carrusel de testimonios (Inicio)
// Nota: los controles son <div> con onclick, no son botones reales
// y no reciben foco de teclado.
(function () {
  var slides = document.querySelectorAll('.carousel-slide');
  var dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;
  var current = 0;
  var timer;

  function show(index) {
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
    current = index;
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); resetTimer(); });
  });

  function next() { show((current + 1) % slides.length); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  resetTimer();
})();

// Pestañas de filtro (Carta)
(function () {
  var tabs = document.querySelectorAll('.filter-tab');
  var categories = document.querySelectorAll('.menu-category');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var target = tab.getAttribute('data-filter');
      categories.forEach(function (cat) {
        if (target === 'todos' || cat.getAttribute('data-category') === target) {
          cat.style.display = '';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
})();

// Añadir al carrito
(function () {
  document.querySelectorAll('.btn-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var original = btn.textContent;
      btn.textContent = 'Añadido';
      setTimeout(function () { btn.textContent = original; }, 1500);
    });
  });
})();

// Acordeón (FAQ)
// Los encabezados hacen de disparador (tabindex + Intro), sin role
// ni aria-expanded: no se exponen como control interactivo.
function toggleFaqPanel(trigger) {
  var panel = document.getElementById(trigger.getAttribute('data-target'));
  var willOpen = panel.hidden;
  panel.hidden = !willOpen;
  trigger.classList.toggle('is-active', willOpen);
}
(function () {
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        toggleFaqPanel(trigger);
      }
    });
  });
})();

// Modal de confirmación (Reservas)
// Nota: no gestiona el foco al abrir, no cierra con Escape y el botón
// de cerrar no tiene nombre accesible.
(function () {
  var overlay = document.getElementById('reserva-modal');
  var closeBtn = document.querySelector('.modal-close');
  if (!overlay) return;

  window.openReservaModal = function () {
    overlay.classList.add('is-open');
  };

  function close() {
    overlay.classList.remove('is-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
})();

// Formulario de Reservas
(function () {
  var form = document.getElementById('reserva-form');
  if (!form) return;

  var nombre = document.getElementById('res-nombre');
  var email = document.getElementById('res-email');
  var privacidad = document.getElementById('res-privacidad');

  function clearErrors() {
    form.querySelectorAll('.error-text').forEach(function (el) { el.remove(); });
    form.querySelectorAll('.input-error').forEach(function (el) { el.classList.remove('input-error'); });
    nombre.removeAttribute('aria-invalid');
    nombre.removeAttribute('aria-describedby');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    var valid = true;

    if (!nombre.value.trim()) {
      valid = false;
      nombre.classList.add('input-error');
      var nombreErrId = 'res-nombre-error';
      var nombreErr = document.createElement('span');
      nombreErr.className = 'error-text';
      nombreErr.id = nombreErrId;
      nombreErr.textContent = 'Introduce tu nombre completo.';
      nombre.insertAdjacentElement('afterend', nombreErr);
      nombre.setAttribute('aria-invalid', 'true');
      nombre.setAttribute('aria-describedby', nombreErrId);
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      valid = false;
      email.classList.add('input-error');
      var emailErr = document.createElement('span');
      emailErr.className = 'error-text';
      emailErr.textContent = 'Introduce un correo electrónico válido.';
      email.insertAdjacentElement('afterend', emailErr);
    }

    if (!privacidad.checked) {
      valid = false;
      privacidad.classList.add('input-error');
    }

    if (!valid) return;

    form.hidden = true;
    if (window.openReservaModal) window.openReservaModal();
    form.reset();
  });
})();

// Formulario de Contacto
(function () {
  var form = document.getElementById('contacto-form');
  if (!form) return;
  var successMsg = document.getElementById('contacto-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.classList.add('is-visible');
    form.reset();
  });
})();
