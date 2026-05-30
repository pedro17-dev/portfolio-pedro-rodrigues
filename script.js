// ── PAGE NAVIGATION ──
  function showPage(id) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => initReveal(), 50);
    }
  }

  // ── MOBILE MENU ──
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  function closeMobile() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  // ── SCROLL REVEAL ──
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }

  // ── CONTACT FORM (Formspree) ──
  async function handleSubmit(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/xykoreyj', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.style.color = '#c8f542';
        status.textContent = '✓ Mensagem enviada! Entrarei em contato em breve.';
        btn.textContent = 'Enviado ✓';
        e.target.reset();
      } else {
        throw new Error('Erro no envio');
      }
    } catch (err) {
      status.style.color = '#ff6b6b';
      status.textContent = '✗ Erro ao enviar. Tente pelo WhatsApp ou email diretamente.';
      btn.textContent = 'Enviar mensagem →';
      btn.disabled = false;
    }

    setTimeout(() => {
      btn.textContent = 'Enviar mensagem →';
      btn.disabled = false;
      status.textContent = '';
    }, 6000);
  }

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  const isMobile = () => window.innerWidth < 768;

  document.addEventListener('mousemove', e => {
    if (isMobile()) return;
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(200,245,66,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(200,245,66,0.4)';
    });
  });

  // ── INIT ──
  initReveal();