const { ObjectId } = require("mongodb");
const checkRoomAvailability = require("../utils/checkRoomAvailability.js");

module.exports = async (req, res) => {
  const { roomId, startDateTime, endDateTime } = req.body;
  // This is an example of what to send in body
  //{
  //   "roomId":"6481ac86207ff0dc6b0f1eee",
  //   "startDateTime":"2023-05-10T09:23:44.639Z",
  //   "endDateTime":"2023-05-11T09:00:00.639Z"
  //   }
  try {
    const room = await global.client
      .db("meetingRoom")
      .collection("rooms")
      .findOne({ _id: new ObjectId(roomId) });
    // console.log('room is',room);
    const isRoomAv = checkRoomAvailability({
      room,
      startDateTime,
      endDateTime,
    });
    // console.log('check is ',isRoomAv);
    if (!isRoomAv) {
      console.log("overlapped");
      return res.status(400).json({
        success: false,
        message: "Room is occupied"
      });
    }
    console.log(room.bookings);
    await global.client
      .db("meetingRoom")
      .collection("rooms")
      .updateOne(
        { _id: new ObjectId(roomId) },
        { $push: { bookings: { startDateTime, endDateTime } } }
      );

    return res.json({
      success: true,
      message: "Room is booked",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
