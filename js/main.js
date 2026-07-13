// Sienna Sunflower — Author Site interactivity

document.addEventListener("DOMContentLoaded", () => {
  /* Navbar scroll state */
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
      })
    );
  }

  /* Scroll reveal animations */
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* Sparkle field generator (hero) */
  const field = document.querySelector(".sparkle-field");
  if (field) {
    const count = 26;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      const size = Math.random() * 5 + 2;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.setProperty("--dur", `${Math.random() * 6 + 5}s`);
      s.style.setProperty("--delay", `${Math.random() * 5}s`);
      field.appendChild(s);
    }
  }

  /* Expandable book blurbs */
  document.querySelectorAll(".read-more-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const blurb = btn.closest(".book-body").querySelector(".book-blurb");
      const expanded = blurb.classList.toggle("expanded");
      btn.textContent = expanded ? "Read less" : "Read more";
    });
  });

  /* Active nav link highlight based on current page */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
});
