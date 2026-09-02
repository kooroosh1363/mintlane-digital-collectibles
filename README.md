# Mintlane

Mintlane is a focused, browser-based marketplace experience for discovering limited-edition digital collectibles. It combines a curated storefront with client-side search, filtering, saved works, and recently viewed items—without requiring an account, wallet, or backend.

## Highlights

- Responsive five-page marketplace flow
- Search, category filters, and multiple sort modes
- Data-driven catalog and item-detail rendering
- Saved works and recently viewed items stored locally
- Accessible mobile navigation, dialogs, forms, and status messages
- Explicit empty, success, and validation states
- Reduced-motion support and visible keyboard focus
- Zero runtime dependencies and no build step
- Automated JavaScript, HTML, and repository quality checks

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Editorial home and featured drops |
| `catalog.html` | Searchable and filterable catalog |
| `item.html?id=...` | Data-driven collectible details |
| `account.html` | Saved works and recent viewing history |
| `contact.html` | Validated support request form |

## Run locally

Serve the repository with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Quality checks

```bash
npm test
npm run check
```

`npm test` exercises the catalog, formatting, validation, and storage helpers. `npm run check` also verifies JavaScript syntax, required HTML structure, internal links, and repository hygiene.

## Architecture

Mintlane uses native ES modules. Product data lives in `assets/js/data.js`; pure filtering and validation helpers live in `assets/js/marketplace.js`; page controllers render the relevant views. Shared navigation, saved-item controls, and local preference handling are coordinated by `assets/js/app.js` and `assets/js/storage.js`.

All marketplace content is demonstrative. The interface does not process payments, connect wallets, transmit form submissions, or claim ownership of real-world assets.

## License

Licensed under the [MIT License](LICENSE).
