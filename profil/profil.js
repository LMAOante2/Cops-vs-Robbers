import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
const db = getFirestore();

const discordClientId = "YOUR_DISCORD_CLIENT_ID";
const redirectUri = "http://127.0.0.1:5500/discord-callback.html";

document.getElementById("connectDiscordBtn")?.addEventListener("click", () => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=identify`;
  window.location.href = discordAuthUrl;
});

if (window.location.pathname.includes("discord-callback.html")) {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get("access_token");

  if (accessToken) {
    fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(async discordUser => {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          const uid = firebaseUser.uid;
          await setDoc(doc(db, "users", uid), {
            discord: {
              id: discordUser.id,
              username: discordUser.username,
              discriminator: discordUser.discriminator,
              avatar: discordUser.avatar
            }
          }, { merge: true });

          window.location.href = "dashboard.html";
        }
      })
      .catch(console.error);
  }
}

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText = userData.firstName;
          document.getElementById('loggedUserEmail').innerText = userData.email;
          document.getElementById('loggedUserLName').innerText = userData.lastName;

          if (userData.discord) {
            document.getElementById('discordStatus').innerText = `Connected as ${userData.discord.username}#${userData.discord.discriminator}`;
          } else {
            document.getElementById('discordStatus').innerText = 'Discord not connected.';
          }
        } else {
          console.log("No document found matching ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});

// UI show/hide
const toggleElements = (id, show) => {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
};

onAuthStateChanged(auth, (user) => {
  const isLoggedIn = !!user;
  toggleElements('link1', !isLoggedIn);
  toggleElements('logout', isLoggedIn);
  toggleElements('resetPassword', isLoggedIn);
  toggleElements('Ime', isLoggedIn);
  toggleElements('Ime1', isLoggedIn);
  toggleElements('Ime2', isLoggedIn);
  toggleElements('light', isLoggedIn);
  toggleElements('lightnot', !isLoggedIn);
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle?.addEventListener("click", () => sideMenu?.classList.add("active"));
  closeMenu?.addEventListener("click", () => sideMenu?.classList.remove("active"));
  document.addEventListener("click", (event) => {
    if (!sideMenu?.contains(event.target) && !menuToggle?.contains(event.target)) {
      sideMenu?.classList.remove("active");
    }
  });
});

setTimeout(() => {
  document.getElementById('cursor')?.classList.add('fade-out');
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(`${savedTheme}-mode`);
  if (toggle) toggle.checked = savedTheme === "light";

  toggle?.addEventListener("change", () => {
    const newTheme = toggle.checked ? "light" : "dark";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${newTheme}-mode`);
    localStorage.setItem("theme", newTheme);
  });

  document.getElementById("logout")?.addEventListener("click", () => {
    location.reload();
  });
});
