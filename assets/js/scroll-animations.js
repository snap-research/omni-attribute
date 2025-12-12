(function() {
  'use strict';

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  function observeElements() {
    const elements = document.querySelectorAll('.fade-in-up, .reveal, .highlights-block, .methodology-block, .comparison-block, .interpretability-block, .section-header');
    elements.forEach(element => observer.observe(element));
  }

  function initStaggerAnimation() {
    const groups = document.querySelectorAll('.highlights-block, .methodology-block, .comparison-block, .interpretability-block');
    
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.fade-in-up');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('active');
            }, index * 100);
          });
        } else {
          const children = entry.target.querySelectorAll('.fade-in-up');
          children.forEach((child) => {
            child.classList.remove('active');
          });
        }
      });
    }, observerOptions);

    groups.forEach(group => staggerObserver.observe(group));
  }

  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
          this.style.opacity = '1';
        }, 50);
      });
    });
  }

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 44px;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (window.scrollY / windowHeight) * 100;
          progressBar.style.width = scrolled + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function respectMotionPreference() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    respectMotionPreference();
    observeElements();
    initStaggerAnimation();
    initLazyLoading();
    initSmoothScroll();
    initScrollProgress();
  });
})();
