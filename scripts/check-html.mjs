import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const pages = ["index.html", "catalog.html", "item.html", "account.html", "contact.html"];
const failures = [];

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const require = (pattern, message) => { if (!pattern.test(html)) failures.push(`${page}: ${message}`); };
  require(/^<!doctype html>/i, "missing HTML doctype");
  require(/<html lang="en">/, "missing document language");
  require(/<meta name="viewport"/, "missing viewport metadata");
  require(/<meta name="description" content="[^"]+">/, "missing description metadata");
  require(/<title>[^<]+<\/title>/, "missing page title");
  require(/<main(?:\s|>)/, "missing main landmark");
  require(/<h1(?:\s|>)/, "missing primary heading");
  require(/href="#main-content"/, "missing skip link");
  if (/href="#"/.test(html)) failures.push(`${page}: contains a placeholder link`);
  if (/<button(?![^>]*\stype=)[^>]*>/i.test(html)) failures.push(`${page}: button without explicit type`);
  if (/<img(?![^>]*\salt=)[^>]*>/i.test(html)) failures.push(`${page}: image without alt text`);

  for (const match of html.matchAll(/(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(target)) continue;
    const resolved = join(dirname(page), target);
    if (!existsSync(resolved)) failures.push(`${page}: missing internal resource ${target}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} HTML pages and their internal resources.`);
}
