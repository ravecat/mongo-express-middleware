import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  atomicNumber: String,
  atomicWeight: String,
  symbol: String,
});

export const Elements = mongoose.model('Elements', schema);
