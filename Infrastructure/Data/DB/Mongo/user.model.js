import mongoose from 'mongoose'
import db from './index.js'

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true, alias: 'id' },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{
  timestamps: true // Add createdAt and updatedAt fields
});

const User = db.model('user', userSchema, 'user');

export {User};
