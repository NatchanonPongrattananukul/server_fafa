function usersRouter(app, connection) {
  // Read all user records
  app.get("/users", (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single user record
  app.get("/user/:user_id", (req, res) => {
    const userID = req.params.user_id;

    connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      userID,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new user record
  app.post("/user/register", (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const user = {
      username,
      password,
      firstname,
      lastname,
    };

    connection.query("INSERT INTO users SET ?", user, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "User created successfully", id: result.insertId });
    });
  });

  // Update a user record
  app.put("/user/:user_id", (req, res) => {
    const userID = req.params.user_id;
    const { username, password, firstname, lastname } = req.body;
    const user = {
      username,
      password,
      firstname,
      lastname,
    };

    connection.query(
      "UPDATE users SET ? WHERE user_id = ?",
      [user, userID],
      (err) => {
        if (err) throw err;
        res.json({ message: "User updated successfully" });
      }
    );
  });

  // Delete a user record
  app.delete("/user/:user_id", (req, res) => {
    const userID = req.params.user_id;

    connection.query("DELETE FROM users WHERE user_id = ?", userID, (err) => {
      if (err) throw err;
      res.json({ message: "User deleted successfully" });
    });
  });

  app.post("/user/login", (req, res) => {
    const { username, password } = req.body;

    connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(401).json({ message: "Invalid credentials" });
        } else {
          const user = result[0];
          const { firstname, lastname } = user;
          res.json({ message: "Login successful", firstname, lastname });
        }
      }
    );
  });
}

module.exports = usersRouter;
