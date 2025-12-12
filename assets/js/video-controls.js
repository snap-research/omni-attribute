(function() {
  'use strict';

  const videoContainer = document.getElementById('hero-video-container');
  const video = document.getElementById('hero-video');
  const playBtn = document.getElementById('video-play-btn');
  const controlsOverlay = document.getElementById('video-controls-overlay');

  if (!videoContainer || !video || !playBtn) return;

  let isFullscreen = false;

  videoContainer.addEventListener('mouseleave', () => {
    if (!isFullscreen) {
      video.removeAttribute('controls');
    }
  });

  videoContainer.addEventListener('click', (e) => {
    if (e.target === video || e.target === videoContainer || e.target === controlsOverlay) {
      toggleFullscreen();
    }
  });

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFullscreen();
  });

  function toggleFullscreen() {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }

  function enterFullscreen() {
    videoContainer.classList.add('fullscreen-mode');
    
    video.muted = false;
    video.play();
    
    video.setAttribute('controls', 'controls');
    
    if (controlsOverlay) {
      controlsOverlay.style.display = 'none';
    }
    
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen().catch(err => {
        console.log('Fullscreen request failed:', err);
      });
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
      videoContainer.mozRequestFullScreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    }
    
    isFullscreen = true;
    
    document.body.style.overflow = 'hidden';
    
    document.addEventListener('keydown', handleEscapeKey);
  }

  function exitFullscreen() {
    videoContainer.classList.remove('fullscreen-mode');
    
    video.muted = true;
    
    if (controlsOverlay) {
      controlsOverlay.style.display = '';
    }
    
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.log('Exit fullscreen failed:', err);
      });
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    isFullscreen = false;
    
    document.body.style.overflow = '';
    
    document.removeEventListener('keydown', handleEscapeKey);
  }

  function handleEscapeKey(e) {
    if (e.key === 'Escape' && isFullscreen) {
      exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);

  function handleFullscreenChange() {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (!isCurrentlyFullscreen && isFullscreen) {
      exitFullscreen();
    }
  }

  video.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  video.addEventListener('play', () => {
    if (playBtn) {
      playBtn.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      `;
    }
  });

  video.addEventListener('pause', () => {
    if (playBtn) {
      playBtn.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
    }
  });

  if ('ontouchstart' in window) {
    let touchStartTime = 0;
    
    videoContainer.addEventListener('touchstart', () => {
      touchStartTime = Date.now();
    });
    
    videoContainer.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      
      if (touchDuration < 300) {
        e.preventDefault();
        toggleFullscreen();
      }
    });
  }
})();
