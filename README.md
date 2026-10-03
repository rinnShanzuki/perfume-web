# Auréa Parfums — Premium Portfolio Prototype

A fictional perfume business inspired by the supplied reference designs, with a static fragrance catalog and one editable Scent Journal collection. The Premium package defines the build scope; the visitor website does not advertise E-Den or its package prices.

## Eight public page layouts

| Layout | Route |
|---|---|
| Home | `/` |
| Fragrances | `/fragrances` |
| Scent Guide | `/scent-guide` |
| Our Story | `/about` |
| FAQs | `/faq` |
| Contact | `/contact` |
| Journal listing | `/journal` |
| Reusable Journal article | `/journal/{slug}` |

All Journal entries reuse the eighth layout. The owner editor at `/admin/` is administrative CMS access, not an additional public business page.

## Included behavior

- Twelve static fragrance concepts, with search, collection/family filters and sorting. Product buttons open the one Contact inquiry form; there is no cart or checkout.
- Decap CMS **3.15.1**, bundled locally, connected through a custom backend to the hosting platform's D1 database. The CMS manages **one collection: Journal**, seeded with five sample stories.
- One owner editor identity, checked through the platform's authenticated-user headers and retained in the database. The local preview uses a separate preview editor identity.
- One inquiry form with browser/server validation, consent, a honeypot, and a basic limit of three stored inquiries per email address within one hour. Accepted inquiries are stored for the prototype owner; they are not emailed to a real business.
- Database records for successful `form_submission` actions and the single `contact_button_click` action. GA4 `generate_lead` and `contact_button_click` hooks are prepared but inactive while the measurement ID is empty.
- Responsive layouts, page metadata and fictional business disclosures. The prototype remains private and uses `noindex,nofollow` and a disallowing robots file until an approved launch.

Phone, WhatsApp, Instagram and Facebook controls currently open an explanatory demo dialog. Approved contact destinations must be supplied before real use. This online-only concept has no physical address or map.

## Run the extracted project

Use **Node.js 24 or later**. From this project folder:

```text
node build.mjs
node serve.mjs
```

Open [http://127.0.0.1:4175](http://127.0.0.1:4175). Keep the server running while using the website and editor. Opening a generated HTML file directly does not provide the route handling, database, CMS or inquiry API.

No dependency installation is needed for this preview: the runtime uses Node's built-in SQLite and the CMS browser files and database migrations are bundled. Run `pnpm install` only when developing the Drizzle schema or regenerating its migrations.

The preview creates `.aurea-local/aurea.sqlite`. Its data and editor identity are separate from the hosted D1 database. The server listens on the local loopback address and uses preview authentication; it is not a production authentication server.

## Edit and hand over

- Journal stories: use `/admin/`, choosing one of the seven bundled cover images. New media uploads are not implemented.
- Fragrances and initial sample stories: `src/data.mjs`.
- Public layouts and copy: `src/templates.mjs`.
- Server, inquiry storage, action tracking and editor authorization: `src/worker.mjs`.
- Styling, public interactions and analytics configuration: `dist/client/styles.css`, `dist/client/app.js` and `dist/client/site-config.js`.
- CMS fields and backend integration: `dist/client/admin/backend.js`.

After source changes, run `node build.mjs` again. See [docs/Handover.md](docs/Handover.md) for the editor guide, a planned 45-minute training agenda and launch requirements.

The distribution ZIP excludes `node_modules`, the local database folder, Git metadata, secrets and temporary verification files. Hosted Journal entries, inquiries and the bound editor identity live in D1 and are not a database backup inside the ZIP.

## Scope and verification status

E-commerce, online payments, customer accounts, membership systems, inventory and additional CMS collections require a separate scope and quotation. The included CMS editor is distinct from a customer account.

The referenced Premium offering includes three consolidated revision rounds and 45 days of post-launch defect support. Those are contractual service provisions, not completed activities claimed by this prototype. The 45-minute training session is planned in the handover document, not recorded as already delivered.

Local verification passed for all eight layouts at desktop and mobile sizes, catalog filtering, the inquiry flow, Journal editing and persistence, and server-side authorization. Deployment and ZIP records are delivered separately with the completed prototype. Real-business launch configuration remains subject to the handover checklist.
