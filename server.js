const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./api/routes/adminRoutes");
const usersRoutes = require("./api/routes/usersRoutes");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config(); // dotenv config

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongoose up"))
  .catch((error) => console.log(error.message));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Admin routes
app.use("/admin", adminRoutes);

// Users routes
app.use("/users", usersRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
