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

      if (mode !== 'resetPassword' || !oobCode) {
        alert("Nepostojeci link.");
        return;
      }

      try {
        // Verify the reset code is valid and get user's email
        const email = await verifyPasswordResetCode(auth, oobCode);
        document.getElementById('email').innerText = email;

        const form = document.getElementById('resetForm');
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const newPassword = document.getElementById('newPassword').value;

          try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            alert("Lozinka je promjenjena! Sada se mozete ulogirati sa novom lozinkom.");
            window.location.href = 'index.html';
          } catch (error) {
            alert("Error: " + error.message);
          }
        });

      } catch (error) {
        alert("Netocan ili istecen link.");
      }
    });

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