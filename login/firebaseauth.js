import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}


document.getElementById('submitSignUp')?.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  if (!email || !password || !firstName || !lastName) {
    showMessage('Molimo popunite sva polja.', 'signUpMessage');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = { email, firstName, lastName };

      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData).then(() => {
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Račun je uspješno kreiran!', 'signUpMessage');
        window.location.href = 'account.html';
      });
    })
    .catch((error) => {
      console.error("Greška:", error);
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Račun već postoji!', 'signUpMessage');
      } else {
        showMessage('Greška prilikom kreiranja računa: ' + error.message, 'signUpMessage');
      }
    });
});

document.getElementById('submitSignIn')?.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Uspješno ste se prijavili!', 'signInMessage');
      window.location.href = 'pocetna.html';
    })
    .catch((error) => {
      console.error("Login error:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        showMessage('Pogrešan e-mail ili lozinka!', 'signInMessage');
      } else {
        showMessage('Greška prilikom prijave: ' + error.message, 'signInMessage');
      }
    });
});

onAuthStateChanged(auth, (user) => {
  if (user && localStorage.getItem('loggedInUserId')) {
    window.location.href = 'pocetna.html';
  }
});
