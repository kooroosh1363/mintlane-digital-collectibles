import { works } from "./data.js";
import { bindSaveButtons, renderCard, showToast } from "./app.js";
import { clearRecent, clearSaved, getRecent, getSaved } from "./storage.js";

const savedGrid = document.querySelector("[data-saved-grid]");
const recentGrid = document.querySelector("[data-recent-grid]");
const savedEmpty = document.querySelector("[data-saved-empty]");
const recentEmpty = document.querySelector("[data-recent-empty]");
const savedCount = document.querySelector("[data-account-count]");
const clearSavedButton = document.querySelector("[data-clear-saved]");
const clearRecentButton = document.querySelector("[data-clear-recent]");

function worksFor(ids) {
  return ids.map((id) => works.find((work) => work.id === id)).filter(Boolean);
}

function renderSaved() {
  const saved = worksFor(getSaved());
  savedGrid.innerHTML = saved.map((work) => renderCard(work)).join("");
  savedGrid.hidden = saved.length === 0;
  savedEmpty.hidden = saved.length > 0;
  clearSavedButton.hidden = saved.length === 0;
  savedCount.textContent = `(${saved.length})`;
  bindSaveButtons(savedGrid, renderSaved);
}

function renderRecent() {
  const recent = worksFor(getRecent());
  recentGrid.innerHTML = recent.map((work) => renderCard(work, { compact: true })).join("");
  recentGrid.hidden = recent.length === 0;
  recentEmpty.hidden = recent.length > 0;
  clearRecentButton.hidden = recent.length === 0;
  bindSaveButtons(recentGrid, renderSaved);
}

clearSavedButton.addEventListener("click", () => {
  clearSaved();
  renderSaved();
  renderRecent();
  showToast("Saved works cleared.");
});
clearRecentButton.addEventListener("click", () => {
  clearRecent();
  renderRecent();
  showToast("Viewing history cleared.");
});

renderSaved();
renderRecent();
