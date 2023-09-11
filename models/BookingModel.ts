import mongoose, { Schema } from 'mongoose';

const BookingModel = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  // date: { type: Date, require: true },
  time: { type: Date, require: true },
  persons: { type: Number, require: true },
  tableNumber: { type: Number, require: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Booking', BookingModel, 'bookings');
