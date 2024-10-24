import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged,signOut,} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore, getDoc, doc,} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  //YOUR COPIED FIREBASE PART SHOULD BE HERE
  //WATCH THIS VIDEO TO LEARN WHAT TO PUT HERE   https://youtu.be/_Xczf06n6x0
  apiKey: "AIzaSyAYGWaSp4Bu_8QoE9mhfuLb2HzBCnvBjys",
  authDomain: "login-signup-1be49.firebaseapp.com",
  projectId: "login-signup-1be49",
  storageBucket: "login-signup-1be49.appspot.com",
  messagingSenderId: "627415317126",
  appId: "1:627415317126:web:44b0fe71cef44f3a222f07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      console.log(user);
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Use the correct key as stored in Firestore
            document.getElementById("loggedUserName").innerText = userData.Name; // Ensure this matches Firestore key
            document.getElementById("loggedUserEmail").innerText = userData.email;
          } else {
            console.log("No document found matching ID");
          }
        })
        .catch((error) => {
          console.log("Error getting document", error);
        });
    } else {
      console.log("User ID not found in local storage");
    }
  });
  
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error Signing out:", error);
    });
});
