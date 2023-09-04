import mongoose, { Schema } from 'mongoose';

const AdminModel = new Schema({
  username: String,
  password: String,
});

export default mongoose.model('Admin', AdminModel, 'admins');
