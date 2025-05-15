import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDa-Gn5AtvCYwzC7GvArnDUrc6HQfdT-U4",
  authDomain: "login-form-19883.firebaseapp.com",
  projectId: "login-form-19883",
  storageBucket: "login-form-19883.firebaseapp.com",
  messagingSenderId: "469023290458",
  appId: "1:469023290458:web:d0d24d8e80ae5c557b5463"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText = userData.firstName;
          document.getElementById('loggedUserEmail').innerText = userData.email;
          document.getElementById('loggedUserLName').innerText = userData.lastName;
        } else {
          console.log("No document found matching ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});


const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});


onAuthStateChanged(auth, (user) => {
  const link1 = document.getElementById('link1');
  if (user) {
    link1.style.display = 'none';
  } else {
    link1.style.display = 'true';
  }
});


onAuthStateChanged(auth, (user) => {
  const logout = document.getElementById('logout');
  if (user) {
    logout.style.display = 'true';
  } else {
    logout.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const resetPassword = document.getElementById('resetPassword');
  if (user) {
    resetPassword.style.display = 'true';
  } else {
    resetPassword.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const Ime = document.getElementById('Ime');
  if (user) {
    Ime.style.display = 'true';
  } else {
    Ime.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const Ime1 = document.getElementById('Ime1');
  if (user) {
    Ime1.style.display = 'true';
  } else {
    Ime1.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const Ime2 = document.getElementById('Ime2');
  if (user) {
    Ime2.style.display = 'true';
  } else {
    Ime2.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('light');
  if (user) {
    light.style.display = 'true';
  } else {
    light.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('status1');
  if (user) {
    light.style.display = 'true';
  } else {
    light.style.display = 'none';
  }
});

onAuthStateChanged(auth, (user) => {
  const lightnot = document.getElementById('lightnot');
  if (user) {
    lightnot.style.display = 'none';
  } else {
    lightnot.style.display = 'true';
  }
});

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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("profil1").addEventListener("click", function () {
    if(document.getElementById("postavke").style.display = "none"){
      document.getElementById("profil").style.display = "block";
    }
    else {
      document.getElementById("postavke").style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("postavke1").addEventListener("click", function () {
    if(    document.getElementById("profil").style.display = "none") {
      document.getElementById("postavke").style.display = "block";
      document.getElementById("profil").style.display = "none";
      document.getElementById("promjenidiv").style.display = "none";
    }
    else{
      document.getElementById("profil").style.display = "none";
    }
  });
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("promjenibtn").addEventListener("click", function () {
    if(document.getElementById("promjenidiv").style.display = "none") {
      document.getElementById("promjenidiv").style.display = "block";
    }
    else{
      document.getElementById("profil").style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById('resetPassword');
  if (!resetBtn) return;

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('resetEmail');
    const messageDiv = document.getElementById('resetMessage');

    if (!emailInput || !messageDiv) return;

    const email = emailInput.value.trim();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'E-mail za ponovno postavljanje lozinke je poslan!';
        messageDiv.style.color = 'green';
      })
      .catch((error) => {
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'Error u slanju e-maila. Pogledaj jel dobro upisano.';
        messageDiv.style.color = 'red';
        console.error(error);
      });
  });
});







