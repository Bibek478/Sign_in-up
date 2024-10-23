//Add direct Google sign up
//Add email otp verification
//Add forgot password

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
const auth = getAuth();
const db = getFirestore();

// Show message function
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message; // Correctly display the message
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Function to switch to Sign In
function switchToSignIn() {
    // Hide the name field
    document.querySelector('.namefield').style.maxHeight = '0';
    // Change title and text for Sign In
    document.querySelector('.title').innerHTML = 'Sign In';
    document.querySelector('.text').innerHTML = 'Forgot Password';
    // Toggle button states
    document.querySelector('.signupbtn').classList.add('disable');
    document.querySelector('.signinbtn').classList.remove('disable');
    // Move underline to Sign In
    document.querySelector('.underline').style.transform = 'translateX(100px)';
}

// Function to validate input fields
function validateFields(name, email, password) {
    let isValid = true;

    // Reset border styles
    const nameInput = document.querySelector('.namefield input');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');

    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');

    // Validate Name
    if (!name) {
        nameInput.classList.add('error'); // Add error class for red border
        isValid = false;
    }

    // Validate Email
    if (!email) {
        emailInput.classList.add('error'); // Add error class for red border
        isValid = false;
    }

    // Validate Password
    if (!password) {
        passwordInput.classList.add('error'); // Add error class for red border
        isValid = false;
    }

    return isValid;
}

// Event listener for Sign Up button
document.querySelector('.signupbtn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    // Validate fields
    if (!validateFields(name, email, password)) {
        showMessage('Please fill in all fields correctly.', 'SignUpMessage');
        return; // Exit if validation fails
    }

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                name: name,
                email: email
            };

            // Show success message
            showMessage('Account created successfully. Switching to Sign In...', 'SignUpMessage');

            // Save user data to Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    // Automatically switch to Sign In after successful sign-up
                    switchToSignIn();
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                    showMessage("Error saving user data", 'SignUpMessage');
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
                showMessage('Unable to create user', 'SignUpMessage');
            }
        });
});
