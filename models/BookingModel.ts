import mongoose, { Schema } from 'mongoose';

const BookingModel = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  time: { type: Number, require: true },
  persons: { type: String, require: true },
  table: { type: Schema.Types.ObjectId, ref: 'Table' },
});

export default mongoose.model('Booking', BookingModel, 'bookings');
