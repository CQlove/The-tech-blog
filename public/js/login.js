async function login(event) {
    event.preventDefault();

    const name = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log(name, password)
    if (name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("success");
        } else {
            alert('Login failed');
            console.log("failed")
        }
    }
}


function signup(event) {
    event.preventDefault();
    document.location.replace('/signup');
}

document.getElementById('login').addEventListener('click', login);
document.getElementById('signup').addEventListener('click', signup);    