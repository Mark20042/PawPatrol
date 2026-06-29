const header = document.getElementById("my-navbar");

// word changing animation
document.addEventListener("DOMContentLoaded", function () {
  const words = ["Healthier", "Happier", "Better"];
  let currentIndex = 0;
  const wordElement = document.getElementById("changing-word");

  if (wordElement) {
    setInterval(() => {
      wordElement.classList.remove("translate-y-0", "opacity-100");
      wordElement.classList.add("-translate-y-full", "opacity-0");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        wordElement.textContent = words[currentIndex];

        wordElement.classList.remove(
          "transition-all",
          "duration-500",
          "-translate-y-full",
        );
        wordElement.classList.add("translate-y-full");

        void wordElement.offsetWidth;

        wordElement.classList.add("transition-all", "duration-500");
        wordElement.classList.remove("translate-y-full", "opacity-0");
        wordElement.classList.add("translate-y-0", "opacity-100");
      }, 300);
    }, 3000);
  }
});

// When the user scrolls down 20px from the top of the document, change the navbar background
window.addEventListener("scroll", () => {
  // When the user scrolls more than 20 pixels down
  if (window.scrollY > 20) {
    header.classList.remove("bg-transparent", "py-4");
    header.classList.add("bg-white/95", "backdrop-blur-sm", "py-3");
  } else {
    // Revert back to transparent when at the top
    header.classList.add("bg-transparent", "py-4", "border-transparent");
    header.classList.remove(
      "bg-white/95",
      "backdrop-blur-sm",
      "py-3",
      "shadow-md",
      "border-slate-200",
    );
  }
});
// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove("scale-y-0", "opacity-0");
    mobileMenu.classList.add("scale-y-100", "opacity-100");
    mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    mobileMenu.classList.remove("scale-y-100", "opacity-100");
    mobileMenu.classList.add("scale-y-0", "opacity-0");
    mobileMenuBtn.innerHTML =
      '<i data-lucide="menu" class="w-6 h-6"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleMenu);
}

// Close menu when clicking a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});

// Google Form Modal Logic
async function openGoogleForm(url, title) {

  //if mobile device, redirect to mobile form page
  if (window.matchMedia("(max-width: 768px)").matches) {
    const mobileFormUrl = `mobile-form.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.location.href = mobileFormUrl;
    return;
  }

  let googleFormModal = document.getElementById("google-form-modal");


  if (!googleFormModal) {
    try {
      const response = await fetch('modal.html');
      const html = await response.text();
      document.body.insertAdjacentHTML('beforeend', html);
      googleFormModal = document.getElementById("google-form-modal");

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    } catch (error) {
      console.error('Error loading modal:', error);
      return;
    }
  }

  const modalContent = googleFormModal.querySelector(
    ".modal-content-container",
  );
  const modalTitle = googleFormModal.querySelector("h3");
  const modalIframe = googleFormModal.querySelector("iframe");

  modalTitle.textContent = title;
  modalIframe.src = url;

  googleFormModal.classList.remove("opacity-0", "pointer-events-none");
  void googleFormModal.offsetWidth;
  modalContent.classList.remove("scale-95");
  modalContent.classList.add("scale-100");
  document.body.style.overflow = "hidden";
}

function closeGoogleForm() {
  const googleFormModal = document.getElementById("google-form-modal");
  const modalContent = googleFormModal.querySelector(
    ".modal-content-container",
  );
  googleFormModal.classList.add("opacity-0", "pointer-events-none");
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-95");
  document.body.style.overflow = ""; // Restore background scrolling

  // Clear iframe src after transition to stop it from loading in the background
  setTimeout(() => {
    const iframe = googleFormModal.querySelector("iframe");
    if (iframe) iframe.src = "";
  }, 300);
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
