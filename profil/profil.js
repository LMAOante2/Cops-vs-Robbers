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

setTimeout(() => {
  document.getElementById('cursor').classList.add('fade-out');
}, 3000);



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

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("status");


  let savedStatus = localStorage.getItem("status");
  
 
  if (savedStatus === null) {
    savedStatus = "true";
    localStorage.setItem("status", savedStatus);
  }

 
  toggle.checked = savedStatus === "true";

  toggle.addEventListener("change", () => {
    const newStatus = toggle.checked ? "true" : "false";
    localStorage.setItem("status", newStatus);

 
    const content = document.getElementById("igraci");
    if (toggle.checked) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });

 
  const content = document.getElementById("igraci");
  if (savedStatus === "true") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
});

const buttons = document.querySelectorAll('.btn4');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});










