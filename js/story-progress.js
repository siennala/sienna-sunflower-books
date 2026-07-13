document.addEventListener("DOMContentLoaded", function () {
  var bar = document.querySelector(".story-progress-bar");
  if (!bar) return;

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress);
  window.addEventListener("resize", updateProgress);
  updateProgress();
});