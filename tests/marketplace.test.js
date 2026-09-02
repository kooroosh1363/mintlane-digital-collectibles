import test from "node:test";
import assert from "node:assert/strict";
import { works } from "../assets/js/data.js";
import { filterAndSortWorks, formatPrice, isValidEmail, uniqueRecent, validateContact } from "../assets/js/marketplace.js";

test("catalog matches titles and artists without case sensitivity", () => {
  assert.deepEqual(filterAndSortWorks(works, { query: "NIA" }).map(({ id }) => id), ["luminous-fold"]);
  assert.deepEqual(filterAndSortWorks(works, { query: "orbit" }).map(({ id }) => id), ["quiet-orbit"]);
});

test("catalog filters by category", () => {
  assert.deepEqual(filterAndSortWorks(works, { category: "organic" }).map(({ id }) => id), ["signal-bloom"]);
});

test("catalog sorts prices in both directions", () => {
  assert.deepEqual(filterAndSortWorks(works, { sort: "price-asc" }).map(({ price }) => price), [360, 480, 620]);
  assert.deepEqual(filterAndSortWorks(works, { sort: "price-desc" }).map(({ price }) => price), [620, 480, 360]);
});

test("catalog sorts titles alphabetically", () => {
  assert.deepEqual(filterAndSortWorks(works, { sort: "title" }).map(({ title }) => title), ["Luminous Fold", "Quiet Orbit", "Signal Bloom"]);
});

test("prices use a stable whole-dollar format", () => {
  assert.equal(formatPrice(480), "$480");
});

test("email validator rejects incomplete values", () => {
  assert.equal(isValidEmail("curator@mintlane.art"), true);
  assert.equal(isValidEmail("curator@mintlane"), false);
  assert.equal(isValidEmail(""), false);
});

test("contact validation reports each missing requirement", () => {
  const errors = validateContact({ name: "A", email: "bad", topic: "", message: "Too short" });
  assert.deepEqual(Object.keys(errors), ["name", "email", "topic", "message"]);
});

test("contact validation accepts a complete request", () => {
  assert.deepEqual(validateContact({ name: "Ari", email: "ari@example.com", topic: "artist", message: "I would like more artist context." }), {});
});

test("recent history stays unique, ordered, and bounded", () => {
  assert.deepEqual(uniqueRecent(["a", "b", "c"], "b", 3), ["b", "a", "c"]);
  assert.deepEqual(uniqueRecent(["a", "b", "c"], "d", 3), ["d", "a", "b"]);
});
