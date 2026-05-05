// axios.get() - used to request data from a server
axios.get("https://jsonplaceholder.typicode.com/posts")
.then(response => {
    showPosts(response.data);
})

let postEntries = '';

// Show Posts
const showPosts = (posts) => {
    posts.forEach((post) => {
        postEntries += `
            <div id="post-${post.id}">
                <h3 id="post-title-${post.id}">${post.title}</h3>
                <p id="post-body-${post.id}">${post.body}</p>
                <button onclick="editPost('${post.id}')">Edit</button>
                <button onclick="deletePost('${post.id}')">Delete</button>
            </div>
        `
    })
    document.querySelector('#div-post-entries').innerHTML = postEntries;
}

// Add Posts
document.querySelector('#form-add-post').addEventListener('submit', (event) => {
    event.preventDefault();
    let titleInput = document.querySelector('#txt-title');
    let bodyInput = document.querySelector('#txt-body');

    axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: {
            title: titleInput.value,
            body: bodyInput.value,
            userId: 1
        },
        headers: { 'Content-type': 'application/json' }
    })
    .then((response) => {
        console.log(response.data);
        alert('Successfully added.');
        titleInput.value = null;
        bodyInput.value = null;
    })
})

// Edit Post (Populate Form)
const editPost = (id) => {
    let title = document.querySelector(`#post-title-${id}`).innerHTML;
    let body = document.querySelector(`#post-body-${id}`).innerHTML;

    document.querySelector('#txt-edit-id').value = id;
    document.querySelector('#txt-edit-title').value = title;
    document.querySelector('#txt-edit-body').value = body;

    document.querySelector('#btn-submit-update').removeAttribute('disabled');
}

// 1. Handle Edit Form Submissions
document.querySelector('#form-edit-post').addEventListener('submit', (event) => {
    event.preventDefault(); // it should prevent the default form submission behavior.

    const id = document.querySelector('#txt-edit-id').value;
    const titleInput = document.querySelector('#txt-edit-title');
    const bodyInput = document.querySelector('#txt-edit-body');
    const submitBtn = document.querySelector('#btn-submit-update');

    axios({
        method: 'put',
        url: 'https://jsonplaceholder.typicode.com/posts/1', // specific endpoint per instructions
        data: {
            id: id,
            title: titleInput.value,
            body: bodyInput.value,
            userId: 1
        },
        headers: { 'Content-type': 'application/json' }
    })
    .then((response) => {
        console.log(response.data); // Axios should handle the response, access parsed payload via response.data
        alert("Succesfully updated."); // trigger an alert with the message "Succesfully updated."
        
        // reset the input fields to empty values
        titleInput.value = '';
        bodyInput.value = '';
        document.querySelector('#txt-edit-id').value = '';
        
        // disable the submit button to prevent multiple submissions
        submitBtn.disabled = true; 
    });
});

// 2. Delete Post Method
// Update our code so that when the deletePost() method is triggered... it should be able to use the Axios method
const deletePost = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
        console.log(response); // Log the server response in the console
        alert("Post successfully deleted"); // trigger an alert with a message
        
        // remove the element from the DOM by first selecting the element and using the remove() method
        const postElement = document.querySelector(`#post-${id}`);
        if (postElement) {
            postElement.remove();
        }
    });
};

// 3. Delete All Button
// Attach an event listener so that whenever this button is clicked an alert... is shown
document.querySelector('#delete-all').addEventListener('click', () => {
    alert("All Posts Deleted"); // Alert shown
    
    // All content inside element with id #div-post-entries must be deleted
    document.querySelector('#div-post-entries').innerHTML = '';
});