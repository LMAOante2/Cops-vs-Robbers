        async function updateServerStatus() {
            try {
                const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/g9k35o'); 
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const serverData = await response.json();
                const playerCount = serverData?.Data?.players.length || 0;
                const maxPlayers = serverData?.Data?.sv_maxclients || 48;

                document.getElementById('player-count').innerText = `${playerCount}/${maxPlayers}`;

                const serverStatus = document.getElementById('server-status');
                serverStatus.innerText = "✅ Online (Samo za Administraciju)";
                serverStatus.style.backgroundColor = "green";
                serverStatus.style.color = "white";
            } catch (error) {
                console.error('Greška:', error);
                const serverStatus = document.getElementById('server-status');
                serverStatus.innerText = "❌ Offline";
                serverStatus.style.backgroundColor = "red";
                serverStatus.style.color = "white";
            }
        }

        setInterval(updateServerStatus, 10000);
        window.onload = updateServerStatus;

        document.addEventListener("DOMContentLoaded", function () {
            const menuToggle = document.querySelector(".menu-toggle");
            const closeMenu = document.querySelector(".close-menu");
            const sideMenu = document.querySelector(".side-menu");

            menuToggle.addEventListener("click", function () {
                sideMenu.classList.add("active");
            });

            closeMenu.addEventListener("click", function () {
                sideMenu.classList.remove("active");
            });

            document.addEventListener("click", function (event) {
                if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    sideMenu.classList.remove("active");
                }
            });
        });
