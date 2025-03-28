        if (localStorage.getItem('istx') === 'true') {
            window.location.href = 'admin.html';
        }

        const txUsername = "staffteamtx"; 
        const txPassword = "staffteamcopsvsrobbersTX"; 

        document.getElementById('tx-login-form').addEventListener('submit', function(event) {
            event.preventDefault(); 

            const username = document.getElementById('username').value; 
            const password = document.getElementById('password').value; 

            if (username === txUsername && password === txPassword) {
                localStorage.setItem('istx', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('Incorrect username or password');
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
