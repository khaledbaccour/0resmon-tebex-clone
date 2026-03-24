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

    // Hero logo floating (enhanced with GSAP)
    gsap.utils.toArray('.hero-logo-float-1, .hero-logo-float-2, .hero-logo-float-3').forEach((logo, i) => {
      gsap.to(logo, {
        y: -15 - (i * 5),
        rotation: 2 + i,
        duration: 3 + i * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });
  }

});
