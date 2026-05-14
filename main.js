/* ============================================================
   RACKYWEB GLOBAL MEDIA — main.js
   "Where Business Meets Innovation"
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Loading Screen ─────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1800);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  /* ── Custom Cursor ──────────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      const g = document.getElementById('glow');
      if (g) { g.style.left = mx + 'px'; g.style.top = my + 'px'; }
    });
    (function animRing() {
      rx += (mx - rx) * 0.10; ry += (my - ry) * 0.10;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a,button,.btn,.card,.svc-card,.startup-card,.mkt-card,.blog-card,.ai-card,.testi-card,.about-val,.contact-item,.dock-btn,.faq-q,.filter-pill,.partner-logo,.story-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* ── Scroll Progress Bar ────────────────────────────── */
  const scrollBar = document.getElementById('scroll-bar');
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollBar) scrollBar.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Particle Canvas ────────────────────────────────── */
  const canvas = document.getElementById('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COLORS = ['201,168,76', '15,186,118', '245,200,100', '100,200,150', '180,140,60'];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize, { passive: true });

    class P {
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.25; this.vy = -Math.random() * 0.4 - 0.05;
        this.r = Math.random() * 1.4 + 0.3;
        this.a = Math.random() * 0.45 + 0.08;
        this.c = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      constructor() { this.reset(); }
      step() { this.x += this.vx; this.y += this.vy; this.a -= 0.0006; if (this.a <= 0 || this.y < -10) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill(); }
    }
    for (let i = 0; i < 110; i++) { const p = new P(); p.y = Math.random() * H; particles.push(p); }

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.step(); p.draw(); });
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.03 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ── Scroll Reveal ──────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        // Trigger skill fills inside
        e.target.querySelectorAll('[data-fill]').forEach(b => {
          setTimeout(() => { b.style.width = b.dataset.fill + '%'; }, 300);
        });
        // Trigger counters inside
        e.target.querySelectorAll('[data-count]').forEach(el => animCount(el));
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // Standalone counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animCount(el); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
  });

  /* ── Animated Counter ───────────────────────────────── */
  function animCount(el) {
    if (el._done) return; el._done = true;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isFloat = el.dataset.float === 'true';
    const dur = 2200, start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const val = ease * target;
      if (target >= 1000000) el.textContent = (val / 1000000).toFixed(1) + 'M' + suffix;
      else if (target >= 1000) el.textContent = Math.floor(val / 1000) + 'K' + suffix;
      else if (isFloat) el.textContent = val.toFixed(1) + suffix;
      else el.textContent = Math.floor(val) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ── 3D Tilt ────────────────────────────────────────── */
  document.querySelectorAll('.svc-card,.hero-stat-card,.startup-card,.ai-card,.pkg-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── Ripple ─────────────────────────────────────────── */
  window.ripple = function(e) {
    const btn = e.currentTarget;
    const span = document.createElement('span');
    span.classList.add('ripple');
    const r = btn.getBoundingClientRect();
    const s = Math.max(r.width, r.height);
    span.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  /* ── Testimonial Slider ─────────────────────────────── */
  let slideIdx = 0;
  const track = document.getElementById('testi-track');
  window.goSlide = function(n) {
    slideIdx = n;
    const w = window.innerWidth > 900 ? 33.333 : window.innerWidth > 560 ? 50 : 100;
    if (track) track.style.transform = `translateX(-${n * w}%)`;
    document.querySelectorAll('.s-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  };
  setInterval(() => window.goSlide((slideIdx + 1) % 3), 5500);

  /* ── Template / Marketplace Filter ─────────────────── */
  window.filterItems = function(btn, cat) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-cat]').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  };

  /* ── FAQ Accordion ──────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Search Modal ───────────────────────────────────── */
  const searchModal = document.getElementById('search-modal');
  window.openSearch = function() { searchModal?.classList.add('open'); setTimeout(() => document.getElementById('search-input')?.focus(), 100); };
  window.closeSearch = function() { searchModal?.classList.remove('open'); };
  searchModal?.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSearch(); closeAuth(); } if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); } });

  /* ── Auth Modal ─────────────────────────────────────── */
  const authModal = document.getElementById('auth-modal');
  window.openAuth = function() { authModal?.classList.add('open'); };
  window.closeAuth = function() { authModal?.classList.remove('open'); };
  authModal?.addEventListener('click', e => { if (e.target === authModal) closeAuth(); });
  window.switchTab = function(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  };

  /* ── Hamburger ──────────────────────────────────────── */
  window.toggleNav = function() {
    const links = document.querySelector('.nav-links');
    const spans = document.querySelectorAll('.hamburger span');
    const isOpen = links?.style.display === 'flex';
    if (links) links.style.cssText = isOpen ? '' : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(6,6,8,.97);backdrop-filter:blur(22px);padding:24px 20px;gap:8px;border-bottom:1px solid rgba(201,168,76,.2);z-index:999';
    spans[0] && (spans[0].style.transform = isOpen ? '' : 'rotate(45deg) translate(5px,5px)');
    spans[1] && (spans[1].style.opacity = isOpen ? '' : '0');
    spans[2] && (spans[2].style.transform = isOpen ? '' : 'rotate(-45deg) translate(5px,-5px)');
  };

  /* ── Smooth Anchor Scroll ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      // Close mobile nav
      if (window.innerWidth <= 1100) {
        const links = document.querySelector('.nav-links');
        if (links) links.style.cssText = '';
        document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  });

  /* ── Live Countdown ─────────────────────────────────── */
  function updateCountdown(targetDate, prefix) {
    const diff = Math.max(0, new Date(targetDate) - new Date());
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    const el = id => document.getElementById(id);
    if (el(`${prefix}-d`)) {
      el(`${prefix}-d`).textContent = pad(diff / 86400000);
      el(`${prefix}-h`).textContent = pad((diff % 86400000) / 3600000);
      el(`${prefix}-m`).textContent = pad((diff % 3600000) / 60000);
      el(`${prefix}-s`).textContent = pad((diff % 60000) / 1000);
    }
  }
  function tickAll() {
    updateCountdown('2026-05-28T18:00:00Z', 'ev1');
    updateCountdown('2026-06-05T16:00:00Z', 'ev2');
    updateCountdown('2026-06-15T14:00:00Z', 'ev3');
  }
  setInterval(tickAll, 1000); tickAll();

  /* ── Live Activity Feed ─────────────────────────────── */
  const feedItems = [
    { icon: '🎓', bg: '201,168,76', text: '<strong>Emeka O.</strong> enrolled in the Business Mastery program' },
    { icon: '🚀', bg: '15,186,118', text: '<strong>TechVenture NG</strong> just launched their startup page' },
    { icon: '💼', bg: '180,140,60', text: '<strong>Adaora I.</strong> landed a $5K consulting contract' },
    { icon: '⭐', bg: '201,168,76', text: '<strong>BizKit Pro</strong> reached 500 downloads this week' },
    { icon: '🤝', bg: '15,186,118', text: '<strong>InnovatorsHub</strong> signed a new partnership deal' },
    { icon: '📈', bg: '201,168,76', text: '<strong>StartupNG</strong> raised seed funding of ₦2M' },
    { icon: '🏆', bg: '15,186,118', text: '<strong>Chisom A.</strong> won the weekly pitch competition' },
  ];
  let feedIdx = 0;
  setInterval(() => {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;
    const item = feedItems[feedIdx % feedItems.length];
    const el = document.createElement('div');
    el.className = 'activity-item';
    el.style.cssText = 'opacity:0;transform:translateX(-16px);transition:all .4s ease;';
    el.innerHTML = `<div class="activity-avatar" style="background:rgba(${item.bg},.12);">${item.icon}</div><div><div class="activity-text">${item.text}</div><div class="activity-time">Just now</div></div>`;
    feed.prepend(el);
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; }, 50);
    if (feed.children.length > 5) { const last = feed.lastChild; last.style.opacity = '0'; setTimeout(() => last.remove(), 400); }
    feedIdx++;
  }, 6000);

  /* ── Parallax Hero ──────────────────────────────────── */
  const hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
      }
    }, { passive: true });
  }

  /* ── Newsletter Form ────────────────────────────────── */
  const nlForm = document.getElementById('nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg,#0fba76,#2ddc96)';
      nlForm.reset();
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
    });
  }

  /* ── Contact Form ───────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type=submit]');
      btn.textContent = '✓ Message Sent!';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; contactForm.reset(); }, 3500);
    });
  }

});
