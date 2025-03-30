async function updateServerStatus() {
    try {
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/g9k35o');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const serverData = await response.json();
        const playerCount = serverData?.Data?.players.length || 0;
        const maxPlayers = serverData?.Data?.sv_maxclients || 50;
        document.getElementById('player-count').innerText = `${playerCount}/${maxPlayers}`;
        document.getElementById('server-status').innerHTML = "<span style='background: rgb(0,255,0);' class='pulse'></span><span style='color: rgb(0,255,0);'>Online</span> ";
    } catch (error) {
        console.error('Greška:', error);
        document.getElementById('server-status').innerHTML = "<span class='pulse' style='background: red;'></span> Offline";
    }
}
setInterval(updateServerStatus, 10000);
window.onload = updateServerStatus;

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

