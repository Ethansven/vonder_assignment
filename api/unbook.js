const { ObjectId } = require("mongodb");
module.exports = async (req, res) => {
  const { roomId, startDateTime, endDateTime } = req.body;
  try {
    // This is an example of what to send in body
    // {
    // "roomId":"6480b3064755ebcb1cfa9e00",
    // "startDateTime":"2023-05-07T09:23:44.639Z",
    // "endDateTime":"2023-05-08T09:00:00.639Z"
    // }
    await global.client
      .db("meetingRoom")
      .collection("rooms")
      .updateOne(
        { _id: new ObjectId(roomId) },
        { $pull: { bookings: { startDateTime, endDateTime } } }
      );
    console.log("dfgfhk");
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
