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

