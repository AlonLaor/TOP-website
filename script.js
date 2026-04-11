// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animations for grid children
      const parent = entry.target.parentElement;
      const siblings = parent ? Array.from(parent.querySelectorAll('[data-aos]')) : [];
      const staggerIndex = siblings.indexOf(entry.target);
      const delay = staggerIndex * 100;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========================================
// CTA Form Handler — Formspree
// ========================================
const ctaForm = document.getElementById('ctaForm');
const ctaSuccess = document.getElementById('ctaSuccess');

ctaForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = ctaForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending…';

  try {
    const response = await fetch('https://formspree.io/f/mreonyzj', {
      method: 'POST',
      body: new FormData(ctaForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Hide form, show success
      ctaForm.style.display = 'none';
      document.querySelector('.cta-privacy').style.display = 'none';
      ctaSuccess.classList.add('show');
    } else {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Me the Blueprint';
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Me the Blueprint';
    alert('Network error. Please check your connection and try again.');
  }
});

// ========================================
// 3D Card Tilt Effect
// ========================================
document.querySelectorAll('.top-card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -5;
    const rotateY = (x - centerX) / centerX * 5;

    const inner = card.querySelector('.top-card-inner');
    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.top-card-inner');
    inner.style.transform = '';
  });
});

// ========================================
// Parallax on hero orbs
// ========================================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
