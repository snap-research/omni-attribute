(function() {
  'use strict';

  const cardData = [
    {
      title: "Semantic Connections between Image Pairs",
      image: "data/methodology/dataset.webp",
      description: "To learn attribute-level representations, our training data consist of semantically linked image pairs annotated with positive and negative attributes that define their relationships through the shared and differing characteristics. This pairing structure explicitly teaches the encoder which visual concepts should be preserved and which should be suppressed."
    },
    {
      title: "Attribute-level Representation Learning",
      image: "data/methodology/losses.webp",
      description: "Our attribute-level representation learning is guided by two complementary objectives: a <em>generative loss</em> (top) to <em>maximize</em> embedding information and encourage the capture of fine-grained, high-fidelity details, and a <em>contrastive loss</em> (bottom) that extracts attribute-specific information while <em>suppressing</em> irrelevant content."
    },
    {
      title: "Model Architecture",
      image: "data/methodology/architecture.webp",
      description: "Our attribute encoder (top) is a LoRA-tuned MLLM followed by a trainable lightweight connector to preserve strong vision-language prior while capable of adapting to our attribute disentanglement task. The image decoder (bottom) is a frozen generator with trainable IP-Adapter modules for personalization."
    },
    {
      title: "Composition of Multiple Attributes",
      image: "data/methodology/composition.webp",
      description: "Motivated by Composable Diffusion, we generalize <em>classifier-free guidance</em> to handle multiple conditioning signals. Specifically, we first evaluate the <em>conditional flow field</em> of each conditional image-attribute pair (top) and then combine them using a linear combination (bottom)."
    }
  ];

  const cards = document.querySelectorAll('.methodology-card');
  const modal = document.getElementById('methodology-modal');
  const modalOverlay = modal?.querySelector('.methodology-modal-overlay');
  const modalTitle = modal?.querySelector('.methodology-modal-title');
  const modalImage = modal?.querySelector('.methodology-modal-image img');
  const modalDescription = modal?.querySelector('.methodology-modal-description');

  if (!modal || cards.length === 0) return;

  function openModal(cardIndex) {
    const data = cardData[cardIndex];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDescription.innerHTML = data.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openModal(index);
    });

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(index);
      }
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();
