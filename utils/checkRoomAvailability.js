const { ObjectId } = require("mongodb");

module.exports = ({ room, startDateTime, endDateTime }) => {
  for (let booking of room.bookings) {
    
    console.log("consider");
    console.log(booking.startDateTime, booking.endDateTime);
    console.log(startDateTime, endDateTime);
    if (
      !(
        (startDateTime < booking.startDateTime &&
          endDateTime < booking.startDateTime) ||
        startDateTime > booking.endDateTime
      )
    ) {
      console.log("false");
      return false;
    }
  }
  return true;
};






