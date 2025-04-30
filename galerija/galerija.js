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
            function toggleCars() {
            const carImages = document.getElementById("carImages");
            if (carImages.style.display === "none" || carImages.style.display === "") {
                carImages.style.display = "flex";
            } else {
                carImages.style.display = "none";
            }
        }
            function toggleinventory() {
            const inventoryImages = document.getElementById("inventoryImages");
            if (inventoryImages.style.display === "none" || inventoryImages.style.display === "") {
                inventoryImages.style.display = "flex";
            } else {
                inventoryImages.style.display = "none";
            }
        }
            function togglemapa() {
            const mapaImages = document.getElementById("mapaImages");
            if (mapaImages.style.display === "none" || mapaImages.style.display === "") {
                mapaImages.style.display = "flex";
            } else {
                mapaImages.style.display = "none";
            }
        }
            function togglepause() {
            const pauseImages = document.getElementById("pauseImages");
            if (pauseImages.style.display === "none" || pauseImages.style.display === "") {
                pauseImages.style.display = "flex";
            } else {
                pauseImages.style.display = "none";
            }
        }
            function togglepuske() {
            const puskeImages = document.getElementById("puskeImages");
            if (puskeImages.style.display === "none" || puskeImages.style.display === "") {
                puskeImages.style.display = "flex";
            } else {
                puskeImages.style.display = "none";
            }
        }
        function openLightbox(src) {
            document.getElementById("lightbox").style.display = "flex";
            document.getElementById("lightbox-img").src = src;
        }

        function closeLightbox() {
            document.getElementById("lightbox").style.display = "none";
        }

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
