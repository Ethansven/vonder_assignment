module.exports = async (req, res) => {
  const name = req.body.name;
  const cap = req.body.cap;
  try {
    await global.client
      .db("meetingRoom")
      .collection("rooms")
      .insertOne({ room_name: name, capacity: cap, bookings: [] });
    return res.json({
      success: true,
      message: "Created room",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
