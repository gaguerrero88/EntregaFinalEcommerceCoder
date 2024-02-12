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
    enum: ["User", "Admin", "Premium"],
    default: "User",
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  documents: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        reference: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  last_connection: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: ["pendiente", "incompleto", "completo"],
    default: "pendiente",
  },
  avatar: {
    type: String,
    default: "",
  },
});

export const UsersModel = mongoose.model(userCollection, usersSchema);
