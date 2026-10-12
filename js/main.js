document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
 
  function setMenu(open) {
    navMenu.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
 
  navToggle.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('open'));
  });
 

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
 
 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
  });
 

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) setMenu(false);
});

const header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

   const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
 
  sections.forEach(section => observer.observe(section));

   const track = document.getElementById('sliderTrack');
  const slides = track.children;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('sliderDots');
  let current = 0;
 
  
  const dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }
 
  function goTo(index) {
    
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }
 
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
 
 
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) goTo(diff < 0 ? current + 1 : current - 1);
  }, { passive: true });
 
  goTo(0);

  const faqButtons = document.querySelectorAll('.faq-q');
 
  function closeItem(button) {
    button.setAttribute('aria-expanded', 'false');
    button.nextElementSibling.style.maxHeight = null;
  }
 
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
 
      faqButtons.forEach(closeItem); // close everything first
 
      if (!isOpen) {
        const answer = button.nextElementSibling;
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
 
  function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    document.getElementById(fieldId + 'Error').textContent = message;
    input.classList.toggle('invalid', message !== '');
    return message === '';
  }
 
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = '';
 
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    const nameOk = setError('name', name.length < 2 ? 'Please enter your full name.' : '');
    const emailOk = setError('email', emailPattern.test(email) ? '' : 'Enter a valid email, like name@example.com.');
    const messageOk = setError('message', message.length < 10 ? 'Tell us a little more (at least 10 characters).' : '');
 
    if (nameOk && emailOk && messageOk) {
  
      status.textContent = 'Thanks ' + name.split(' ')[0] + '! We will contact you within one working day.';
      form.reset();
    }
  });
 
  document.getElementById('year').textContent = new Date().getFullYear();
 
});
 