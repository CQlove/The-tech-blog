async function editpost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const text = document.getElementById('text').value.trim();
    const id = window.location.toString().split('/').pop();
    console.log(id);

    if (title && text) {
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
    } else {
        alert('Must have input of title and text!')
    }

}

document.getElementById('update-button').addEventListener('click', editpost);