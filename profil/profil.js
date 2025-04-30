import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
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
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme + "-mode");
  toggle.checked = savedTheme === "dark";

  toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "light" : "dark";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(newTheme + "-mode");
    localStorage.setItem("theme", newTheme);
  });

  document.getElementById("logout").addEventListener("click", () => {
    location.reload();
  });
});

