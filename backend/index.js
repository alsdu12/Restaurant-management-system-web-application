const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const secretKey = "cheiaSecreta";

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "restaurant",
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const role = req.body.role;

  if (!email || !password || !lastname || !firstname || !role) {
    res.status(400).send("All fields are mandatory!");
  } else {
    db.query(
      "INSERT INTO users (email, password, lastname, firstname, role) VALUES (?,?,?,?,?)",
      [email, password, lastname, firstname, role],
      (err, result) => {
        if (err) {
          res.status(500).send("An error occurred.");
        } else {
          res.status(200).send("The user has been successfully registered!");
        }
      }
    );
  }
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users WHERE role != 'admin'", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving users");
    } else {
      console.log("Users retrieved successfully");
      res.status(200).json(result);
    }
  });
});

app.get("/food", (req, res) => {
  db.query("SELECT * FROM meniu WHERE category = 'food'", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving food");
    } else {
      console.log("Food retrieved successfully");
      res.status(200).json(result);
    }
  });
});

app.get("/drinks", (req, res) => {
  db.query("SELECT * FROM meniu WHERE category = 'drinks'", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving drinks");
    } else {
      console.log("Drinks retrieved successfully");
      res.status(200).json(result);
    }
  });
});

app.get("/desert", (req, res) => {
  db.query("SELECT * FROM meniu WHERE category = 'deserts'", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving drinks");
    } else {
      console.log("Drinks retrieved successfully");
      res.status(200).json(result);
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", id, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    } else if (results.affectedRows === 0) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      res.status(204).send();
    }
  });
});

app.delete("/menu/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM meniu WHERE id = ?", id, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error deleting ");
    } else if (results.affectedRows === 0) {
      res.status(404).send(`with id ${id} not found`);
    } else {
      res.status(204).send();
    }
  });
});

app.delete("/orderz/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  db.query(
    "DELETE FROM orders WHERE idorder = ?",
    orderId,
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error deleting ");
      } else if (results.affectedRows === 0) {
        res.status(404).send(`with id ${orderId} not found`);
      } else {
        res.status(204).send();
      }
    }
  );
});

app.post("/addproduct", (req, res) => {
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const image = req.body.image;

  db.query(
    "INSERT INTO meniu (category, description, price,img) VALUES (?,?,?,?)",
    [category, description, price, image],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding product");
      } else {
        console.log("Product added successfully");
        res.status(200).send("Product added successfully");
      }
    }
  );
});

app.post("/orders", (req, res) => {
  const description = req.body.description;
  const table = req.body.table;
  const price = req.body.price;
  const time = req.body.time;
  const items = req.body.items;

  db.query(
    "INSERT INTO `orders` (description, table_no, price, time, items) VALUES (?,?,?,?,?)",
    [description, table, price, time, items],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding order");
      } else {
        console.log("Order added successfully");
        res.status(200).send("Order added successfully");
      }
    }
  );
});

app.put("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const bartenderId = req.body.bartenderId;
  db.query(
    "UPDATE `orders` SET bartender = ? WHERE idorder = ?",
    [bartenderId, orderId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error marking order as done");
      } else {
        console.log(
          `Order ${orderId} marked as done by bartender ${bartenderId}`
        );
        res.status(200).send("Order marked as done");
      }
    }
  );
});

app.put("/orderss/:id", (req, res) => {
  const orderId = req.params.id;
  const chef = req.body.chef;
  db.query(
    "UPDATE `orders` SET chef = ? WHERE idorder = ?",
    [chef, orderId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error marking order as done");
      } else {
        console.log(`Order ${orderId} marked as done by bartender ${chef}`);
        res.status(200).send("Order marked as done");
      }
    }
  );
});

app.get("/order", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching orders");
    } else {
      const orders = result.map((row) => ({
        ...row,
        items: JSON.parse(row.items), // Parsați coloana "items" pentru a obține obiectul JSON
      }));
      res.json(orders); // Returnați datele ca un răspuns JSON
    }
  });
});

app.post("/reservation", (req, res) => {
  const { fname, lname, date, time, persons } = req.body;

  if (!fname || !lname || !date || !time || !persons) {
    res.status(400).send("All fields are required");
    return;
  }

  db.query(
    "INSERT INTO reservation (fname, lname, date, time, persons) VALUES (?,?,?,?,?)",
    [fname, lname, date, time, persons],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reservation");
      } else {
        console.log("Reservation succesfully sent!");
        res.status(200).send("Reservation succesfully sent!");
      }
    }
  );
});

app.get("/reservations", (req, res) => {
  db.query("SELECT * FROM reservation", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching reservations");
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete("/reservations/:id", (req, res) => {
  const reservationId = req.params.id;

  db.query(
    "DELETE FROM reservation WHERE idreservation = ?",
    reservationId,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting reservation");
      } else {
        console.log("Reservation deleted successfully");
        res.status(200).send("Reservation deleted successfully");
      }
    }
  );
});

app.put("/updateproduct", (req, res) => {
  const description = req.body.description;
  const price = req.body.price;

  const image = req.body.image;
  const id = req.body.id;

  db.query(
    "UPDATE meniu SET description=?, price=?, img=? WHERE id=?",
    [description, price, image, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating product");
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send("Product not found");
        } else {
          console.log("Product updated successfully");
          res.status(200).send("Product updated successfully");
        }
      }
    }
  );
});

app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT id,email,role from users where email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        req.session.role = result[0].role;
        const token = jwt.sign(
          {
            id: result[0].id,
            email: result[0].email,
            role: result[0].role,
          },
          secretKey
        );

        res.send({ token, result });
      } else {
        res.send({ message: "Wrong username or password!" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log(`running server`);
});
