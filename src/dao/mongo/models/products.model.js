import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,"Please provide title"]
  },
  description: {
    type: String,
    required: [true,"Please provide description"]
  },
  price: {
    type: Number,
    required: [true,"Please provide price"]
  },
  code: {
    type: String,
    required: [true,"Please provide code"],
    unique: true
  },
  category: {
    type: String,
    required: [true,"Please provide category"],
    enum: ["Ropa", "Tecnologia", "Deportes"],
  },
  stock: {
    type: Number,
    required: [true,"Please provide stock"]
  },
  imageProd: {
    type: String,
    default: "",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
});

productSchema.plugin (mongoosePaginate)

export const productsModel = mongoose.model(productCollection, productSchema);


