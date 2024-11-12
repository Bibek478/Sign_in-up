let signUpBtn = document.querySelector('.signupbtn');
let signInBtn = document.querySelector('.signinbtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('.title');
let forgotPassword = document.getElementById('forgotPassword');

signInBtn.addEventListener('click', () => {
    nameField.style.maxHeight = '0';
    title.innerHTML = 'Sign In';
    signUpBtn.classList.add('disable');
    signInBtn.classList.remove('disable');
    forgotPassword.style.display = 'block';
});

signUpBtn.addEventListener('click', () => {
    nameField.style.maxHeight = '60px';
    title.innerHTML = 'Sign Up';
    signUpBtn.classList.remove('disable');
    signInBtn.classList.add('disable');
    forgotPassword.style.display = 'none';
});
