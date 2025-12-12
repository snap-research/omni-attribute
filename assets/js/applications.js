(function() {
    'use strict';
  
    const carouselEl = document.getElementById('carousel-applications');
    const container = document.querySelector('.applications-buttons');
    if (!carouselEl || !container) return;
  
    const applicationBtns = document.querySelectorAll('.application-btn');
    if (!applicationBtns.length) return;
  
    const backdrop = document.createElement('div');
    backdrop.className = 'application-btn-backdrop';
    container.prepend(backdrop);
  
    function moveBackdrop(index) {
      const activeBtn = applicationBtns[index];
      if (!activeBtn) return;
  
      const x = activeBtn.offsetLeft;
      const y = activeBtn.offsetTop;
      const width = activeBtn.offsetWidth;
      const height = activeBtn.offsetHeight;
  
      backdrop.style.transform = `translate(${x}px, ${y}px)`;
      backdrop.style.width = `${width}px`;
      backdrop.style.height = `${height}px`;
      backdrop.style.opacity = '1';
    }
  
    applicationBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (carouselEl.carouselInstance) {
          carouselEl.carouselInstance.goTo(index);
          carouselEl.carouselInstance.resetAutoplay();
        }
      });
    });
  
    carouselEl.addEventListener('carouselChange', (e) => {
      const activeIndex = e.detail.index;
      
      applicationBtns.forEach((btn, idx) => {
        if (idx === activeIndex) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
  
      moveBackdrop(activeIndex);
    });
  
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const activeBtn = document.querySelector('.application-btn.active');
        if (activeBtn) {
          const index = Array.from(applicationBtns).indexOf(activeBtn);
          backdrop.style.transition = 'none';
          moveBackdrop(index);
          setTimeout(() => {
              backdrop.style.transition = '';
          }, 50);
        }
      }, 100);
    });
  
    setTimeout(() => {
      moveBackdrop(0);
    }, 50);
  
  })();
