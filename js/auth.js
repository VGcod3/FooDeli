const auth = () => {
  const buttonAuth = document.querySelector('.button-auth')
  const buttonOut = document.querySelector('.button-out')
  const modalAuth = document.querySelector('.modal-auth')

  const userName = document.querySelector('.user-name')

  const modalClose = document.querySelector('.close-auth')

  const logInForm = document.getElementById('logInForm')
  const inputLogin = document.getElementById('login')
  const inputPassword = document.getElementById('password')

  const buttonCart = document.querySelector('.button-cart')


  buttonAuth.addEventListener('click', (e) => {
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')));
      logIn(JSON.parse(localStorage.getItem('user')))
    } else {
      openLogin()
    }
  })

  modalClose.addEventListener('click', (e) => {
    closeLogin()
  })

  modalAuth.addEventListener('click', (e) => {
    if (e.target == modalAuth) {
      closeLogin()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') closeLogin()
  })

  buttonOut.addEventListener('click', () => {
    logOut()
  })

  logInForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = {
      login: inputLogin.value,
      password: inputPassword.value
    }


    logIn(user)
    closeLogin()

    localStorage.setItem('user', JSON.stringify(user))

    inputPassword.style.border = ""
  })


  function openLogin() {
    modalAuth.style.display = 'flex'
  }

  function closeLogin() {
    modalAuth.style.display = 'none'
  }

  function logIn(user) {
    buttonAuth.style.display = 'none';

    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    userName.textContent = user.login;
    buttonCart.style.display = 'flex'
  }

  function logOut() {
    console.log('OUT');

    buttonAuth.style.display = 'flex';

    buttonOut.style.display = "";
    userName.style.display = "";
    buttonCart.style.display = '';


    localStorage.removeItem('user')
  }


  if (localStorage.getItem('user')) {
    logIn(JSON.parse(localStorage.getItem('user')));
  }

}

export default auth