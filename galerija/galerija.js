    function toggleCars() {
        const carImages = document.getElementById("carImages");
        carImages.classList.toggle("visible");
    }
    
    function toggleinventory() {
        const inventoryImages = document.getElementById("inventoryImages");
        inventoryImages.classList.toggle("visible");
    }
    function togglemapa() {
        const mapaImages = document.getElementById("mapaImages");
        mapaImages.classList.toggle("visible");
    }
    function togglepause() {
        const pauseImages = document.getElementById("pauseImages");
        pauseImages.classList.toggle("visible");
    }
    function togglepuske() {
        const puskeImages = document.getElementById("puskeImages");
        puskeImages.classList.toggle("visible");
    }
        function openLightbox(src) {
            document.getElementById("lightbox").style.display = "flex";
            document.getElementById("lightbox-img").src = src;
        }

        function closeLightbox() {
            document.getElementById("lightbox").style.display = "none";
        }

