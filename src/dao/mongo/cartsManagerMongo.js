import { cartsModel } from "./models/carts.model.js";
import { ClientError } from "../../utils/errors.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }

  async createCarts(cart) {
    const newCart = await this.model.create(cart);
    return newCart;
  }
  async getCartByID(Id) {
    const getCartByID = await this.model.find({ _id: Id }).lean ();
    if (getCartByID == "") {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    return getCartByID;
  }

  async deleteProductsCart(Id) {
    const cart = await this.model.findById(Id);
    if (cart === "" || !cart) {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    cart.products = [];
    await this.model.updateOne({ _id: Id }, cart);
    return cart;
  }

  async deleteProduct(cartId, prodId) {
    const cart = await this.model.findById(cartId);
    if (cart === "" || !cart) {
      throw new ClientError(`Colud not find the cart with ID ${cartId}`, 404);
    }
    const prodIndex = cart.products.findIndex((e) => e.productId.toString() === prodId);
    let quantity = cart.products[prodIndex].quantity;
    if (quantity === 1) {
      cart.products.splice(prodIndex, 1);
    } else {
      const newQuantity = quantity - 1;
      cart.products[prodIndex].quantity = newQuantity;
    }
    await this.model.updateOne({ _id: cartId }, cart);
    const getCartUpdated = await this.model.findById(cartId);
    if (getCartUpdated == "") {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    return getCartUpdated;
  }

  async productQuantity(cartId, prodId, prodQuantity) {
    const cart = await this.model.findById(cartId);
    if (cart === "" || !cart) {
      throw new ClientError(`Colud not find the cart with ID ${cartId}`, 404);
    }
    const prodIndex = cart.products.findIndex((e) => e.productId.toString() === prodId);
    cart.products[prodIndex].quantity = prodQuantity;
    await this.model.updateOne({ _id: cartId }, cart);
    const getCartUpdated = await this.model.findById(cartId);
    if (getCartUpdated == "") {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    return getCartUpdated;
  }

  async addProductToCart(cartId, prodId) {
    const cart = await this.model.findById(cartId);
    if (cart === "" || !cart) {
      throw new ClientError(`Colud not find the cart with ID ${cartId}`, 404);
    }
    const existProdId = cart.products.find((e) => e.productId.toString() === prodId);
    if (!existProdId) {
      cart.products.push({ productId: prodId, quantity: 1 });
    } else {
      existProdId.quantity += 1;
    }
    await this.model.updateOne({ _id: cartId }, cart);
    const getCartUpdated = await this.model.findById(cartId);
    if (getCartUpdated == "") {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    return getCartUpdated;
  }


  async updateCart(cartId, product) {
    const cart = await this.model.findById(cartId);
    if (cart === "" || !cart) {
      throw new ClientError(`Colud not find the cart with ID ${cartId}`, 404);
    }
    cart.products = product
    await this.model.updateOne({ _id: cartId }, cart);
    const getCartUpdated = await this.model.findById(cartId);
    if (getCartUpdated == "") {
      throw new ClientError(`Colud not find the cart with ID ${Id}`, 404);
    }
    return getCartUpdated;
  }

}
