// models/Card.js
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  title: String,
  tag: String,
  date: String,
  column: String,
  users: [Number],
});

export default mongoose.model('card', CardSchema);
