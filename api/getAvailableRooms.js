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
    // const freeRooms = avRooms.map((free) => {
    //   return res.json({
    //     _id: free._id,
    //     room_name: free.room_name,
    //     capacity: free.capacity,
    //   });
    // });
    // return res.json(freeRooms);

    return res.json(avRooms);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
