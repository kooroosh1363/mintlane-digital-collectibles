import { works } from "./data.js";
import { bindSaveButtons, renderCard } from "./app.js";
import { filterAndSortWorks } from "./marketplace.js";

const state = { query: "", category: "all", sort: "featured" };
const grid = document.querySelector("[data-catalog-grid]");
const count = document.querySelector("[data-results-count]");
const empty = document.querySelector("[data-empty-state]");
const clear = document.querySelector("[data-clear]");
const search = document.querySelector("[data-search]");
const sort = document.querySelector("[data-sort]");

function render() {
  const visible = filterAndSortWorks(works, state);
  grid.innerHTML = visible.map((work) => renderCard(work)).join("");
  count.textContent = `${visible.length} ${visible.length === 1 ? "work" : "works"}`;
  grid.hidden = visible.length === 0;
  empty.hidden = visible.length > 0;
  clear.hidden = state.query === "" && state.category === "all" && state.sort === "featured";
  bindSaveButtons(grid);
}

function reset() {
  state.query = "";
  state.category = "all";
  state.sort = "featured";
  search.value = "";
  sort.value = "featured";
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const active = button.dataset.filter === "all";
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  render();
}

search.addEventListener("input", () => { state.query = search.value; render(); });
sort.addEventListener("change", () => { state.sort = sort.value; render(); });
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  state.category = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((candidate) => {
    const active = candidate === button;
    candidate.classList.toggle("is-active", active);
    candidate.setAttribute("aria-pressed", String(active));
  });
  render();
}));
clear.addEventListener("click", reset);
document.querySelector("[data-empty-clear]").addEventListener("click", reset);
render();
