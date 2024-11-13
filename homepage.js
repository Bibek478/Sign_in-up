import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
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

// Load user data on authentication state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // Populate fields with user data
            document.getElementById("loggedUserName").value = userData.Name || "";
            document.getElementById("loggedUserEmail").innerText = userData.email || "N/A";
            document.getElementById("contactNumber").value = userData.contactNumber || "";
            document.getElementById("dateOfBirth").value = userData.dateOfBirth || "";
            document.getElementById("village").value = userData.village || "";
            document.getElementById("city").value = userData.city || "";
            document.getElementById("state").value = userData.state || "";
            document.getElementById("country").value = userData.country || "";
            document.getElementById("pincode").value = userData.pincode || "";
          } else {
            console.log("No document found for the user ID in Firestore");
          }
        })
        .catch((error) => {
          console.error("Error retrieving document:", error);
        });
    } else {
      console.log("User ID not found in local storage");
    }
  } else {
    console.log("User is not logged in");
    window.location.href = "index.html"; // Redirect to login page if user is not authenticated
  }
});

// Save all information to Firestore when the "Save Information" button is clicked
const saveInfoButton = document.getElementById("saveInfo");
saveInfoButton.addEventListener("click", () => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);

    const updatedData = {
      Name: document.getElementById("loggedUserName").value,
      contactNumber: document.getElementById("contactNumber").value,
      dateOfBirth: document.getElementById("dateOfBirth").value,
      village: document.getElementById("village").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      country: document.getElementById("country").value,
      pincode: document.getElementById("pincode").value
    };

    setDoc(docRef, updatedData, { merge: true })
      .then(() => {
        console.log("User information saved successfully");
        alert("Information saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving document:", error);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});
