document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const closeMenu = document.querySelector(".close-menu");
        const sideMenu = document.querySelector(".side-menu");

        menuToggle.addEventListener("click", function () {
            sideMenu.classList.add("active");
        });

        closeMenu.addEventListener("click", function () {
            sideMenu.classList.remove("active");
        });

        document.addEventListener("click", function (event) {
            if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                sideMenu.classList.remove("active");
            }
        });
    });

document.addEventListener("DOMContentLoaded", () => {
  let theme = localStorage.getItem("theme");

  if (!theme) {
    theme = "dark";
    localStorage.setItem("theme", "dark");
  }

  document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");

  const toggle = document.getElementById("modeToggle");
  if (toggle) {
    toggle.checked = theme === "light";

    toggle.addEventListener("change", () => {
      const isLight = toggle.checked;
      document.body.classList.replace(
        isLight ? "dark-mode" : "light-mode",
        isLight ? "light-mode" : "dark-mode"
      );
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }
});

      document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  let savedTheme = localStorage.getItem("theme");


  if (!savedTheme) {
    savedTheme = "dark";
    localStorage.setItem("theme", "dark");
  }

  document.body.classList.add(savedTheme + "-mode");
  toggle.checked = savedTheme === "light";

  toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "light" : "dark";
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(newTheme + "-mode");
    localStorage.setItem("theme", newTheme);
  });

  document.getElementById("logout").addEventListener("click", () => {
    location.reload();
  });
});
