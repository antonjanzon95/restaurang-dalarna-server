import mongoose, { Schema } from 'mongoose';

const AdminModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
});

export default mongoose.model('Admin', AdminModel, 'admins');
