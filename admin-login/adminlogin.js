        if (localStorage.getItem('isAdmin') === 'true') {
            window.location.href = 'admin.html';
        }

        const adminUsername = "staffteam"; 
        const adminPassword = "staffteamcopsvsrobbers"; 

        document.getElementById('admin-login-form').addEventListener('submit', function(event) {
            event.preventDefault(); 

            const username = document.getElementById('username').value; 
            const password = document.getElementById('password').value; 

            if (username === adminUsername && password === adminPassword) {
                localStorage.setItem('isAdmin', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('Netocno Ime ili Lozinka');
            }
        });

        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            const icon = document.getElementById('togglePassword');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
