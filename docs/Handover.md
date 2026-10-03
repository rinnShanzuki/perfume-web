# Auréa Parfums — Owner Handover

## What this prototype represents

Auréa Parfums, its fragrance names, prices, photographs, stories and business details are fictional portfolio content. Replace or approve that content before adapting the project for a real business. The supplied perfume references guide the visual direction; they do not establish facts about this fictional brand.

The Premium scope provides eight public layouts: Home, Fragrances, Scent Guide, Our Story, FAQs, Contact, Journal listing and one reusable Journal article template. Future Journal stories reuse the article layout without creating new page-design layouts. The owner editor is CMS administration, not a ninth public business page.

The catalog contains twelve static fragrance concepts. The sole editable CMS collection is **The Scent Journal**, initially populated with five sample entries:

1. Finding your signature scent
2. A little guide to fragrance notes
3. Small rituals, beautiful everyday moments
4. Choosing a thoughtful fragrance gift
5. Inside the Auréa fragrance studio

## Open the Journal editor

1. On the private hosted prototype, sign in using the intended owner's platform account.
2. Open `/admin/` from the website's Journal editor link.
3. Choose **Continue to Journal Editor**. The backend verifies the platform identity for each editor request.
4. Open **The Scent Journal** to select an existing story or create a new one.

This installation uses **Decap CMS 3.15.1** with a custom D1-backed integration. It does not use a Git repository for live story storage. The first authenticated identity accepted by the editor is bound in the database as the single editor; establish that binding using the intended owner account before sharing editor access. Other identities are refused. There is no customer login, password list or customer-account system.

The local preview automatically uses `local-preview-editor`. That identity and its SQLite data are separate from the hosted owner's D1 database. Reassigning the hosted editor requires a deliberate developer-assisted change to the stored binding.

Decap provides its editor through the website's admin route and relies on a backend for content access. The integration described here supplies that backend and renders the saved stories. See the [official Decap setup documentation](https://decapcms.org/docs/basic-steps/) for background; the steps below describe this project's custom configuration.

## Create, edit and publish a story

1. Choose an existing story or the editor's create action.
2. Enter a title, publication date, category and short introduction.
3. Select one of the five new editorial covers or two legacy covers. The preview shows the chosen photograph; uploading new images is not available.
4. Write the body using paragraphs, headings, bold or italic text, lists, quotes, and safe website links. Raw HTML and embedded media are intentionally escaped; select a bundled cover image above.
5. Set **Visible in the journal** off when keeping a story private as a draft. Save the entry.
6. When ready, switch **Visible in the journal** on and save. The public listing and article route read the stored entry on the next request.
7. Open `/journal` and the article to review the title, introduction, image and body.

The publication date controls the displayed date and listing order; it does **not** schedule future publication. A visible story can appear immediately even if its date is in the future. This is a simple publish configuration, without a multi-person approval workflow.

Use a stable title/slug when an article is already shared. A changed URL can break existing links; redirects are not automatically created. Deleting a story removes it from the database and makes its article route unavailable. There is no owner-facing recovery/version-history feature, so keep a copy or database backup before deleting content.

## Inquiries and action tracking

The website has one standard inquiry form at `/contact`. Fragrance cards can preselect a scent in that same form. An accepted inquiry stores the name, email, fragrance/topic, message and time in the database for the prototype owner. It does not send email or notify a real perfume business.

Validation runs in the browser and server. A hidden honeypot discourages basic automated submissions. The server allows at most three stored inquiries per email address in a rolling hour. This is basic spam protection, not a guarantee against all abuse.

Successful saved inquiries also record a `form_submission` action. Designated contact buttons record the single `contact_button_click` action, with page and time. These records persist in D1 on the hosted site and in SQLite for the local preview. There is no custom reporting dashboard or inbox interface; owner retrieval/export currently requires developer or authorized database access.

GA4 is prepared in `dist/client/site-config.js`. Its `googleAnalyticsMeasurementId` is empty, so external Analytics tracking is inactive. A real client-owned GA4 property and its measurement ID must be provided before enabling it. Once configured, the form hook emits `generate_lead` and the contact hook emits `contact_button_click`. Verify that real property after configuration; prepared code is not a claim that a GA property is already connected.

