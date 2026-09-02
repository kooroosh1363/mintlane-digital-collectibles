import { findWork, works } from "./data.js";
import { bindSaveButtons, renderCard, showToast } from "./app.js";
import { formatPrice, isValidEmail } from "./marketplace.js";
import { addRecent, getSaved } from "./storage.js";

const id = new URLSearchParams(window.location.search).get("id") || works[0].id;
const work = findWork(id);
const view = document.querySelector("[data-item-view]");
const story = document.querySelector("[data-item-story]");
const related = document.querySelector("[data-related-grid]");
const error = document.querySelector("[data-item-error]");

if (!work) {
  view.hidden = true;
  story.hidden = true;
  document.querySelector(".related").hidden = true;
  error.hidden = false;
} else {
  document.title = `${work.title} — Mintlane`;
  document.querySelector("[data-breadcrumb]").textContent = work.title;
  view.dataset.workId = work.id;
  view.innerHTML = `
    <div class="item-media reveal"><img src="${work.image}" alt="${work.alt}" width="1200" height="1200"></div>
    <div class="item-copy reveal">
      <p class="eyebrow">Edition 01 · ${work.categoryLabel}</p>
      <h1>${work.title}</h1>
      <p class="item-artist">A work by ${work.artist}</p>
      <p class="item-description">${work.description}</p>
      <dl class="item-meta"><div><dt>Edition</dt><dd>${work.editionSize} total</dd></div><div><dt>Available</dt><dd>${work.available} editions</dd></div><div><dt>Medium</dt><dd>${work.medium}</dd></div><div><dt>Dimensions</dt><dd>${work.dimensions}</dd></div></dl>
      <div class="item-price"><span>Edition price</span><strong>${formatPrice(work.price)}</strong></div>
      <div class="item-actions"><button class="button button-primary" type="button" data-open-request>Request availability</button><button class="save-button" type="button" data-save="${work.id}" aria-pressed="${getSaved().includes(work.id)}" aria-label="${getSaved().includes(work.id) ? "Remove" : "Save"} ${work.title}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.8L6 21Z"/></svg></button></div>
      <p class="item-disclaimer">Demonstration listing · no payment or ownership transfer</p>
    </div>`;
  story.innerHTML = `<div><p class="eyebrow">Behind the work</p><h2>${work.storyTitle}</h2></div><div><p>${work.story}</p><p>Presented as a finite digital edition with artist context and transparent availability.</p></div>`;
  related.innerHTML = works.filter((candidate) => candidate.id !== work.id).map((candidate) => renderCard(candidate)).join("");
  bindSaveButtons(view);
  bindSaveButtons(related);
  addRecent(work.id);

  const dialog = document.querySelector("[data-request-dialog]");
  const requestForm = document.querySelector("[data-request-form]");
  const requestStatus = document.querySelector("[data-request-status]");
  document.querySelector("[data-dialog-work]").textContent = `${work.title} by ${work.artist}`;
  document.querySelector("[data-open-request]").addEventListener("click", () => dialog.showModal());
  document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(requestForm);
    const name = data.get("name")?.toString().trim() || "";
    const email = data.get("email")?.toString() || "";
    if (name.length < 2 || !isValidEmail(email)) {
      requestStatus.textContent = "Enter your name and a valid email address.";
      requestStatus.style.color = "var(--danger)";
      (name.length < 2 ? requestForm.elements.name : requestForm.elements.email).focus();
      return;
    }
    requestStatus.textContent = "Request prepared. This demonstration does not transmit data.";
    requestStatus.style.color = "var(--success)";
    showToast("Availability request validated.");
    requestForm.reset();
  });
}
