(function () {
  // Safe query helper
  const $ = (sel, root = document) => root.querySelector(sel);

  const overlay = $("#overlayLoader");
  if (!overlay) {
    // No overlay on this page — still allow navigation normally
    return;
  }

  const titleEl = overlay.querySelector("[data-loader-title]");
  const l1 = overlay.querySelector("[data-l1]");
  const l2 = overlay.querySelector("[data-l2]");
  const l3 = overlay.querySelector("[data-l3]");
  const l4 = overlay.querySelector("[data-l4]");

  const profiles = {
    home: [
      "LOADING HOME INTERFACE",
      "INITIALIZING UI",
      "CALIBRATING EXPERIENCE",
      "RENDERING HOME"
    ],
    solutions: [
      "LOADING ERP MODULE",
      "SYNCHRONIZING DATA",
      "VALIDATING INTEGRATIONS",
      "DEPLOYING INTERFACE"
    ],
    ebooks: [
      "LOADING PUBLISHING PIPELINE",
      "OPTIMIZING WORKFLOWS",
      "PREPARING DISTRIBUTION",
      "RENDERING EXPERIENCE"
    ],
    studio: [
      "LOADING BRAND STUDIO",
      "MOUNTING ASSETS",
      "ALIGNING SYSTEM DESIGN",
      "RENDERING INTERFACE"
    ],
    blogs: [
      "LOADING KNOWLEDGE BASE",
      "INDEXING ARTICLES",
      "OPTIMIZING SEO",
      "RENDERING FEED"
    ],
    playground: [
      "LOADING LAB",
      "SPINNING SANDBOX",
      "CALIBRATING LOGIC",
      "RENDERING MODULE"
    ],
    wait: [
      "HOLDING SESSION",
      "STABILIZING CHANNEL",
      "PROCESSING REQUEST",
      "READY FOR INPUT"
    ]
  };

  function setText(el, txt) {
    if (el) el.textContent = txt;
  }

  function showLoader(routeKey) {
    const p = profiles[routeKey] || [
      "LOADING MODULE",
      "SYNCHRONIZING",
      "PROCESSING",
      "RENDERING"
    ];

    setText(titleEl, p[0]);
    setText(l1, "> " + p[0]);
    setText(l2, "> " + p[1]);
    setText(l3, "> " + p[2]);
    setText(l4, "> " + p[3]);

    overlay.style.display = "flex";
  }

  function hideLoader() {
    overlay.style.display = "none";
  }

  // Hide loader after page restores from bfcache or loads normally
  window.addEventListener("pageshow", hideLoader);

  // Intercept routed links
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-route]");
    if (!a) return;

    // Let the browser handle new tab/window and downloads
    const href = a.getAttribute("href");
    const target = a.getAttribute("target");
    const isExternal = href && /^https?:\/\//i.test(href);

    if (
      !href ||
      href.startsWith("#") ||
      a.hasAttribute("download") ||
      target === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      isExternal
    ) {
      return;
    }

    // Only handle same-site navigation
    e.preventDefault();

    const key = a.getAttribute("data-route") || "default";
    showLoader(key);

    // Fast enough to feel premium, slow enough to feel “real”
    setTimeout(() => {
      window.location.href = href;
    }, 650);
  });
})();
