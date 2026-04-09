(function() {
  function setupMobileNav() {
    const nav = document.querySelector(".nav[data-mobile-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const backdrop = document.querySelector("[data-nav-backdrop]");
    const navLinksId = toggle ? toggle.getAttribute("aria-controls") : "";
    const navLinks = navLinksId ? document.getElementById(navLinksId) : null;
    const toggleLabel = toggle ? toggle.querySelector(".nav-toggle-label") : null;
    const breakpointValue = nav ? Number(nav.getAttribute("data-mobile-nav-breakpoint")) : NaN;
    const breakpoint = Number.isFinite(breakpointValue) ? breakpointValue : 900;

    if (!nav || !toggle || !navLinks || !backdrop) {
      return;
    }

    function isCompactViewport() {
      return window.innerWidth <= breakpoint;
    }

    function setOpen(nextOpen) {
      const compact = isCompactViewport();
      const open = compact ? nextOpen : false;

      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      navLinks.setAttribute("aria-hidden", String(compact ? !open : false));

      if ("inert" in navLinks) {
        navLinks.inert = compact ? !open : false;
      }

      if (toggleLabel) {
        toggleLabel.textContent = open ? "Fechar" : "Menu";
      }

      backdrop.hidden = !open;
      backdrop.setAttribute("aria-hidden", String(!open));
    }

    toggle.addEventListener("click", function() {
      setOpen(!nav.classList.contains("is-open"));
    });

    backdrop.addEventListener("click", function() {
      setOpen(false);
    });

    navLinks.addEventListener("click", function(event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function() {
      if (!isCompactViewport()) {
        setOpen(false);
      }
    });

    setOpen(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMobileNav, { once: true });
  } else {
    setupMobileNav();
  }
})();
