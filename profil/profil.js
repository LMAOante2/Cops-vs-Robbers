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
  doc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase Config
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

// ------------------ USER UI SETUP ---------------------
onAuthStateChanged(auth, async (user) => {
  const uiElements = [
    'link1', 'logout', 'resetPassword', 'Ime', 'Ime1',
    'Ime2', 'light', 'status1', 'lightnot'
  ];

  uiElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = user
      ? (id === 'lightnot' || id === 'link1' ? 'none' : 'block')
      : (id === 'lightnot' || id === 'link1' ? 'block' : 'none');
  });

  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  let userSnap = await getDoc(userDocRef);

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

  // ------------------ THEME SETUP ---------------------
  const theme = data.theme === "light" ? "light" : "dark";
  const modeToggle = document.getElementById("modeToggle");

  document.body.classList.add(`${theme}-mode`);
  if (modeToggle) modeToggle.checked = theme === "light";

  if (modeToggle) {
    modeToggle.addEventListener("change", async () => {
      const newTheme = modeToggle.checked ? "light" : "dark";
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${newTheme}-mode`);
      await updateDoc(userDocRef, { theme: newTheme });
    });
  }

  // ------------------ STATUS1 SETUP ---------------------
  const statusToggle = document.getElementById("status");
  const igraci = document.getElementById("igraci");

  const status = !!data.status1;
  if (statusToggle) statusToggle.checked = status;
  if (igraci) igraci.style.display = status ? "block" : "none";

  if (statusToggle) {
    statusToggle.addEventListener("change", async () => {
      const newStatus = statusToggle.checked;
      if (igraci) igraci.style.display = newStatus ? "block" : "none";
      await updateDoc(userDocRef, { status1: newStatus });
    });
  }
});

// ------------------ LOGOUT ---------------------
document.getElementById('logout')?.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  }).catch(console.error);
});

// ------------------ RESET PASSWORD ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById('resetPassword');
  if (!resetBtn) return;

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('resetEmail')?.value.trim();
    const msg = document.getElementById('resetMessage');
    if (!email || !msg) return;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        msg.style.display = 'block';
        msg.innerText = 'E-mail za ponovno postavljanje lozinke je poslan!';
        msg.style.color = 'green';
      })
      .catch(() => {
        msg.style.display = 'block';
        msg.innerText = 'Error u slanju e-maila. Pogledaj jel dobro upisano.';
        msg.style.color = 'red';
      });
  });
});

// ------------------ SIDEMENU TOGGLE ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle?.addEventListener("click", () => sideMenu?.classList.add("active"));
  closeMenu?.addEventListener("click", () => sideMenu?.classList.remove("active"));

  document.addEventListener("click", (e) => {
    if (!sideMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
      sideMenu?.classList.remove("active");
    }
  });
});

// ------------------ LOADER ---------------------
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (!loader) return;
  loader.classList.add("loader--hidden");
  loader.addEventListener("transitionend", () => {
    loader.remove();
  });
});

// ------------------ PROFILE TOGGLE ---------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("profil1")?.addEventListener("click", () => {
    document.getElementById("profil").style.display = "block";
    document.getElementById("postavke").style.display = "none";
  });

  document.getElementById("postavke1")?.addEventListener("click", () => {
    document.getElementById("profil").style.display = "none";
    document.getElementById("postavke").style.display = "block";
    document.getElementById("promjenidiv").style.display = "none";
  });

  document.getElementById("promjenibtn")?.addEventListener("click", () => {
    document.getElementById("promjenidiv").style.display = "block";
    document.getElementById("profil").style.display = "none";
  });
});

// ------------------ BUTTON ACTIVE TOGGLE ---------------------
document.querySelectorAll('.btn4').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn4').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ------------------ CURSOR FADE ---------------------
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