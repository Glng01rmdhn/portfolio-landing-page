// ==========================================
// INTERAKTIVITAS WEBSITE LANDING PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 4. Animasi Otomatis Saat Halaman Di-Scroll (Scroll Reveal)
    const targetElements = document.querySelectorAll(
        'section h2, section p, #achievement-slider > div, #skills .grid > div, #education .space-y-8 > div, #contact form'
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Tambah jeda sedikit antar kartu agar munculnya bergantian (stagger)
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, (index % 4) * 90);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    targetElements.forEach((el) => {
        // Jangan timpa elemen hero yang sudah pakai animasi pembuka
        if (!el.closest('header') && !el.classList.contains('hero-animate')) {
            el.classList.add('reveal-item');
            revealObserver.observe(el);
        }
    });

    // 5. Custom Mouse Pointer Follower (Desktop)
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorRing = document.createElement('div');
        cursorRing.classList.add('custom-cursor-ring');
        document.body.appendChild(cursorRing);

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        // Tangkap posisi mouse
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Gerakan halus mengejar pointer (smooth trailing)
        function animateCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Efek membesar saat pointer menyentuh tombol, link, atau kartu
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, #achievement-slider > div, #skills .grid > div');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
        });
    }


  // 3. Horizontal Slider Controls (Tombol Panah & Mouse Wheel Scroll)
  const slider = document.getElementById("achievement-slider");
  const slideLeftBtn = document.getElementById("slide-left");
  const slideRightBtn = document.getElementById("slide-right");

  if (slider) {
    // Geser saat tombol kiri diklik
    if (slideLeftBtn) {
      slideLeftBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -374, behavior: "smooth" });
      });
    }

    // Geser saat tombol kanan diklik
    if (slideRightBtn) {
      slideRightBtn.addEventListener("click", () => {
        slider.scrollBy({ left: 374, behavior: "smooth" });
      });
    }
  }
  // 1. Toggle Mobile Menu (Hamburger Navigation)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Tutup menu otomatis saat link diklik
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 2. Form Kontak Submit Handling dengan Toast
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Tampilkan Toast Notifikasi Sukses
      if (toast) {
        toast.classList.remove("translate-y-20", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");

        // Sembunyikan kembali setelah 3.5 detik
        setTimeout(() => {
          toast.classList.remove("translate-y-0", "opacity-100");
          toast.classList.add("translate-y-20", "opacity-0");
        }, 3500);
      }

      // Reset Isian Form
      contactForm.reset();
    });
  }
});

// 3. Modal Popup Project Functionality
function openModal(title, description, imgSrc) {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img");

  if (modal && modalTitle && modalDesc && modalImg) {
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modalImg.src = imgSrc;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden"; // Stop scroll saat modal terbuka
  }
}

function closeModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto"; // Mengembalikan scroll
  }
}

// Tutup modal jika user mengklik area luar modal (backdrop)
window.addEventListener("click", (e) => {
  const modal = document.getElementById("project-modal");
  if (e.target === modal) {
    closeModal();
  }
});
