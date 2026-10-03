(function () {
  "use strict";

  const API = "/api/editor";
  const JOURNAL_FOLDER = "content/journal";
  const journalPath = /^content\/journal\/[a-z0-9][a-z0-9_-]*\.json$/;

  function checkPath(path) {
    if (typeof path !== "string" || !journalPath.test(path)) {
      throw new Error("Please choose an article from the Journal collection.");
    }
    return path;
  }

  async function request(endpoint, options = {}) {
    let response;
    try {
      response = await fetch(API + endpoint, {
        credentials: "same-origin",
        ...options,
        headers: {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...options.headers,
        },
      });
    } catch (_) {
      throw new Error("The editor could not connect. Please open the hosted Auréa website and try again.");
    }

    let result;
    try {
      result = await response.json();
    } catch (_) {
      throw new Error("The editor received an unexpected response. Please refresh and try again.");
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Open this website with its owner account to edit the journal.");
      }
      throw new Error(result.error || result.message || "The article could not be saved. Please try again.");
    }
    return result;
  }

  function checkEntry(entry) {
    if (!entry || typeof entry.data !== "string" || !entry.file) {
      throw new Error("This article could not be opened. Please refresh and try again.");
    }
    checkPath(entry.file.path);
    return entry;
  }

  function OwnerLogin(props) {
    const h = window.h;
    return h("main", { className: "aurea-login" },
      h("div", { className: "aurea-login-photo", "aria-hidden": "true" },
        h("img", { src: "/assets/atelier-story.webp", alt: "" }),
        h("div", { className: "aurea-photo-caption" },
          h("span", null, "The scent of a story."),
          h("p", null, "Notes, rituals, and a little everyday beauty."))),
      h("section", { className: "aurea-login-content", "aria-labelledby": "editor-title" },
        h("a", { className: "editor-wordmark", href: "/", "aria-label": "Auréa Parfums home" },
          "AURÉA", h("small", null, "PARFUMS")),
        h("div", { className: "aurea-login-card" },
          h("span", { className: "editor-eyebrow" }, "Behind the bottle"),
          h("h1", { id: "editor-title" }, "The Scent Journal"),
          h("span", { className: "editor-gold-line", "aria-hidden": "true" }),
          h("p", { className: "editor-intro" }, "A private space to shape the stories, notes, and rituals of Auréa."),
          h("button", {
            type: "button",
            className: "editor-continue",
            disabled: Boolean(props.inProgress),
            onClick: function () { props.onLogin({ token: "" }); },
          }, props.inProgress ? "Opening the editor…" : "Continue to Journal Editor"),
          h("p", { className: "editor-access-note" }, "Continue with the site owner’s access."),
          h("a", { className: "editor-return", href: "/journal" }, "Return to the journal")),
        h("p", { className: "editor-footer" }, "AURÉA PARFUMS · STORIES FROM THE STUDIO")));
  }

  class AureaJournalBackend {
    constructor(config) {
      this.config = config;
      this.user = null;
    }

    authComponent() { return OwnerLogin; }
    isGitBackend() { return false; }

    async authenticate() {
      const user = await request("/session");
      if (!user || typeof user.name !== "string" || typeof user.login !== "string") {
        throw new Error("Owner access could not be verified. Please refresh and try again.");
      }
      // Decap stores this display profile locally. The server authorizes every write.
      this.user = { name: user.name, login: user.login, email: user.email || "", token: "" };
      return this.user;
    }

    restoreUser() { return this.authenticate(); }
    logout() { this.user = null; return Promise.resolve(); }
    getToken() { return Promise.resolve(""); }

    async status() {
      try {
        await request("/session");
        return { auth: { status: true }, api: { status: true, statusPage: "" } };
      } catch (_) {
        return { auth: { status: false }, api: { status: false, statusPage: "" } };
      }
    }

    async entriesByFolder(folder, extension) {
      if (folder !== JOURNAL_FOLDER || extension !== "json") {
        throw new Error("The editor manages the Journal collection only.");
      }
      const result = await request("/entries");
      if (!Array.isArray(result.entries)) {
        throw new Error("The journal could not be loaded. Please refresh and try again.");
      }
      return result.entries.map(checkEntry);
    }

    allEntriesByFolder(folder, extension) { return this.entriesByFolder(folder, extension); }
    entriesByFiles(files) { return Promise.all(files.map(file => this.getEntry(file.path))); }

    async getEntry(path) {
      return checkEntry(await request("/entry?path=" + encodeURIComponent(checkPath(path))));
    }

    async persistEntry(entry) {
      if (!entry || !Array.isArray(entry.dataFiles) || entry.dataFiles.length !== 1) {
        throw new Error("Please save one journal article at a time.");
      }
      if (entry.assets && entry.assets.length) {
        throw new Error("Choose one of the provided cover images. File uploads are not available in this editor.");
      }
      entry.dataFiles.forEach(file => {
        checkPath(file.path);
        if (file.newPath) checkPath(file.newPath);
        if (typeof file.raw !== "string") throw new Error("The article contains incomplete content.");
        JSON.parse(file.raw);
      });
      const result = await request("/entry", {
        method: "POST",
        body: JSON.stringify({ dataFiles: entry.dataFiles }),
      });
      if (result.ok !== true) throw new Error("The article was not saved. Please try again.");
    }

    async deleteFiles(paths) {
      if (!Array.isArray(paths) || !paths.length) throw new Error("Please choose an article to delete.");
      paths.forEach(checkPath);
      const result = await request("/entries", { method: "DELETE", body: JSON.stringify({ paths }) });
      if (result.ok !== true) throw new Error("The article was not deleted. Please try again.");
    }

    async getMedia() {
      const result = await request("/media");
      if (!Array.isArray(result.media)) throw new Error("The cover images could not be loaded.");
      return result.media;
    }

    async getMediaFile(path) {
      const media = await this.getMedia();
      const file = media.find(item => item.path === path);
      if (!file) throw new Error("That cover image is not available.");
      return file;
    }

    getMediaDisplayURL(displayURL) {
      if (typeof displayURL === "string") return Promise.resolve(displayURL);
      return this.getMediaFile(displayURL.path).then(file => file.displayURL || file.url);
    }

    persistMedia() {
      return Promise.reject(new Error("Choose one of the provided cover images. File uploads are not available in this editor."));
    }

    unpublishedEntries() { return Promise.resolve([]); }
    getDeployPreview() { return Promise.resolve(null); }
  }

  function JournalPreview(props) {
    const h = window.h;
    const data = props.entry.get("data");
    const image = data.get("image");
    const date = data.get("date");
    const parsedDate = date ? new Date(date) : null;
    const dateLabel = parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString("en-PH", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Manila" })
      : "";
    return h("article", { className: "journal-editor-preview" },
      h("div", { className: "journal-preview-heading" },
        h("span", { className: "editor-eyebrow" }, data.get("category")),
        h("h1", null, data.get("title") || "Your next scent story"),
        h("p", { className: "journal-preview-excerpt" }, data.get("excerpt")),
        dateLabel ? h("time", { dateTime: String(date) }, dateLabel) : null,
        data.get("published") === false ? h("p", { className: "journal-preview-draft" }, "Draft · Hidden from the journal") : null),
      image ? (/#frame=[0-5]$/.test(image)
        ? h("div", { className: "journal-preview-frame" },
          h("div", { className: "journal-preview-square" },
            h("img", { src: image.split("#")[0], alt: "Auréa fragrance editorial", style: { left: -(Number(image.slice(-1)) % 3) * 100 + "%", top: -Math.floor(Number(image.slice(-1)) / 3) * 100 + "%" } })))
        : h("img", { className: "journal-preview-image", src: image, alt: "Auréa fragrance editorial" })) : null,
      h("div", { className: "journal-preview-body" }, props.widgetFor("body")));
  }

  window.AureaJournalBackend = AureaJournalBackend;
  if (!window.CMS || !window.h || !window.initCMS) {
    const loading = document.getElementById("editor-loading");
    if (loading) loading.textContent = "The editor could not load. Please refresh and try again.";
    return;
  }

  window.CMS.registerBackend("sites-journal", AureaJournalBackend);
  window.CMS.registerPreviewStyle("/admin/admin.css");
  window.CMS.registerPreviewTemplate("journal", JournalPreview);
  window.initCMS({ config: {
    load_config_file: false,
    backend: { name: "sites-journal" },
    publish_mode: "simple",
    media_folder: "assets",
    public_folder: "/assets",
    site_url: window.location.origin,
    display_url: window.location.origin,
    show_preview_links: false,
    logo: { src: "/assets/favicon.svg", show_in_header: true },
    slug: { encoding: "ascii", clean_accents: true, sanitize_replacement: "-" },
    collections: [{
      name: "journal",
      label: "The Scent Journal",
      label_singular: "Story",
      description: "Stories, notes, and everyday fragrance rituals from the Auréa studio.",
      folder: JOURNAL_FOLDER,
      format: "json",
      extension: "json",
      create: true,
      delete: true,
      slug: "{{slug}}",
      summary: "{{title}} · {{category}}",
      preview_path: "journal/{{slug}}",
      sortable_fields: ["date", "title", "category"],
      fields: [
        { name: "title", label: "Story title", widget: "string" },
        { name: "date", label: "Publication date", widget: "datetime", date_format: "D MMMM YYYY", time_format: false, picker_utc: true },
        { name: "category", label: "Category", widget: "select", default: "Scent Stories", options: ["Scent Stories", "Scent Guide", "Everyday Rituals", "Gifting", "Behind the Bottle"] },
        { name: "excerpt", label: "Short introduction", widget: "text", hint: "A brief introduction for the journal’s story cards." },
        { name: "image", label: "Cover image", widget: "select", default: "/assets/journal-faq-v2.webp#frame=0", options: [
          { label: "Signature scent · vanity", value: "/assets/journal-faq-v2.webp#frame=0" },
          { label: "Fragrance notes · citrus & petals", value: "/assets/journal-faq-v2.webp#frame=1" },
          { label: "Everyday ritual · morning journal", value: "/assets/journal-faq-v2.webp#frame=2" },
          { label: "Thoughtful gifting · ribbon & box", value: "/assets/journal-faq-v2.webp#frame=3" },
          { label: "Inside the studio · blending bench", value: "/assets/journal-faq-v2.webp#frame=4" },
          { label: "Perfume & peonies", value: "/assets/hero-perfume.webp" },
          { label: "Inside the studio", value: "/assets/atelier-story.webp" },
        ] },
        { name: "body", label: "Story", widget: "markdown", editor_components: [] },
        { name: "published", label: "Visible in the journal", widget: "boolean", default: true, hint: "Turn this off to keep your story as a draft." },
      ],
    }],
  } });
  const loading = document.getElementById("editor-loading");
  if (loading) loading.remove();
}());
