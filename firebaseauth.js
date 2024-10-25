import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const name = document.getElementById('Name').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                Name: name
            };
            showMessage('Account Created Successfully', 'signUpMessage');

            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            // Automatically switch to Sign In page after successful sign-up
            const signInButton = document.getElementById('submitSignIn');
            signInButton.click();
            showMessage('You can now sign in with your account', 'signUpMessage');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value; // Changed to match the input ID
    const password = document.getElementById('rPassword').value; // Changed to match the input ID

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not exist', 'signInMessage');
            }
        });
});
const reset = document.getElementById('reset');
reset.addEventListener("click", function(event){
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Password Reset Email Sent', 'signInMessage');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
                showMessage('Invalid Email', 'signInMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('Account does not exist', 'signInMessage');
            }
        });
});