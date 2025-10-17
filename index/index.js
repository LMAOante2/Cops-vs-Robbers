if (localStorage.getItem("status") === null) {
    localStorage.setItem("status", "true");
}

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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.add('show1');
        } else {
            entry.target.classList.remove('show');
            entry.target.classList.remove('show1');
        }
    });
});

const sakriveniElementi = document.querySelectorAll('.sakriven');
sakriveniElementi.forEach((el) => observer.observe(el));

const sakriveniElement = document.querySelectorAll('.sakriven1');
sakriveniElement.forEach((el) => observer.observe(el));


