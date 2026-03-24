/* ========================================
   0RESMON Tebex Clone - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Lucide Icons ----
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ---- Countdown Timer ----
  const countdownTarget = new Date();
  countdownTarget.setDate(countdownTarget.getDate() + 10);

  function updateCountdown() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hrs').textContent = String(hrs).padStart(2, '0');
    document.getElementById('countdown-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countdown-secs').textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Copy Discount Code ----
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('RES40').then(() => {
        const icon = copyBtn.querySelector('i');
        icon.className = 'fa-solid fa-check text-green-400 text-xs';
        setTimeout(() => {
          icon.className = 'fa-solid fa-copy text-white/70 text-xs';
        }, 2000);
      });
    });
  }

  // ---- Sticky Navbar ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });

  // ---- Mobile Menu ----
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // ---- Scripts Dropdown ----
  const scriptsBtn = document.getElementById('scripts-dropdown-btn');
  const scriptsDropdown = document.getElementById('scripts-dropdown');
  if (scriptsBtn && scriptsDropdown) {
    scriptsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      scriptsDropdown.classList.toggle('hidden');
    });
  }

  // ---- Currency Dropdown ----
  const currencyBtn = document.getElementById('currency-btn');
  const currencyDropdown = document.getElementById('currency-dropdown');
  const currencyLabel = document.getElementById('currency-label');

  if (currencyBtn && currencyDropdown) {
    currencyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currencyDropdown.classList.toggle('open');
    });

    currencyDropdown.querySelectorAll('button[data-currency]').forEach(btn => {
      btn.addEventListener('click', () => {
        currencyLabel.textContent = btn.dataset.currency;
        currencyDropdown.classList.remove('open');
      });
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    if (scriptsDropdown) scriptsDropdown.classList.add('hidden');
    if (currencyDropdown) currencyDropdown.classList.remove('open');
  });

  // ---- Swiper Product Carousel (continuous smooth scroll) ----
  const productSwiper = new Swiper('.product-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    speed: 8000,
    allowTouchMove: true,
    freeMode: {
      enabled: true,
      momentum: false,
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { spaceBetween: 16 },
      768: { spaceBetween: 20 },
      1024: { spaceBetween: 24 },
    }
  });

  // Force linear easing for continuous smooth motion
  const swiperWrapper = document.querySelector('.product-swiper .swiper-wrapper');
  if (swiperWrapper) {
    swiperWrapper.style.transitionTimingFunction = 'linear';
    const swiperEl = document.querySelector('.product-swiper');
    swiperEl.addEventListener('mouseenter', () => productSwiper.autoplay.stop());
    swiperEl.addEventListener('mouseleave', () => productSwiper.autoplay.start());
  }

  // ---- Review Marquee (GSAP-driven) ----
  const reviewMarquee = document.getElementById('review-marquee');
  const reviewContainer = document.getElementById('review-marquee-container');
  if (reviewMarquee && reviewContainer) {
    const children = Array.from(reviewMarquee.children);
    children.forEach(child => reviewMarquee.appendChild(child.cloneNode(true)));

    const totalWidth = reviewMarquee.scrollWidth / 2;
    const marqueeAnim = gsap.to(reviewMarquee, { x: -totalWidth, duration: 50, ease: 'none', repeat: -1 });

    reviewContainer.addEventListener('mouseenter', () => gsap.to(marqueeAnim, { timeScale: 0.15, duration: 0.6 }));
    reviewContainer.addEventListener('mouseleave', () => gsap.to(marqueeAnim, { timeScale: 1, duration: 0.8 }));
  }

  // ---- Reviews Entrance Animation ----
  const reviewsHeader = document.getElementById('reviews-header');
  if (reviewsHeader) {
    const ratingEl = document.getElementById('reviews-rating');
    const starsEl = document.getElementById('reviews-stars');
    const separator = reviewsHeader.querySelector('.reviews-separator');
    const rtl = gsap.timeline({ scrollTrigger: { trigger: '#reviews', start: 'top 80%', once: true } });

    rtl.from(reviewsHeader.querySelectorAll('p:first-child, h2'), { x: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });

    if (ratingEl) {
      rtl.from(ratingEl, { opacity: 0, duration: 0.4 }, '-=0.3');
      rtl.add(() => {
        gsap.to({ val: 0 }, { val: 4.8, duration: 1.2, ease: 'power2.out', onUpdate: function() { ratingEl.textContent = this.targets()[0].val.toFixed(1); } });
      }, '-=0.3');
    }
    if (starsEl) rtl.from(starsEl.children, { opacity: 0, scale: 0, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' }, '-=0.8');
    if (separator) rtl.from(separator, { scaleX: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    if (reviewContainer) rtl.from(reviewContainer, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- FAQ Search ----
  const faqSearch = document.getElementById('faq-search');
  const faqCount = document.getElementById('faq-count');
  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const query = faqSearch.value.toLowerCase().trim();
      let visible = 0;

      faqItems.forEach(item => {
        const text = item.getAttribute('data-question').toLowerCase();
        const match = !query || text.includes(query);
        item.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      faqCount.textContent = visible + ' answer' + (visible !== 1 ? 's' : '');
    });
  }

  // ---- GSAP Animations ----
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // --- Per-section entrance animations (varied, not uniform) ---

    // Products: slide from left
    gsap.utils.toArray('.anim-slide-left').forEach(el => {
      gsap.from(el, {
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Reviews: fade with scale
    gsap.utils.toArray('.anim-scale-in').forEach(el => {
      gsap.from(el, {
        opacity: 0, scale: 0.97, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Why Choose Us: stagger child cards
    gsap.utils.toArray('.anim-stagger-cards').forEach(section => {
      var cards = section.querySelectorAll('.bento-card');
      if (!cards.length) cards = section.querySelectorAll('.feature-card-glow, .card-bg');
      gsap.from(cards, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true }
      });
    });

    // YouTube: asymmetric entrance — featured from left, side cards stagger from right
    var ytSection = document.getElementById('youtube');
    if (ytSection) {
      var ytFeatured = ytSection.querySelector('.yt-featured');
      var ytSideCards = ytSection.querySelectorAll('.yt-side-card');
      var ytHeader = ytSection.querySelector('.yt-header');

      // Use individual ScrollTriggers to avoid hash-nav timing issues
      if (ytHeader) {
        gsap.from(ytHeader, {
          opacity: 0, x: -25, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: ytSection, start: 'top 85%', once: true }
        });
      }
      if (ytFeatured) {
        gsap.from(ytFeatured, {
          opacity: 0, x: -50, rotation: -0.8, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ytSection, start: 'top 85%', once: true }
        });
      }
      if (ytSideCards.length) {
        gsap.from(ytSideCards, {
          opacity: 0, x: 35, duration: 0.5, ease: 'power2.out', stagger: 0.15,
          scrollTrigger: { trigger: ytSection, start: 'top 85%', once: true }
        });
      }
    }

    // Generic slide-right (other sections)
    gsap.utils.toArray('.anim-slide-right').forEach(el => {
      gsap.from(el, {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // FAQ: fade up then stagger items
    gsap.utils.toArray('.anim-fade-up').forEach(el => {
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: el, start: 'top 85%', once: true,
          onEnter: function() {
            gsap.from(el.querySelectorAll('.faq-item'), {
              opacity: 0, x: -15, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.3,
            });
          }
        }
      });
    });

    // Recent Payments: entries slide in from right as "live feed"
    gsap.utils.toArray('.anim-payment-feed').forEach(section => {
      var entries = section.querySelectorAll('.payment-entry, .payment-entry ~ div');
      gsap.from(entries, {
        opacity: 0, x: 30, duration: 0.5, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true }
      });
    });

    // Discord CTA: scale up from center
    gsap.utils.toArray('.anim-scale-up').forEach(el => {
      gsap.from(el, {
        opacity: 0, scale: 0.94, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Achievement counter animation
    const counterElements = document.querySelectorAll('.counter-value[data-target]');
    counterElements.forEach(el => {
      const target = parseInt(el.dataset.target);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.floor(this.targets()[0].val);
            },
            onComplete: function() {
              el.textContent = target;
            }
          });
        }
      });
    });

    // ---- Hero Entrance Timeline ----
    const heroTL = gsap.timeline({ delay: 0.2 });

    // Line-by-line wipe reveal
    heroTL.to('.hero-line-inner', {
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
    });

    // Subtitle fades in
    heroTL.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

    // Buttons slide in
    heroTL.from('.hero-btn-browse, .hero-btn-discord', {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.2');

    // Light streak sweep
    heroTL.to('.hero-light-streak', {
      x: '240%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0.5);

    // Logo entrance — scale in with overshoot
    heroTL.from('.hero-logos-container img', {
      scale: 0,
      opacity: 0,
      rotation: -15,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.15,
    }, 0.6);

    // ---- Hero logo scroll exit ----
    var heroLogosContainer = document.querySelector('.hero-logos-container');
    if (heroLogosContainer) {
      gsap.to(heroLogosContainer, {
        opacity: 0.3,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'bottom 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      });
    }

    // ---- Organic Dual-Layer Floating ----
    const logoConfigs = [
      { sel: '.hero-logo-float-1', y: -12, x: 5, rot: 4, dur: 4.2, delay: 1.4 },
      { sel: '.hero-logo-float-2', y: -18, x: -8, rot: -3, dur: 5.7, delay: 2.2 },
      { sel: '.hero-logo-float-3', y: -8, x: 4, rot: 1.5, dur: 6.4, delay: 2.9 },
    ];

    logoConfigs.forEach(function(cfg) {
      var el = document.querySelector(cfg.sel);
      if (!el) return;

      // Primary float
      gsap.to(el, {
        y: cfg.y,
        x: cfg.x,
        rotation: cfg.rot,
        duration: cfg.dur,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: cfg.delay,
      });

      // Secondary micro-drift at a different frequency
      gsap.to(el, {
        y: cfg.y * 0.3,
        x: cfg.x * -0.5,
        duration: cfg.dur * 1.6,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: cfg.delay + 1,
      });
    });

    // ---- Mouse Parallax on Logo Wrappers ----
    var heroSection = document.getElementById('hero');
    var parallaxWraps = document.querySelectorAll('.hero-logo-parallax-wrap');

    if (heroSection && parallaxWraps.length) {
      heroSection.addEventListener('mousemove', function(e) {
        var rect = heroSection.getBoundingClientRect();
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var mouseX = e.clientX - rect.left - centerX;
        var mouseY = e.clientY - rect.top - centerY;

        parallaxWraps.forEach(function(wrap) {
          var depth = parseFloat(wrap.dataset.depth);
          gsap.to(wrap, {
            x: mouseX * depth,
            y: mouseY * depth,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      });

      heroSection.addEventListener('mouseleave', function() {
        parallaxWraps.forEach(function(wrap) {
          gsap.to(wrap, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    }

    // ---- Magnetic Buttons ----
    document.querySelectorAll('[data-magnetic]').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.15,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', function() {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });

    // ---- Background parallax on grid sections ----
    document.querySelectorAll('.bg-red-grid, .bg-white-grid').forEach(function(section) {
      gsap.to(section, {
        backgroundPositionY: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });
  }

  // ---- Cursor trail (desktop only) ----
  if (window.matchMedia('(pointer: fine)').matches) {
    var trailDot = document.createElement('div');
    trailDot.className = 'cursor-trail-dot';
    document.body.appendChild(trailDot);

    var trailTimeout;
    document.addEventListener('mousemove', function(e) {
      trailDot.style.opacity = '1';
      trailDot.style.left = e.clientX - 4 + 'px';
      trailDot.style.top = e.clientY - 4 + 'px';

      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(function() {
        trailDot.style.opacity = '0';
      }, 200);
    });
  }

  // ---- Chinese Parade Dragon (cursor-following) ----
  (function() {
    if (window.innerWidth <= 768) return;

    var container = document.getElementById('parade-dragon');
    if (!container) return;

    var SEG_COUNT = 10;
    var HEAD_SIZE = 36;
    var MIN_SIZE = 12;
    var BASE_DUR = 0.6;
    var DUR_STEP = 0.08;
    var FOLLOW_STR = 0.12;
    var OPACITY = 0.55;
    var TRAIL_LEN = SEG_COUNT * 4;

    // Build head decorations using DOM methods (no innerHTML)
    function addHeadDetails(el) {
      var parts = [
        { cls: 'dragon-horn dragon-horn--l' },
        { cls: 'dragon-horn dragon-horn--r' },
        { cls: 'dragon-whisker dragon-whisker--l' },
        { cls: 'dragon-whisker dragon-whisker--r' }
      ];
      parts.forEach(function(p) {
        var span = document.createElement('span');
        span.className = p.cls;
        el.appendChild(span);
      });
    }

    // Build segments
    var segs = [];
    for (var i = 0; i < SEG_COUNT; i++) {
      var el = document.createElement('div');
      el.className = 'dragon-seg';
      var t = i / (SEG_COUNT - 1);
      var size = Math.round(HEAD_SIZE - (HEAD_SIZE - MIN_SIZE) * t);

      if (i === 0) {
        el.classList.add('dragon-seg--head');
        addHeadDetails(el);
      } else if (i === SEG_COUNT - 1) {
        el.classList.add('dragon-seg--tail');
      } else {
        el.classList.add('dragon-seg--body');
        if (i % 2 === 0) el.classList.add('seg-accent');
      }

      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.opacity = '0';
      container.appendChild(el);
      segs.push({ el: el, size: size });
    }

    // Anchor position (bottom-right area)
    var anchorX = window.innerWidth * 0.88;
    var anchorY = window.innerHeight * 0.85;

    // Position trail — stores recent head positions
    var trail = [];
    for (var j = 0; j < TRAIL_LEN; j++) {
      trail.push({ x: anchorX, y: anchorY });
    }

    // GSAP quickTo movers for each segment
    var movers = segs.map(function(seg, idx) {
      var dur = BASE_DUR + idx * DUR_STEP;
      return {
        qx: gsap.quickTo(seg.el, 'left', { duration: dur, ease: 'power3.out' }),
        qy: gsap.quickTo(seg.el, 'top', { duration: dur, ease: 'power3.out' })
      };
    });

    // Mouse state
    var cursorX = anchorX;
    var cursorY = anchorY;
    var mouseActive = false;
    var mouseTimer = null;

    document.addEventListener('mousemove', function(e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      mouseActive = true;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(function() { mouseActive = false; }, 2500);
    });

    // Idle phase for organic wave
    var phase = 0;
    var headX = anchorX;
    var headY = anchorY;

    // Animation loop synced with GSAP ticker
    gsap.ticker.add(function() {
      phase += 0.015;

      // Head target
      if (mouseActive) {
        headX = anchorX + (cursorX - anchorX) * FOLLOW_STR;
        headY = anchorY + (cursorY - anchorY) * FOLLOW_STR;
      } else {
        // Idle: lazy figure-8 drift
        headX = anchorX + Math.sin(phase * 0.7) * 25;
        headY = anchorY + Math.sin(phase * 1.1) * 15;
      }

      // Push head position onto trail
      trail.unshift({ x: headX, y: headY });
      if (trail.length > TRAIL_LEN) trail.pop();

      // Position each segment from trail history
      for (var k = 0; k < SEG_COUNT; k++) {
        var sampleIdx = Math.min(k * 3, trail.length - 1);
        var pos = trail[sampleIdx];

        // Perpendicular wave for undulation
        var waveAmp = mouseActive ? 3 : 8;
        var waveOff = Math.sin(phase * 2.5 + k * 0.7) * waveAmp * (k / SEG_COUNT);

        var nextIdx = Math.min(sampleIdx + 1, trail.length - 1);
        var dx = pos.x - trail[nextIdx].x;
        var dy = pos.y - trail[nextIdx].y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var perpX = -dy / len;
        var perpY = dx / len;

        movers[k].qx(pos.x + perpX * waveOff);
        movers[k].qy(pos.y + perpY * waveOff);
      }

      // Head rotation — face direction of travel
      if (trail.length > 2) {
        var hdx = trail[0].x - trail[2].x;
        var hdy = trail[0].y - trail[2].y;
        var angle = Math.atan2(hdy, hdx) * (180 / Math.PI);
        gsap.set(segs[0].el, { rotation: angle + 90 });
      }
    });

    // Entrance — staggered fade in
    segs.forEach(function(seg, i) {
      gsap.fromTo(seg.el,
        { opacity: 0, scale: 0.3 },
        { opacity: OPACITY, scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 2 + i * 0.06 }
      );
    });
  })();

});
