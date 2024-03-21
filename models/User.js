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
  avatar: String,
  email: {
    type: String,
    //required: true,
    unique: true,
  },
});
// link to collection via 3rd arg:
export const User = model('User', userSchema, "users");
