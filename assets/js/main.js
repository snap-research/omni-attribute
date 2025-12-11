(function() {
  'use strict';

  const Utils = {
    debounce(func, wait = 300) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    throttle(func, limit = 100) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    getScrollPosition() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
  };

  const Keyboard = {
    init() {
      let isKeyboard = false;

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          isKeyboard = true;
          document.body.classList.add('keyboard-navigation');
        }
      });

      window.addEventListener('mousedown', () => {
        isKeyboard = false;
        document.body.classList.remove('keyboard-navigation');
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const navMenu = document.getElementById('nav-menu');
          const navToggle = document.getElementById('nav-toggle');
          
          if (navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
          }
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();

    if (Utils.isMobile()) {
      document.body.classList.add('mobile-device');
    }
    if (Utils.isTouchDevice()) {
      document.body.classList.add('touch-device');
    }
  });

  window.OmniAttribute = {
    Utils,
    Keyboard
  };
})();
