import mongoose, { Schema } from "mongoose";

const userCollection = "users";

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["User","Admin"],
    default: "User",
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

export const UsersModel = mongoose.model(userCollection, usersSchema);
