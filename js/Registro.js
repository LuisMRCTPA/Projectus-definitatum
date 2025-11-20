const form = document.getElementById('sign-up')
const firstname_input = document.getElementById('firstname-input')
const lastname_input = document.getElementById('lastname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => { /* e has many uses and applications thus their use as a variable i think maybe idfk */
   // e.preventDefault() Prevent Submit

   let errors = []

   if(firstname_input){
    //if there is a firstname input then we at the signup (type shit)
     errors = getSignupFormErrors(firstname_input.value,lastname_input.value, email_input.value, password_input.value, repeat_password_input.value  )
   }
   else{
    // and if not we are in a login
    getLoginFormErrors(email_input.value, password_input.value)
   }

   if(errors.length > 0){
    //if there are any errors
    e.preventDefault()
    error_message.innerText = errors.join(". ")
   }
})

function getSignupFormErrors(firstname, lastname, email, password, repeatPassword) {
    let errors = []

    if(firstname === ''|| firstname == null) {
        errors.push('firstname is required and necessary in order to continue')
        firstname_input.parentElement.classList.add('incorrect')
    }
    if(email === ''|| email == null) {
        errors.push('email is required and necessary in order to continue')
        email_input.parentElement.classList.add('incorrect')
    }
    if(lastname === ''|| lastname == null) {
        errors.push('lastname is required and necessary in order to continue')
        lastname_input.parentElement.classList.add('incorrect')
    }
    if(password === ''|| password == null) {
        errors.push('password is required and necessary in order to continue')
        password_input.parentElement.classList.add('incorrect')
    }
    if (password !== repeatPassword) {
        errors.push('passwords do not match!! Genius >:(')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    if (password.length < 8) {
        errors.push('the password is too short')
         password_input.parentElement.classList.add('incorrect')
    }

    return errors
}

function getLoginFormErrors(email, password) {
    let errors = []

     if(email === ''|| email == null) {
        errors.push('email is required and necessary in order to continue')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === ''|| password == null) {
        errors.push('password is required and necessary in order to continue')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;

}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})

function registerUser(event) {
  event.preventDefault();

  const firstname = document.getElementById('firstname_input').value;
  const lastname = document.getElementById('lastname_input').value;
  const email = document.getElementById('email_input').value;
  const password = document.getElementById('password_input').value;
  const repeatPassword = document.getElementById('repeat-password-input').value;
  
  if (!firstname || !password || !email || !repeatPassword || !lastname) {
    alert('Por favor, ingrese los campos demarcados ');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.username === username);
  
  if (userExists) {
    alert('El nombre de usuario ya está en uso, por favor elija otro.');
    return;
  }

  users.push({ firstname, password, lastname, email, repeatPassword });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Usuario registrado exitosamente');
  document.getElementById('register-form').reset();
  window.location.href = 'login.html';
}