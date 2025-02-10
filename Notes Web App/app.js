// Create a note
document.getElementById('create-note-form').addEventListener('submit', function(e) {
    e.preventDefault();

    //Get title and content for the notes from the user
    const title = document.getElementById('create-title').value;
    const content = document.getElementById('create-content').value;

    //Recording them on the database
    fetch('http://127.0.0.1:5000/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: content })
    })
    .then(response => response.json())
    .then(data => {

        console.log('Note created:', data);
        alert('Note Created! ID: ' + data.id + '\n' + data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});




//Read a note
document.getElementById('read-note-button').addEventListener('click', function() {
    //Get Id
    const noteId = document.getElementById('read-note-id').value;

    // Ensure that the Id field is non-empty
    if (!noteId) {
        document.getElementById('read-note').innerHTML = "<p>Please enter a valid note ID.</p>";
        return;
    }

    //Sending the request
    fetch(`http://127.0.0.1:5000/notes/${noteId}`)
        .then(response => {


            return response.json();
        })
        .then(data => {

            if (data.id) {

                document.getElementById('read-note').innerHTML = `
                    <h3>Note Found!</h3>
                    <p><strong>Title:</strong> ${data.title}</p>
                    <p><strong>Content:</strong> ${data.content}</p>
                `;


            } else {

                document.getElementById('read-note').innerHTML = `<p>${data.message}</p>`;
            }

        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('read-note').innerHTML = `<p>Something went wrong. Please try again.</p>`;
        });
});




// Update Note
document.getElementById('update-button').addEventListener('click', function() {
    //Get the Ids
    const noteId = document.getElementById('update-note-id').value;
    const newTitle = document.getElementById('update-title').value;
    const newContent = document.getElementById('update-content').value;

    //Ensuring that there is Id and new title/contnet is typed in by the user
    if (!noteId || (!newTitle && !newContent)) {
        alert("Please enter a note ID and new title or content.");
        return;
    }


    const updateData = {};
    if (newTitle) updateData.new_title = newTitle;
    if (newContent) updateData.new_content = newContent;

    //Sending the PUT request
    fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })

    .then(response => response.json())
    .then(data => {
        if (data.id) {
            document.getElementById('update-note-id').innerHTML =
                '<h3>Note Updated!</h3>';
            alert(`Note updated successfully!\nID: ${data.id}\nTitle: ${data.title}\nContent: ${data.content}`);
        } else {
            alert(data.message);
        }
    })

    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});




//Delete a note
document.getElementById('delete-button').addEventListener('click', function() {
    //Get the ID
    const noteId = document.getElementById('delete-note-id').value;

    //Ensuring that there is ID typed in the field.
    if (!noteId) {
        alert("Please enter a note ID to delete.");
        return;
    }


    //Sending DELETE request
    fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
        method: 'DELETE',
    })
    .then(response => {
        console.log("DELETE request response status:", response.status);
        return response.json();
    })

    .then(data => {
        console.log("DELETE response data:", data);

        //Output message
        document.getElementById('delete-feedback').innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => {
        //In case something goes wrong
        console.error('Error:', error);
        document.getElementById('delete-feedback').innerHTML = `<p>Something went wrong. Please try again.</p>`;
    });
});
