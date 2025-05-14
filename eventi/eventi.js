    const scheduleData = {
      "2025-05-12": [
        ["17h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["18h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["19h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["20h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["21h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["22h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["23h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["00h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Battle Royale Event", "Nema Eventa"]
      ],

      "2025-05-19": [
        ["17h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["18h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["19h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["20h", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event"],
        ["21h", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event"],
        ["22h", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event"],
        ["23h", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event"],
        ["00h", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event"]
      ],

      "2025-05-26": [
        ["17h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["18h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["19h", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa", "Nema Eventa"],
        ["20h", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["21h", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["22h", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["23h", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa"],
        ["00h", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa", "Battle Royale Event", "Nema Eventa"]
      ],

    };

  
    let currentDate = new Date("2025-05-12");
  
    function formatDateDMY(date) {
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const y = date.getFullYear();
      return `${d}-${m}-${y}`;
    }
  
    function tjednipodatci(date) {
      return date.toISOString().split('T')[0];
    }
  
    function showEventInfo(eventIme) {
      const infoBox = document.getElementById("event-info");
      const desc = document.getElementById("event-deskripcija");
  
      let deskripcija = "";
  
      if (eventIme === "Battle Royale Event") {
        deskripcija = "U subotu ce biti prvi fiveM Battle Royale Event na Balkanu i sire, za vise informacija pogledajte nas TikTok";
      }

      if (eventIme === "Nema Eventa") {
        deskripcija = "Nema Eventa u ovo vrijeme.";
      } else {
        deskripcija = "Nema Eventa dodatnih informacija za ovaj događaj.";
      }
  
      desc.textContent = deskripcija;
      infoBox.style.display = "block";
    }
  
    function updateKalendar() {
      const pocetak = new Date(currentDate);
      const weekKey = tjednipodatci(pocetak);
  
      document.getElementById("titel").textContent = `Tjedan od ${formatDateDMY(pocetak)}`;
      const body = document.getElementById("kalendar");
      body.innerHTML = "";
  
      const weekData = scheduleData[weekKey];
  
      if (!weekData) {
        body.innerHTML = `<tr><td colspan="8">Još nisu uneseni eventi za ovaj tjedan</td></tr>`;
        return;
      }
  
      for (const row of weekData) {
        const tr = document.createElement("tr");
  
        row.forEach((cell, index) => {
          const td = document.createElement("td");
          const eventDiv = document.createElement("div");
          eventDiv.className = "eventi";
          eventDiv.textContent = cell;
  
          if (cell === "Battle Royale Event") {
            eventDiv.style.cursor = "pointer";
            eventDiv.onclick = () => showEventInfo(cell);
          }

          if (cell === "Nema Eventa") {
            eventDiv.style.cursor = "pointer";
            eventDiv.onclick = () => showEventInfo(cell);
          }
  
          td.appendChild(eventDiv);
  
          if (index > 0) {
            if (cell.includes("io")) td.className = "zuta";
            else if (cell.includes("Battle Royale Event")) td.className = "plava";
            else if (cell.includes("io")) td.className = "roza";
            else if (cell.includes("Nema Eventa")) td.className = "zelena";
            else if (cell.includes("io")) td.className = "ljubicasta";
            else if (cell.trim() !== "") td.className = "grey";
          }
  
          tr.appendChild(td);
        });
  
        body.appendChild(tr);
      }
    }
  
    function changeWeek(offset) {
      currentDate.setDate(currentDate.getDate() + offset * 7);
      updateKalendar();
      document.getElementById("event-info").style.display = "none";
    }
  
    updateKalendar();

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

setTimeout(() => {
  document.getElementById('cursor').classList.add('fade-out');
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    savedTheme = "dark";
    localStorage.setItem("theme", "dark");
  }

  document.body.classList.add(savedTheme + "-mode");
  toggle.checked = savedTheme === "light";

  toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "light" : "dark";
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(newTheme + "-mode");
    localStorage.setItem("theme", newTheme);
  });

  document.getElementById("logout").addEventListener("click", () => {
    location.reload();
  });
});