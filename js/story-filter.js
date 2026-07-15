(function () {
  var mainGrid = document.getElementById("storyGrid");
  var fairyGrid = document.getElementById("storyGridFairy");
  var fairyHeading = document.getElementById("fairyTaleHeading");
  var grids = Array.prototype.slice.call(document.querySelectorAll(".story-grid"));
  if (!grids.length) return;

  var cards = [];
  grids.forEach(function (grid) {
    Array.prototype.slice.call(grid.querySelectorAll(".story-card")).forEach(function (card) {
      cards.push({ el: card, originalGrid: grid });
    });
  });
  if (!cards.length) return;

  var genreSelect = document.getElementById("storyGenreFilter");
  var sortSelect = document.getElementById("storySortFilter");
  var resetBtn = document.getElementById("storyFilterReset");
  var emptyMsg = document.getElementById("storyFilterEmpty");
  if (!genreSelect || !sortSelect) return;

  // Collect unique genres from all cards across both grids and populate the dropdown
  var genreSet = {};
  cards.forEach(function (item) {
    var genres = (item.el.getAttribute("data-genres") || "").split(",");
    genres.forEach(function (g) {
      g = g.trim();
      if (g) genreSet[g] = true;
    });
  });
  Object.keys(genreSet).sort().forEach(function (genre) {
    var option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });

  function applyFilters() {
    var genre = genreSelect.value;
    var sortOrder = sortSelect.value;
    var isFiltering = genre !== "all" || sortOrder !== "none";
    var visibleCount = 0;

    cards.forEach(function (item) {
      var genres = (item.el.getAttribute("data-genres") || "").split(",").map(function (g) { return g.trim(); });
      var matches = genre === "all" || genres.indexOf(genre) !== -1;
      item.el.classList.toggle("story-hidden", !matches);
      if (matches) visibleCount++;
    });

    if (isFiltering) {
      // Merge every card into the main grid so the Fairy Tale Collection
      // doesn't appear as a separate section while a filter/sort is active.
      if (fairyHeading) fairyHeading.style.display = "none";
      if (fairyGrid) fairyGrid.style.display = "none";

      var allCards = cards.slice();
      if (sortOrder === "asc" || sortOrder === "desc") {
        allCards.sort(function (a, b) {
          var wa = parseInt(a.el.getAttribute("data-words"), 10) || 0;
          var wb = parseInt(b.el.getAttribute("data-words"), 10) || 0;
          return sortOrder === "asc" ? wa - wb : wb - wa;
        });
      }
      allCards.forEach(function (item) {
        if (mainGrid) mainGrid.appendChild(item.el);
      });
    } else {
      // No active filter/sort: restore the original sections.
      if (fairyHeading) fairyHeading.style.display = "";
      if (fairyGrid) fairyGrid.style.display = "";
      cards.forEach(function (item) { item.originalGrid.appendChild(item.el); });
    }

    if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? "" : "none";
  }

  genreSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      genreSelect.value = "all";
      sortSelect.value = "none";
      applyFilters();
    });
  }
})();