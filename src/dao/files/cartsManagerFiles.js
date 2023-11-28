import fs from "fs";

export class CartsManagerFiles {
  constructor(path) {
    this.path = path;
  }

  fileExists = () => {
    return fs.existsSync(this.path);
  };

  async createCart() {
    let newID;
    if (this.fileExists()) {
      const cartFile = await fs.promises.readFile(this.path, "utf-8");
      const cartJSON = JSON.parse(cartFile);
      if (cartJSON.length === 0) {
        newID = 1;
      } else {
        newID = cartJSON[cartJSON.length - 1].id + 1;
      }
      const products = [];
      cartJSON.push({ id: newID, products });
      await fs.promises.writeFile(this.path, JSON.stringify(cartJSON, null, "\t"));
      return cartJSON;
    } else {
      throw new Error("el archivo no existe");
    }
  }

  async getCartByID(Id) {
    if (this.fileExists()) {
      const cart = await fs.promises.readFile(this.path, "utf-8");
      const JSONcart = JSON.parse(cart);
      const cartById = JSONcart.filter((p) => {
        return p.id === Id;
      });
      if (cartById.length === 0) {
        return cartById;
      }
      return cartById[0].products;
    } else {
      throw new Error("el archivo no existe");
    }
  }

  async addProductToCart(cartId, prodId) {
    if (this.fileExists()) {
      const fileCart = await fs.promises.readFile(this.path, "utf-8");
      const JSONfileCart = JSON.parse(fileCart);
      const cart = JSONfileCart.filter((p) => {
        return p.id === cartId;
      });
      if (cart.length === 0) {
        return cart;
      }
      const prodExists = cart[0].products.some((p) => {
        return p.id === prodId;
      });
      if (prodExists) {
        const prodIndex = cart[0].products.findIndex((p) => {
          return p.id === prodId;
        });
        const cartIndex = JSONfileCart.findIndex((p) => {
          return p.id === cartId;
        });
        cart[0].products[prodIndex].quantity++;
        JSONfileCart[cartIndex] = cart[0];
        await fs.promises.writeFile(this.path, JSON.stringify(JSONfileCart, null, "\t"));
        return cart[0].products[prodIndex];
      } else {
        const newProd1 = { id: prodId, quantity: 1 };
        const position = cart[0].products.length;
        cart[0].products[position] = newProd1;
        JSONfileCart[cartId - 1] = cart[0];
        await fs.promises.writeFile(this.path, JSON.stringify(JSONfileCart, null, "\t"));
        return cart[0].products[position];
      }
    } else {
      throw new Error("el archivo no existe");
    }
  }
}
