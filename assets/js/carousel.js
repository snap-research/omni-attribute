(function() {
  'use strict';

  class Carousel {
    constructor(element) {
      this.carousel = element;
      this.track = this.carousel.querySelector('.carousel-track');
      
      this.originalSlides = Array.from(this.track.children);
      this.slideCount = this.originalSlides.length;
      
      this.prevBtn = this.carousel.querySelector('.carousel-btn-prev');
      this.nextBtn = this.carousel.querySelector('.carousel-btn-next');
      
      this.currentIndex = 1;
      this.isTransitioning = false;
      this.autoplayInterval = null;
      
      this.carousel.carouselInstance = this;
      
      if (this.slideCount > 0) {
        this.init();
      }
    }

    init() {
      const firstClone = this.originalSlides[0].cloneNode(true);
      firstClone.setAttribute('aria-hidden', 'true');
      
      const lastClone = this.originalSlides[this.slideCount - 1].cloneNode(true);
      lastClone.setAttribute('aria-hidden', 'true');
      
      this.track.appendChild(firstClone);
      this.track.insertBefore(lastClone, this.track.firstChild);
      
      this.allSlides = Array.from(this.track.children);
      
      this.track.classList.add('no-transition');
      this.updateTrackPosition();
      this.track.offsetHeight; 
      this.track.classList.remove('no-transition');

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.moveSlide(-1);
          this.resetAutoplay();
        });
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.moveSlide(1);
          this.resetAutoplay();
        });
      }

      this.track.addEventListener('transitionend', () => {
        this.handleTransitionEnd();
      });

      this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopAutoplay();
        } else {
          this.startAutoplay();
        }
      });

      this.startAutoplay();
    }

    moveSlide(direction) {
      if (this.isTransitioning) return;
      
      this.currentIndex += direction;
      this.isTransitioning = true;
      
      this.track.classList.remove('no-transition');
      this.updateTrackPosition();
      this.emitChange();
    }

    goTo(logicalIndex) {
      if (this.isTransitioning) return;

      const targetIndex = logicalIndex + 1;
      
      if (targetIndex === this.currentIndex) return;

      this.currentIndex = targetIndex;
      this.isTransitioning = true;
      
      this.track.classList.remove('no-transition');
      this.updateTrackPosition();
      this.emitChange();
    }

    updateTrackPosition() {
      const translateX = -(this.currentIndex * 100);
      this.track.style.transform = `translateX(${translateX}%)`;
    }

    handleTransitionEnd() {
      this.isTransitioning = false;

      if (this.currentIndex >= this.allSlides.length - 1) {
        this.track.classList.add('no-transition');
        this.currentIndex = 1;
        this.updateTrackPosition();
        this.track.offsetHeight;
        this.track.classList.remove('no-transition');
      }
      
      if (this.currentIndex <= 0) {
        this.track.classList.add('no-transition');
        this.currentIndex = this.allSlides.length - 2;
        this.updateTrackPosition();
        this.track.offsetHeight;
        this.track.classList.remove('no-transition');
      }
    }

    emitChange() {
      let logicalIndex;
      
      if (this.currentIndex === 0) {
        logicalIndex = this.slideCount - 1;
      } else if (this.currentIndex === this.allSlides.length - 1) {
        logicalIndex = 0;
      } else {
        logicalIndex = this.currentIndex - 1;
      }

      const event = new CustomEvent('carouselChange', { 
        detail: { index: logicalIndex } 
      });
      this.carousel.dispatchEvent(event);
    }

    startAutoplay() {
      this.stopAutoplay();
      this.autoplayInterval = setInterval(() => {
        this.moveSlide(1);
      }, 7500);
    }

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(el => new Carousel(el));
  });

})();
