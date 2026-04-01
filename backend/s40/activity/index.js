// Import the Express framework
const express = require("express");

// Initialize the Express application
const app = express();
const port = 4000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock database (Must be defined here so the routes below can access it)
let users = [
    {
        "username": "jdoe01",
        "password": "password123"
    }
];

// --- ACTIVITY ROUTES ---

// 1. PUT route to change the password of a specific user
app.put('/change-password', (req, res) => {
    let message = "User does not exist";
    const { username, password } = req.body;

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

    // Check if username exists in request body
    if (!username) {
        return res.status(400).send("Username is required in the request body");
    }

    // Use find method to search for the user
    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        // Return user details as JSON
        res.status(200).json(foundUser);
    } else {
        // Return 404 with specific message
        res.status(404).send(`User with username "${username}" not found.`);
    }
});

// 3. DELETE route to remove the last user
app.delete('/delete-user', (req, res) => {
    if (users.length > 0) {
        users.pop();
        res.status(200).json(users);
    } else {
        res.send("Users collection is empty.");
    }
});

// --- SERVER INITIALIZATION ---

if (require.main === module) {
    app.listen(port, () => console.log(`Activity Server running at port ${port}.`));
}

module.exports = { app };