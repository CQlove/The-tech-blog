async function signup(event) {
    event.prevenDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'Post',
            body: JSON.stringify({ name: username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('You just created a new account!')
            document.location.replace('/dashboard');

        } else {
            alert('Login failed');
        }
    }
}

document.getElementById('signup').addEventListener('submit', signup)