// ===== Contact Form Handler (Formspree) =====
if (document.getElementById('contactForm')) {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
    const btn = form.querySelector('.send-btn');
    const originalText = btn.textContent;
    const originalStyle = btn.style.background;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // Wait for form response
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #00ff88, #00ffaa)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = originalStyle;
      }, 2000);
    }, 1000);
    
    console.log('📧 Form submitted to Formspree');
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
