  const hamburger = document.getElementById('hamburger');
  const linknav  = document.getElementById('links');

  hamburger.addEventListener('click', () => {
    const isOpen = linknav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Optional: close the menu when a link is tapped (mobile QoL)
  linknav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      linknav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

let firstPage = document.getElementById("firstPage");
let secondPage = document.getElementById("secondPage");
let thirdPage = document.getElementById("thirdPage");
let fourthPage = document.getElementById("fourthPage");

let home = document.getElementById("homeLink");
let team = document.getElementById("teamLink");
let events = document.getElementById("eventsLink");
let contact = document.getElementById("contactLink");

// helper to show one page only
function showPage({first=false, second=false, third=false, fourth=false}) {
  if (firstPage) firstPage.style.display = first ? "block" : "none";
  if (secondPage) secondPage.style.display = second ? "block" : "none";
  if (thirdPage) thirdPage.style.display = third ? "block" : "none";
  if (fourthPage) fourthPage.style.display = fourth ? "block" : "none";
}

home.addEventListener('click', (event) => {
  event.preventDefault();
  showPage({ first: true, second: false, third: false, fourth: false });

  // Wait for the browser to apply layout changes, then scroll
  requestAnimationFrame(() => {
    // second frame to be extra safe across browsers
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});

team.addEventListener('click', (event) => {
  event.preventDefault();
  showPage({ first: false, second: true, third: false, fourth: false });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
});

events.addEventListener('click', (event) => {
  event.preventDefault();
  showPage({ first: false, second: false, third: true, fourth: false });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
});

contact.addEventListener('click', (event) => {
  event.preventDefault();
  showPage({ first: false, second: false, third: false, fourth: true });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
});


document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll("section, header");
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
  
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 100) {
          el.classList.add("revealed");
        } else {
          el.classList.remove("revealed");
        }
      });
    };
  
    // Run on scroll and page load
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const firstImage = document.getElementById("firstImage");
    const carousel = document.querySelector(".carousel");

    function updateCarouselHeight() {
        if (firstImage && carousel) {
            const height = firstImage.offsetHeight;

            if (height > 0) {
                carousel.style.height = `${height}px`;
            } else {
                // Try again after a short delay if height is still 0 (image not loaded yet)
                setTimeout(updateCarouselHeight, 100);
            }
        }
    }

    // If image is already loaded
    if (firstImage.complete) {
        updateCarouselHeight();
    } else {
        // Wait for image to load first
        firstImage.addEventListener("load", updateCarouselHeight);
    }

    // Recalculate on resize
    window.addEventListener("resize", updateCarouselHeight);
});

// === Third page: filters & accordion ===
document.addEventListener('DOMContentLoaded', () => {
  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card-grid .card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          card.style.display = card.classList.contains(filter) ? '' : 'none';
        }
      });
    });
  });

  // Accordion
  const accToggles = document.querySelectorAll('.accordion-toggle');
  accToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = toggle.nextElementSibling;
      if (!panel) return;
      const isOpen = panel.style.display === 'block';
      // close other panels
      document.querySelectorAll('.accordion-panel').forEach(p => p.style.display = 'none');
      if (!isOpen) panel.style.display = 'block';
      else panel.style.display = 'none';
      // optional: smooth scroll into view
      if (!isOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // CTA apply button goes to contact section (if present)
  const openApply = document.getElementById('openApply');
  if (openApply) {
    openApply.addEventListener('click', (e) => {
      // show contact page if your nav script expects that
      if (typeof showPage === 'function') {
        // call the same helper you already added in your nav script
        showPage({ first: false, second: false, third: false, fourth: true });
      }
      // smooth scroll to contact heading if it's there
      const contactHeading = document.getElementById('contactHeading');
      if (contactHeading) contactHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
