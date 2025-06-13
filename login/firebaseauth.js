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
    apiKey: "AIzaSyCxo93Osh71ezUJKZk6w67CbCAMhS0_kG0",
    authDomain: "baratew-a2d98.firebaseapp.com",
    projectId: "baratew-a2d98",
    storageBucket: "baratew-a2d98.firebasestorage.app",
    messagingSenderId: "895275978310",
    appId: "1:895275978310:web:c4572e2ee381afa6bc4447",
    measurementId: "G-S2HW2M8NQ5"
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
