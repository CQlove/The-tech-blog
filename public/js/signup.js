async function signup(event) {
    event.prevenDefault();
    console.log('test')

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: username, email, password }),
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

document.getElementById('signup-form').addEventListener('submit', signup)