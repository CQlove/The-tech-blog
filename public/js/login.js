async function login(event) {
    event.preventDefault();

    const name = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && password) {
        const response = await fetch('/api/users/login', {
            method: 'Post',
            body: JSON.stringify({ name, password }),
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
document.getElementById('login').addEventListener('submit', login);
document.getElementById('signup').addEventListener('click', signup);