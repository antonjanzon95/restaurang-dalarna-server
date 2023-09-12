import mongoose, { Schema } from 'mongoose';

const UserModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
});

export default mongoose.model('User', UserModel, 'users');
