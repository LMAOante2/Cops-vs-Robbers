import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDa-Gn5AtvCYwzC7GvArnDUrc6HQfdT-U4",
  authDomain: "login-form-19883.firebaseapp.com",
  projectId: "login-form-19883",
  storageBucket: "login-form-19883.appspot.com",
  messagingSenderId: "469023290458",
  appId: "1:469023290458:web:d0d24d8e80ae5c557b5463"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);

  // Sync status1 from Firestore
  onSnapshot(userDocRef, (docSnap) => {
    const data = docSnap.data();
    const status1 = data?.status1;

    const content = document.getElementById("igraci");
    if (content) {
      content.style.display = status1 ? "block" : "none";
    }
  });
});

// ----- Your existing server logic -----

async function updateServerStatus() {
  try {
    const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/g9k35o');
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

      document.querySelectorAll('.player-name').forEach((nameEl) => {
        nameEl.addEventListener('click', () => {
          navigator.clipboard.writeText(nameEl.textContent).then(() => {
            alert(`Ime "${nameEl.textContent}" je uspjesno kopirano!`);
          });
        });
      });

      document.querySelectorAll('.igrac-id').forEach((idEl) => {
        idEl.addEventListener('click', () => {
          const id = idEl.getAttribute('data-id');
          navigator.clipboard.writeText(id).then(() => {
            alert(`ID "${id}" je uspjesno kopiran!`);
          });
        });
      });
    } else {
      igraclista.innerHTML = "<p>Nema Igraca Online.</p>";
    }
  } catch (error) {
    console.error("Error fetching player data:", error);
    document.getElementById("igraclista").innerHTML = "<p>Error tokom ucitavanja igraca.</p>";
  }
}

// Refresh + toggleMonitor logic
let updateInterval = null;
let fetchInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('toggleMonitor');
  const refreshBtn = document.getElementById("refresh");
  const tekst = document.getElementById("tekst");

  if (toggle) {
    const saved = localStorage.getItem("monitorToggle") === "true";
    toggle.checked = saved;

    if (saved) toggle.dispatchEvent(new Event("change"));

    toggle.addEventListener("change", () => {
      localStorage.setItem("monitorToggle", toggle.checked);
      if (toggle.checked) {
        updateInterval = setInterval(updateServerStatus, 1000);
        fetchInterval = setInterval(fetchPlayers, 1000);
        if (refreshBtn) refreshBtn.style.display = 'none';
        if (tekst) tekst.style.color = 'green';
      } else {
        clearInterval(updateInterval);
        clearInterval(fetchInterval);
        if (refreshBtn) refreshBtn.style.display = 'inline';
        if (tekst) tekst.style.color = 'red';
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      fetchPlayers();
      updateServerStatus();
    });
  }
});
