import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        _id:false
      },
    ],
    default: [],
  },
});

cartsSchema.pre(["find"], function (next) {
  this.populate("products.productId");
  next();
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
