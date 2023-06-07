module.exports = async (req, res) => {
  try {
    const rooms = await global.client
      .db("meetingRoom")
      .collection("rooms")
      .find({})
      .toArray();

    return res.json({
      success: true,
      data: rooms,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// { projection: { capacity: 0 } }
//    const mappedRooms = rooms.map((el) => el.room_name);
