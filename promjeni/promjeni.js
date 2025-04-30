
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
  storageBucket: "login-form-19883.appspot.com",
  messagingSenderId: "469023290458",
  appId: "1:469023290458:web:d0d24d8e80ae5c557b5463"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById('resetPassword');
  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        const messageDiv = document.getElementById('resetMessage');
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'E-mail za ponovno postavljanje lozinke je poslan!';
        messageDiv.style.color = 'green';
      })
      .catch((error) => {
        const messageDiv = document.getElementById('resetMessage');
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'Error u slanju e-maila. Pogledaj jel dobro upisano.';
        messageDiv.style.color = 'red';
        console.error(error);
      });
  });


  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle.addEventListener("click", () => {
    sideMenu.classList.add("active");
  });

  closeMenu.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });

  document.addEventListener("click", (event) => {
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      sideMenu.classList.remove("active");
    }
  });

  setTimeout(() => {
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.classList.add('fade-out');
  }, 3000);
});
