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
            const pauseImages = document.getElementById("pausImages");
            if (pauseImages.style.display === "none" || pauseImages.style.display === "") {
                pauseImages.style.display = "flex";
            } else {
                pauseImages.style.display = "none";
            }
        }
            function togglepuske() {
            const pausImages = document.getElementById("puskeImages");
            if (puskeImages.style.display === "none" || puskeImages.style.display === "") {
                puskeImages.style.display = "flex";
            } else {
                puskeImages.style.display = "none";
            }
        }
