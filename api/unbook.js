const { ObjectId } = require("mongodb");
module.exports = async (req, res) => {
  const { roomId, startDateTime, endDateTime } = req.body;
  try {
    // const room = await global.client
    //   .db("meetingRoom")
    //   .collection("rooms")
    //   .findOne({ _id: new ObjectId(roomId) });   
    await global.client
      .db("meetingRoom")
      .collection("rooms")
      .updateOne(
        { _id: new ObjectId(roomId) },
        { $pull: { 'bookings': { startDateTime, endDateTime } } }
      );
    return res.json({
      success: true,
      message: "Room is unbooked",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
