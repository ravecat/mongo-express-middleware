import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  atomic_number: Number,
  atomic_weight: String,
  symbol: String,
});

export const Elements = mongoose.model('Elements', schema);
