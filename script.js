const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const copyPathButton = document.getElementById("copyPathButton");
const installPath = document.getElementById("installPath");

if (copyPathButton && installPath) {
  copyPathButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(installPath.textContent.trim());
      copyPathButton.textContent = "Путь скопирован";
      copyPathButton.classList.add("is-copied");

      window.setTimeout(() => {
        copyPathButton.textContent = "Скопировать путь";
        copyPathButton.classList.remove("is-copied");
      }, 1800);
    } catch (error) {
      copyPathButton.textContent = "Скопируй вручную";
      window.setTimeout(() => {
        copyPathButton.textContent = "Скопировать путь";
      }, 1800);
    }
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const galleryButtons = document.querySelectorAll(".gallery-item");

if (lightbox && lightboxImage && lightboxTitle && galleryButtons.length > 0) {
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.image || "";
      lightboxImage.alt = button.dataset.title || "";
      lightboxTitle.textContent = button.dataset.title || "";
      lightbox.showModal();
    });
  });

  lightbox.addEventListener("click", (event) => {
    const dialogDimensions = lightbox.getBoundingClientRect();
    const isOutside =
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom;

    if (isOutside) {
      lightbox.close();
    }
  });
}
