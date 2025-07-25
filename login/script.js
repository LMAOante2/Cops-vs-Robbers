const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

const checkboxes = document.querySelectorAll('.posao input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  if (checkbox.id === 'policija' || checkbox.id === 'pljackas') {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        checkboxes.forEach((other) => {
          if ((other.id === 'policija' || other.id === 'pljackas') && other !== checkbox) {
            other.checked = false;
          }
        });
      }
    });
  }
});

checkboxes.forEach((checkbox) => {
  if (checkbox.id === 'tamno' || checkbox.id === 'svijetlo') {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        checkboxes.forEach((other) => {
          if ((other.id === 'tamno' || other.id === 'svijetlo') && other !== checkbox) {
            other.checked = false;
          }
        });
      }
    });
  }
});


  const policija = document.getElementById('policija');
  const pljackas = document.getElementById('pljackas');

  [policija, pljackas].forEach((checkbox, _, all) => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        all.forEach(cb => {
          if (cb !== checkbox) cb.checked = false;
        });
      }
    });
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!form.querySelector('#rEmail')) return;

      if (!policija.checked && !pljackas.checked) {
        e.preventDefault();
        alert('Molimo odaberite jednu opciju: Policija ili Pljačkaš.');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle-password');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const input = document.querySelector(this.getAttribute('toggle'));
        const icon = this.querySelector('i');

        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
  });
