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
  updateDoc // 🔹 added this
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

// 🔹 Load saved theme and status from Firestore when user logs in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Apply saved theme from Firestore (fallback: dark)
        const savedTheme = userData.theme || "dark";
        localStorage.setItem("theme", savedTheme);
        document.body.classList.remove("dark-mode", "light-mode");
        document.body.classList.add(savedTheme + "-mode");
        const toggleTheme = document.getElementById("modeToggle");
        if (toggleTheme) toggleTheme.checked = savedTheme === "light";

        // Apply saved status from Firestore (fallback: "true")
        const savedStatus = userData.status ?? "true";
        localStorage.setItem("status", savedStatus);
        const toggleStatus = document.getElementById("status");
        if (toggleStatus) toggleStatus.checked = savedStatus === "true";
        const content = document.getElementById("igraci");
        if (content) content.style.display = savedStatus === "true" ? "block" : "none";
      }
    } catch (error) {
      console.error("Error loading user preferences:", error);
    }
  }
});

// Existing onAuthStateChanged: Load and display user info from Firestore based on localStorage user ID
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

// Fix display style assignments here (replacing 'true' with 'block' or 'inline' as needed)
onAuthStateChanged(auth, (user) => {
  const link1 = document.getElementById('link1');
  if (link1) link1.style.display = user ? 'none' : 'block';
});

onAuthStateChanged(auth, (user) => {
  const logout = document.getElementById('logout');
  if (logout) logout.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const resetPassword = document.getElementById('resetPassword');
  if (resetPassword) resetPassword.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime = document.getElementById('Ime');
  if (Ime) Ime.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime1 = document.getElementById('Ime1');
  if (Ime1) Ime1.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const Ime2 = document.getElementById('Ime2');
  if (Ime2) Ime2.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('light');
  if (light) light.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const status1 = document.getElementById('status1');
  if (status1) status1.style.display = user ? 'block' : 'none';
});

onAuthStateChanged(auth, (user) => {
  const lightnot = document.getElementById('lightnot');
  if (lightnot) lightnot.style.display = user ? 'none' : 'block';
});

const logoutButton = document.getElementById('logout');
if (logoutButton) {
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
  const cursor = document.getElementById('cursor');
  if(cursor) cursor.classList.add('fade-out');
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    savedTheme = "dark";
    localStorage.setItem("theme", "dark");
  }

  document.body.classList.add(savedTheme + "-mode");
  if(toggle) toggle.checked = savedTheme === "light";

  if(toggle) {
    toggle.addEventListener("change", () => {
      const newTheme = toggle.checked ? "light" : "dark";
      document.body.classList.remove("dark-mode", "light-mode");
      document.body.classList.add(newTheme + "-mode");
      localStorage.setItem("theme", newTheme);

      // 🔹 Save theme to Firestore
      const loggedInUserId = localStorage.getItem("loggedInUserId");
      if (loggedInUserId) {
        const userRef = doc(db, "users", loggedInUserId);
        updateDoc(userRef, { theme: newTheme }).catch((error) => {
          console.error("Error saving theme to Firestore:", error);
        });
      }
    });
  }

  const logoutBtn = document.getElementById("logout");
  if(logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      location.reload();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("status");
  let savedStatus = localStorage.getItem("status");

  if (savedStatus === null) {
    savedStatus = "true";
    localStorage.setItem("status", savedStatus);
  }

  if(toggle) toggle.checked = savedStatus === "true";

  if(toggle) {
    toggle.addEventListener("change", () => {
      const newStatus = toggle.checked ? "true" : "false";
      localStorage.setItem("status", newStatus);

      const content = document.getElementById("igraci");
      if(content) content.style.display = toggle.checked ? "block" : "none";

      // 🔹 Save status to Firestore
      const loggedInUserId = localStorage.getItem("loggedInUserId");
      if (loggedInUserId) {
        const userRef = doc(db, "users", loggedInUserId);
        updateDoc(userRef, { status: newStatus }).catch((error) => {
          console.error("Error saving status to Firestore:", error);
        });
      }
    });
  }

  const content = document.getElementById("igraci");
  if(content) content.style.display = savedStatus === "true" ? "block" : "none";
});

const buttons = document.querySelectorAll('.btn4');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const profil1 = document.getElementById("profil1");
  if(profil1) {
    profil1.addEventListener("click", function () {
      const postavke = document.getElementById("postavke");
      const profil = document.getElementById("profil");
      if(postavke) postavke.style.display = "none";
      if(profil) profil.style.display = "block";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const postavke1 = document.getElementById("postavke1");
  if(postavke1) {
    postavke1.addEventListener("click", function () {
      const profil = document.getElementById("profil");
      const postavke = document.getElementById("postavke");
      const promjenidiv = document.getElementById("promjenidiv");
      if(profil) profil.style.display = "none";
      if(postavke) postavke.style.display = "block";
      if(promjenidiv) promjenidiv.style.display = "none";
    });
  }
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if(loader) {
    loader.classList.add("loader--hidden");
    loader.addEventListener("transitionend", () => {
      if(loader.parentNode) loader.parentNode.removeChild(loader);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const promjenibtn = document.getElementById("promjenibtn");
  if(promjenibtn) {
    promjenibtn.addEventListener("click", function () {
      const promjenidiv = document.getElementById("promjenidiv");
      const profil = document.getElementById("profil");
      if(promjenidiv && promjenidiv.style.display === "none") {
        promjenidiv.style.display = "block";
      } else {
        if(profil) profil.style.display = "none";
      }
    });
  }
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
