const { ObjectId } = require("mongodb");
const checkRoomAvailability = require("../utils/checkRoomAvailability.js");

module.exports = async (req, res) => {
  const { startDateTime, endDateTime } = req.query;
  // This is an example of what to send in body
  //  http://localhost:5000/availability?startDateTime=2023-05-01T09:23:44.639Z&endDateTime=2023-05-02T09:00:00.639Z
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
