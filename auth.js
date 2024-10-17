import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYGWaSp4Bu_8QoE9mhfuLb2HzBCnvBjys",
  authDomain: "login-signup-1be49.firebaseapp.com",
  projectId: "login-signup-1be49",
  storageBucket: "login-signup-1be49.appspot.com",
  messagingSenderId: "627415317126",
  appId: "1:627415317126:web:44b0fe71cef44f3a222f07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to show message
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {  // Check if messageDiv exists
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
      messageDiv.style.opacity = 0;
    }, 5000);  // Fade out message after 5 seconds
  } else {
    console.error(`Element with ID ${divId} not found`);
  }
}

// Event listener for the sign-up button
const signUp = document.getElementById('SubmitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById('Name').value;
  const email = document.getElementById('Email').value;
  const password = document.getElementById('Password').value;

  const auth = getAuth();
  const db = getFirestore();

  // Create a new user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        name: name,
        email: email
      };

      showMessage('Account created successfully', 'SignUpMessage');

      // Save user data in Firestore
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          // Redirect to the appropriate page
          window.location.href = 'login.html';  // Change this to the correct page
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email already exists!', 'SignUpMessage');
      } else if (errorCode === 'auth/weak-password') {
        showMessage('Password is too weak!', 'SignUpMessage');
      } else if (errorCode === 'auth/invalid-email') {
        showMessage('Invalid email format!', 'SignUpMessage');
      } else {
        console.error('Error:', errorCode);  // Log the unknown error
        showMessage('Unable to create user', 'SignUpMessage');
      }
    });
});
