const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const data = await global.client
      .db("meetingRoom")
      .collection("users")
      .findOne({ username: username },{ projection: { email: 0 } });
      console.log(data);
    if (data == null) {
      return res.json({
        success: false,
        message: "Wrong username",
      });
    }
    const valid = await bcrypt.compare(password, data.password);
    if (valid) {
      const token = jwt.sign(
        {
          data: data._id.toString(),
        },
        "secretpass",
        { expiresIn: "1h" }
      );
      res.cookie("jwt_token", token);
      res.json({
        success: true,
        message: "Login success",
      });
    } else {
      res.json({
        success: false,
        message: "Wrong password",
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
