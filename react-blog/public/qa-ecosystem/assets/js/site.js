(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.add("js");

  var DICT = window.QA_I18N || { en: {}, zh: {} };
  var LANG_KEY = "qa-ecosystem-lang";
  var currentLang = "en";
  var currentTheme = "dark";
  var activeNode = "extension";
  var pinnedNode = "extension";
  var lastTrigger = null;
  var currentShot = 0;
  var shots = [];

  var navTrack = document.querySelector(".nav-track");
  var tabsTrack = document.querySelector(".tablist");

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");

  function t(key) {
    var d = DICT[currentLang] || DICT.en;
    return d[key] || (DICT.en && DICT.en[key]) || "";
  }

  function store(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* file:// or private mode: keep the choice for this page only */
    }
  }

  function updateScrollHint(track) {
    if (!track) return;
    var max = track.scrollWidth - track.clientWidth;
    track.classList.toggle("can-scroll-left", track.scrollLeft > 2);
    track.classList.toggle("can-scroll-right", max - track.scrollLeft > 2);
  }

  function refreshScrollHints() {
    updateScrollHint(navTrack);
    updateScrollHint(tabsTrack);
  }

  function revealInTrack(track, el) {
    if (!track || !el) return;
    var trackRect = track.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    if (elRect.left < trackRect.left) {
      track.scrollLeft -= trackRect.left - elRect.left + 8;
    } else if (elRect.right > trackRect.right) {
      track.scrollLeft += elRect.right - trackRect.right + 8;
    }
    updateScrollHint(track);
  }

  function readLang() {
    var fromUrl = "";
    try {
      fromUrl = new URLSearchParams(window.location.search).get("lang") || "";
    } catch (err) {
      fromUrl = "";
    }
    if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
    try {
      var saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (err) {
      /* ignore */
    }
    return "en";
  }

  /* Language */

  function applyImageAlts() {
    document.querySelectorAll("img[data-alt-dark]").forEach(function (img) {
      var key = currentTheme === "dark" ? img.getAttribute("data-alt-dark") : img.getAttribute("data-alt-light");
      var value = t(key);
      if (value) img.setAttribute("alt", value);
    });
  }

  function applyLang(lang, persist) {
    currentLang = lang === "zh" ? "zh" : "en";
    var d = DICT[currentLang] || DICT.en;

    html.setAttribute("lang", currentLang === "zh" ? "zh-Hant" : "en");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = d[el.getAttribute("data-i18n")];
      if (typeof value === "string" && value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var value = d[el.getAttribute("data-i18n-alt")];
      if (typeof value === "string" && value) el.setAttribute("alt", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var value = d[el.getAttribute("data-i18n-aria")];
      if (typeof value === "string" && value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === currentLang ? "true" : "false");
    });

    applyImageAlts();
    setLoopNote(activeNode);
    refreshScrollHints();
    revealInTrack(tabsTrack, document.querySelector("[role=tab][aria-selected=true]"));
    revealInTrack(navTrack, document.querySelector(".nav-track a[aria-current=true]"));

    if (lightbox && !lightbox.hidden) updateLightbox();

    if (persist) store(LANG_KEY, currentLang);
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLang(button.getAttribute("data-lang"), true);
    });
  });

  /* Screenshot theme */

  function prepareThemeShots() {
    document.querySelectorAll(".tabpanel img[data-alt-dark]").forEach(function (img) {
      var dark = img.getAttribute("src");
      img.setAttribute("data-src-dark", dark);
      img.setAttribute("data-src-light", dark.replace("-dark-", "-light-"));
      var button = img.closest(".shot");
      if (button) {
        var full = button.getAttribute("data-full");
        button.setAttribute("data-full-dark", full);
        button.setAttribute("data-full-light", full.replace("-dark-", "-light-"));
      }
    });
  }

  function setTheme(theme) {
    currentTheme = theme === "light" ? "light" : "dark";
    document.querySelectorAll("[data-theme]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-theme") === currentTheme ? "true" : "false");
    });
    document.querySelectorAll(".tabpanel img[data-alt-dark]").forEach(function (img) {
      var src = img.getAttribute(currentTheme === "dark" ? "data-src-dark" : "data-src-light");
      if (src) img.setAttribute("src", src);
      var button = img.closest(".shot");
      if (button) {
        var full = button.getAttribute(currentTheme === "dark" ? "data-full-dark" : "data-full-light");
        if (full) button.setAttribute("data-full", full);
      }
    });
    applyImageAlts();
  }

  document.querySelectorAll("[data-theme]").forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.getAttribute("data-theme"));
    });
  });

  /* Loop nodes */

  var loopNodes = Array.prototype.slice.call(document.querySelectorAll(".loop-node"));
  var loopCards = Array.prototype.slice.call(document.querySelectorAll(".card[data-card]"));

  function setLoopNote(key) {
    var note = document.getElementById("loop-note");
    if (!note) return;
    var value = t("loop.one." + key);
    if (value) note.textContent = value;
  }

  function showNode(key) {
    activeNode = key;
    loopNodes.forEach(function (node) {
      var on = node.getAttribute("data-node") === key;
      node.classList.toggle("is-active", on);
      node.setAttribute("aria-pressed", on ? "true" : "false");
    });
    loopCards.forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-card") === key);
    });
    setLoopNote(key);
  }

  loopNodes.forEach(function (node) {
    var key = node.getAttribute("data-node");
    node.addEventListener("mouseenter", function () {
      showNode(key);
    });
    node.addEventListener("mouseleave", function () {
      showNode(pinnedNode);
    });
    node.addEventListener("focus", function () {
      showNode(key);
    });
    node.addEventListener("blur", function () {
      showNode(pinnedNode);
    });
    node.addEventListener("click", function () {
      pinnedNode = key;
      showNode(key);
    });
  });

  /* Factory stepper */

  var steps = Array.prototype.slice.call(document.querySelectorAll(".step[data-step]"));
  var stepPanels = Array.prototype.slice.call(document.querySelectorAll(".step-panel[data-panel]"));

  function showStep(key) {
    steps.forEach(function (step) {
      var on = step.getAttribute("data-step") === key;
      step.classList.toggle("is-active", on);
      step.setAttribute("aria-pressed", on ? "true" : "false");
    });
    stepPanels.forEach(function (panel) {
      var on = panel.getAttribute("data-panel") === key;
      panel.classList.toggle("is-active", on);
      if (on) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  }

  steps.forEach(function (step) {
    step.addEventListener("click", function () {
      showStep(step.getAttribute("data-step"));
    });
  });

  /* Office tabs */

  var tabs = Array.prototype.slice.call(document.querySelectorAll("[role=tab]"));
  var tabPanels = Array.prototype.slice.call(document.querySelectorAll("[role=tabpanel]"));

  function selectTab(tab, moveFocus) {
    tabs.forEach(function (item) {
      var on = item === tab;
      item.setAttribute("aria-selected", on ? "true" : "false");
      item.setAttribute("tabindex", on ? "0" : "-1");
    });
    tabPanels.forEach(function (panel) {
      var on = panel.id === tab.getAttribute("aria-controls");
      panel.classList.toggle("is-active", on);
      if (on) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
    if (moveFocus) tab.focus();
    revealInTrack(tabsTrack, tab);
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(tab, false);
    });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });

  /* Lightbox */

  function visibleShots() {
    var seen = {};
    return Array.prototype.slice.call(document.querySelectorAll(".shot")).filter(function (shot) {
      if (shot.offsetParent === null) return false;
      var full = shot.getAttribute("data-full");
      if (full && seen[full]) return false;
      if (full) seen[full] = true;
      return true;
    });
  }

  function updateLightbox() {
    if (!shots.length) return;
    var button = shots[currentShot];
    var img = button.querySelector("img");
    if (!img) return;
    lightboxImg.setAttribute("src", button.getAttribute("data-full") || img.getAttribute("src"));
    lightboxImg.setAttribute("alt", img.getAttribute("alt") || "");
    lightboxCaption.textContent = img.getAttribute("alt") || "";
    var multiple = shots.length > 1;
    lightboxPrev.hidden = !multiple;
    lightboxNext.hidden = !multiple;
    lightboxClose.focus();
  }

  function openLightbox(trigger) {
    shots = visibleShots();
    currentShot = shots.indexOf(trigger);
    if (currentShot < 0) {
      shots = [trigger];
      currentShot = 0;
    }
    lastTrigger = trigger;
    lightbox.hidden = false;
    document.body.classList.add("lb-open");
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lb-open");
    lightboxImg.removeAttribute("src");
    if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus();
  }

  function stepLightbox(direction) {
    if (shots.length < 2) return;
    currentShot = (currentShot + direction + shots.length) % shots.length;
    updateLightbox();
  }

  document.querySelectorAll(".shot").forEach(function (button) {
    button.addEventListener("click", function () {
      openLightbox(button);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () {
    stepLightbox(-1);
  });
  lightboxNext.addEventListener("click", function () {
    stepLightbox(1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
      return;
    }
    if (event.key !== "Tab") return;
    var focusables = Array.prototype.slice.call(
      lightbox.querySelectorAll("button:not([hidden]), [href], [tabindex]:not([tabindex='-1'])")
    ).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* Scrollspy */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-track a"));
  var spyTargets = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      var on = link.getAttribute("href") === "#" + id;
      if (on) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
      if (on) revealInTrack(navTrack, link);
    });
  }

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    spyTargets.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* Reveals */

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  reveals.forEach(function (el) {
    var siblings = Array.prototype.slice.call(el.parentNode.querySelectorAll(":scope > .reveal"));
    var index = siblings.indexOf(el);
    if (index > 0) el.style.transitionDelay = index * 60 + "ms";
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  [navTrack, tabsTrack].forEach(function (track) {
    if (!track) return;
    track.addEventListener("scroll", function () {
      updateScrollHint(track);
    }, { passive: true });
  });

  var hintTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(function () {
      refreshScrollHints();
      revealInTrack(tabsTrack, document.querySelector("[role=tab][aria-selected=true]"));
      revealInTrack(navTrack, document.querySelector(".nav-track a[aria-current=true]"));
    }, 120);
  });

  /* Init */

  prepareThemeShots();
  setTheme("dark");
  applyLang(readLang(), false);

  if (tabPanels.length) {
    tabPanels.forEach(function (panel, index) {
      if (index === 0) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  }

  if (steps.length) showStep(steps[0].getAttribute("data-step"));
  showNode("extension");
  refreshScrollHints();

  if (lightbox.hidden) {
    lightboxPrev.hidden = true;
    lightboxNext.hidden = true;
  }
})();
