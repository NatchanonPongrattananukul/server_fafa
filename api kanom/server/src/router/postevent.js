const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = "Login-by-admin";

function posteventRouter(app, connection) {
  // Create a new postevent record
  app.post("/postevents", (req, res) => {
    const { content, video, img, users_id } = req.body;

    const postevent = {
      content,
      video,
      img,
      users_id,
    };

    connection.query("INSERT INTO postevents SET ?", postevent, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Postevent created successfully", id: result.insertId });
    });
  });

  // Read all postevent records
  app.get("/postevents", (req, res) => {
    connection.query("SELECT * FROM postevents", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single postevent record
  app.get("/postevents/:post_id", (req, res) => {
    const postID = req.params.post_id;

    connection.query(
      "SELECT * FROM postevents WHERE post_id = ?",
      postID,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Postevent not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Update a postevent record
  app.put("/postevents/:post_id", (req, res) => {
    const postID = req.params.post_id;
    const { content, video, img, users_id } = req.body;

    const postevent = {
      content,
      video,
      img,
      users_id,
    };

    connection.query(
      "UPDATE postevents SET ? WHERE post_id = ?",
      [postevent, postID],
      (err) => {
        if (err) throw err;
        res.json({ message: "Postevent updated successfully" });
      }
    );
  });

  // Delete a postevent record
  app.delete("/postevents/:post_id", (req, res) => {
    const postID = req.params.post_id;

    connection.query("DELETE FROM postevents WHERE post_id = ?", postID, (err) => {
      if (err) throw err;
      res.json({ message: "Postevent deleted successfully" });
    });
  });
}

module.exports = posteventRouter;
