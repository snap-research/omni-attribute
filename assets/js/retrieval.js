(function () {
  'use strict';

  const carouselEl = document.getElementById('carousel-retrieval');
  const container = document.querySelector('.retrieval-buttons');

  if (!carouselEl || !container) return;

  const retrievalBtns = document.querySelectorAll('.retrieval-btn');
  if (!retrievalBtns.length) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'retrieval-btn-backdrop';
  container.prepend(backdrop);

  function moveBackdrop(index) {
    const activeBtn = retrievalBtns[index];
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

  retrievalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (carouselEl.carouselInstance) {
        carouselEl.carouselInstance.goTo(index);
        carouselEl.carouselInstance.resetAutoplay();
      }
    });
  });

  carouselEl.addEventListener('carouselChange', (e) => {
    const activeIndex = e.detail.index;

    retrievalBtns.forEach((btn, idx) => {
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
      const activeBtn = document.querySelector('.retrieval-btn.active');
      if (activeBtn) {
        const index = Array.from(retrievalBtns).indexOf(activeBtn);
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
