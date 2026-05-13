/* =====================================================
   RACKYWEB ACADEMY — main.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
     CUSTOM CURSOR
     ==================================================== */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    const glow = document.getElementById('mouse-glow');
    if (glow) { glow.style.left = mx + 'px'; glow.style.top = my + 'px'; }
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const hoverTargets = 'a,button,.btn,.ai-card,.glass-card,.creator-card,.template-card,.job-item,.event-card,.pkg-card,.lab-cell,.future-card,.dock-btn,.skill-node,.path-card,.lb-row,.activity-item,.filter-btn,.tab-btn,.testimonial-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  /* ====================================================
     SCROLL PROGRESS + NAVBAR
     ==================================================== */
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const prog = document.getElementById('scroll-progress');
    if (prog) prog.style.width = pct + '%';
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ====================================================
     INTERSECTION OBSERVER — REVEALS + COUNTERS + SKILL BARS
     ==================================================== */
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill[data-fill]').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.fill + '%'; }, 220);
        });
        e.target.querySelectorAll('[data-counter]').forEach(el => animCounter(el));
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));

  // Standalone counter elements
  document.querySelectorAll('[data-counter]').forEach(el => {
    const c = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animCounter(el); c.disconnect(); }
    }, { threshold: 0.3 });
    c.observe(el);
  });

  /* ====================================================
     ANIMATED COUNTER
     ==================================================== */
  function animCounter(el) {
    if (el._counted) return; el._counted = true;
    const target   = parseInt(el.dataset.counter);
    const suffix   = el.dataset.suffix || '';
    const duration = 2200;
    const start    = performance.now();
    (function update(now) {
      const t    = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const val  = Math.floor(ease * target);
      if      (target >= 1000000) el.textContent = (val / 1000000).toFixed(1) + 'M' + suffix;
      else if (target >= 1000)    el.textContent = (val / 1000).toFixed(0) + 'K' + suffix;
      else                         el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(update);
    })(start);
  }

  /* ====================================================
     PARTICLE CANVAS
     ==================================================== */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COLORS = ['245,200,66', '16,201,122', '247,65,143', '155,89,245', '251,146,60'];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3; this.vy = -Math.random() * 0.45 - 0.1;
        this.size  = Math.random() * 1.6 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() { this.x += this.vx; this.y += this.vy; this.alpha -= 0.0007; if (this.alpha <= 0 || this.y < -10) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.color},${this.alpha})`; ctx.fill(); }
    }
    for (let i = 0; i < 130; i++) particles.push(new Particle());

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 85) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245,200,66,${0.035 * (1 - d / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ====================================================
     RIPPLE EFFECT
     ==================================================== */
  window.ripple = function(e) {
    const btn  = e.currentTarget;
    const r    = document.createElement('span');
    r.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  };

  /* ====================================================
     3D CARD TILT
     ==================================================== */
  document.querySelectorAll('.ai-card,.pkg-card,.future-card,.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ====================================================
     TESTIMONIAL AUTO-SLIDER
     ==================================================== */
  let slideIdx = 0;
  const track  = document.getElementById('testimonials-track');

  window.goToSlide = function(n) {
    slideIdx = n;
    const pct = window.innerWidth > 900 ? 33.333 : window.innerWidth > 560 ? 50 : 100;
    if (track) track.style.transform = `translateX(-${n * pct}%)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  };
  setInterval(() => window.goToSlide((slideIdx + 1) % 3), 5200);

  /* ====================================================
     TEMPLATE FILTER
     ==================================================== */
  window.filterTemplates = function(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.template-card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  };

  /* ====================================================
     TAB SWITCH
     ==================================================== */
  window.switchTab = function(btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };

  /* ====================================================
     HAMBURGER MENU
     ==================================================== */
  window.toggleMenu = function() {
    const links = document.querySelector('.nav-links');
    const open  = links.style.display === 'flex';
    links.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(8,6,4,0.97);backdrop-filter:blur(22px);padding:26px;gap:12px;border-bottom:1px solid rgba(245,200,66,0.2);z-index:999;';
    const spans = document.querySelectorAll('.hamburger span');
    if (!open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  };

  /* ====================================================
     SMOOTH ANCHOR SCROLL
     ==================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (window.innerWidth <= 860) {
        const links = document.querySelector('.nav-links');
        if (links) links.style.cssText = '';
        document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  });

  /* ====================================================
     LIVE COUNTDOWN — First event
     ==================================================== */
  function updateCountdown() {
    const target = new Date('2026-05-18T18:00:00Z');
    const diff   = Math.max(0, target - new Date());
    const pad    = n => String(Math.floor(n)).padStart(2, '0');
    const d = diff / 86400000;
    const h = (diff % 86400000) / 3600000;
    const m = (diff % 3600000)  / 60000;
    const s = (diff % 60000)    / 1000;
    const el = id => document.getElementById(id);
    if (el('cd1-d')) { el('cd1-d').textContent = pad(d); el('cd1-h').textContent = pad(h); el('cd1-m').textContent = pad(m); el('cd1-s').textContent = pad(s); }
  }
  setInterval(updateCountdown, 1000); updateCountdown();

  /* ====================================================
     LIVE ACTIVITY FEED
     ==================================================== */
  const actItems = [
    { icon:'🎓', bg:'245,200,66', text:'<strong>James W.</strong> enrolled in Full-Stack Bootcamp' },
    { icon:'💡', bg:'251,146,60', text:'<strong>Team Zenith</strong> published a new template' },
    { icon:'⭐', bg:'155,89,245', text:'<strong>NextGen UI Kit</strong> reached 1,000 downloads' },
    { icon:'🚀', bg:'16,201,122', text:'<strong>Mia L.</strong> graduated from the AI course' },
    { icon:'🤖', bg:'56,189,248', text:'<strong>RackyBot</strong> generated 500 components this hour' },
    { icon:'💰', bg:'247,65,143', text:'<strong>Alex R.</strong> made their first $500 on the marketplace' },
    { icon:'🏆', bg:'245,200,66', text:'<strong>DevCrew X</strong> won the weekly challenge' },
  ];
  let actIdx = 0;
  setInterval(() => {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;
    const act  = actItems[actIdx % actItems.length];
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.style.cssText = 'opacity:0;transform:translateX(-20px);transition:all .45s;';
    item.innerHTML = `<div class="activity-avatar" style="background:rgba(${act.bg},0.12);">${act.icon}</div><div><div class="activity-text">${act.text}</div><div class="activity-time">Just now</div></div>`;
    feed.prepend(item);
    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, 50);
    if (feed.children.length > 5) {
      const last = feed.lastChild;
      last.style.opacity = '0';
      setTimeout(() => last.remove(), 450);
    }
    actIdx++;
  }, 5500);

});
