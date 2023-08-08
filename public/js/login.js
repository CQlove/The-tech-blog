async function login(event) {
    event.preventDefault();
    console.log('hello')
    const name = document.getElementById('username');
    const password = document.getElementById('password');

    // if (name && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name: name.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Login failed');
    }
}
// }


function signup(event) {
    event.preventDefault();
    document.location.replace('/signup');
}
document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('signup').addEventListener('click', signup);    