/* ==========================================================================
   PULSE & IRON ATHLETIC CLUB - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLiveStatus();
  initScheduleFilter();
  initCalculator();
  initPricingToggle();
  initModals();
  initScrollReveal();
  initMobileMenu();
  initStatCounters();
});

/* --------------------------------------------------------------------------
   1. Dumbbell Preloader Handler
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fillBar = document.getElementById('loaderFill');
  const textVal = document.getElementById('loaderPercent');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;
    
    if (fillBar) fillBar.style.width = `${progress}%`;
    if (textVal) textVal.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
        }
      }, 500);
    }
  }, 40);
}

/* --------------------------------------------------------------------------
   2. Live Opening Status Badge
   -------------------------------------------------------------------------- */
function initLiveStatus() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  const now = new Date();
  const hour = now.getHours();

  // Gym Open Hours: 6 AM (6) to 10 PM (22)
  if (hour >= 6 && hour < 22) {
    dot.className = 'status-dot open';
    text.textContent = 'OPEN NOW • 6 AM - 10 PM';
  } else {
    dot.className = 'status-dot closed';
    text.textContent = 'CLOSED • OPENS AT 6 AM';
  }
}

/* --------------------------------------------------------------------------
   3. Interactive Class Schedule Timetable Filter
   -------------------------------------------------------------------------- */
