import * as mongoose from 'mongoose';

export const AddSchema = new mongoose.Schema({
  title: String,
  text: String,
  url: String,
  imageUrl: String,
  order: Number,
});
