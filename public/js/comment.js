async function comment(event) {
    event.preventDefault();

    const comment = document.getElementById('input').value.trim();
    // we convert url to string and split by '/' and find last one which is id
    const id = window.location.toString().split('/').length - 1;


    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, body: comment }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('something went wrong')
        }
    }
}

document.getElementById('submit-comment').addEventListener('click', comment);