/* =====================================================
   Code&Rise — main.js
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 500);
  });
  // fallback in case 'load' already fired / assets slow
  setTimeout(() => preloader && preloader.classList.add('loaded'), 3000);

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing && matchMedia('(pointer:fine)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, .tilt-card, .portfolio-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  } else if (cursorDot && cursorRing) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(l => document.getElementById(l.dataset.target)).filter(Boolean);

  function updateActiveNav() {
    let currentId = sections[0] && sections[0].id;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === currentId);
    });
  }

  /* ---------- Scroll progress + header + back-to-top + timeline ---------- */
  const scrollBar = document.getElementById('scrollProgressBar');
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const progressCircle = document.getElementById('progressCircle');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineEl = document.querySelector('.timeline');
  const RADIUS_CIRC = 100.5;

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollBar) scrollBar.style.width = pct + '%';
    if (header) header.classList.toggle('scrolled', scrollTop > 40);
    if (backToTop) {
      backToTop.classList.toggle('show', scrollTop > 500);
      if (progressCircle) {
        const offset = RADIUS_CIRC - (pct / 100) * RADIUS_CIRC;
        progressCircle.style.strokeDashoffset = offset;
      }
    }

    if (timelineEl && timelineProgress) {
      const rect = timelineEl.getBoundingClientRect();
      const winH = window.innerHeight;
      let filled = (winH * 0.6 - rect.top) / rect.height * 100;
      filled = Math.max(0, Math.min(100, filled));
      timelineProgress.style.height = filled + '%';
    }

    updateActiveNav();
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Particles.js hero background ---------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#ea5b2f', '#0f1f38', '#f07a4f'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true, distance: 140, color: '#0f1f38', opacity: 0.12, width: 1
        },
        move: { enable: true, speed: 1.3, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------- Typed.js hero subtitle ---------- */
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: [
        'Full-Stack Developer',
        'AI Solutions Partner',
        'IT Infrastructure Architect',
        'System Integration Expert'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 400,
      loop: true,
      showCursor: false
    });
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('.count-up');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Vanilla-tilt for service cards ---------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02
    });
  }

  /* ---------- Contact form -> mailto ---------- */
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const contact = document.getElementById('cf-contact').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();

    const body = `이름: ${name}\n연락처: ${contact}\n\n${message}`;
    const mailto = `mailto:jhlee-81@codeandrise.com?subject=${encodeURIComponent('[Code&Rise 문의] ' + subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Visitor counter (today / total) ----------
     Backed by Abacus (abacus.jasoncameron.dev) — a free, no-signup
     hit-counter API. A static page has no server of its own, so the
     "today" and "total" numbers have to live somewhere shared across
     everyone's browser; this API is that shared storage.
     - First visit today  -> "hit" both counters (increments them)
     - Repeat visit today -> "get" only (reads without incrementing),
       tracked via a localStorage flag so refreshing doesn't inflate counts. */
  (function initVisitorCounter() {
    const todayEl = document.getElementById('visitorToday');
    const totalEl = document.getElementById('visitorTotal');
    if (!todayEl || !totalEl) return;

    const API = 'https://abacus.jasoncameron.dev';
    const NAMESPACE = 'codeandrise-com-live';

    const now = new Date();
    const dateKey = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const visitedFlagKey = `cr_visited_${dateKey}`;
    const alreadyVisitedToday = !!localStorage.getItem(visitedFlagKey);
    const mode = alreadyVisitedToday ? 'get' : 'hit';

    const fmt = (n) => Number(n).toLocaleString('ko-KR');
    const cacheTodayKey = `cr_cache_today_${dateKey}`;
    const cacheTotalKey = 'cr_cache_total';

    const cachedToday = localStorage.getItem(cacheTodayKey);
    const cachedTotal = localStorage.getItem(cacheTotalKey);
    if (cachedToday) todayEl.textContent = fmt(cachedToday);
    if (cachedTotal) totalEl.textContent = fmt(cachedTotal);

    const fetchCount = (key) =>
      fetch(`${API}/${mode}/${NAMESPACE}/${key}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => (data && typeof data.value === 'number' ? data.value : null))
        .catch(() => null);

    Promise.all([fetchCount(`day-${dateKey}`), fetchCount('total')]).then(([todayVal, totalVal]) => {
      if (todayVal !== null) {
        todayEl.textContent = fmt(todayVal);
        localStorage.setItem(cacheTodayKey, todayVal);
      } else if (!cachedToday) {
        todayEl.textContent = '—';
      }
      if (totalVal !== null) {
        totalEl.textContent = fmt(totalVal);
        localStorage.setItem(cacheTotalKey, totalVal);
      } else if (!cachedTotal) {
        totalEl.textContent = '—';
      }
      if (!alreadyVisitedToday && (todayVal !== null || totalVal !== null)) {
        localStorage.setItem(visitedFlagKey, '1');
      }
    });
  })();

});
