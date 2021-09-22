const { bootstrap } = window

document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => alert('User registered! Log in.'))
    .catch(err => console.error(err))
})
// if token is valid login user, otherwise alert invalid
document.getElementById('login').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    username: document.getElementById('lUsername').value,
    password: document.getElementById('lPassword').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        window.location = '/'
      } else {
        alert('Invalid username or password.')
      }
    })
    .catch(err => console.error(err))
})
