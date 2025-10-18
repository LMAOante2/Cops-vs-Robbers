import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const oobCode = params.get('oobCode');
  const mode = params.get('mode');
  const kopirano = document.getElementById('kopirano');
  const cijelo = document.getElementById('cijelo');
  const infotxt = document.getElementById('infotxt');

  if (mode !== 'resetPassword' || !oobCode) {
    kopirano.style.display = 'block';
    cijelo.style.display = 'block';
    document.body.classList.add('no-scroll');
    infotxt.innerHTML = `Nepostojeći ili Istekli Link`;
  }

try {
  const email = await verifyPasswordResetCode(auth, oobCode);
  document.getElementById('email').innerText = email;

  const form = document.getElementById('resetForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const potvrdi = document.getElementById('potvrdi').value;
    const zatvoribtn = document.getElementById('zatvori');
    const ulogirajbtn = document.getElementById('ulogiraj');
    if (newPassword !== potvrdi) {
      kopirano.style.display = 'block';
      cijelo.style.display = 'block';
      document.body.classList.add('no-scroll');
      infotxt.innerHTML = `Lozinke nisu iste!`;
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      const zatvoribtn = document.getElementById('zatvori');
      const ulogirajbtn = document.getElementById('ulogiraj');
      kopirano.style.display = 'block';
      cijelo.style.display = 'block';
      zatvoribtn.style.display = 'none';
      ulogirajbtn.style.display = 'block';
      document.body.classList.add('no-scroll');
      infotxt.innerHTML = `Lozinka je promijenjena! Sada se možete ulogirati s novom lozinkom.`;
      

    } catch (error) {
      alert("Greška: " + error.message);
    }
  });


  } catch (error) {
    kopirano.style.display = 'block';
    cijelo.style.display = 'block';
    document.body.classList.add('no-scroll');
    infotxt.innerHTML = `Nepostojeći ili Istekli Link`;
  }
});

function zatvori() {
  console.log("Zatvori kliknut!");
  const cijelo = document.getElementById('cijelo');
  const kopirano = document.getElementById('kopirano');
  cijelo.style.display = 'none';
  kopirano.style.display = 'none';
  document.body.classList.remove('no-scroll');
}

window.zatvori = zatvori;


function zatvoriesc(event) {
  if (event.key === "Escape" || event.key === "Backspace") {
    const cijelo = document.getElementById('cijelo');
    const kopirano = document.getElementById('kopirano');
    cijelo.style.display = 'none';
    kopirano.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
}

window.addEventListener('keydown', zatvoriesc);

function ulogiraj() {
  window.location.href = 'index.html';
}



document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('newPassword');
  const label = document.querySelector('label[for="newPassword"]');

  function updateLabel() {
    if (input.value.trim() !== '' || document.activeElement === input) {
      label.classList.add('active');
    } else {
      label.classList.remove('active');
    }
  }


  input.addEventListener('focus', updateLabel);
  input.addEventListener('blur', updateLabel);
  input.addEventListener('input', updateLabel);

  updateLabel();
});

document.addEventListener('DOMContentLoaded', () => {
  const potvrdi = document.getElementById('potvrdi');
  const labell = document.querySelector('label[for="potvrdi"]');



  function updateLabel() {
    if (potvrdi.value.trim() !== '' || document.activeElement === potvrdi) {
      labell.classList.add('active1');
    } else {
      labell.classList.remove('active1');
    }
  }

  potvrdi.addEventListener('focus', updateLabel);
  potvrdi.addEventListener('blur', updateLabel);
  potvrdi.addEventListener('input', updateLabel);

  updateLabel();
});

