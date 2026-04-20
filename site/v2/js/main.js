/* ========================================
   INVICTA KABELVERLEGUNG — Main JS
   GSAP + ScrollTrigger Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  initFrameSequence();
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initCounterAnimations();
  initMobileMenu();
  initContactForm();
});


/* --- Navigation --- */
function initNavigation() {
  const nav = document.getElementById('nav');

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 80) {
        nav.classList.add('nav--solid');
      } else if (self.scroll() <= 80) {
        nav.classList.remove('nav--solid');
      }
    }
  });

  // Scroll indicator visibility
  const scrollIndicator = document.querySelector('.hero__scroll');
  if (scrollIndicator) {
    setTimeout(() => scrollIndicator.classList.add('hero__scroll--visible'), 2000);

    ScrollTrigger.create({
      start: 'top -300',
      onEnter: () => scrollIndicator.classList.remove('hero__scroll--visible'),
      onLeaveBack: () => scrollIndicator.classList.add('hero__scroll--visible')
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}


/* --- Hero Animations --- */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero__tag', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .to('.hero__title-line', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.4')
  .to('.hero__subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .to('.hero__actions', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4');

  // Set initial states
  gsap.set('.hero__tag', { y: 20 });
  gsap.set('.hero__title-line', { y: 30 });
  gsap.set('.hero__subtitle', { y: 20 });
  gsap.set('.hero__actions', { y: 20 });

  // Re-run timeline
  tl.restart();
}


/* --- Scroll-Triggered Animations --- */
function initScrollAnimations() {

  // Service Cards — stagger
  gsap.utils.toArray('[data-animate="card"]').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // Fade Right
  gsap.utils.toArray('[data-animate="fade-right"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Fade Left
  gsap.utils.toArray('[data-animate="fade-left"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Fade Up
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Logo Grid
  gsap.utils.toArray('[data-animate="logos"]').forEach(grid => {
    const items = grid.querySelectorAll('.logo-item');
    gsap.from(items, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });
  });

  // Section headers
  gsap.utils.toArray('.section__header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  });
}


/* --- Counter Animation --- */
function initCounterAnimations() {
  gsap.utils.toArray('[data-animate="counter"]').forEach(stat => {
    const numberEl = stat.querySelector('.stat__number');
    const target = parseInt(numberEl.dataset.target, 10);

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            numberEl.textContent = Math.round(this.targets()[0].val);
          }
        });

        gsap.from(stat, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
  });
}


/* --- Mobile Menu --- */
function initMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');

  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.contains('mobile-menu--open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function openMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  burger.classList.add('nav__burger--open');
  menu.classList.add('mobile-menu--open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;
  burger.classList.remove('nav__burger--open');
  menu.classList.remove('mobile-menu--open');
  document.body.style.overflow = '';
}


/* --- Contact Form (basic validation feedback) --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visuelles Feedback
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Gesendet!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
}


/* ========================================
   SCROLL-DRIVEN FRAME SEQUENCE
   Based on 3D Animation Creator Skill
   ======================================== */
function initFrameSequence() {
  const canvas = document.getElementById('frameCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const FRAME_COUNT = 145;
  const frames = [];
  let loadedFrames = 0;
  let currentFrame = -1;
  let targetFrame = 0;
  let animating = false;

  // Loader elements
  const loader = document.getElementById('frameLoader');
  const loaderBar = document.getElementById('loaderBar');

  // Annotation cards
  const cards = document.querySelectorAll('.annotation-card');
  const SNAP_ZONES = [];

  cards.forEach(card => {
    SNAP_ZONES.push({
      show: parseFloat(card.dataset.show),
      hide: parseFloat(card.dataset.hide)
    });
  });

  // --- Canvas resize with Retina support ---
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (currentFrame >= 0) drawFrame(currentFrame);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // --- Cover-fit drawing (fills viewport completely, no gaps) ---
  function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;
    let drawW, drawH, drawX, drawY;

    // Cover-fit for all viewports — image fills canvas completely
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }
    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // V2 — Top-Logo: oben sichtbar am Start, fadet + schrumpft beim Scrollen weg
  const sequenceLogoTop = document.getElementById('sequenceLogoTop');

  // --- Annotation card show/hide + top-logo scroll animation ---
  function updateCards(progress) {
    cards.forEach((card, i) => {
      const zone = SNAP_ZONES[i];
      const visible = progress >= zone.show && progress <= zone.hide;
      card.classList.toggle('visible', visible);
    });

    if (sequenceLogoTop) {
      // Logo full bei progress 0, komplett weg bei progress ~0.35
      const logoProgress = Math.min(1, progress / 0.35);
      const opacity = Math.max(0, 1 - logoProgress);
      const scale = 1 - logoProgress * 0.25;
      const translateY = -logoProgress * 90;
      sequenceLogoTop.style.opacity = opacity.toFixed(3);
      sequenceLogoTop.style.transform =
        `translateX(-50%) translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    }
  }

  // --- Smooth frame interpolation loop ---
  function smoothDraw() {
    if (currentFrame !== targetFrame) {
      // Lerp toward target for smoothness
      if (currentFrame < targetFrame) {
        currentFrame = Math.min(currentFrame + 1, targetFrame);
      } else {
        currentFrame = Math.max(currentFrame - 1, targetFrame);
      }
      drawFrame(currentFrame);
    }
    if (currentFrame !== targetFrame) {
      requestAnimationFrame(smoothDraw);
    } else {
      animating = false;
    }
  }

  // --- Scroll handler: map scroll position to frame ---
  function onScroll() {
    const section = document.querySelector('.hero__sequence');
    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
    targetFrame = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

    updateCards(progress);

    if (!animating) {
      animating = true;
      requestAnimationFrame(smoothDraw);
    }
  }

  // --- Preload all frames ---
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `frames/frame_${String(i).padStart(4, '0')}.jpg`;
    img.onload = () => {
      loadedFrames++;
      const pct = (loadedFrames / FRAME_COUNT) * 100;
      if (loaderBar) loaderBar.style.width = pct + '%';

      if (loadedFrames === FRAME_COUNT) {
        // All frames loaded — hide loader, draw first frame, attach scroll
        if (loader) {
          loader.classList.add('hidden');
          setTimeout(() => loader.style.display = 'none', 600);
        }
        drawFrame(0);
        currentFrame = 0;
        window.addEventListener('scroll', onScroll, { passive: true });
        // Trigger initial position
        onScroll();
      }
    };
    img.onerror = () => {
      loadedFrames++;
      if (loadedFrames === FRAME_COUNT) {
        if (loader) {
          loader.classList.add('hidden');
          setTimeout(() => loader.style.display = 'none', 600);
        }
        drawFrame(0);
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    };
    frames.push(img);
  }
}
