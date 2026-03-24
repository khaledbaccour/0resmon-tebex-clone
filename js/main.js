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

  // ---- Swiper Product Carousel ----
  const productSwiper = new Swiper('.product-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { spaceBetween: 16 },
      768: { spaceBetween: 20 },
      1024: { spaceBetween: 24 },
    }
  });

  // ---- Review Marquee (clone nodes for seamless loop) ----
  const reviewMarquee = document.getElementById('review-marquee');
  if (reviewMarquee) {
    const children = Array.from(reviewMarquee.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      reviewMarquee.appendChild(clone);
    });
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

    // Section fade-in + slide-up on scroll
    gsap.utils.toArray('.section-animate').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Bento "Why Choose Us" choreographed entrance
    const bentoSection = document.querySelector('#why-choose-us');
    if (bentoSection) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bentoSection,
          start: 'top 80%',
          once: true,
        }
      });
      const discord = bentoSection.querySelector('.bento-discord');
      const perf = bentoSection.querySelector('.bento-perf');
      const easy = bentoSection.querySelector('.bento-easy');
      const tebex = bentoSection.querySelector('.bento-tebex');

      if (discord) tl.from(discord, { y: 40, opacity: 0, duration: 0.7, ease: 'power2.out' });
      if (perf) tl.from(perf, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
      if (easy) tl.from(easy, { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.25');
      if (tebex) tl.from(tebex, { y: 15, opacity: 0, duration: 0.4, ease: 'power1.out' }, '-=0.15');
    }

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
  }

  // ---- Floating Dragon Mascot ----
  var dragon = document.getElementById('dragon-mascot');
  if (dragon && window.innerWidth > 768) {
    // Entrance — fade in after hero settles
    gsap.fromTo(dragon,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 2 }
    );

    // Idle float — primary bob
    var dragonFloat = gsap.to(dragon, {
      y: -14,
      x: 6,
      rotation: 3,
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2.5,
    });

    // Idle float — secondary micro-drift (different frequency = organic feel)
    var dragonDrift = gsap.to(dragon, {
      y: -5,
      x: -4,
      duration: 7.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      delay: 3.5,
    });

    // Cursor following — quickTo for smooth trailing
    var dragonMoveX = gsap.quickTo(dragon, 'x', { duration: 0.7, ease: 'power3.out' });
    var dragonMoveY = gsap.quickTo(dragon, 'y', { duration: 0.7, ease: 'power3.out' });

    var mouseIdleTimer = null;
    var isDragonFollowing = false;

    var clampDragonX = gsap.utils.clamp(-window.innerWidth * 0.4, window.innerWidth * 0.4);
    var clampDragonY = gsap.utils.clamp(-window.innerHeight * 0.4, window.innerHeight * 0.4);

    window.addEventListener('resize', function() {
      clampDragonX = gsap.utils.clamp(-window.innerWidth * 0.4, window.innerWidth * 0.4);
      clampDragonY = gsap.utils.clamp(-window.innerHeight * 0.4, window.innerHeight * 0.4);
    });

    document.addEventListener('mousemove', function(e) {
      // Dragon resting position (CSS: bottom 10%, right 8%)
      var restX = window.innerWidth * 0.92 - 50;
      var restY = window.innerHeight * 0.9 - 50;

      // Move only 15% toward cursor — subtle awareness, not tracking
      var offsetX = (e.clientX - restX) * 0.15;
      var offsetY = (e.clientY - restY) * 0.15;

      dragonMoveX(clampDragonX(offsetX));
      dragonMoveY(clampDragonY(offsetY));

      // Directional tilt
      var tilt = gsap.utils.clamp(-4, 4, offsetX * 0.08);
      gsap.to(dragon, { rotation: tilt, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });

      // Slow idle float while following (don't kill — avoids jarring restart)
      if (!isDragonFollowing) {
        isDragonFollowing = true;
        dragonFloat.timeScale(0.3);
        dragonDrift.timeScale(0.3);
      }

      // Resume idle after 2s of no movement
      clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(function() {
        isDragonFollowing = false;
        dragonFloat.timeScale(1);
        dragonDrift.timeScale(1);
        dragonMoveX(0);
        dragonMoveY(0);
      }, 2000);
    });
  }

});
