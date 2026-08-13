const initAdmin = () => {
  const articleList = document.querySelector("[data-admin-article-list]");
  const articleForm = document.querySelector("[data-admin-article-form]");
  const commentsList = document.querySelector("[data-admin-comments-list]");
  const commentFilter = document.querySelector("[data-comment-filter]");
  const status = document.querySelector("[data-admin-status]");
  const editorState = document.querySelector("[data-editor-state]");
  const articleCount = document.querySelector("[data-admin-article-count]");
  const publishedCount = document.querySelector("[data-admin-published-count]");
  const commentCount = document.querySelector("[data-admin-comment-count]");

  if (!articleList || !articleForm || !commentsList) return;

  const overrideKey = "summit-article-overrides";
  const commentPrefix = window.location.pathname.includes("/summit-creative-studio/") ? "/summit-creative-studio/" : "/";
  let selectedSlug = "";

  const readJSON = (key, fallback) => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || "null");
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  const saveOverrides = (overrides) => {
    window.localStorage.setItem(overrideKey, JSON.stringify(overrides));
  };

  const getOverrides = () => readJSON(overrideKey, {});
  const getArticles = () => window.getSummitArticles ? window.getSummitArticles() : {};
  const getCommentKey = (article) => `summit-comments:${commentPrefix}${article.path}`;
  const getComments = (article) => {
    const value = readJSON(getCommentKey(article), []);
    return Array.isArray(value) ? value : [];
  };

  const setStatus = (message, state = "") => {
    status.textContent = message;
    status.dataset.state = state;
  };

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Unknown date" : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  const createMeta = (label, value) => {
    const wrapper = document.createElement("div");
    const small = document.createElement("span");
    small.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = value;
    wrapper.append(small, strong);
    return wrapper;
  };

  const getSortedArticles = () => Object.values(getArticles());

  const renderStats = () => {
    const articles = getSortedArticles();
    const comments = articles.reduce((total, article) => total + getComments(article).length, 0);
    articleCount.textContent = articles.length;
    publishedCount.textContent = articles.filter((article) => article.status === "published").length;
    commentCount.textContent = comments;
  };

  const loadEditor = (slug) => {
    const article = getArticles()[slug];
    if (!article) return;
    selectedSlug = slug;
    articleForm.elements.slug.value = article.slug;
    articleForm.elements.title.value = article.title;
    articleForm.elements.category.value = article.category;
    articleForm.elements.readTime.value = article.readTime;
    articleForm.elements.date.value = article.date;
    articleForm.elements.summary.value = article.summary;
    articleForm.elements.status.value = article.status;
    editorState.textContent = "Editing";
    document.querySelectorAll(".admin-article-row").forEach((row) => row.classList.toggle("is-selected", row.dataset.articleSlug === slug));
  };

  const renderArticles = () => {
    const articles = getSortedArticles();
    articleList.innerHTML = "";
    articles.forEach((article) => {
      const row = document.createElement("article");
      row.className = "admin-article-row";
      row.dataset.articleSlug = article.slug;
      if (article.slug === selectedSlug) row.classList.add("is-selected");

      const copy = document.createElement("div");
      copy.className = "admin-article-row-copy";
      const label = document.createElement("span");
      label.className = "admin-row-kicker";
      label.textContent = `${article.category} · ${article.status}`;
      const title = document.createElement("h3");
      title.textContent = article.title;
      const summary = document.createElement("p");
      summary.textContent = article.summary;
      copy.append(label, title, summary);

      const meta = document.createElement("div");
      meta.className = "admin-article-row-meta";
      meta.append(createMeta("Read time", article.readTime), createMeta("Date", article.date));
      const button = document.createElement("button");
      button.className = "admin-edit-button";
      button.type = "button";
      button.textContent = "Edit";
      button.addEventListener("click", () => loadEditor(article.slug));
      meta.append(button);
      row.append(copy, meta);
      articleList.appendChild(row);
    });

    if (selectedSlug && getArticles()[selectedSlug]) loadEditor(selectedSlug);
    renderStats();
  };

  const renderFilter = () => {
    const selected = commentFilter.value || "all";
    commentFilter.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All articles";
    commentFilter.appendChild(allOption);
    getSortedArticles().forEach((article) => {
      const option = document.createElement("option");
      option.value = article.slug;
      option.textContent = article.title;
      commentFilter.appendChild(option);
    });
    commentFilter.value = getArticles()[selected] || selected === "all" ? selected : "all";
  };

  const removeComment = (article, commentId) => {
    const comments = getComments(article).filter((comment) => comment.id !== commentId);
    window.localStorage.setItem(getCommentKey(article), JSON.stringify(comments));
    renderComments();
    setStatus("Comment removed from this device.", "success");
  };

  const renderComments = () => {
    const filter = commentFilter.value || "all";
    commentsList.innerHTML = "";
    let rendered = 0;

    getSortedArticles().forEach((article) => {
      if (filter !== "all" && filter !== article.slug) return;
      getComments(article).forEach((comment) => {
        rendered += 1;
        const card = document.createElement("article");
        card.className = "admin-comment-card";
        const top = document.createElement("div");
        top.className = "admin-comment-card-topline";
        const label = document.createElement("span");
        label.className = "admin-row-kicker";
        label.textContent = article.title;
        const remove = document.createElement("button");
        remove.className = "admin-danger-button admin-small-danger";
        remove.type = "button";
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeComment(article, comment.id));
        top.append(label, remove);
        const author = document.createElement("strong");
        author.textContent = comment.name;
        const date = document.createElement("time");
        date.textContent = formatDate(comment.createdAt);
        const body = document.createElement("p");
        body.textContent = comment.body;
        card.append(top, author, date, body);
        commentsList.appendChild(card);
      });
    });

    if (!rendered) {
      const empty = document.createElement("p");
      empty.className = "admin-empty-state";
      empty.textContent = "No local comments match this view yet.";
      commentsList.appendChild(empty);
    }

    renderStats();
  };

  articleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!articleForm.checkValidity()) {
      articleForm.reportValidity();
      return;
    }

    const formData = new FormData(articleForm);
    const slug = String(formData.get("slug"));
    const overrides = getOverrides();
    overrides[slug] = {
      ...(overrides[slug] || {}),
      title: String(formData.get("title")).trim(),
      category: String(formData.get("category")).trim(),
      readTime: String(formData.get("readTime")).trim(),
      date: String(formData.get("date")).trim(),
      summary: String(formData.get("summary")).trim(),
      status: String(formData.get("status")),
    };

    try {
      saveOverrides(overrides);
      selectedSlug = slug;
      renderArticles();
      renderFilter();
      renderComments();
      setStatus("Article metadata saved locally.", "success");
    } catch {
      setStatus("The browser could not save this edit.", "error");
    }
  });

  document.querySelector("[data-clear-article]").addEventListener("click", () => {
    if (!selectedSlug) return;
    const overrides = getOverrides();
    delete overrides[selectedSlug];
    saveOverrides(overrides);
    renderArticles();
    renderFilter();
    renderComments();
    setStatus("Local edit cleared and the original article restored.", "success");
  });

  document.querySelector("[data-reset-articles]").addEventListener("click", () => {
    window.localStorage.removeItem(overrideKey);
    selectedSlug = "";
    renderArticles();
    renderFilter();
    renderComments();
    setStatus("All local article edits were reset.", "success");
  });

  document.querySelector("[data-clear-comments]").addEventListener("click", () => {
    if (!window.confirm("Remove every comment stored on this device?")) return;
    getSortedArticles().forEach((article) => window.localStorage.removeItem(getCommentKey(article)));
    renderComments();
    setStatus("All local comments were removed.", "success");
  });

  commentFilter.addEventListener("change", renderComments);

  renderFilter();
  renderArticles();
  renderComments();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdmin);
} else {
  initAdmin();
}
