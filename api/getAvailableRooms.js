const { ObjectId } = require("mongodb");
const checkRoomAvailability = require("../utils/checkRoomAvailability.js");

module.exports = async (req, res) => {
  const { startDateTime, endDateTime } = req.query;
  try {
    const rooms = await global.client
      .db("meetingRoom")
      .collection("rooms")
      .find({})
      .toArray();
    const avRooms = rooms.filter((room) => {
      const check = checkRoomAvailability({ room, startDateTime, endDateTime });
      console.log("check is", check);
      return check;
    });
    return res.json(avRooms);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
