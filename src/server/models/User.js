import mongoose from "mongoose";

const { Model, Schema } = mongoose;

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      minlength: [2, "First name should be minimum 2 characters."],
      maxlength: 255,
      required: [true, "First name is required."]
    },
    last: {
      type: String,
      maxlength: 255,
      required: false
    }
  },
  username: {
    type: String,
    minlength: [2, "Username should be minimum 2 characters."],
    maxlength: 255,
    required: [true, "Username is required."]
  },
  password: {
    type: String,
    minlength: [2, "Password should be minimum 2 characters."],
    maxlength: 255,
    required: [true, "Password is required."]
  },
  likes: {
    type: Array,
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

class UserModel extends Model {}

const User = mongoose.model(UserModel, userSchema, "users");

export default User;
