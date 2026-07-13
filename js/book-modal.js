// Sienna Sunflower — book description modal
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("bookModalOverlay");
  const closeBtn = document.getElementById("bookModalClose");
  const modalImg = document.getElementById("bookModalImg");
  const modalTitle = document.getElementById("bookModalTitle");
  const modalMeta = document.getElementById("bookModalMeta");
  const modalDesc = document.getElementById("bookModalDesc");
  const modalLink = document.getElementById("bookModalLink");

  if (!overlay) return;

  const cards = document.querySelectorAll(".os-book-card[data-title]");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modalImg.src = card.dataset.cover;
      modalImg.alt = card.dataset.title;
      modalTitle.textContent = card.dataset.title;
      modalMeta.textContent = card.dataset.meta || "";
      modalDesc.textContent = card.dataset.desc || "";
      modalLink.href = card.dataset.link || "#";
      modalLink.textContent = card.dataset.linkLabel || "Learn More";
      overlay.classList.add("open");
    });
  });

  function closeModal() {
    overlay.classList.remove("open");
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
