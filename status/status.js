  if (localStorage.getItem("status") === null) {
    localStorage.setItem("status", "true");
  }

//--<Igraci>--//
const igraci = document.getElementById('igraci');
async function updateServerStatus() {
    try {
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/g9k35o');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const serverData = await response.json();
        const playerCount = serverData?.Data?.players.length || 0;
        const maxPlayers = serverData?.Data?.sv_maxclients || 150;
        document.getElementById('player-count').innerText = `${playerCount}/${maxPlayers}`;
        document.getElementById('server-status').innerHTML = "<span style='background: rgb(0,255,0);' class='pulse'></span><span style='color: rgb(0,255,0);'>Online</span>";
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('server-status').innerHTML = "<span class='pulse' style='background: red;'></span><span style='color: red;'>Offline</span>";
    }
}

async function fetchPlayers() {
    try {
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/g9k35o');
        const data = await response.json();

        let igraclista = document.getElementById("igraclista");
        igraclista.innerHTML = "";

        if (data.Data && data.Data.players) {
            data.Data.players.forEach((player, index) => {
                let card = document.createElement("div");
                card.className = "igrac-kartica";
                card.innerHTML = `
                <h3 class="player-name">${player.name}</h3>
                    <p><span class="igrac-number">#${index + 1}</span></p>
                    <p class="igrac-id" data-id="${player.id}">ID: ${player.id}</p>
                `;
                igraclista.appendChild(card);
            });
            const nameElements = document.querySelectorAll('.player-name');
            const idElements = document.querySelectorAll('.igrac-id');

            nameElements.forEach((nameElement) => {
                nameElement.addEventListener('click', () => {
                    const playerName = nameElement.textContent;
                    navigator.clipboard.writeText(playerName).then(() => {
                        alert(`Ime "${playerName}" je uspjesno kopirano!`);
                    }).catch(err => {
                        console.error('Ime Je Neuspjesno Kopirano: ', err);
                    });
                });
            });

            idElements.forEach((idElement) => {
                idElement.addEventListener('click', () => {
                    const igracid = idElement.getAttribute('data-id');
                    navigator.clipboard.writeText(igracid).then(() => {
                        alert(`ID "${igracid}" je uspjesno kopiran!`);
                    }).catch(err => {
                        console.error('ID Je Neuspjesno Kopiran: ', err);
                    });
                });
            });
        } else {
            igraci.style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching player data:", error);
        document.getElementById("igraci").style.display = 'none';
    }
}

//--<Refresh>--//
let updateInterval = null;
let fetchInterval = null;

window.addEventListener('DOMContentLoaded', function () {
  const toggleState = localStorage.getItem('monitorToggle');
  if (toggleState === 'true') {
    document.getElementById('toggleMonitor').checked = true;
    document.getElementById('toggleMonitor').dispatchEvent(new Event('change'));
  }
});

document.getElementById('toggleMonitor').addEventListener('change', function () {
  localStorage.setItem('monitorToggle', this.checked);

  if (this.checked) {
    updateInterval = setInterval(updateServerStatus, 1000);
    fetchInterval = setInterval(fetchPlayers, 1000);
    const refresh = document.getElementById('refresh');
    refresh.style.display = 'none';
    const tekst = document.getElementById('tekst');
    tekst.style.color = 'green';
  } else {
    clearInterval(updateInterval);
    clearInterval(fetchInterval);
    const refresh = document.getElementById('refresh');
    refresh.style.display = 'inline';
    const tekst = document.getElementById('tekst');
    tekst.style.color = 'red';
  }
});

window.onload = () => {
    updateServerStatus();
    fetchPlayers();

    const refreshButton = document.getElementById("refresh");
    if (refreshButton) {
        refreshButton.onclick = refresh;
    }
};

function refresh() {
    fetchPlayers();
    updateServerStatus();
}




