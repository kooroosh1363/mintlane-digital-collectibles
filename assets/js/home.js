import { works } from "./data.js";
import { bindSaveButtons, renderCard, showToast } from "./app.js";
import { isValidEmail } from "./marketplace.js";

const grid = document.querySelector("[data-featured-grid]");
grid.innerHTML = works.map((work) => renderCard(work)).join("");
bindSaveButtons(grid);

const form = document.querySelector("[data-newsletter-form]");
const status = document.querySelector("[data-newsletter-status]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(form).get("email")?.toString() || "";
  const input = form.elements.email;
  if (!isValidEmail(email)) {
    input.setAttribute("aria-invalid", "true");
    status.textContent = "Enter a valid email address.";
    status.style.color = "var(--danger)";
    input.focus();
    return;
  }
  input.removeAttribute("aria-invalid");
  status.textContent = "Email format confirmed. This demonstration does not transmit data.";
  status.style.color = "var(--success)";
  form.reset();
  showToast("Email address validated locally.");
});
