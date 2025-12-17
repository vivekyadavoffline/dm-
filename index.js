/* =========================================================
   DISCRETE MATH NOTES — FINAL JS SYSTEM
   ========================================================= */

/* ---------------------------------------------------------
   ELEMENT REFERENCES
--------------------------------------------------------- */
const themeBtn = document.getElementById("themeBtn");
const examBtn  = document.getElementById("examBtn");
const lightBtn = document.getElementById("lightBtn");

/* ---------------------------------------------------------
   1. COLLAPSIBLE ARTICLES
--------------------------------------------------------- */
document.querySelectorAll("article h3").forEach((heading) => {
  heading.style.cursor = "pointer";
  const article = heading.parentElement;
  const content = Array.from(article.children).slice(1);

  heading.addEventListener("click", () => {
    const collapsed = article.classList.toggle("collapsed");
    content.forEach(el => el.style.display = collapsed ? "none" : "block");

    heading.textContent =
      (collapsed ? "▶ " : "▼ ") +
      heading.textContent.replace(/^▶ |^▼ /, "");
  });
});

/* ---------------------------------------------------------
   2. SEARCH
--------------------------------------------------------- */
const searchBox = document.createElement("input");
searchBox.className = "search-box";
searchBox.placeholder = "Search notes...";
document.querySelector("header").appendChild(searchBox);

searchBox.addEventListener("input", () => {
  const term = searchBox.value.toLowerCase();
  document.querySelectorAll("article").forEach(article => {
    article.style.display =
      article.innerText.toLowerCase().includes(term)
        ? "block"
        : "none";
  });
});

/* ---------------------------------------------------------
   3. ACTIVE NAV ON SCROLL
--------------------------------------------------------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 150) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

/* ---------------------------------------------------------
   4. THEME SYSTEM (FULLY FIXED)
--------------------------------------------------------- */
const themes = [
  {
    primary: "#38bdf8",
    secondary: "#818cf8",
    soft: "rgba(56,189,248,0.15)",
    border: "rgba(56,189,248,0.4)",
    shadow: "rgba(56,189,248,0.18)",
    glow: "rgba(56,189,248,0.25)"
  },
  {
    primary: "#22c55e",
    secondary: "#16a34a",
    soft: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.4)",
    shadow: "rgba(34,197,94,0.18)",
    glow: "rgba(34,197,94,0.25)"
  },
  {
    primary: "#f59e0b",
    secondary: "#fbbf24",
    soft: "rgba(251,191,36,0.15)",
    border: "rgba(251,191,36,0.4)",
    shadow: "rgba(251,191,36,0.18)",
    glow: "rgba(251,191,36,0.25)"
  }
];

let themeIndex = Number(localStorage.getItem("themeIndex")) || 0;

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--primary-soft", theme.soft);
  root.style.setProperty("--primary-border", theme.border);
  root.style.setProperty("--primary-shadow", theme.shadow);
  root.style.setProperty("--primary-glow", theme.glow);
}

applyTheme(themes[themeIndex]);
themeBtn.classList.add("active");

themeBtn.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  localStorage.setItem("themeIndex", themeIndex);
  applyTheme(themes[themeIndex]);
});

/* Keyboard shortcut */
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t") themeBtn.click();
});

/* ---------------------------------------------------------
   5. EXAM MODE
--------------------------------------------------------- */
if (localStorage.getItem("examMode") === "true") {
  document.body.classList.add("exam-mode");
  examBtn.classList.add("active");
}

examBtn.addEventListener("click", () => {
  document.body.classList.toggle("exam-mode");
  examBtn.classList.toggle("active");
  localStorage.setItem(
    "examMode",
    document.body.classList.contains("exam-mode")
  );
});

/* ---------------------------------------------------------
   6. LIGHT MODE
--------------------------------------------------------- */
if (localStorage.getItem("lightMode") === "true") {
  document.body.classList.add("light-mode");
  lightBtn.classList.add("active");
}

lightBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  lightBtn.classList.toggle("active");
  localStorage.setItem(
    "lightMode",
    document.body.classList.contains("light-mode")
  );
});

/* ---------------------------------------------------------
   7. FOCUS MODE
--------------------------------------------------------- */
document.querySelectorAll("article").forEach(article => {
  article.addEventListener("dblclick", () => {
    document.querySelectorAll("article").forEach(a => a.classList.remove("focus"));
    article.classList.add("focus");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll("article").forEach(a => a.classList.remove("focus"));
  }
});

/* ---------------------------------------------------------
   8. SCROLL PROGRESS BAR
--------------------------------------------------------- */
const progressBar = document.createElement("div");
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 9999;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (scrollY / h) * 100 + "%";
});

/* ---------------------------------------------------------
   9. RESTORE SCROLL
--------------------------------------------------------- */
window.addEventListener("beforeunload", () => {
  localStorage.setItem("scrollY", scrollY);
});

window.addEventListener("load", () => {
  const y = localStorage.getItem("scrollY");
  if (y) scrollTo(0, y);
});

/* ---------------------------------------------------------
   READY
--------------------------------------------------------- */
console.info("DM Notes fully loaded ✔");
