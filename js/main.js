/* ============================================================
   INVICTA KABELVERLEGUNG — Main JS
   ============================================================ */

/* AOS – Scroll animations
   ============================================================ */
AOS.init({
    duration: 680,
    easing: 'ease-out-cubic',
    once: true,
    offset: 70
});

/* Navbar – transparent to solid on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* Mobile nav toggle
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Swiper – project slideshow
   ============================================================ */
const swiper = new Swiper('.projekteSwiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        600:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

/* Counter animation
   ============================================================ */
const counters   = document.querySelectorAll('.stat-number');
let   hasRun     = false;

function runCounters() {
    counters.forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const fps      = 60;
        const steps    = Math.round((duration / 1000) * fps);
        const increment = target / steps;
        let current    = 0;
        let frame      = 0;

        const tick = () => {
            frame++;
            current = Math.min(target, Math.round(increment * frame));
            el.textContent = current;
            if (current < target) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    });
}

const statsSection = document.querySelector('.stats');

const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !hasRun) {
        hasRun = true;
        runCounters();
    }
}, { threshold: 0.25 });

if (statsSection) statsObserver.observe(statsSection);

/* Hero parallax (subtle)
   ============================================================ */
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (!heroBg) return;
    heroBg.style.transform = `translateY(${window.scrollY * 0.14}px)`;
}, { passive: true });

/* Active nav link highlight on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.querySelectorAll('a').forEach(a => {
                a.classList.toggle(
                    'active',
                    a.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));
