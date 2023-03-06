const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const dotenv = require("dotenv");
dotenv.config();

const opts = { readPreference: "secondary" };

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);

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

// const db = require("./DB");

// user1 = new db.User({
//   admin: false,
//   username: "nick",
//   password: "pass",
//   date_created: new Date(),
// });

// user1.save();
