async function addNew(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const text = document.getElementById('text').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert("something went wrong");
    }
};

document.getElementById('create-new').addEventListener('click', addNew);