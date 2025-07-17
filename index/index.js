      if (localStorage.getItem("status") === null) {
    localStorage.setItem("status", "true");
  }
    
    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin-link').style.display = 'inline-block';
    }

    function logout() {
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    }
    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin-link1').style.display = 'inline-block';
    }

    function logout() {
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    }

    setTimeout(() => {
        document.getElementById('cursor').classList.add('fade-out');
      }, 3000);


