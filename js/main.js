/* ============================================================
   INVICTA KABELVERLEGUNG — Main JS v3
   ============================================================ */

AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60 });

/* Navbar scroll */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Mobile nav */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* Swiper */
new Swiper('.projekteSwiper', {
    loop: true, spaceBetween: 1, slidesPerView: 1, grabCursor: true, speed: 600,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 600: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

/* Counter animation */
let hasRun = false;
function runCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const start  = performance.now();
        const dur    = 1800;
        const tick   = (now) => {
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
        };
        requestAnimationFrame(tick);
    });
}
const statsObserver = new IntersectionObserver(e => {
    if (e[0].isIntersecting && !hasRun) { hasRun = true; runCounters(); }
}, { threshold: 0.3 });
const stats = document.querySelector('.stats');
if (stats) statsObserver.observe(stats);

/* Hero parallax */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    if (heroBg) heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.12}px)`;
}, { passive: true });
