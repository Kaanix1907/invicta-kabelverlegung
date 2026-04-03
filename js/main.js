/* ============================================================
   INVICTA KABELVERLEGUNG — Main JS v6
   Dark Electric · Cable Animations
   ============================================================ */

AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 80 });

/* ============================================================
   NAVBAR SCROLL
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ============================================================
   SWIPER
   ============================================================ */
new Swiper('.projekteSwiper', {
    loop: true, spaceBetween: 1, slidesPerView: 1,
    grabCursor: true, speed: 700,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 600: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

/* ============================================================
   HERO PARALLAX
   ============================================================ */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight)
        heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.08}px)`;
}, { passive: true });

/* ============================================================
   SCROLL CABLE PROGRESS
   ============================================================ */
const cableFill    = document.getElementById('cableFill');
const cpElectron   = document.getElementById('cpElectron');

window.addEventListener('scroll', () => {
    const docH     = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / docH, 1);
    if (cableFill)  cableFill.style.height  = `${progress * 100}%`;
    if (cpElectron) cpElectron.style.top    = `${progress * 94}%`;
}, { passive: true });

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
let counterDone = false;
function runCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const start  = performance.now();
        const dur    = 2400;
        const tick   = (now) => {
            const p     = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.floor(eased * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        };
        requestAnimationFrame(tick);
    });
}
const statsObserver = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !counterDone) { counterDone = true; runCounters(); }
}, { threshold: 0.3 });
const statsEl = document.querySelector('.stats');
if (statsEl) statsObserver.observe(statsEl);

/* ============================================================
   SECTION CONNECTOR — draw on scroll
   ============================================================ */
const connectorObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const line = e.target.querySelector('.sc-line');
            if (line) line.classList.add('drawn');
            connectorObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-connector').forEach(sc => {
    connectorObserver.observe(sc);
});

/* ============================================================
   CANVAS CABLE NETWORK — Hero Background
   ============================================================ */
const canvas = document.getElementById('cableCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId;

    /* Cable path definitions — normalized coords (0–1) */
    const cableDefs = [
        { pts: [0.00, 0.30,  0.30, 0.60,  0.60, 0.18,  1.05, 0.38], spd: 0.00070, w: 1.2, dim: 0.07 },
        { pts: [0.18, 0.00,  0.38, 0.32,  0.52, 0.72,  0.88, 1.05], spd: 0.00100, w: 0.9, dim: 0.05 },
        { pts: [1.05, 0.58,  0.72, 0.38,  0.42, 0.82, -0.05, 0.68], spd: 0.00085, w: 1.0, dim: 0.06 },
        { pts: [-0.05, 0.78,  0.32, 0.52,  0.68, 0.88,  1.05, 0.20], spd: 0.00060, w: 1.5, dim: 0.08 },
        { pts: [0.52, -0.05,  0.62, 0.42,  0.28, 0.64,  0.42, 1.05], spd: 0.00130, w: 0.8, dim: 0.05 },
        { pts: [0.80, 0.00,  0.65, 0.35,  0.85, 0.65,  0.95, 1.05], spd: 0.00055, w: 0.9, dim: 0.04 },
    ];

    /* Cubic bezier point at t */
    function bezier(pts, t) {
        const [x0,y0,x1,y1,x2,y2,x3,y3] = pts;
        const u = 1 - t;
        return {
            x: (u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3) * W,
            y: (u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3) * H
        };
    }

    /* Draw a cable path */
    function drawCable(c) {
        const pts = c.pts;
        ctx.beginPath();
        ctx.moveTo(pts[0]*W, pts[1]*H);
        ctx.bezierCurveTo(pts[2]*W, pts[3]*H, pts[4]*W, pts[5]*H, pts[6]*W, pts[7]*H);
        ctx.strokeStyle = `rgba(27,106,255,${c.dim})`;
        ctx.lineWidth   = c.w;
        ctx.stroke();
    }

    /* Electron particle */
    class Electron {
        constructor(cable, offset = 0) {
            this.cable    = cable;
            this.t        = offset;
            this.trail    = [];
            this.maxTrail = 28;
            this.bright   = Math.random() > 0.82; // rare high-voltage pulse
            this.speed    = cable.spd * (0.8 + Math.random() * 0.5);
        }

        update() {
            this.t += this.speed;
            if (this.t > 1.05) { this.t = -0.05; this.bright = Math.random() > 0.82; }

            const clamped = Math.max(0, Math.min(1, this.t));
            if (this.t >= 0 && this.t <= 1)
                this.trail.unshift(bezier(this.cable.pts, clamped));
            if (this.trail.length > this.maxTrail)
                this.trail.pop();
        }

        draw() {
            if (!this.trail.length) return;
            const head = this.trail[0];

            /* Glow halo around head */
            const haloSize = this.bright ? 14 : 9;
            const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, haloSize);
            g.addColorStop(0, this.bright ? 'rgba(100,210,255,0.45)' : 'rgba(27,106,255,0.28)');
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(head.x, head.y, haloSize, 0, Math.PI * 2);
            ctx.fill();

            /* Trail */
            for (let i = 0; i < this.trail.length; i++) {
                const alpha = (1 - i / this.trail.length) * (this.bright ? 0.95 : 0.65);
                const size  = (1 - i / this.trail.length) * (this.bright ? 2.4 : 1.6);
                const pt    = this.trail[i];
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
                ctx.fillStyle = this.bright
                    ? `rgba(140,220,255,${alpha})`
                    : `rgba(60,130,255,${alpha})`;
                ctx.fill();
            }
        }
    }

    /* Build particle list — 2–3 per cable, staggered start positions */
    let electrons = [];
    function initElectrons() {
        electrons = [];
        cableDefs.forEach(c => {
            const count = 2 + (Math.random() > 0.5 ? 1 : 0);
            for (let i = 0; i < count; i++)
                electrons.push(new Electron(c, i / count));
        });
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        initElectrons();
    }

    function render() {
        ctx.clearRect(0, 0, W, H);

        /* Draw cable infrastructure */
        cableDefs.forEach(drawCable);

        /* Update and draw electrons */
        electrons.forEach(e => { e.update(); e.draw(); });

        rafId = requestAnimationFrame(render);
    }

    /* Pause canvas when hero is not visible */
    const heroSection = document.querySelector('.hero');
    const heroVis = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
            if (!rafId) render();
        } else {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    });
    if (heroSection) heroVis.observe(heroSection);

    window.addEventListener('resize', () => { resize(); }, { passive: true });
    resize();
    render();
}

/* ============================================================
   MAGNETIC HOVER — Service Cards
   ============================================================ */
document.querySelectorAll('.leistung-card').forEach((card, i, all) => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `translateY(-4px) translate(${x*5}px, ${y*5}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        all.forEach(c => { c.style.opacity = ''; });
    });

    card.addEventListener('mouseenter', () => {
        all.forEach((c, j) => {
            if (i !== j) c.style.opacity = '0.55';
        });
    });
});
