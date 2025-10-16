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
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  const link1 = document.getElementById('link1');
  const logoutBtn = document.getElementById('logout');
  const Ime = document.getElementById('Ime');
  const Ime1 = document.getElementById('Ime1');
  const postavke = document.getElementById('postavke');
  const Ime3 = document.getElementById('Ime3');
  const light = document.getElementById('light');
  const status1 = document.getElementById('status1');
  const lightnot = document.getElementById('lightnot');

  if (user && loggedInUserId) {

    try {
      const docRef = doc(db, "users", loggedInUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('loggedUserFName').innerText = data.firstName;
        document.getElementById('loggedUserEmail').innerText = data.email;
        document.getElementById('loggedUserLName').innerText = data.lastName;
        document.getElementById('loggedUserposao').innerText = data.posao;
        document.getElementById("resetEmail").value = data.email;
      }
    } catch (err) {
      console.error("Greška pri dohvaćanju dokumenta:", err);
    }

    link1.style.display = "none";
    logoutBtn.style.display = "block";
    Ime.style.display = "block";
    Ime1.style.display = "none";
    postavke.style.display = "block";
    Ime3.style.display = "block";
    light.style.display = "block";
    status1.style.display = "block";
    lightnot.style.display = "none";
  } else {
    link1.style.display = "block";
    logoutBtn.style.display = "none";
    Ime.style.display = "none";
    Ime1.style.display = "block";
    postavke.style.display = "none";
    Ime3.style.display = "none";
    light.style.display = "none";
    status1.style.display = "none";
    lightnot.style.display = "block";
  }
});

onAuthStateChanged(auth, (user) => {
  const link1 = document.getElementById('link1');
  link1.style.display = user ? 'none' : 'block';
});
onAuthStateChanged(auth, (user) => {
  const logout = document.getElementById('logout');
  logout.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const Ime = document.getElementById('Ime');
  Ime.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const Ime1 = document.getElementById('Ime1');
  Ime1.style.display = user ? 'none' : 'block';
});
onAuthStateChanged(auth, (user) => {
  const postavke = document.getElementById('postavke');
  postavke.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const Ime3 = document.getElementById('Ime3');
  Ime3.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('light');
  light.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const light = document.getElementById('status1');
  light.style.display = user ? 'block' : 'none';
});
onAuthStateChanged(auth, (user) => {
  const lightnot = document.getElementById('lightnot');
  lightnot.style.display = user ? 'none' : 'block';
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => (window.location.href = 'index.html'))
    .catch(err => console.error("Greška pri odjavi:", err));
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
    messageDiv.textContent = error.message || "Greška tokom slanja maila.";
  }
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  });

  setTimeout(() => {
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }, 2000);
});

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(`${savedTheme}-mode`);
