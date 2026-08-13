(() => {
  const form = document.querySelector("[data-comment-form]");
  const list = document.querySelector("[data-comment-list]");
  const emptyState = document.querySelector("[data-comment-empty]");
  const status = document.querySelector("[data-comment-status]");
  const count = document.querySelector("[data-comment-count]");

  if (!form || !list || !emptyState || !status || !count) return;

  const storageKey = `summit-comments:${window.location.pathname}`;
  let comments = [];

  const escapeHTML = (value) =>
    String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    })[character]);

  const formatDate = (value) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));

  const setStatus = (message, state = "") => {
    status.textContent = message;
    status.dataset.state = state;
  };

  const persist = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  };

  const render = () => {
    list.innerHTML = "";
    count.textContent = comments.length;
    emptyState.hidden = comments.length > 0;

    comments.forEach((comment) => {
      const item = document.createElement("article");
      item.className = "comment-card";
      item.innerHTML = `
        <div class="comment-card-topline">
          <div class="comment-author">
            <span class="comment-avatar" aria-hidden="true">${escapeHTML(comment.name.charAt(0).toUpperCase())}</span>
            <div><strong>${escapeHTML(comment.name)}</strong><time datetime="${escapeHTML(comment.createdAt)}">${formatDate(comment.createdAt)}</time></div>
          </div>
          <button class="comment-remove" type="button" data-remove-comment="${escapeHTML(comment.id)}">Remove</button>
        </div>
        <p>${escapeHTML(comment.body).replace(/\n/g, "<br />")}</p>
      `;
      list.appendChild(item);
    });
  };

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    comments = Array.isArray(saved) ? saved : [];
  } catch {
    comments = [];
    setStatus("Comments are available for this session only.", "info");
  }

  render();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("comment-name") || "").trim();
    const body = String(formData.get("comment-body") || "").trim();

    if (!name || !body) return;

    const comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      body,
      createdAt: new Date().toISOString(),
    };

    comments = [comment, ...comments];

    try {
      persist();
      render();
      form.reset();
      setStatus("Your comment is now visible on this device.", "success");
    } catch {
      comments = comments.filter((item) => item.id !== comment.id);
      setStatus("This browser could not save the comment. Please try again.", "error");
    }
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-comment]");
    if (!button) return;

    comments = comments.filter((comment) => comment.id !== button.dataset.removeComment);

    try {
      persist();
      render();
      setStatus("Comment removed from this device.", "success");
    } catch {
      setStatus("The comment could not be removed.", "error");
    }
  });
})();
