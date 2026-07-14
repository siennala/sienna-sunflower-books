(function () {
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  if (!chapters.length) return;

  var select = document.getElementById("chapterSelect");
  var prevTop = document.getElementById("prevBtnTop");
  var nextTop = document.getElementById("nextBtnTop");
  var prevBottom = document.getElementById("prevBtnBottom");
  var nextBottom = document.getElementById("nextBtnBottom");
  var labelBottom = document.getElementById("chapterLabelBottom");

  var current = 0;

  // Populate the chapter select dropdown
  chapters.forEach(function (chapter, index) {
    var option = document.createElement("option");
    option.value = index;
    option.textContent = chapter.getAttribute("data-title") || ("Chapter " + (index + 1));
    select.appendChild(option);
  });

  function showChapter(index, opts) {
    if (index < 0 || index >= chapters.length) return;
    current = index;

    chapters.forEach(function (chapter, i) {
      chapter.style.display = i === index ? "" : "none";
    });

    select.value = index;
    labelBottom.textContent = chapters[index].getAttribute("data-title") || "";

    prevTop.disabled = index === 0;
    prevBottom.disabled = index === 0;
    nextTop.disabled = index === chapters.length - 1;
    nextBottom.disabled = index === chapters.length - 1;

    if (!opts || !opts.skipScroll) {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }

    // Persist the chapter choice in the URL hash without adding history entries
    history.replaceState(null, "", "#" + chapters[index].id);
  }

  function goToPrev() {
    if (current > 0) showChapter(current - 1);
  }

  function goToNext() {
    if (current < chapters.length - 1) showChapter(current + 1);
  }

  prevTop.addEventListener("click", goToPrev);
  prevBottom.addEventListener("click", goToPrev);
  nextTop.addEventListener("click", goToNext);
  nextBottom.addEventListener("click", goToNext);

  select.addEventListener("change", function () {
    showChapter(parseInt(select.value, 10));
  });

  // Support deep-linking to a chapter via URL hash (e.g. #chapter-5)
  var initialIndex = 0;
  if (window.location.hash) {
    var targetId = window.location.hash.slice(1);
    var foundIndex = chapters.findIndex(function (chapter) {
      return chapter.id === targetId;
    });
    if (foundIndex !== -1) initialIndex = foundIndex;
  }

  showChapter(initialIndex, { skipScroll: true });
})();