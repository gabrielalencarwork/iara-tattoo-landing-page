/**
 * IARA PIMENTA TATTOO - LANDING PAGE INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * 1. HERO CINEMATIC SCROLL REVEAL (Clean Background on Load)
   * -------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const heroGrid = document.getElementById('heroGrid');
  const scrollPrompt = document.getElementById('scrollPrompt');

  const handleHeroScroll = () => {
    const scrollPos = window.scrollY;

    // Navbar Glass Effect
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Reveal Cards on Scroll down
    if (scrollPos > 30) {
      if (heroGrid) heroGrid.classList.add('revealed');
      if (scrollPrompt) scrollPrompt.classList.add('hidden');
    } else {
      if (heroGrid) heroGrid.classList.remove('revealed');
      if (scrollPrompt) scrollPrompt.classList.remove('hidden');
    }
  };

  window.addEventListener('scroll', handleHeroScroll);
  handleHeroScroll(); // Initial check

  if (scrollPrompt) {
    scrollPrompt.addEventListener('click', () => {
      window.scrollTo({
        top: 260,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------
   * 2. PORTFOLIO FILTERING SYSTEM
   * -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------
   * 3. PORTFOLIO LIGHTBOX MODAL
   * -------------------------------------------------- */
  const modal = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalClose = document.getElementById('modalClose');

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img').src;
      const title = card.querySelector('.portfolio-title').innerText;
      const category = card.querySelector('.portfolio-category').innerText;

      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalCategory.innerText = category;

      modal.classList.add('open');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  /* --------------------------------------------------
   * 4. INTERACTIVE BUDGET CALCULATOR & WHATSAPP GENERATOR
   * -------------------------------------------------- */
  const sizeBtns = document.querySelectorAll('[data-calc="size"]');
  const styleBtns = document.querySelectorAll('[data-calc="style"]');
  const bodyBtns = document.querySelectorAll('[data-calc="body"]');
  const estimateText = document.getElementById('estimateValue');
  const calcWaBtn = document.getElementById('calcWaBtn');

  let selectedSize = 'Pequeno (<5cm)';
  let selectedStyle = 'Floral & Botânico';
  let selectedBody = 'Braço / Antebraço';

  const updateEstimate = () => {
    let estMin = 150;
    let estMax = 250;

    if (selectedSize.includes('5-10cm')) { estMin = 280; estMax = 450; }
    if (selectedSize.includes('10-15cm')) { estMin = 480; estMax = 750; }
    if (selectedSize.includes('>15cm')) { estMin = 800; estMax = 1400; }

    if (selectedStyle.includes('Exclusiva')) { estMin += 100; estMax += 150; }

    estimateText.innerText = `R$ ${estMin} - R$ ${estMax}*`;

    // Format WhatsApp Link
    const phone = "5538999999999"; // Replace with artist whatsapp
    const message = `Olá Iara! Fiz uma simulação pelo site de uma tattoo:\n\n✨ *Estilo:* ${selectedStyle}\n📏 *Tamanho:* ${selectedSize}\n📍 *Local:* ${selectedBody}\n\nGostaria de agendar meu orçamento!`;

    calcWaBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const setupSelectionGroup = (buttons, callback) => {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        callback(btn.getAttribute('data-value'));
        updateEstimate();
      });
    });
  };

  setupSelectionGroup(sizeBtns, (val) => selectedSize = val);
  setupSelectionGroup(styleBtns, (val) => selectedStyle = val);
  setupSelectionGroup(bodyBtns, (val) => selectedBody = val);

  updateEstimate(); // Initial setup

  /* --------------------------------------------------
   * 5. CARE INSTRUCTIONS TABS
   * -------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  /* --------------------------------------------------
   * 6. FAQ ACCORDION
   * -------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
