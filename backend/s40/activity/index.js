// Sample users array (ensure this is defined in your discussion/index.js)
let users = [
    { username: "jdoe0901", password: "@User123" },
    { username: "janedoe", password: "password123" }
];

// 1. PUT route to change password
app.put('/change-password', (req, res) => {
    const { username, password } = req.body;
    let message = "User does not exist";

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            users[i].password = password;
            message = `User ${username}'s password has been updated.`;
            break; 
        }
    }

    res.send(message);
});

// 2. POST route to find a specific user
app.post('/find-user', (req, res) => {
    const { username } = req.body;

    // Check if username is missing in the request body
    if (!username) {
        return res.status(400).send("Username is required in the request body");
    }

    // Use .find() to locate the user
    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        // Return user details as JSON
        res.status(200).json(foundUser);
    } else {
        // Return 404 if not found
        res.status(404).send(`User with username "${username}" not found.`);
    }
});

// 3. DELETE route to remove the last user
app.delete('/delete-user', (req, res) => {
    
    if (users.length > 0) {
        // Remove the last element
        users.pop();
        // Return the updated array
        res.status(200).json(users);
    } else {
        // Return message if empty
        res.send("Users collection is empty.");
    }
});