function initScheduleFilter() {
  const filterBtns = document.querySelectorAll('.day-btn');
  const scheduleCards = document.querySelectorAll('.schedule-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedDay = btn.getAttribute('data-day');

      scheduleCards.forEach(card => {
        const cardDays = card.getAttribute('data-days').split(' ');
        if (selectedDay === 'all' || cardDays.includes(selectedDay)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. BMI & Calorie Goal Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
  const calcForm = document.getElementById('bmiForm');
  if (!calcForm) return;

  const heightInput = document.getElementById('calcHeight');
  const weightInput = document.getElementById('calcWeight');
  const ageInput = document.getElementById('calcAge');
  const activitySelect = document.getElementById('calcActivity');

  const bmiValEl = document.getElementById('bmiValue');
  const bmiCatEl = document.getElementById('bmiCategory');
  const caloriesEl = document.getElementById('calcCalories');
  const proteinEl = document.getElementById('calcProtein');

  function calculateFitness() {
    const height = parseFloat(heightInput.value); // in cm
    const weight = parseFloat(weightInput.value); // in kg
    const age = parseInt(ageInput.value) || 25;
    const activity = parseFloat(activitySelect.value) || 1.375;

    if (!height || !weight || height <= 0 || weight <= 0) return;

    // BMI calculation
    const heightMeters = height / 100;
    const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

    // Category determination
    let category = 'Normal';
    let catBg = 'rgba(255, 255, 255, 0.1)';
    let catColor = '#ffffff';

    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Optimal Fitness';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight / Bulking';
    } else {
      category = 'High Muscle/Mass';
    }

    // Basal Metabolic Rate (Mifflin-St Jeor Formula)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const tdee = Math.round(bmr * activity);
    const protein = Math.round(weight * 2.0); // 2.0g per kg for lifting target

    if (bmiValEl) bmiValEl.textContent = bmi;
    if (bmiCatEl) {
      bmiCatEl.textContent = category;
    }
    if (caloriesEl) caloriesEl.textContent = `${tdee} kcal`;
    if (proteinEl) proteinEl.textContent = `${protein} g`;
  }

  heightInput.addEventListener('input', calculateFitness);
  weightInput.addEventListener('input', calculateFitness);
  ageInput.addEventListener('input', calculateFitness);
  activitySelect.addEventListener('change', calculateFitness);

  // Initial run
  calculateFitness();
}

/* --------------------------------------------------------------------------
   5. Membership Pricing Toggle (Monthly vs Annual)
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const toggleSwitch = document.getElementById('pricingSwitch');
  const priceBasic = document.getElementById('priceBasic');
  const pricePro = document.getElementById('pricePro');
  const priceElite = document.getElementById('priceElite');
  const lblMonthly = document.getElementById('lblMonthly');
  const lblAnnual = document.getElementById('lblAnnual');

  if (!toggleSwitch) return;

  toggleSwitch.addEventListener('change', () => {
    const isAnnual = toggleSwitch.checked;

    if (isAnnual) {
      lblAnnual.classList.add('active');
      lblMonthly.classList.remove('active');

      if (priceBasic) priceBasic.innerHTML = '$39 <span>/ month</span>';
      if (pricePro) pricePro.innerHTML = '$69 <span>/ month</span>';
      if (priceElite) priceElite.innerHTML = '$119 <span>/ month</span>';
    } else {
      lblMonthly.classList.add('active');
      lblAnnual.classList.remove('active');

      if (priceBasic) priceBasic.innerHTML = '$49 <span>/ month</span>';
      if (pricePro) pricePro.innerHTML = '$89 <span>/ month</span>';
      if (priceElite) priceElite.innerHTML = '$149 <span>/ month</span>';
    }
  });
}

/* --------------------------------------------------------------------------
   6. Modals (Free Trial Pass & Developer Pitch Deck)
   -------------------------------------------------------------------------- */
function initModals() {
  // Pitch Deck Modal
  const openPitchBtns = document.querySelectorAll('.trigger-pitch-modal');
  const closePitchBtn = document.getElementById('closePitchModal');
  const pitchModal = document.getElementById('pitchModal');

  if (openPitchBtns.length > 0 && pitchModal) {
    openPitchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        pitchModal.classList.add('active');
      });
    });
  }

  if (closePitchBtn && pitchModal) {
    closePitchBtn.addEventListener('click', () => {
      pitchModal.classList.remove('active');
    });
  }

  // Pitch Tabs
  const tabBtns = document.querySelectorAll('.pitch-tab-btn');
  const tabPanes = document.querySelectorAll('.pitch-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Free Pass Modal
  const passBtns = document.querySelectorAll('.trigger-pass-modal');
  const passModal = document.getElementById('passModal');
  const closePassBtn = document.getElementById('closePassModal');
  const passForm = document.getElementById('freePassForm');

  passBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (passModal) passModal.classList.add('active');
    });
  });

  if (closePassBtn && passModal) {
    closePassBtn.addEventListener('click', () => {
      passModal.classList.remove('active');
    });
  }

  // ── Contact Form → WhatsApp ──────────────────────────────────────────────
  const contactForm = document.getElementById('freePassForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('memberName')?.value.trim() || '';
      const email   = document.getElementById('memberEmail')?.value.trim() || '';
      const phone   = document.getElementById('memberPhone')?.value.trim() || '';
      const goal    = document.getElementById('memberGoal')?.value || '';
      const message = document.getElementById('memberMessage')?.value.trim() || '';

      // Replace this number with the gym owner's real WhatsApp number (country code, no + or spaces)
      const GYM_WHATSAPP = '9573329547'; // 🔴 CHANGE THIS to the real gym number

      const text = [
        `👋 *New Inquiry from Pulse & Iron Website*`,
        ``,
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        `*Phone:* ${phone}`,
        `*Fitness Goal:* ${goal}`,
        message ? `*Message:* ${message}` : '',
        ``,
        `_Sent via the gym website contact form._`
      ].filter(Boolean).join('\n');

      const waURL = `https://wa.me/${GYM_WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.open(waURL, '_blank');

      contactForm.reset();
    });
  }

  // ── Free Pass Modal → WhatsApp ────────────────────────────────────────────
  const modalForm = document.getElementById('modalPassForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('modalPassName')?.value.trim() || '';
      const email = document.getElementById('modalPassEmail')?.value.trim() || '';
      const phone = document.getElementById('modalPassPhone')?.value.trim() || '';

      const GYM_WHATSAPP = '9573329547'; // 🔴 CHANGE THIS to the real gym number

      const text = [
        `🎟️ *Free 1-Day Pass Request — Pulse & Iron*`,
        ``,
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        `*Phone:* ${phone}`,
        ``,
        `I'd love to claim my free trial pass! Please confirm my visit.`
      ].join('\n');

      const waURL = `https://wa.me/${GYM_WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.open(waURL, '_blank');

      const passModal = document.getElementById('passModal');
      if (passModal) passModal.classList.remove('active');
      modalForm.reset();
    });
  }

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === pitchModal) pitchModal.classList.remove('active');
    if (e.target === passModal) passModal.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   7. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.program-card, .pricing-card, .trainer-card, .schedule-card, .calc-container, .testimonial-card, .value-card'
  );
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   8. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileCloseBtn');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => overlay.classList.add('open'));
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  }
}

/* --------------------------------------------------------------------------
   9. Animated Stat Counters (count-up on scroll into view)
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counters = [
    { id: 'stat0', target: 1400, suffix: '+', duration: 1800 },
    { id: 'stat1', target: 18, suffix: '+', duration: 1200 },
    { id: 'stat2', target: 99.2, suffix: '%', duration: 1600, isFloat: true },
  ];

  const statItems = document.querySelectorAll('.stat-number');
  if (!statItems.length) return;

  statItems.forEach((el, i) => {
    if (!counters[i]) return;
    el.setAttribute('data-target', counters[i].target);
    el.setAttribute('data-suffix', counters[i].suffix);
    el.setAttribute('data-float', counters[i].isFloat ? '1' : '0');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isFloat = el.getAttribute('data-float') === '1';
        const duration = 1800;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = target * ease;
          el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statItems.forEach(el => observer.observe(el));
}
