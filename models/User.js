import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: Number,
});
// link to collection via 3rd arg:
export const User = model('User', userSchema, "users");
