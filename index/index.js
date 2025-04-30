    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin-link').style.display = 'inline-block';
    }

    function logout() {
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    }
    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin-link1').style.display = 'inline-block';
    }

    function logout() {
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    }

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
        const theme = localStorage.getItem("theme");
        document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
      
        const toggle = document.getElementById("modeToggle");
        if (toggle) {
          toggle.checked = theme === "dark";
      
          toggle.addEventListener("change", () => {
            if (toggle.checked) {
              document.body.classList.replace("light-mode", "dark-mode");
              localStorage.setItem("theme", "dark");
            } else {
              document.body.classList.replace("dark-mode", "light-mode");
              localStorage.setItem("theme", "light");
            }
          });
        }
      });
