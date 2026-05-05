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

// Activity Code: Handle Edit Form Submission
document.querySelector('#form-edit-post').addEventListener('submit', (event) => {
    event.preventDefault();

    let id = document.querySelector('#txt-edit-id').value;
    let titleInput = document.querySelector('#txt-edit-title');
    let bodyInput = document.querySelector('#txt-edit-body');
    let updateBtn = document.querySelector('#btn-submit-update');

    axios({
        method: 'put',
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        data: {
            id: id,
            title: titleInput.value,
            body: bodyInput.value,
            userId: 1
        },
        headers: { 'Content-type': 'application/json' }
    })
    .then((response) => {
        console.log(response.data);
        alert('Succesfully updated.');
        
        // Reset fields
        titleInput.value = '';
        bodyInput.value = '';
        document.querySelector('#txt-edit-id').value = '';
        
        // Disable button
        updateBtn.setAttribute('disabled', true);
    })
})

// Activity Code: Delete Post
const deletePost = (id) => {
    axios({
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/posts/${id}`
    })
    .then((response) => {
        console.log(response);
        alert('Post successfully deleted');
        
        // Remove from DOM
        const postElement = document.querySelector(`#post-${id}`);
        postElement.remove();
    })
}

// Activity Code: Delete All
document.querySelector('#delete-all').addEventListener('click', () => {
    alert('All Posts Deleted');
    document.querySelector('#div-post-entries').innerHTML = '';
});