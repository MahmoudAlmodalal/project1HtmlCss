(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const mobileToggle = document.querySelector(".nav-toggle");
  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileToggle) mobileToggle.checked = false;
    });
  });

  if (prefersReducedMotion) return;

  root.classList.add("motion-enabled");

  const revealSelectors = [
    ".hero-content",
    ".hero-note",
    ".intro-grid > *",
    ".section-topline",
    ".section-heading-row",
    ".service-card",
    ".project-card",
    ".journal-teaser-featured",
    ".journal-teaser-list article",
    ".about-visual",
    ".about-copy",
    ".contact-inner > *",
    ".contact-form-wrap",
    ".contact-direct-line",
    ".journal-hero-inner",
    ".journal-featured-card",
    ".journal-archive-card",
    ".journal-signoff-inner",
    ".case-study-hero-content",
    ".case-study-feature-image",
    ".case-study-grid > *",
    ".case-study-results > div",
    ".case-study-next-inner",
    ".article-hero-inner",
    ".article-feature-image",
    ".article-layout > *",
    ".article-next-inner",
    ".comments-inner",
    ".comment-form",
    ".comments-list-wrap",
    ".admin-hero-inner",
    ".admin-stat-card",
    ".admin-section-heading",
    ".admin-article-row",
    ".admin-editor-panel",
    ".admin-comment-card",
  ];

  const targets = [...new Set(document.querySelectorAll(revealSelectors.join(",")))];
  const groupedSelectors = [
    ".services-grid .service-card",
    ".work-grid .project-card",
    ".journal-teaser-list article",
    ".journal-archive-grid .journal-archive-card",
    ".case-study-results > div",
  ];

  targets.forEach((element) => {
    element.dataset.reveal = element.dataset.reveal || "up";
  });

  groupedSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${index * 80}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  targets.forEach((element) => observer.observe(element));
})();
