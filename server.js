const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./api/routes/admin");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://Mubashir:mymongoatlas@cluster0.qamji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Mongoose up"))
  .catch((error) => console.log(error.message));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Admin routes
app.use("/admin", adminRoutes);

// User Routes

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
