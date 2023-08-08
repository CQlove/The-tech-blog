async function editpost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const text = document.getElementById('text').value.trim();
    const id = window.location.toString().split('/').length - 1;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_id: id, title, text }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('something went wrong');
    }

}

document.getElementById('update-button').addEventListener('submit', editpost);