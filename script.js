// ===== EmailJS Configuration =====
const EMAILJS_PUBLIC_KEY = 'rTzvuuWtWnl9MTViF';
const EMAILJS_SERVICE_ID = 'service_jze4bti';
const EMAILJS_TEMPLATE_ID = 'template_rtxk8qo';

if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.send-btn');
    const originalText = btn.textContent;

    if (typeof emailjs === 'undefined') {
      btn.textContent = '✗ EmailJS not loaded';
      btn.disabled = true;
      console.error('EmailJS library is not available.');
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);

      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #00ff88, #00ffaa)';
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      btn.textContent = '✗ Failed - Try Again';
      btn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a6f)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }
  });
}

// ===== Typing Animation =====
const typingText = document.getElementById('typing-text');
const roles = [
  'responsive web apps',
  'full stack experiences',
  'AI-powered solutions',
  'scalable digital products',
];

let roleIndex = 0;
let charIndex = 0;
let removing = false;

function typeRole() {
  const current = roles[roleIndex];
  const nextText = removing ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);

  typingText.textContent = nextText;
  charIndex = removing ? charIndex - 1 : charIndex + 1;

  if (!removing && charIndex === current.length) {
    removing = true;
    setTimeout(typeRole, 1400);
    return;
  }

  if (removing && charIndex === 0) {
    removing = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, removing ? 45 : 70);
}

typeRole();

// ===== Reveal Animation =====
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
