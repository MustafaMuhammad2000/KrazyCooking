/*
  This is the main file of the backend. uses express for RESTful api routes
  and mongodb atlas for the database.
*/
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const recipeRoutes = require("./routes/recipeRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const dotenv = require("dotenv");
dotenv.config();

// Ensures the CQRS architecture, reads will be performed on a seperate database
// while writes are for the primary database
const opts = { readPreference: "secondary" };

const app = express();
app.use(express.json());
// Using cors to allow any ip address to access backend
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Express routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/review", reviewRoutes);

// Connecting backend to database and starting server
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL, opts)
  .then(() => {
    const server = app.listen(8000, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`Server listening at http://${host}:${port}`);
    });
  })
  .catch((err) => console.error("could not connect to mongo DB", err));
