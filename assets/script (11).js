/* ==========================================================================
   VALLENT EXS — Documentation Site
   script.js
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Navbar background on scroll
     ------------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");

  function updateNavbarState() {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  /* ------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     Scroll reveal for feature cards and generic reveal elements
     ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(".feature-card, .reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el, index) {
      el.style.transitionDelay = (index % 6) * 0.06 + "s";
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ------------------------------------------------------------------
     Feature card cursor-following glow
     ------------------------------------------------------------------ */
  document.querySelectorAll(".feature-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  /* ------------------------------------------------------------------
     Legal page: highlight active table-of-contents entry on scroll
     ------------------------------------------------------------------ */
  const toc = document.getElementById("legalToc");

  if (toc) {
    const tocLinks = Array.from(toc.querySelectorAll("a"));
    const sections = tocLinks
      .map(function (link) {
        const id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    function setActiveTocLink(id) {
      tocLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }

    if ("IntersectionObserver" in window && sections.length) {
      const tocObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActiveTocLink(entry.target.id);
            }
          });
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );

      sections.forEach(function (section) {
        tocObserver.observe(section);
      });
    }
  }

  /* ------------------------------------------------------------------
     Mark the current page's nav link as active (fallback safeguard)
     ------------------------------------------------------------------ */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
})();
