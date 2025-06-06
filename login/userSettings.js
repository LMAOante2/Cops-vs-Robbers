import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) return;

  const data = userSnap.data();

  // Apply theme
  const modeToggle = document.getElementById("modeToggle");
  const theme = data.theme || "dark";
  document.body.classList.add(`${theme}-mode`);
  if (modeToggle) {
    modeToggle.checked = theme === "light";
    modeToggle.addEventListener("change", async () => {
      const newTheme = modeToggle.checked ? "light" : "dark";
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${newTheme}-mode`);
      await updateDoc(userDocRef, { theme: newTheme });
    });
  }

  // Apply status1
  const statusToggle = document.getElementById("status");
  const igraci = document.getElementById("igraci");
  const status = data.status1 === "true";

  if (statusToggle && igraci) {
    statusToggle.checked = status;
    igraci.style.display = status ? "block" : "none";

    statusToggle.addEventListener("change", async () => {
      const newStatus = statusToggle.checked ? "true" : "false";
      igraci.style.display = newStatus === "true" ? "block" : "none";
      await updateDoc(userDocRef, { status1: newStatus });
    });
  }
});
