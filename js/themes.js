const toggleBtn = document.getElementById("theme-toggle");
const userPref = localStorage.getItem("theme");
const systemPref = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  toggleBtn.textContent = theme === "dark" ? "🌞" : "🌙";
};

// Initial theme setup
const initialTheme = userPref || (systemPref ? "dark" : "light");
applyTheme(initialTheme);

// Toggle button click
toggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});