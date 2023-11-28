import { productServices} from "../repository/index.js";
import { response } from "../utils/response.js";
import { ClientError } from "../utils/errors.js";

class ProductControllers {

  async createProduct(req, res) {
      const productToAdd = req.body;
      await productServices.addProduct(productToAdd);
      response(res, 200, productToAdd);
  }

  async getProducts(req, res) {
  const limit = parseInt(req.query.limit) || 10;
      const product = await productServices.getProducts();
      if (!limit) {
        return response(res, 200, product);
      } else {
        const newProducts = product.slice(0, limit);
        return response(res, 200, newProducts);
      }
  }

  async updateProductsByID(req, res) {
    const newID = req.params.pid;
    const productUpdate = req.body;
    const product = await productServices.updateProduct(newID, productUpdate);
    if (!product) {
      throw new ClientError("Invalid ID");
    }
    response(res, 200, product);
  }

  async deleteProductByID(req, res) {
    const newID = req.params.pid;
    const productDelete = await productServices.deleteProduct(newID);
    if (!productDelete) {
      throw new ClientError("Invalid ID");
    }
    response(res, 200, productDelete);
  }

  async getProductsByID(req, res) {
    const productID = req.params.pid;
    const product = await productServices.getProductsByID(productID);
    if (!product) {
      throw new ClientError("Invalid ID");
    }
    response(res, 200, product);
  }
}

export const productControllers = new ProductControllers();
