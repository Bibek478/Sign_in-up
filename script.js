let signUpBtn = document.querySelector('.signupbtn');
let signInBtn = document.querySelector('.signinbtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('.title');
let underline = document.querySelector('.underline');
let text = document.querySelector('.text');

// Initial setup to display the Sign Up form
nameField.style.maxHeight = '60px'; // Show the name field for Sign Up
text.innerHTML = 'Password Suggestion'; // Set initial text

// Event listener for Sign In button
signInBtn.addEventListener('click', () => {
    nameField.style.maxHeight = '0'; // Hide the name field
    title.innerHTML = 'Sign In'; // Change title to Sign In
    text.innerHTML = 'Forgot Password'; // Change text to Forgot Password
    signUpBtn.classList.add('disable'); // Disable the Sign Up button
    signInBtn.classList.remove('disable'); // Enable the Sign In button
    underline.style.transform = 'translateX(100px)'; // Move underline to Sign In
});

// Event listener for Sign Up button
signUpBtn.addEventListener('click', () => {
    nameField.style.maxHeight = '60px'; // Show the name field
    title.innerHTML = 'Sign Up'; // Change title to Sign Up
    text.innerHTML = 'Password Suggestion'; // Change text to Password Suggestion
    signUpBtn.classList.remove('disable'); // Enable the Sign Up button
    signInBtn.classList.add('disable'); // Disable the Sign In button
    underline.style.transform = 'translateX(0)'; // Move underline back to Sign Up
});
