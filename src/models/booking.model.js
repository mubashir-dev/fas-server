const mongoose = require("mongoose");
const User = require("./user.model");
const Schema = mongoose.Schema;

//booking schema
const BookingSchema = new Schema({
  pickupLocation: { type: String, require: true },
  dropoffLocation: { type: String, require: true },
  vanType: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "large",
    require: true,
  },
  deliveryTime: { type: Date, require: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    require: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
