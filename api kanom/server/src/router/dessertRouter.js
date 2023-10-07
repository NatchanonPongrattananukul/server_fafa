function dessertsRouter(app, connection) {
  // Read all records
  app.get("/desserts", (req, res) => {
    connection.query("SELECT * FROM desserts", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/dessert/:des_id", (req, res) => {
    const desID = req.params.des_id;

    connection.query(
      "SELECT * FROM desserts WHERE des_id = ?",
      desID,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Dessert not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/desserts", (req, res) => {
    const { tutle, content, ingredient, img, video, category_id, admin_id } =
      req.body;
    const dessert = {
      tutle,
      content,
      ingredient,
      img,
      video,
      category_id,
      admin_id,
    };

    connection.query("INSERT INTO desserts SET ?", dessert, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Dessert created successfully", id: result.insertId });
    });
  });

  // Update a record
  app.put("/dessert/:des_id", (req, res) => {
    const desID = req.params.des_id;
    const { tutle, content, ingredient, img, video, category_id, admin_id } =
      req.body;
    const dessert = {
      tutle,
      content,
      ingredient,
      img,
      video,
      category_id,
      admin_id,
    };

    connection.query(
      "UPDATE desserts SET ? WHERE des_id = ?",
      [dessert, desID],
      (err) => {
        if (err) throw err;
        res.json({ message: "Dessert updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/dessert/:des_id", (req, res) => {
    const desID = req.params.des_id;

    connection.query("DELETE FROM desserts WHERE des_id = ?", desID, (err) => {
      if (err) throw err;
      res.json({ message: "Dessert deleted successfully" });
    });
  });
}

module.exports = dessertsRouter;
