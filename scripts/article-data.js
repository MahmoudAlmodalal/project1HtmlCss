(() => {
  const defaults = {
    "clarity-is-a-design-decision": {
      slug: "clarity-is-a-design-decision",
      title: "Clarity is a design decision, not a finishing touch.",
      category: "Perspective",
      readTime: "06 min read",
      date: "13 Aug 2026",
      summary: "When a brand feels confusing, adding more is rarely the answer. The real work is deciding what deserves to lead.",
      status: "published",
      path: "journal/clarity-is-a-design-decision.html",
    },
    "systems-that-leave-room": {
      slug: "systems-that-leave-room",
      title: "Build systems that leave room for surprise.",
      category: "Process",
      readTime: "04 min read",
      date: "06 Aug 2026",
      summary: "The best systems do not make every outcome look the same. They make good choices easier to repeat.",
      status: "published",
      path: "journal/systems-that-leave-room.html",
    },
    "the-case-for-a-point-of-view": {
      slug: "the-case-for-a-point-of-view",
      title: "The case for a point of view in every project.",
      category: "Field note",
      readTime: "05 min read",
      date: "29 Jul 2026",
      summary: "Direction is not a mood board. It is the small, durable belief that helps a team decide what belongs.",
      status: "published",
      path: "journal/the-case-for-a-point-of-view.html",
    },
  };

  const getOverrides = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("summit-article-overrides") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch {
      return {};
    }
  };

  const getArticles = () => {
    const overrides = getOverrides();
    return Object.fromEntries(Object.entries(defaults).map(([slug, article]) => [
      slug,
      { ...article, ...(overrides[slug] || {}) },
    ]));
  };

  const applyArticles = () => {
    const articles = getArticles();
    const currentSlug = document.body.dataset.articleSlug;

    document.querySelectorAll("[data-article-card]").forEach((card) => {
      const article = articles[card.dataset.articleCard];
      if (!article) return;
      card.hidden = article.status === "draft";
      card.dataset.articleStatus = article.status;
      const title = card.querySelector("[data-article-title]");
      const category = card.querySelector("[data-article-category]");
      const meta = card.querySelector("[data-article-meta]");
      const summary = card.querySelector("[data-article-summary]");
      if (title) title.textContent = article.title;
      if (category) category.textContent = article.category;
      if (meta) meta.textContent = `${article.readTime} · ${article.date}`;
      if (summary) summary.textContent = article.summary;
    });

    if (currentSlug && articles[currentSlug]) {
      const article = articles[currentSlug];
      const title = document.querySelector("[data-article-title]");
      const category = document.querySelector("[data-article-category]");
      const meta = document.querySelector("[data-article-meta]");
      const summary = document.querySelector("[data-article-summary]");
      if (title) title.textContent = article.title;
      if (category) category.textContent = article.category;
      if (meta) meta.textContent = `${article.readTime} · ${article.date}`;
      if (summary) summary.textContent = article.summary;
    }
  };

  window.SUMMIT_DEFAULT_ARTICLES = defaults;
  window.getSummitArticles = getArticles;
  window.applySummitArticles = applyArticles;
  document.addEventListener("DOMContentLoaded", applyArticles);
})();
