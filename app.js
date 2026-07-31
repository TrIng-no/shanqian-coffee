const WECHAT_ID = "shanqian-coffee";

function filterMenu(category) {
  document.querySelectorAll("[data-category]").forEach((item) => {
    const visible = category === "all" || item.dataset.category === category;
    item.hidden = !visible;
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === category);
  });
}

async function copyWechat() {
  const status = document.querySelector("[data-copy-status]");

  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard unavailable");
    }
    await navigator.clipboard.writeText(WECHAT_ID);
    if (status) status.textContent = `已复制微信号：${WECHAT_ID}`;
  } catch {
    if (status) status.textContent = `微信号：${WECHAT_ID}`;
  }
}

function setupMenuFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => filterMenu(button.dataset.filter));
  });
}

function setupCopyButtons() {
  document.querySelectorAll("[data-copy-wechat]").forEach((button) => {
    button.addEventListener("click", copyWechat);
  });
}

function setupAnchorNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenuFilters();
  setupCopyButtons();
  setupAnchorNavigation();
});

window.filterMenu = filterMenu;
window.copyWechat = copyWechat;
