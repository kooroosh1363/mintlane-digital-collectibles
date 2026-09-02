import { getSaved, toggleSaved } from "./storage.js";
import { formatPrice } from "./marketplace.js";

const bookmarkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.8L6 21Z"/></svg>`;

export function initializeShell() {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
    menuButton.querySelector(".sr-only").textContent = open ? "Open navigation" : "Close navigation";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      menuButton.click();
      menuButton.focus();
    }
  });

  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
  updateSavedCounts();
  window.addEventListener("mintlane:saved", updateSavedCounts);
}

export function updateSavedCounts() {
  document.querySelectorAll("[data-saved-count]").forEach((node) => { node.textContent = String(getSaved().length); });
}

export function renderCard(work, { compact = false } = {}) {
  const saved = getSaved().includes(work.id);
  return `<article class="art-card${compact ? " art-card-compact" : ""}" data-work-id="${work.id}">
    <a class="art-card-image" href="item.html?id=${work.id}">
      <img src="${work.image}" alt="${work.alt}" width="1200" height="1200" loading="lazy">
    </a>
    <button class="save-button" type="button" data-save="${work.id}" aria-pressed="${saved}" aria-label="${saved ? "Remove" : "Save"} ${work.title}">${bookmarkIcon}</button>
    <a class="art-card-info" href="item.html?id=${work.id}">
      <h3>${work.title}</h3><p>${work.artist} · ${work.categoryLabel}</p><span class="price">${formatPrice(work.price)}</span>
    </a>
  </article>`;
}

export function bindSaveButtons(root = document, onChange) {
  root.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = toggleSaved(button.dataset.save);
      const saved = next.includes(button.dataset.save);
      button.setAttribute("aria-pressed", String(saved));
      const title = button.closest("[data-work-id]")?.querySelector("h3, h1")?.textContent || "work";
      button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${title}`);
      showToast(saved ? `${title} saved.` : `${title} removed.`);
      onChange?.(next);
    });
  });
}

let toastTimer;
export function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

initializeShell();
