document.addEventListener('DOMContentLoaded', () => {
  
  /* ── SMOOTH CURSOR FOLLOW INTERACTION ── */
  const dot = document.getElementById('dot');
  const ring = document.getElementById('ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let hasMoved = false;

  // Track pointer only if screen matches normal precision pointers
  document.addEventListener('mousemove', e => {
    hasMoved = true;
    mx = e.clientX; 
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function loop(){
    if (hasMoved) {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(loop);
  })();

  /* ── INTERSECTION OBSERVER FOR SCROLL REVEALS ── */
  const scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
      }
    });
  }, { 
    threshold: 0.05 // Adjusted landing range calculation parameters for smaller screens
  });

  document.querySelectorAll('.rv').forEach(el => scrollObs.observe(el));

  /* ── CURSOR GROW HOVER EFFECT ON UI ELEMENTS ── */
  const hoverElements = document.querySelectorAll('button, a, .bc, .pcard, .acard, .price, .hcard');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '18px';  
      dot.style.height = '18px';
      ring.style.width = '44px'; 
      ring.style.height = '44px';
    });
    
    el.addEventListener('mouseleave', () => {
      dot.style.width = '10px';  
      dot.style.height = '10px';
      ring.style.width = '28px'; 
      ring.style.height = '28px';
    });
  });

  /* ── SMOOTH NAVBAR SCROLL LINKS INTERACTION ACCURACY ── */
  document.querySelectorAll('.nlinks a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});