import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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
const provider = new GoogleAuthProvider();
const db = getFirestore();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => messageDiv.style.opacity = 0, 5000);
}

// Google Sign-In
const googleSignInButton = document.getElementById('googleSignIn');
googleSignInButton.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Store user data in Firestore
        const userData = { email: user.email, Name: user.displayName || "Google User" };
        await setDoc(doc(db, "users", user.uid), userData, { merge: true });

        // Redirect to homepage
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    } catch (error) {
        console.error("Error during Google sign-in: ", error.message);
        showMessage("Error signing in with Google", "signInMessage");
    }
});

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const confirmPassword = document.getElementById('rPassword').value; // Get the value of confirm password
    const name = document.getElementById('Name').value;

    // Check if all fields are filled
    if (!email || !password || !name || !confirmPassword) {
        showMessage('Please fill all the fields', 'signUpMessage');
        return; // Exit the function if fields are empty
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'signUpMessage');
        return; // Exit the function if passwords do not match
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        alert("Email verification sent. Please check your inbox.");

        // Save user data to Firestore
        const userData = { email: email, Name: name };
        await setDoc(doc(db, "users", userCredential.user.uid), userData);

        showMessage('Account Created Successfully', 'signUpMessage');
        document.getElementById('submitSignIn').click();  // Switch to Sign In tab
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
            showMessage('Unable to create User', 'signUpMessage');
        }
    }
});



// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    // Check if email and password fields are filled
    if (!email || !password) {
        showMessage('Please enter your email and password', 'signInMessage');
        return; // Exit the function if fields are empty
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Skip verification check for Google users
        if (!user.emailVerified && !user.providerData.some(profile => profile.providerId === 'google.com')) {
            showMessage('Please verify your email before logging in.', 'signInMessage');
            await auth.signOut();
            return;
        }

        showMessage('Login is successful', 'signInMessage');
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    } catch (error) {
        showMessage(error.code === 'auth/invalid-credential' ? 'Incorrect Email or Password' : 'Account does not exist', 'signInMessage');
    }
});

// Reset Password Functionality
const reset = document.getElementById('forgotPassword');
reset.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;

    try {
        await sendPasswordResetEmail(auth, email);
        showMessage('Password Reset Email Sent', 'signInMessage');
    } catch (error) {
        showMessage(error.code === 'auth/invalid-email' ? 'Invalid Email' : 'Account does not exist', 'signInMessage');
    }
});
