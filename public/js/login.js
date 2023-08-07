async function login(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'Post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Login failed');
        }
    }
}


function signup(event) {
    event.preventDefault();
    document.location.replace('/signup');
}
document.getElementById('login').addEventListener('submit', login)
document.getElementById('signup').addEventListener('click', signup);