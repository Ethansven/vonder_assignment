const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const salt1 = await bcrypt.genSalt(10);
  const hash1 = await bcrypt.hash(password, salt1);
  function possiblePassword(password) {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  }
  if (!possiblePassword(password)) {
    return res.json({
      success: false,
      data: null,
      message: "Wrong password format",
    });
  }
  try {
    await global.client.db("meetingRoom").collection("users").insertOne({
      username: username,
      email: email,
      password: hash1,
    });
    return res.json({
      success: true,
      message: "Created user success",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
