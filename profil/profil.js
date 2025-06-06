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
  setDoc,
  updateDoc,
  doc,
  onSnapshot
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

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  let userSnap = await getDoc(userDocRef);

  // Create user doc if it doesn't exist
  if (!userSnap.exists()) {
    await setDoc(userDocRef, {
      theme: "dark",
      status1: true
    });
    userSnap = await getDoc(userDocRef);
  }

  const data = userSnap.data();
  document.getElementById('loggedUserFName').innerText = data.firstName || "";
  document.getElementById('loggedUserEmail').innerText = data.email || "";
  document.getElementById('loggedUserLName').innerText = data.lastName || "";


  const theme = data.theme || "dark";
  const modeToggle = document.getElementById("modeToggle");

  document.body.classList.add(`${theme}-mode`);
  modeToggle.checked = theme === "light";

  modeToggle.addEventListener("change", async () => {
    const newTheme = modeToggle.checked ? "light" : "dark";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${newTheme}-mode`);
    await updateDoc(userDocRef, { theme: newTheme });
  });

const statusToggle = document.getElementById("status");
const igraci = document.getElementById("igraci");

onSnapshot(userDocRef, (docSnap) => {
  if (!docSnap.exists()) return;
  const data = docSnap.data();
  const isStatusOn = !!data.status1; // 👈 Correct Boolean check
  if (statusToggle) statusToggle.checked = isStatusOn;
  if (igraci) igraci.style.display = isStatusOn ? "block" : "none"; // 👈 Real-time show/hide
});

statusToggle.addEventListener("change", async () => {
  const newStatus = statusToggle.checked;
  await updateDoc(userDocRef, { status1: newStatus });
});

const toggleElements = [
  ['link1', false],
  ['logout', true],
  ['resetPassword', true],
  ['Ime', true],
  ['Ime1', true],
  ['Ime2', true],
  ['light', true],
  ['status1', true],
  ['lightnot', false]
];

toggleElements.forEach(([id, showWhenLoggedIn]) => {
  onAuthStateChanged(auth, (user) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = user ? (showWhenLoggedIn ? 'block' : 'none') : (showWhenLoggedIn ? 'none' : 'block');
  });
});

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  }).catch(console.error);
});

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById('resetPassword');
  if (!resetBtn) return;

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();
    const msg = document.getElementById('resetMessage');
    if (!email) return;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        msg.style.display = 'block';
        msg.innerText = 'E-mail za ponovno postavljanje lozinke je poslan!';
        msg.style.color = 'green';
      })
      .catch(() => {
        msg.style.display = 'block';
        msg.innerText = 'Greška u slanju e-maila. Provjeri adresu.';
        msg.style.color = 'red';
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle.addEventListener("click", () => sideMenu.classList.add("active"));
  closeMenu.addEventListener("click", () => sideMenu.classList.remove("active"));

  document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove("active");
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("profil1").addEventListener("click", () => {
    document.getElementById("profil").style.display = "block";
    document.getElementById("postavke").style.display = "none";
  });

  document.getElementById("postavke1").addEventListener("click", () => {
    document.getElementById("profil").style.display = "none";
    document.getElementById("postavke").style.display = "block";
    document.getElementById("promjenidiv").style.display = "none";
  });

  document.getElementById("promjenibtn").addEventListener("click", () => {
    document.getElementById("profil").style.display = "none";
    document.getElementById("promjenidiv").style.display = "block";
  });
});

document.querySelectorAll('.btn4').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn4').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

setTimeout(() => {
  document.getElementById('cursor')?.classList.add('fade-out');
}, 3000);

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