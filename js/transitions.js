(function () {
  const overlay = document.getElementById("overlayLoader");
  if (!overlay) return;

  const titleEl = overlay.querySelector("[data-loader-title]");
  const l1 = overlay.querySelector("[data-l1]");
  const l2 = overlay.querySelector("[data-l2]");
  const l3 = overlay.querySelector("[data-l3]");
  const l4 = overlay.querySelector("[data-l4]");

  const profiles = {
    home: ["LOADING HOME INTERFACE","INITIALIZING UI","CALIBRATING EXPERIENCE","RENDERING HOME"],
    services: ["LOADING SERVICES","VALIDATING SYSTEMS","PREPARING STACK","RENDERING SERVICES"],
    it: ["LOADING IT SOLUTIONS","ASSEMBLING ARCHITECTURE","APPLYING CONTROLS","RENDERING SOLUTIONS"],
    solutions: ["LOADING ERP MODULE","SYNCHRONIZING DATA","VALIDATING INTEGRATIONS","DEPLOYING INTERFACE"],
    ebooks: ["LOADING PUBLISHING PIPELINE","OPTIMIZING WORKFLOWS","PREPARING DISTRIBUTION","RENDERING EXPERIENCE"],
    studio: ["LOADING STUDIO","MOUNTING ASSETS","ALIGNING BRAND SYSTEMS","RENDERING INTERFACE"],
    blogstech: ["LOADING TECH BLOGS","INDEXING ARTICLES","OPTIMIZING SEO","RENDERING FEED"],
    blogsebooks: ["LOADING PUBLISHING BLOGS","INDEXING POSTS","PREPARING INSIGHTS","RENDERING FEED"],
    playground: ["LOADING LAB","SPINNING SANDBOX","CALIBRATING LOGIC","RENDERING MODULE"],
    wait: ["HOLDING SESSION","STABILIZING CHANNEL","PROCESSING REQUEST","READY FOR INPUT"]
  };

  function setText(el, txt){ if(el) el.textContent = txt; }

  function showLoader(key){
    const p = profiles[key] || ["LOADING MODULE","SYNCHRONIZING","PROCESSING","RENDERING"];
    setText(titleEl, p[0]);
    setText(l1, "> " + p[0]);
    setText(l2, "> " + p[1]);
    setText(l3, "> " + p[2]);
    setText(l4, "> " + p[3]);
    overlay.style.display = "flex";
  }

  function hideLoader(){ overlay.style.display = "none"; }

  window.addEventListener("pageshow", hideLoader);

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-route]");
    if (!a) return;

    const href = a.getAttribute("href");
    const target = a.getAttribute("target");
    const isExternal = href && /^https?:\/\//i.test(href);

    if (!href || href.startsWith("#") || a.hasAttribute("download") ||
        target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || isExternal) {
      return;
    }

    e.preventDefault();
    const key = a.getAttribute("data-route") || "default";
    showLoader(key);

    setTimeout(() => { window.location.href = href; }, 650);
  });
})();