Phone, WhatsApp, Instagram and Facebook controls open a demo explanation until approved destinations are supplied. There is no fake telephone number, physical address or map. Maps are not relevant to this online-only concept.

## Planned 45-minute training session

This agenda describes the included session to arrange with the owner. It is not evidence that training has already occurred.

| Minutes | Duration | Activity |
|---|---:|---|
| 00–05 | 5 minutes | Owner access, single-collection scope and editor orientation |
| 05–13 | 8 minutes | Open a sample story and edit title, date, category and introduction |
| 13–25 | 12 minutes | Create a story, choose a bundled cover and use supported body formatting |
| 25–33 | 8 minutes | Save privately, publish with the visibility toggle and review the public result |
| 33–38 | 5 minutes | Stable URLs, deletion consequences and backup responsibilities |
| 38–43 | 5 minutes | Inquiry storage, action records, contact links and unconfigured GA4 |
| 43–45 | 2 minutes | Owner recap and questions |
| **Total** | **45 minutes** | |

## Source, media and local preview

Use Node.js 24 or later. From the extracted project folder, run `node build.mjs`, then `node serve.mjs`, and open `http://127.0.0.1:4175`. The bundled migrations initialize a local SQLite database; no installation is needed to run the preview. `pnpm install` is required only for schema development with Drizzle tooling.

Journal entries can be edited through the CMS. Other content is static: fragrance data is in `src/data.mjs`; layouts and business copy are in `src/templates.mjs`; image assets, styles and browser interactions are under `dist/client`. A developer changes those files and rebuilds the project. Rebuilding seed data does not overwrite existing live Journal edits once the database has been seeded.

The source ZIP excludes `node_modules`, `.aurea-local`, Git metadata, secrets and temporary files. It includes the code, browser assets, bundled Decap files, hosting metadata and database migrations. It does not include live D1 data or a production database backup. Do not publish the local preview server as a production server; its editor authentication is intentionally simulated for local use.

## Before an approved real launch

The prototype remains private and explicitly discourages indexing. These items are prospective owner/developer handover tasks; they are not marked complete here.

- [ ] Confirm the real brand, product descriptions, concentrations, prices, image rights and all business details.
- [ ] Assign and verify the intended owner editor identity on the deployed platform.
- [ ] Confirm live D1 binding, migrations, Journal publishing and database backup/export arrangements.
- [ ] Confirm inquiry retrieval, retention and appropriate privacy information; agree separately on any email notification integration.
- [ ] Supply approved telephone, messaging and social destinations.
- [ ] Provide the client-owned GA4 property and verify both agreed action types.
- [ ] Confirm domain, hosting, SSL and disclosed provider fees, then perform the final browser/mobile and form checks.
- [ ] Approve public release before changing private access, `noindex` or the robots file. `noindex` alone is not access control.
- [ ] Record handover acceptance and the actual training date.

## Contractual scope

The referenced Premium offering includes three consolidated revision rounds and 45 days of post-launch defect support, beginning at launch. Each revision round is one consolidated feedback list within the agreed scope. Defect support concerns delivered functionality; new features, content updates and ongoing maintenance are separate. The estimated four-week delivery begins after the agreed scope, deposit and complete approved content are received.

Domain registration, hosting, business email, paid software and provider renewal costs are separate. Confirm the applicable agreement and fees before purchase or launch. The support period, revisions and training are service commitments, not activities already completed by preparing this documentation.

E-commerce, online payments, customer accounts/memberships, inventory, additional CMS collections, custom dashboards and API/automation work require a separate quotation. The included single CMS editor account does not provide customer accounts. Product inquiries and a static catalog do not create a shopping system.

Local browser, functionality, authentication and persistence checks passed. The final delivery includes deployment and distribution records separately. These prototype checks do not replace the real-business launch tasks above.


## Photography revision

The About photograph now keeps its natural 3:2 proportions. Repeated homepage collection tiles were removed. Home product photography is separate from the catalog, all twelve catalog items have distinct shots, and the Scent Guide, Contact, FAQ and Journal use their own artwork. Original saved Journal text and editor settings are preserved; legacy cover selections on the five initial stories are displayed with the new story-specific covers. Saving a story records its current selected cover.
