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