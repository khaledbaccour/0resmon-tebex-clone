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

    // YouTube: slide from right
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

    // Achievement counter animation + extras
    const achievementSection = document.getElementById('achievements');
    if (achievementSection) {
      const counterElements = achievementSection.querySelectorAll('.counter-value[data-target]');
      const barFill = document.getElementById('achievement-bar-fill');
      const ringArc = document.getElementById('achievement-ring-arc');

      ScrollTrigger.create({
        trigger: achievementSection,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Animate all counters
          counterElements.forEach(el => {
            const target = parseInt(el.dataset.target);
            gsap.to({ val: 0 }, {
              val: target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function() {
                el.textContent = Math.floor(this.targets()[0].val);
              },
              onComplete: function() {
                el.textContent = target;
              }
            });
          });

          // Progress bar fill
          if (barFill) {
            gsap.to(barFill, { width: '85%', duration: 2, ease: 'power2.out', delay: 0.3 });
          }

          // SVG ring stroke
          if (ringArc) {
            // 327 is full circumference (2*PI*52). Show ~73% = offset of ~88
            gsap.to(ringArc, { strokeDashoffset: 88, duration: 2, ease: 'power2.out', delay: 0.4 });
          }
        }
      });
    }

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

    // ---- Payment "live feed" flash ----
    var paymentEntries = document.querySelectorAll('.payment-entry');
    if (paymentEntries.length) {
      setInterval(function() {
        var randomIdx = Math.floor(Math.random() * paymentEntries.length);
        gsap.fromTo(paymentEntries[randomIdx],
          { backgroundColor: 'rgba(255, 58, 82, 0.05)' },
          { backgroundColor: 'transparent', duration: 1.5, ease: 'power2.out' }
        );
      }, 4000);
    }

    // ---- Nav logo scroll pulse ----
    var navLogo = document.querySelector('#navbar img');
    if (navLogo) {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom 70%',
        once: true,
        onEnter: function() {
          gsap.fromTo(navLogo,
            { scale: 1 },
            { scale: 1.08, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 1 }
          );
        }
      });
    }
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

  // ---- Floating Chinese Dragon ----
  (function() {
    if (window.innerWidth <= 768) return;

    var dragon = document.getElementById('floating-dragon');
    if (!dragon) return;

    // Random waypoint within safe viewport bounds
    function randomPos() {
      return {
        x: gsap.utils.random(50, window.innerWidth - 250),
        y: gsap.utils.random(50, window.innerHeight - 180)
      };
    }

    // Set initial position
    var start = randomPos();
    gsap.set(dragon, { x: start.x, y: start.y });

    // Entrance fade-in
    gsap.fromTo(dragon,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.45, scale: 1, duration: 1.2, ease: 'power2.out', delay: 2.5 }
    );

    // Continuous flight: pick random destination, fly there, repeat
    function flyToNext() {
      var dest = randomPos();
      var dx = dest.x - gsap.getProperty(dragon, 'x');
      var dy = dest.y - gsap.getProperty(dragon, 'y');
      var dist = Math.sqrt(dx * dx + dy * dy);
      var duration = gsap.utils.clamp(4, 10, dist / 80);

      // Flip SVG to face travel direction
      var scaleX = dx < 0 ? -1 : 1;

      gsap.to(dragon, {
        x: dest.x,
        y: dest.y,
        scaleX: scaleX,
        duration: duration,
        ease: 'sine.inOut',
        onComplete: flyToNext
      });
    }

    // Start flying after entrance
    gsap.delayedCall(3.5, flyToNext);

    // Gentle perpetual bob (overlaid on flight path)
    gsap.to(dragon, {
      y: '+=15',
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    // Subtle rotation sway
    gsap.to(dragon, {
      rotation: 5,
      duration: 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  })();

});
