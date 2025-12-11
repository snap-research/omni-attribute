(function() {
  'use strict';

  const imageMap = {
    'none': 'data/composability/output_none.webp',
    'vase': 'data/composability/output_vase.webp',
    'material': 'data/composability/output_material.webp',
    'lighting': 'data/composability/output_lighting.webp',
    'material-vase': 'data/composability/output_vase_material.webp',
    'lighting-vase': 'data/composability/output_vase_lighting.webp',
    'lighting-material': 'data/composability/output_material_lighting.webp',
    'lighting-material-vase': 'data/composability/output_vase_material_lighting.webp'
  };

  const selectedAttributes = new Set();

  const highlightsItems = document.querySelectorAll('.highlights-item');
  const outputImage = document.getElementById('output-image');

  if (!outputImage || highlightsItems.length === 0) return;

  highlightsItems.forEach(item => {
    item.addEventListener('click', function() {
      const attribute = this.getAttribute('data-attribute');
      
      if (selectedAttributes.has(attribute)) {
        selectedAttributes.delete(attribute);
        this.classList.remove('selected');
      } else {
        selectedAttributes.add(attribute);
        this.classList.add('selected');
      }
      
      updateOutputImage();
      
      outputImage.classList.add('updating');
      setTimeout(() => {
        outputImage.classList.remove('updating');
      }, 300);
    });

    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-pressed', 'false');
    
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  function updateOutputImage() {
    let imageKey = 'none';
    
    if (selectedAttributes.size > 0) {
      const sortedAttrs = Array.from(selectedAttributes).sort();
      imageKey = sortedAttrs.join('-');
    }
    
    const imagePath = imageMap[imageKey] || imageMap['none'];
    
    outputImage.style.opacity = '0.7';
    
    setTimeout(() => {
      outputImage.src = imagePath;
      outputImage.style.opacity = '1';
    }, 150);

    highlightsItems.forEach(item => {
      const attribute = item.getAttribute('data-attribute');
      item.setAttribute('aria-pressed', selectedAttributes.has(attribute) ? 'true' : 'false');
    });
  }

  function preloadImages() {
    Object.values(imageMap).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadImages();
})();
