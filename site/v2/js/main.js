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

  // Browser-Scroll-Restoration deaktivieren — wir wollen immer oben starten
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const ctx = canvas.getContext('2d');
  // Hochwertiges Downsampling — essentiell für HD-Frames auf Retina-Displays
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const FRAME_COUNT = 145;
  const frames = [];
  let loadedFrames = 0;
  let currentFrame = -1;
  let animating = false;

  // Loader elements
  const loader = document.getElementById('frameLoader');
  const loaderBar = document.getElementById('loaderBar');

  // Mobile-Detection — entscheidet zwischen cover-fit (Desktop) und contain-fit (Mobile)
  let isMobile = window.innerWidth <= 768;

  // --- Canvas resize with Retina support ---
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    isMobile = window.innerWidth <= 768;
    // imageSmoothing muss nach Canvas-Resize neu gesetzt werden
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (currentFrame >= 0) drawFrame(currentFrame);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // --- Frame drawing: contain-fit auf Mobile (Full-Scene sichtbar), cover-fit Desktop ---
  function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;
    let drawW, drawH, drawX, drawY;

    if (isMobile) {
      // contain-fit: komplettes Frame sichtbar, aspect-correct, kein Crop
      if (canvasRatio > imgRatio) {
        drawH = ch;
        drawW = ch * imgRatio;
      } else {
        drawW = cw;
        drawH = cw / imgRatio;
      }
    } else {
      // cover-fit: füllt gesamten Canvas, schneidet bei Bedarf
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }
    }
    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // V2 — Top-Logo: oben sichtbar am Start, fadet + schrumpft beim Scrollen weg
  const sequenceLogoTop = document.getElementById('sequenceLogoTop');
  const heroSection = document.querySelector('.hero__sequence');

  // Progress wird smooth Richtung targetProgress gelerpt — für flüssige Animationen
  let targetProgress = 0;
  let currentProgress = 0;
  let lastLogoOpacity = -1;

  // Timing-Phasen (progress 0..1 über den sticky Scroll-Bereich):
  //   0.00 – 0.14  Intro-Hold  → Logo voll sichtbar, Frame 0
  //   0.14 – 0.62  Animation   → Frames 0..MAX, Logo fadet weg (0.14-0.34)
  //   0.62 – 1.00  End-Hold    → finaler Frame bleibt sichtbar
  const FRAME_START = 0.14;
  const FRAME_END = 0.62;
  const LOGO_FADE_END = 0.34;

  function renderProgressOverlay(progress) {
    if (!sequenceLogoTop) return;
    // Logo voll sichtbar bis FRAME_START, fadet dann bis LOGO_FADE_END aus
    const fadeProgress = Math.min(1, Math.max(0, (progress - FRAME_START) / (LOGO_FADE_END - FRAME_START)));
    const eased = 1 - Math.pow(1 - fadeProgress, 3);
    const opacity = 1 - eased;
    const scale = 1 - eased * 0.25;
    const translateY = -eased * 90;

    if (Math.abs(opacity - lastLogoOpacity) > 0.002) {
      sequenceLogoTop.style.opacity = opacity.toFixed(3);
      sequenceLogoTop.style.transform =
        `translate3d(-50%, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      lastLogoOpacity = opacity;
    }
  }

  function tick() {
    const LERP = 0.2;
    const progressDiff = targetProgress - currentProgress;

    if (Math.abs(progressDiff) > 0.0005) {
      currentProgress += progressDiff * LERP;
    } else {
      currentProgress = targetProgress;
    }

    // Frame 0 während Intro-Hold, animiert zwischen FRAME_START..FRAME_END, dann gehalten
    let frameProgress;
    if (currentProgress <= FRAME_START) {
      frameProgress = 0;
    } else if (currentProgress >= FRAME_END) {
      frameProgress = 1;
    } else {
      frameProgress = (currentProgress - FRAME_START) / (FRAME_END - FRAME_START);
    }
    const newTarget = Math.min(FRAME_COUNT - 1, Math.floor(frameProgress * FRAME_COUNT));
    if (newTarget !== currentFrame) {
      currentFrame = newTarget;
      drawFrame(currentFrame);
    }

    renderProgressOverlay(currentProgress);

    if (currentProgress !== targetProgress) {
      requestAnimationFrame(tick);
    } else {
      animating = false;
    }
  }

  // --- Scroll handler: setzt nur targetProgress, Rest macht rAF-Loop ---
  function onScroll() {
    const rect = heroSection.getBoundingClientRect();
    const scrollableHeight = heroSection.offsetHeight - window.innerHeight;
    targetProgress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
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
        // Alle Frames geladen — Scroll auf 0 zwingen, Loader ausblenden,
        // Frame 0 zeichnen, erst DANN Scroll-Listener anhängen
        window.scrollTo(0, 0);
        if (loader) {
          loader.classList.add('hidden');
          setTimeout(() => loader.style.display = 'none', 600);
        }
        drawFrame(0);
        currentFrame = 0;
        targetProgress = 0;
        currentProgress = 0;
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    };
    img.onerror = () => {
      loadedFrames++;
      if (loadedFrames === FRAME_COUNT) {
        window.scrollTo(0, 0);
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
