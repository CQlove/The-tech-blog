async function deletePost(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert("something went wrong");
    }

}

document.getElementById('delete-button').addEventListener('click', deletePost);