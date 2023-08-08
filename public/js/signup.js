async function signup(event) {
    event.prevenDefault();
    console.log('test')

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: username.value, password: password.value }),
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