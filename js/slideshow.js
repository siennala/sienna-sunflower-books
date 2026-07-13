// Sienna Sunflower — old-site slideshow carousel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('slidesTrack');
  const dotsContainer = document.getElementById('dots');
  if (!track || !dotsContainer) return;

  let slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = document.querySelectorAll('.slide');

  const realCount = slides.length - 2;

  let index = 1;
  let isTransitioning = false;

  track.style.transform = `translateX(-100%)`;

  const dots = [];

  for (let i = 0; i < realCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    dot.addEventListener('click', () => {
      index = i + 1;
      update();
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  function updateDots() {
    dots.forEach(d => d.classList.remove('active'));
    const activeIndex = index - 1;

    if (activeIndex >= 0 && activeIndex < realCount) {
      dots[activeIndex].classList.add('active');
    }
  }

  function update() {
    isTransitioning = true;
    track.style.transition = "transform 1s ease-in-out";
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  setInterval(() => {
    if (isTransitioning) return;
    index++;
    update();
  }, 5000);

  track.addEventListener('transitionend', () => {
    isTransitioning = false;

    if (index === slides.length - 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-100%)`;
      updateDots();
    }

    if (index === 0) {
      track.style.transition = "none";
      index = slides.length - 2;
      track.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }
  });

  updateDots();
});
