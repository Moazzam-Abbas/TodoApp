import mongoose from 'mongoose'
import db from './index.js'

const todoSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true, alias: 'id' },
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: String, ref: 'user', required: true }
},{
  timestamps: true // Add createdAt and updatedAt fields
});

const Todo = db.model('todo', todoSchema, 'todo');

export {Todo};
