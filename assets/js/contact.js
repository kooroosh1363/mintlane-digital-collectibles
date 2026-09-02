import "./app.js";
import { validateContact } from "./marketplace.js";

const form = document.querySelector("[data-contact-form]");
const message = form.elements.message;
const count = document.querySelector("[data-character-count]");
const status = document.querySelector("[data-contact-status]");

message.addEventListener("input", () => { count.textContent = String(message.value.length); });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validateContact(data);

  for (const field of ["name", "email", "topic", "message"]) {
    const input = form.elements[field];
    const error = document.querySelector(`[data-error-for="${field}"]`);
    input.toggleAttribute("aria-invalid", Boolean(errors[field]));
    error.textContent = errors[field] || "";
  }

  const firstInvalid = form.querySelector("[aria-invalid='true']");
  if (firstInvalid) {
    status.textContent = "Check the highlighted fields.";
    status.style.color = "var(--danger)";
    firstInvalid.focus();
    return;
  }

  status.textContent = "Message validated. This demonstration does not transmit data.";
  status.style.color = "var(--success)";
  form.reset();
  count.textContent = "0";
});
