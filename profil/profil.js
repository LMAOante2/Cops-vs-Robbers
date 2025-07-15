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
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDa-Gn5AtvCYwzC7GvArnDUrc6HQfdT-U4",
  authDomain: "login-form-19883.firebaseapp.com",
  projectId: "login-form-19883",
  storageBucket: "login-form-19883.appspot.com",
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
          document.getElementById('loggedUserposao').innerText = userData.posao;
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
  link1.style.display = user ? 'none' : 'true';
});

onAuthStateChanged(auth, (user) => {
  const logout = document.getElementById('logout');
  logout.style.display = user ? 'true' : 'none';
});


onAuthStateChanged(auth, (user) => {
  const Ime = document.getElementById('Ime');
  Ime.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime1 = document.getElementById('Ime1');
  Ime1.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime2 = document.getElementById('Ime2');
  Ime2.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime3 = document.getElementById('Ime3');
  Ime3.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('light');
  light.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('status1');
  light.style.display = user ? 'true' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const lightnot = document.getElementById('lightnot');
  lightnot.style.display = user ? 'none' : 'true';
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

    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      const userRef = doc(db, "users", loggedInUserId);
      updateDoc(userRef, { theme: newTheme }).catch((error) => {
        console.error("Error saving theme to Firestore:", error);
      });
    }
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
    content.style.display = toggle.checked ? "block" : "none";

    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      const userRef = doc(db, "users", loggedInUserId);
      updateDoc(userRef, { status: newStatus }).catch((error) => {
        console.error("Error saving status to Firestore:", error);
      });
    }
  });

  const content = document.getElementById("igraci");
  content.style.display = savedStatus === "true" ? "block" : "none";
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
    if (document.getElementById("postavke").style.display = "none") {
      document.getElementById("profil").style.display = "block";
    } else {
      document.getElementById("postavke").style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("postavke1").addEventListener("click", function () {
    if (document.getElementById("profil").style.display = "none") {
      document.getElementById("postavke").style.display = "block";
      document.getElementById("profil").style.display = "none";
      document.getElementById("promjenidiv").style.display = "none";
    } else {
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
    if (document.getElementById("promjenidiv").style.display = "none") {
      document.getElementById("promjenidiv").style.display = "block";
    } else {
      document.getElementById("profil").style.display = "none";
    }
  });
});



const resetForm = document.getElementById("resetForm");
const messageDiv = document.getElementById("resetMessage");

resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("resetEmail").value.trim();
  messageDiv.style.display = "block";
  messageDiv.style.color = "black";
  messageDiv.textContent = "Slanje e-maila...";

  try {
    await sendPasswordResetEmail(auth, email);
    messageDiv.style.color = "green";
    messageDiv.textContent = "Email za ponovo postavljanje lozinke je poslan! Provjeri svoj mail.";
  } catch (error) {
    messageDiv.style.color = "red";
    messageDiv.textContent = error.message || "Error tokom slanja maila.";
  }
});


