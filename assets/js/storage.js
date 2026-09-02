import { uniqueRecent } from "./marketplace.js";

const KEYS = {
  saved: "mintlane:saved",
  recent: "mintlane:recent"
};

function read(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The interface remains usable when storage is unavailable.
  }
}

export function getSaved() { return read(KEYS.saved); }
export function getRecent() { return read(KEYS.recent); }

export function toggleSaved(id) {
  const saved = getSaved();
  const next = saved.includes(id) ? saved.filter((value) => value !== id) : [...saved, id];
  write(KEYS.saved, next);
  window.dispatchEvent(new CustomEvent("mintlane:saved", { detail: next }));
  return next;
}

export function addRecent(id) {
  const next = uniqueRecent(getRecent(), id);
  write(KEYS.recent, next);
  return next;
}

export function clearSaved() {
  write(KEYS.saved, []);
  window.dispatchEvent(new CustomEvent("mintlane:saved", { detail: [] }));
}

export function clearRecent() { write(KEYS.recent, []); }
