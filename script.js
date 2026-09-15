// ---------- clock + greeting ----------

const clockEl = document.getElementById("clock");
const greetingEl = document.getElementById("greeting");

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  clockEl.textContent = `${h}:${m} ${suffix}`;

  const hour = now.getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  const weekday = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  greetingEl.textContent = `${greeting} — ${weekday}`;
}
updateClock();
setInterval(updateClock, 1000 * 15);

// ---------- search ----------

const searchForm = document.getElementById("searchForm");
const engineSelect = document.getElementById("engine");
const queryInput = document.getElementById("query");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = queryInput.value.trim();
  if (!q) return;
  window.location.href = engineSelect.value + encodeURIComponent(q);
});

// ---------- links ----------

const STORAGE_KEY = "starttab-links";

const DEFAULT_LINKS = [
  { name: "GitHub", url: "https://github.com" },
  { name: "Gmail", url: "https://mail.google.com" },
  { name: "YouTube", url: "https://youtube.com" },
];

function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LINKS.slice();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_LINKS.slice();
  } catch {
    return DEFAULT_LINKS.slice();
  }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

const linkList = document.getElementById("linkList");
const template = document.getElementById("linkItemTemplate");

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) return "https://" + url;
  return url;
}

function renderLinks() {
  const links = loadLinks();
  linkList.innerHTML = "";

  links.forEach((link, index) => {
    const node = template.content.cloneNode(true);
    const anchor = node.querySelector(".linkitem-anchor");
    const name = node.querySelector(".linkitem-name");
    const removeBtn = node.querySelector(".linkitem-remove");

    anchor.href = normalizeUrl(link.url);
    name.textContent = link.name;

    removeBtn.addEventListener("click", () => {
      const current = loadLinks();
      current.splice(index, 1);
      saveLinks(current);
      renderLinks();
    });

    linkList.appendChild(node);
  });
}

document.getElementById("addLinkBtn").addEventListener("click", () => {
  const name = prompt("Link name:");
  if (!name) return;
  const url = prompt("URL:");
  if (!url) return;

  const links = loadLinks();
  links.push({ name: name.trim(), url: url.trim() });
  saveLinks(links);
  renderLinks();
});

renderLinks();
