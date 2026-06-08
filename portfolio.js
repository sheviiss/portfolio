document.addEventListener('DOMContentLoaded', () => {
  
  /* ── SMOOTH CURSOR TRACKING OVERLAY ── */
  const dot = document.getElementById('dot');
  const ring = document.getElementById('ring');
  let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
  let hasMoved = false;

  document.addEventListener('mousemove', e => {
    hasMoved = true;
    mx = e.clientX; 
    my = e.clientY;
  });

  (function loop(){
    if (hasMoved) {
      dx += (mx - dx) * 0.3;
      dy += (my - dy) * 0.3;
      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
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
        scrollObs.unobserve(e.target);
      }
    });
  }, { 
    threshold: 0.08
  });

  document.querySelectorAll('.rv').forEach(el => scrollObs.observe(el));

  /* ── CURSOR GROW HOVER MODIFIERS ── */
  const hoverSelector = 'button, a, .nlinks a, .pcard, .pcard-link, .acard, .price, .hcard, .sticker';
  
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSelector)) {
      dot.style.width = '18px';  
      dot.style.height = '18px';
      dot.style.backgroundColor = 'transparent';
      dot.style.border = '1.5px solid #c4875a';
      ring.style.width = '46px'; 
      ring.style.height = '46px';
      ring.style.borderColor = '#c4875a';
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSelector)) {
      dot.style.width = '10px';  
      dot.style.height = '10px';
      dot.style.backgroundColor = '#c4875a';
      dot.style.border = 'none';
      ring.style.width = '28px'; 
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(196,135,90,.5)';
    }
  });

  /* ── SCROLL CALCULATOR LINKS ACCURACY ── */
  document.querySelectorAll('.nlinks a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── HAMBURGER MENU CORE TOGGLE TRIGGER FUNCTIONALITY ── */
  const menuBtn = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.m-link, .m-cta');

  if (menuBtn && menuOverlay) {
    // 1. Toggle mobile drawer visibility when clicking the burger button
    menuBtn.addEventListener('click', () => {
      const isOpen = menuOverlay.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      
      // Freezes backpage background scrolling when full panel menu overlay is open
      document.body.style.overflow = isOpen ? 'hidden' : ''; 
    });

    // 2. Auto-close overlay drawer menu instantly when selecting an item target link 
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        
        // Remove tracking switch active view tokens
        menuBtn.classList.remove('active');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Unlocks standard scrolling back immediately

        // Smooth viewport sliding transition sync to target container section anchors
        if (targetHref && targetHref.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(targetHref);
          if (targetSection) {
            const navHeight = document.querySelector('nav').offsetHeight;
            setTimeout(() => {
              window.scrollTo({
                top: targetSection.getBoundingClientRect().top + window.scrollY - navHeight,
                behavior: 'smooth'
              });
            }, 300); // Wait for the drawer panel slide-up translation animation buffer window to clear
          }
        }
      });
    });
  }
  
  /* ── GAP-FREE FLOATING SOCIAL ENGINE CONTEXT ── */
  const widgetContainer = document.querySelector('.social-widget-container');
  const menuPanel = document.querySelector('.social-menu-panel');
  const mainTrigger = document.querySelector('.main-trigger-btn');
  let socialTimeout = null;

  // Function to show and open the widget panel smoothly
  const openSocialMenu = () => {
    if (socialTimeout) clearTimeout(socialTimeout);
    widgetContainer.classList.add('menu-is-active');
  };

  // Function to hide the widget panel with an intentional 200ms buffer window
  const closeSocialMenu = () => {
    socialTimeout = setTimeout(() => {
      widgetContainer.classList.remove('menu-is-active');
      widgetContainer.classList.remove('active-click'); // Reset click fallback state
    }, 200); // 200ms gives your cursor plenty of time to cross visual gaps safely
  };

  // Bind direct hover events to the separate actionable triggers
  mainTrigger.addEventListener('mouseenter', openSocialMenu);
  mainTrigger.addEventListener('mouseleave', closeSocialMenu);
  menuPanel.addEventListener('mouseenter', openSocialMenu);
  menuPanel.addEventListener('mouseleave', closeSocialMenu);

  // Mobile/Tablet Explicit Tap Toggle Fallback Engine
  mainTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetContainer.classList.toggle('active-click');
  });

  document.addEventListener('click', () => {
    widgetContainer.classList.remove('active-click');
    widgetContainer.classList.remove('menu-is-active');
  });

  /* ── LUXURY AUTO-SCROLL PAUSE-ON-HOVER SLIDER MODULE ── */
  const track = document.querySelector('.luxury-slider-track');
  const slides = document.querySelectorAll('.luxury-slide-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const viewportFrame = document.querySelector('.luxury-slider-viewport');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    const maxSlides = slides.length;
    let autoScrollInterval = null;
    const scrollIntervalDuration = 4000; // Time step before advancing slide automatically (4s)

    // Main translate transition executor function
    const updateSliderPosition = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const moveToNextSlide = () => {
      currentIndex = (currentIndex + 1) % maxSlides;
      updateSliderPosition();
    };

    const moveToPrevSlide = () => {
      currentIndex = (currentIndex - 1 + maxSlides) % maxSlides;
      updateSliderPosition();
    };

    // Engine Timer Management Controls
    const startAutoScroll = () => {
      if (!autoScrollInterval) {
        autoScrollInterval = setInterval(moveToNextSlide, scrollIntervalDuration);
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    };

    // Explicit Action Event Hooks
    nextBtn.addEventListener('click', () => {
      stopAutoScroll();
      moveToNextSlide();
      startAutoScroll(); // Safely cycle interval loop timer context back up
    });

    prevBtn.addEventListener('click', () => {
      stopAutoScroll();
      moveToPrevSlide();
      startAutoScroll();
    });

    // Pause on Hover Functional Bindings
    viewportFrame.addEventListener('mouseenter', stopAutoScroll);
    viewportFrame.addEventListener('mouseleave', startAutoScroll);

    // Initial Engine Startup Activation Call
    startAutoScroll();
  }

});
