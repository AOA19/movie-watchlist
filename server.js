require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

let db, collection

const uri = process.env.DB_URI;

const dbName = "MoviesDB";

app.listen(4000, () => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("movies").find().toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { movies: result });
    });
});

app.post("/movies", (req, res) => {
  db.collection("movies").insertOne(
    {
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year
    },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.put("/movies", (req, res) => {
// console.log(req.body)
  db.collection("movies").findOneAndUpdate(
    { title: req.body.title, genre: req.body.genre, year: req.body.year },
    {
      $set: {
              title: req.body.newTitle,
              genre: req.body.newGenre,
              year: req.body.newYear
      },
    },
   
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/movies", (req, res) => {
  db.collection("movies").findOneAndDelete(
    { title: req.body.title, genre: req.body.genre, year: req.body.year },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Movie deleted!");
    }
  );
});
