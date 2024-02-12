import { response } from "../utils/response.js";
import { cartsServices, ticketsService, productServices } from "../repository/index.js";
import { ClientError } from "../utils/errors.js";
import {sendTicketEmail} from "../helpers/email.js"
import { v4 as uuidv4 } from "uuid";

class CartsControllers {
  async getCartByID(req, res) {
    const cartId = req.params.cid;
    const cartByID = await cartsServices.getCartByID(cartId);
    response(res, 200, cartByID);
  }

  async addProductToCart(req, res) {
    const pid = req.params.pid;
    const cId = req.params.cid;
    const product = await productServices.getProductsByID(pid);
    if (req.user._id.toString() === product.owner.toString() || req.user.role === "Premium") {
      throw ClientError("No puedes agregar tus propios productos al carrito");
    } else {
      const productAdded = await cartsServices.addProductToCart(cId, pid);
      response(res, 200, productAdded);
    }
  }

  async createCart(req, res) {
    const newCart = await cartsServices.createCarts();
    response(res, 200, newCart);
  }

  async deleteProductsCart(req, res) {
    const cartId = req.params.cid;
    await cartsServices.deleteProductsCart(cartId);
    res.status(200).json({ message: 'Carrito vaciado con exito' });
  }

  async deleteProduct(req, res) {
    const pid = req.params.pid;
    const cId = req.params.cid;
    const deleteProductCart = await cartsServices.deleteProduct(cId, pid);
    response(res, 200, deleteProductCart);
  }

  async productQuantity(req, res) {
    const pid = req.params.pid;
    const cId = req.params.cid;
    const prodQuantity = req.body.quantity;
    if (!prodQuantity) {
      throw new ClientError("Please provide the correct information for quantity");
    }

    if (typeof prodQuantity !== "number") {
      throw new ClientError("Please type a number");
    }
    const newProductQty = await cartsServices.productQuantity(cId, pid, prodQuantity);
    response(res, 200, newProductQty);
  }

  async updateCart(req, res) {
    const cartId = req.params.cid;
    const product = req.body;
    const cart = await cartsServices.updateCart(cartId, product);
    response(res, 200, cart);
  }

  async purchaseCart(req, res) {
    const cartId = req.params.cid;
    const cart = await cartsServices.getCartByID(cartId);
    const { products } = cart[0];
    if (products.length) {
      const ticketProducts = [];
      const rejectProducts = [];
      const ticketAmount = [];
      for (let i = 0; i < products.length; i++) {
        const cartProduct = products[i];
        const productInfo = cartProduct.productId;
        const cartQuantity = cartProduct.quantity;
        if (cartQuantity <= productInfo.stock) {
          const amountTicket = cartQuantity * productInfo.price;
          await productServices.updateProduct(productInfo._id, { stock: productInfo.stock - cartQuantity });
          ticketAmount.push(amountTicket);
          ticketProducts.push(cartProduct);
        } else {
          rejectProducts.push(cartProduct);
        }
      }
      if (ticketProducts.length === 0) {
        return res.json({
          status: "success",
          message: `Purchase can't be done ,the products could not be process because of a lack of stock `,
          rejectProducts,
        });
      }
      const email = req.user.email
      const totalAmount = ticketAmount.reduce((acc, amount) => acc + amount, 0);
      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: email,
      };
      await ticketsService.createTicket(newTicket);
      if (rejectProducts.length) {
        await cartsServices.updateCart(cartId, rejectProducts);
        await sendTicketEmail (req,email,newTicket)
        return res.json({
          status: "success",
          message: `Purchase done ,the following products could not be process because of a lack of stock `,
          rejectProducts,
        });
      }
      await cartsServices.updateCart(cartId, rejectProducts);
      await sendTicketEmail (req,email,newTicket)
      res.json({
        status: "success",
        message: `Purchase done`,
      });
    } else {
      throw new ClientError("The cart is empty");
    }
  }
}

export const cartsControllers = new CartsControllers();
