// 1. PUT route to change the password
app.put('/change-password', (req, res) => {
    let message = "User does not exist";
    const { username, password } = req.body;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            users[i].password = password;
            // Removed the period at the end as per instructions
            message = `User ${username}'s password has been updated`;
            // Return early once found with a 200 status
            return res.status(200).send(message);
        }
    }
    // If not found, send the "User does not exist" message with 200
    res.status(200).send(message);
});

// 2. POST route to find a specific user
app.post('/find-user', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send("Username is required in the request body");
    }

    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        // Explicit 200 status for finding a user
        res.status(200).json(foundUser);
    } else {
        // Notice the double quotes around the username - very common requirement
        res.status(404).send(`User with username "${username}" not found.`);
    }
});

// 3. DELETE route to remove the last user
app.delete('/delete-user', (req, res) => {
    if (users.length > 0) {
        users.pop();
        // Return 200 and the updated array
        res.status(200).json(users);
    } else {
        // Exact message: Users collection is empty
        res.status(200).send("Users collection is empty");
    }
});