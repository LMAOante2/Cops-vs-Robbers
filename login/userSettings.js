import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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


const modeToggle = document.getElementById("modeToggle");
const statusToggle = document.getElementById("status");
const igraci = document.getElementById("igraci");

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userDocRef);
  if (!userSnap.exists()) return;

  const data = userSnap.data();


  const theme = data.theme || "dark";

  if (theme !== savedTheme) {
    document.body.classList.remove(`${savedTheme}-mode`);
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
  }

  if (modeToggle) {
    modeToggle.checked = theme === "light";
    modeToggle.addEventListener("change", async () => {
      const newTheme = modeToggle.checked ? "light" : "dark";
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${newTheme}-mode`);
      localStorage.setItem("theme", newTheme);
      await updateDoc(userDocRef, { theme: newTheme });
    });
  }

  const status = !!data.status1;
  if (statusToggle && igraci) {
    statusToggle.checked = status;
    igraci.style.display = status ? "block" : "none";

    statusToggle.addEventListener("change", async () => {
      const newStatus = statusToggle.checked;
      igraci.style.display = newStatus ? "block" : "none";
      await updateDoc(userDocRef, { status1: newStatus });
    });
  }
});

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(`${savedTheme}-mode`);