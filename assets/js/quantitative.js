(function() {
    'use strict';
  
    const carouselEl = document.getElementById('carousel-quantitative');
    const container = document.querySelector('.quantitative-buttons');
    if (!carouselEl || !container) return;
  
    const quantitativeBtns = document.querySelectorAll('.quantitative-btn');
    if (!quantitativeBtns.length) return;
  
    const backdrop = document.createElement('div');
    backdrop.className = 'quantitative-btn-backdrop';
    container.prepend(backdrop);
  
    function moveBackdrop(index) {
      const activeBtn = quantitativeBtns[index];
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
  
    quantitativeBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (carouselEl.carouselInstance) {
          carouselEl.carouselInstance.goTo(index);
          carouselEl.carouselInstance.resetAutoplay();
        }
      });
    });
  
    carouselEl.addEventListener('carouselChange', (e) => {
      const activeIndex = e.detail.index;
      
      quantitativeBtns.forEach((btn, idx) => {
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
        const activeBtn = document.querySelector('.quantitative-btn.active');
        if (activeBtn) {
          const index = Array.from(quantitativeBtns).indexOf(activeBtn);
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
