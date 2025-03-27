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
