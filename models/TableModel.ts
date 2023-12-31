import mongoose, { Schema } from 'mongoose';

const TableModel = new Schema({
  tableNumber: { type: Number, required: true, unique: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  isBooked: Boolean
});

export default mongoose.model('Table', TableModel, 'tables');
