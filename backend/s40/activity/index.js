app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. PUT route to change password
app.put('/change-password', (req, res) => {
    const { username, password } = req.body;
    let message = "User does not exist";

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            users[i].password = password;
            // Removed the period at the end to match the common bootcamp pattern, 
            // but double check your instructions if they specifically want it.
            message = `User ${username}'s password has been updated`;
            break; 
        }
    }

    // Explicitly set 200 status
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
        // Ensure this returns 200
        res.status(200).json(foundUser);
    } else {
        // The error log mentioned "User with username (username) not found."
        // Ensure the quotes and spacing are exactly as requested.
        res.status(404).send(`User with username "${username}" not found.`);
    }
});

// 3. DELETE route to remove the last user
app.delete('/delete-user', (req, res) => {
    
    if (users.length > 0) {
        users.pop();
        // The test specifically asks for a 200 status and the updated array
        res.status(200).json(users);
    } else {
        // Ensure the message matches exactly: "Users collection is empty"
        // Note: Check if your test expects a period or not. 
        // Based on your screenshot 05, there IS a period: "Users collection is empty."
        res.status(200).send("Users collection is empty.");
    }
});