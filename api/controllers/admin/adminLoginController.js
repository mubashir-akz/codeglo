const UsersCollection = require("../../models/Users");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // jwt authentication
    const user = await UsersCollection.findOne({ email, admin: true });

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

    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;
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
    });

    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};
