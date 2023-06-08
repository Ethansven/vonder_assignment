const { ObjectId } = require("mongodb");
module.exports = async (req, res) => {
  const id = req.params.id;
  // This is an example of what to send in body
  //  http://localhost:5000/room/6480b3064755ebcb1cfa9e00
  try {
    const room = await global.client
      .db("meetingRoom")
      .collection("rooms")
      .findOne({ _id: new ObjectId(id) });

    return res.json({
      success: true,
      data: room,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
