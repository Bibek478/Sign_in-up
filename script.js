// let signUpBtn = document.querySelector('.signupbtn');
// let signInBtn = document.querySelector('.signinbtn');
// let nameField = document.querySelector('.namefield');
// let title = document.querySelector('.title');

// signInBtn.addEventListener('click', () => {
//     // Hide name field and adjust styles
//     nameField.style.maxHeight = '0';
//     title.innerHTML = 'Sign In';
//     signUpBtn.classList.add('disable');
//     signInBtn.classList.remove('disable');
// });

// signUpBtn.addEventListener('click', () => {
//     // Show name field and adjust styles
//     nameField.style.maxHeight = '60px';
//     title.innerHTML = 'Sign Up';
//     signUpBtn.classList.remove('disable');
//     signInBtn.classList.add('disable');
// });

let signUpBtn = document.querySelector('.signupbtn');
let signInBtn = document.querySelector('.signinbtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('.title');
let forgotPassword = document.getElementById('forgotPassword'); // Select the Forgot Password link container

signInBtn.addEventListener('click', () => {
    // Hide name field, change title to 'Sign In', and show "Forgot Password?" link
    nameField.style.maxHeight = '0';
    title.innerHTML = 'Sign In';
    signUpBtn.classList.add('disable');
    signInBtn.classList.remove('disable');
    forgotPassword.style.display = 'block'; // Show the "Forgot Password?" link
});

signUpBtn.addEventListener('click', () => {
    // Show name field, change title to 'Sign Up', and hide "Forgot Password?" link
    nameField.style.maxHeight = '60px';
    title.innerHTML = 'Sign Up';
    signUpBtn.classList.remove('disable');
    signInBtn.classList.add('disable');
    forgotPassword.style.display = 'none'; // Hide the "Forgot Password?" link
});