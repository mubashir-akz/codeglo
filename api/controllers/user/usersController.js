const UsersCollection = require("../../models/Users");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UsersCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    //    encrypt password
    const hashedPassword = await crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const newUser = await UsersCollection.create({
      name,
      email,
      password: hashedPassword,
      admin: false,
    });

    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // jwt authentication
    const user = await UsersCollection.findOne({ email, admin: false });

    //   password encryption
    const hashedPassword = await crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    //   if user not exist
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    } else if (user.password !== hashedPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, "secret", {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
